const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
// const cors = require('cors');

const PORT = process.env.PORT || 5000;
dotenv.config();

// Routes

// 1.
const postsRouter = require("./routes/posts");
// app.use(express.json());
app.use(express.json({limit: '50mb'}));

// middleware
mongoose.set('useFindAndModify', false);

// app.use(express.urlencoded({limit: '50mb'}));
// var bodyParser = require('body-parser');
// app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


// app.use(cors());




app.use('/posts', postsRouter);
// app.get('/posts', (req, res) =>{
//   res.send("this is posts !!!");
// });

app.get('/', (req, res)=>{
  res.send("Hello this is share-app...");
})




mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});