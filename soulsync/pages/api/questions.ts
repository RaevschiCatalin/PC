
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const jsonFilePath = path.join(process.cwd(), 'backend', 'questions.json');
  try {
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const questions = JSON.parse(fileContents);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load questions' });
  }
};