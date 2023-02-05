const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDb = require("./database/db");
const authRoutes = require("./routes/auth");
const companyRoutes = require("./routes/company");
const beerRoutes = require("./routes/beer");

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/beer", beerRoutes);

connectDb();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
