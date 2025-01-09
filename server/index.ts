import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import cors from 'cors';
import apiRoute from "./routes/apiRoute";
import aiRoute from "./routes/aiRoute";
import authRoute from "./routes/authRoute";
import expressBasicAuth from "express-basic-auth";
import bodyParser from "body-parser";
import path from "path";
import jwt from "jsonwebtoken";

const app : Application = express();

//http basic auth
const authenticate =
  expressBasicAuth({
    users: {
      [process.env.TESTER_USERNAME!]: process.env.TESTER_PASSWORD!
    },
    unauthorizedResponse: getUnauthorizedResponse,
    challenge: true
});

const authenticateToken = (req: Request, res: Response, next: any) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader?.split(' ')[1]; // Retrieve the token after 'Bearer'

  if (!token) {
    return res.status(403).json({ message: 'Access denied' });
  }

  jwt.verify(token, String(process.env.SECRET_KEY!), (err, user) => {
    if (err) {
      //console.error('JWT verification failed:', err); // Log the error details
      return res.status(403).json({ message: 'Invalid token' });
    }
    next();
  });
};

function getUnauthorizedResponse(req:any) {
    return req.auth
        ? 'Credentials rejected'
        : 'No credentials provided';
}

// content security policy config to only accept scripts from self source
const cspConfig = {
  directives: {
    defaultSrc: ["'self'"],
    imgSrc: ["'self'", "data:"]
  },
};

//cors
app.use(cors());

//secure server headers
app.use(helmet({
  contentSecurityPolicy: cspConfig
}));

const port = process.env.PORT || 8000;

//setupCronJobs(); //start scheduled scraping and ai functions

// app.use(bodyParser.json()); //receive req.body
app.use(express.json({limit: '50mb'}));

app.use(express.static('public_front'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public_front', 'index.html'));
});

//some routes double authenticated = double auth disabled since auth heaDERS get overwritten with the other credentials
app.use("/apiroute", /*authenticate,*/ authenticateToken, apiRoute);
app.use("/airoute", /*authenticate,*/ authenticateToken, aiRoute);
app.use("/auth", authenticate, authRoute);

app.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).json({ Message: "Welcome to the homepage" });
  } catch (e: any) {
    res.status(404).json({ error: `error fetching: ${e}` });
  }
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});