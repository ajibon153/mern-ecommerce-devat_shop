require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use('/user', require('./routes/userRoutes'));
app.use('/api', require('./routes/categoryRoutes'));
app.use('/api', require('./routes/uploadRoutes'));
app.use('/api', require('./routes/productRoutes'));

const URI = process.env.MONGO_URI;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
  }
);

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to my channel, please subscribe. Thanks' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server Port', PORT);
});
