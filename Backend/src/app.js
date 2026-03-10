import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"; 

const app = express();

// Configure CORS
// const corsOptions = {
// //   origin: "https://you-tube-project-chi.vercel.app",
//   origin: "*",
//   methods: "GET, POST, OPTIONS ,PATCH",
//   credentials: true, // if you're using cookies or authorization headers
// };
const allowedOrigins = [
  "https://youtube-by-cks-dev.vercel.app",
  "http://localhost:5173",
];

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    // origin: "*",
    credentials: true, // only if you're using cookies
  })
);
// app.use(cors(corsOptions));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.static("public"))
app.use(cookieParser())

//routes import 

import userRouter from "./routes/user.router.js";
import videoRouter from "./routes/video.router.js";
import tweetRouter from "./routes/tweet.router.js";
import subscriptionRouter from "./routes/subscription.router.js"
import playlistRouter from "./routes/playlist.router.js"
import likeRouter from "./routes/like.router.js"
import healthcheckrouter from "./routes/healthcheck.router.js"
import dashboardRouter from "./routes/dashboard.router.js"
import commentRouter from "./routes/comment.router.js"

app.use("/api/v1/users", userRouter);    
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/subscriptions" , subscriptionRouter);
app.use("/api/v1/playlists", playlistRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/healthcheck", healthcheckrouter);
app.use("/api/v1/dashboards", dashboardRouter);
app.use("/api/v1/comments", commentRouter)
app.get("/try", (req, res) => {
  res.send("Works!");
});
export { app }