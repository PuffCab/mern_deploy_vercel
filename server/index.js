import express from "express";
import cors from "cors";
const app = express();
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import passport from "passport";

import cloudinaryConfig from "./config/cloudinary.js";
import passportConfig from "./config/passport.js";

import testRouter from "./routes/testRouter.js";
import citiesRouter from "./routes/citiesRouter.js";
import museumsRoutes from "./routes/museumsRoutes.js";
import userRoutes from "./routes/usersRoutes.js";

const addMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  // var allowCrossDomain = function (req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   // res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept"
  //   );
  //   next();
  // };

  // app.use(allowCrossDomain);

  //REVIEW [epic=deploy, seq=2] once the client is deployed we can add the URL to the list of allowed Origins

  const allowedOrigins = [
    //REVIEW [epic=deploy, seq=3] the first origin should be the localhost port our client runs on. The second one, vercel's URL for our client
    "http://localhost:5174",
    // "https://mern-deploy-vercel-client.vercel.app",
    "https://test-deploy-client-virid.vercel.app",
  ];
  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };

  // app.use(cors());
  app.use(cors(corsOptions));
  cloudinaryConfig();

  app.use(passport.initialize());
  passportConfig(passport);
};

const startServer = () => {
  const port = process.env.PORT || 5001;

  app.listen(port, () => {
    console.log("Server is running in port ", port);
  });
};

const connectMongoDB = async () => {
  await mongoose.connect(process.env.DB);
  console.log("Mongo DB is running");
};

const loadRoutes = () => {
  app.use("/test", testRouter);
  app.use("/api/cities", citiesRouter);
  app.use("/api/museums", museumsRoutes);
  app.use("/api/users", userRoutes);
};

//IIFE
(async function controller() {
  addMiddlewares();
  await connectMongoDB();
  loadRoutes();
  startServer();
})();
