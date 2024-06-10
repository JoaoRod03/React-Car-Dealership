import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../../../ReactCarDealership/stand.json');

export const getCars = (req, res) => {
    const data = fs.readFileSync(dataPath);
    const cars = JSON.parse(data).cars;
    res.json(cars);
};
