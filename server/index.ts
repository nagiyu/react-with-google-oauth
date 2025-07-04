import express, { Request, Response } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';

interface IAccessToken {
  provider: string; // プロバイダー名
  accessToken: string; // アクセストークン
}

const app = express();

// JWTを解析するエンドポイントを追加
app.get('/api/parse-token', (req: Request, res: Response) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearerトークンを取得
  if (!token) {
    res.status(401).send('トークンが必要です');
    return;
  }

  jwt.verify(token, process.env.NEXTAUTH_SECRET as string, async (err, decoded) => {
    if (err) {
      res.status(403).send('無効なトークンです');
      return;
    }

    if (typeof decoded === 'object' && decoded !== null && 'tokens' in decoded) {
      const tokens: IAccessToken[] = decoded.tokens;

      // Google の場合
      const googleToken = tokens.find((token) => token.provider === 'google');
      if (googleToken) {
        var googleResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${googleToken.accessToken}`,
          }
        });

        if (googleResponse.status === 200 && 'email' in googleResponse.data) {
          res.json({ email: googleResponse.data.email });
          return;
        }
      }

      // LINE の場合
      const lineToken = tokens.find((token) => token.provider === 'line');
      if (lineToken) {
        var lineResponse = await axios.get('https://api.line.me/v2/profile', {
          headers: {
            Authorization: `Bearer ${lineToken.accessToken}`,
          }
        });

        if (lineResponse.status === 200 && 'userId' in lineResponse.data) {
          res.json({ UserId: lineResponse.data.userId });
          return;
        }
      }

      // どのプロバイダーのトークンも見つからなかった場合
      res.status(401).send('無効なトークンです');
    } else {
      res.status(400).send('トークンにtokensが含まれていません');
    }
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
