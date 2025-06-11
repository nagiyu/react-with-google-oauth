import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const app = express();

// JWTを解析するエンドポイントを追加
app.get('/api/parse-token', (req: Request, res: Response) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearerトークンを取得
  if (!token) {
    res.status(401).send('トークンが必要です');
    return;
  }

  jwt.verify(token, process.env.NEXTAUTH_SECRET as string, (err, decoded) => {
    if (err) {
      res.status(403).send('無効なトークンです');
      return;
    }
    res.json(decoded);
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
