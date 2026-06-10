const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { log, assert } = require('console');

const port = 4000;
const app = express();

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect("mongodb+srv://ttnkchnk:lY2drqAzSTWNTg1S@cluster0.v7toi1y.mongodb.net/inside-out", { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to fetch user
const authMiddleware = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, 'secret_ecom');
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};

// API creation
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Image storage engine
const storage = multer.diskStorage({
  destination: './upload/image',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// Creating upload endpoint for images
app.use('/image', express.static(path.join(__dirname, 'upload/image')));

app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/image/${req.file.filename}`
  });
});

// Schema for creating products
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model("Product", productSchema);

// Schema for creating users
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  cartData: { type: Object },
  date: { type: Date, default: Date.now }
});

const Users = mongoose.model('Users', userSchema);

// API for adding products
app.post('/addproduct', async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved:");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// API for deleting products
app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name
  });
});

// API for getting all products
app.get('/allproducts', async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
});

// API for registering user
app.post('/signup', async (req, res) => {
  const { username, email, password, phone } = req.body;

  console.log('Received signup request:', req.body);

  try {
    let check = await Users.findOne({ email });
    if (check) {
      console.log('User with this email already exists:', email);
      return res.status(400).json({ success: false, error: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    const user = new Users({
      name: username,
      email,
      password: hashedPassword,
      phone,
      cartData: cart,
    });

    await user.save();

    const data = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(data, 'secret_ecom');
    console.log('User registered successfully:', user);
    res.json({ success: true, token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, error: "Signup failed due to server error" });
  }
});

// API for user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, error: "Invalid email or password" });
    }

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      return res.status(400).json({ success: false, error: "Invalid email or password" });
    }

    const data = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: "Login failed due to server error" });
  }
});

// API for fetching new collection
app.get('/newcollections', async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("New collection fetched");
  res.send(newcollection);
});

// API for fetching popular items in women section
app.get('/popularinwomen', async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  console.log("Popular in women fetched");
  res.send(popular_in_women);
});

// API for adding products to cart
app.post('/addtocart', authMiddleware, async (req, res) => {
  console.log("added", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Added");
});

// API for removing products from cart
app.post('/removefromcart', authMiddleware, async (req, res) => {
  console.log("removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Removed");
});

// API for getting cart data
app.post('/getcart', authMiddleware, async (req, res) => {
  console.log("GetCart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

// Newsletter
const emailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }
});

const Email = mongoose.model('Email', emailSchema);

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  try {
    const newEmail = new Email({ email });
    await newEmail.save();
    res.status(200).send('Subscription successful');
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(400).send('Error subscribing');
  }
});

// API for sorting products
app.get('/products', async (req, res) => {
  const sortField = req.query.sortField || 'name'; // Default sort by name
  const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1; // Default sort order is ascending

  try {
    const products = await Product.find({}).sort({ [sortField]: sortOrder });
    res.json(products);
  } catch (error) {
    console.error('Sorting error:', error);
    res.status(500).send('Error fetching products');
  }
});

// Schema for creating orders
const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', OrderSchema);

// API for creating an order
app.post('/createOrder', authMiddleware, async (req, res) => {
  const { items, totalAmount } = req.body;
  const userId = req.user.id;

  try {
    const newOrder = new Order({
      userId,
      items,
      totalAmount
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Failed to create order', error });
  }
});

// API for fetching all orders
app.get('/orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('userId', 'name email phone') // Include phone number
      .populate('items.productId', 'name image new_price');
    console.log('Fetched orders from DB:', orders); // Log the fetched orders
    res.json(orders);
  } catch (error) {
    console.error('Fetching orders error:', error);
    res.status(500).send('Error fetching orders');
  }
});


  

app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error : " + error);
  }
});











