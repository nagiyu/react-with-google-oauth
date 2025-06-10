const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

// JWTを解析するエンドポイントを追加
app.get('/api/parse-token', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearerトークンを取得
  if (!token) {
    return res.status(401).send('トークンが必要です');
  }

  jwt.verify(token, process.env.NEXTAUTH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send('無効なトークンです');
    }
    res.json(decoded);
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen('3000', () => {
  console.log('Server is running on http://localhost:3000');
});
