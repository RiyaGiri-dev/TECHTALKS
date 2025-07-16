const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/techtalks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("Mongo Error: ", err));

app.use(session({
  secret: "techtalks_secret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/techtalks" })
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.currentUser = {
      _id: req.session.userId,
      username: req.session.username
    };
  } else {
    res.locals.currentUser = null;
  }
  next();
});

const vlogRoutes = require("./routes/vlog");
app.use("/vlog", vlogRoutes);

app.get("/", (req, res) => {
  res.redirect("/vlog");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
