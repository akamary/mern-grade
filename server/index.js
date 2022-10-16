import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import studentRoutes from "./routes/student.js";
import authRoutes from "./routes/auth.js";
import privateRoutes from "./routes/private.js";
import errorHandler from "./middleware/error.js";
import dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";

const app = express();

dotenv.config({ path: "./config.env" });
app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
//cors
app.use(cors());
// express middlewares
app.use("/api/auth", authRoutes);
app.use("/api/private", privateRoutes);

//Error Handler (end of middleware)
app.use(errorHandler);

app.use("/students", studentRoutes);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join("/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API running");
  });
}

//app.get("/", (req, res) => {
//  res.send("Hello");
//});

const PORT = process.env.PORT || 5000;

// connect to mongodb using mongoose
// 1-the connection_url in env file, 2-useNewUrlParser:true, useUnifiedTopology:true for avoiding errors
mongoose
  .connect(process.env.CONNECTION_URL || process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // 1-the PORT, 2-callback func which is going to be run once the app successfuly listens
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Connection is established and running on port: ${PORT}`)
    )
  )
  .catch((err) => console.log(err.message));
