import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../../../ReactCarDealership/stand.json');
const secret = 'your_jwt_secret_key';

const getUsers = () => {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data).users;
};

const saveUsers = (users) => {
    const data = fs.readFileSync(dataPath);
    const jsonData = JSON.parse(data);
    jsonData.users = users;
    fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2));
};

export const login = (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        const token = jwt.sign({ id: user._id, username: user.username }, secret, { expiresIn: '1h' });
        res.json({ token, username }); 
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};


export const register = (req, res) => {
    const { name, username, email, password } = req.body;
    const users = getUsers();
    const userExists = users.some(user => user.username === username || user.email === email);

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
        _id: (users.length + 1).toString(),
        name,
        username,
        email,
        password
    };

    users.push(newUser);
    saveUsers(users);

    res.status(201).json({ message: 'User registered successfully' });
};
