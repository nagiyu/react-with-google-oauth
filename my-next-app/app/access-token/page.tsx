import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/config/authOptions";
import { IAccessToken } from "@/app/interface/IAccessToken";
import jwt from "jsonwebtoken";

const AccessTokenPage = async () => {
    const session = await getServerSession(authOptions);
    let accessToken: IAccessToken[] = []; // アクセストークンを格納する変数
    let token = "";

    if (session) {
        accessToken = session.tokens;
        const secret = process.env.NEXTAUTH_SECRET; // 環境変数からシークレットを取得

        if (secret) {
            // JWT トークンを生成
            token = jwt.sign({ tokens: accessToken }, secret, { expiresIn: '1h' });
        } else {
            console.error("NEXTAUTH_SECRET is not defined");
        }
    }

    return (
        <div>
            <h1>Access Token</h1>
            {token ? (
                <p>{token}</p>
            ) : (
                <p>ログインしてください。</p>
            )}
        </div>
    );
};

export default AccessTokenPage;
