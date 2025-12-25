// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import express from "express";
import https from "https";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import os from "os";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";
import bootRouter from "./routes/boot.route.js";
import courseRouter from "./routes/course.route.js";
import homeRouter from "./routes/home.route.js";
import reviewsRouter from "./routes/reviews.route.js";
import registerRouter from "./routes/register.route.js";
import loginRouter from "./routes/login.route.js";
import logoutRouter from "./routes/logout.route.js";
import googleRouter from "./routes/google.route.js";
import forgotRouter from "./routes/forget.route.js";
import resetRouter from "./routes/reset.route.js";
import usersRouter from "./routes/user.route.js";
import accountRouter from "./routes/account.route.js";
import { errorHandler } from "./middleware/errors.js";
import { connectWithMongoDB } from "./config/mongo.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
dotenv.config();

// const PORT = process.env.PORT || 8000;
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Set query parser to extended to support nested objects
app.set("query parser", "extended");

// cookie parser
app.use(cookieParser());

app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: os.tmpdir(),
  })
);

app.use(express.urlencoded({ extended: false }));

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "cdn.tailwindcss.com",
          "cdnjs.cloudflare.com",
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "cdnjs.cloudflare.com",
          "fonts.googleapis.com",
        ],
        fontSrc: ["'self'", "cdnjs.cloudflare.com", "fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "res.cloudinary.com", "favicon.io", "*"],
      },
    },
  })
);

app.use(xss());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// passport initialize
app.use(passport.initialize());

// cors setup
const clientOrigin = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://localhost:8000";

const corsOptions = { origin: clientOrigin };
app.use(cors(corsOptions));

// Setup routes (api/v1)
app.use("/", homeRouter);
app.use("/api/v1/register", registerRouter);
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/logout", logoutRouter);
app.use("/api/v1/bootcamps", bootRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/reviews", reviewsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/account", accountRouter);
app.use("/api/v1/", forgotRouter);
app.use("/api/v1/", resetRouter);
app.use("/api/v1/", googleRouter);
app.use(errorHandler);

// render 404 error
//app.use("/", (req, res) => res.status(404).render("errors/404"));

if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  try {
    connectWithMongoDB(process.env.MONGO_URL)
      .then(() =>
        console.log("--> Connect Successfully with MongoDB".blue.inverse)
      )
      .catch((err) =>
        console.log("Faild to connect with MongoDB".red.inverse, err)
      );

    const serverSSl = https.createServer(
      {
        key: fs.readFileSync(path.join(__dirname, "certs", "key.pem")),
        cert: fs.readFileSync(path.join(__dirname, "certs", "cert.pem")),
      },
      app
    );

    serverSSl.listen(process.env.PORT, () => {
      console.log(`Server is running on ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

export default app;
