const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);

const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authMiddleware = require("./middleware.js");

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

// Server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

require("./routes/routesManager.js")(app);
