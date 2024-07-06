import fs from 'fs';
import path from 'path';
//@ts-ignore
export default async function handler(req, res) {
    const filePath = path.resolve(process.cwd(), '../../backend/personalityTypes.json'); // Adjust path if necessary
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const personalityTypes = JSON.parse(fileContent);

    res.status(200).json(personalityTypes);
}
