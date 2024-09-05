import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const authRoute : express.Router = express.Router();
import userModel, { UserData } from '../dbModels/users';

const userModule = userModel();

authRoute.post("/signup", async (req : express.Request, res : express.Response) : Promise<void> => { 
    try {

    const { username, description, email, password } = req.body;

    // Check if user already exists
    let userCheck = await userModule.fetchOneWithName(username);
    if (userCheck) {
        res.status(200).json({ message: 'User already exists' });
    }
    else{
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        let user : UserData = {
            username: username,
            password: hashedPassword,
            bio: description,
            email: email
        }
        userModule.addData(user);

        res.status(201).json({ message: 'User created successfully' });
    }

    } catch (e : any) {
        res.status(404).json({ "error" : `error on signup with code: 1: ${e}` });
    }
});

authRoute.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    let user = await userModule.fetchOneWithEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    const SECRET_KEY = process.env.SECRET_KEY!;

    // Generate JWT
    const token = jwt.sign({ email: user.email, username: user.username }, SECRET_KEY, {
      expiresIn: '6 days',
    });
  
    res.json({ token: token, username : user.username });
  });

export default authRoute;