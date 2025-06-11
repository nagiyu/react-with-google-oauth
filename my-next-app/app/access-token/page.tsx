import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/config/authOptions";
import jwt from "jsonwebtoken";

const AccessTokenPage = async () => {
    const session = await getServerSession(authOptions);
    let token = "";

    if (session) {
        // const accessToken = session.token; // useSession からアクセストークンを取得
        const secret = process.env.NEXTAUTH_SECRET; // 環境変数からシークレットを取得

        if (secret) {
            // JWT トークンを生成
            token = jwt.sign(session, secret, { expiresIn: '1h' });
        } else {
            console.error("NEXTAUTH_SECRET is not defined");
        }
    }

    return (
        <div>
            <h1>Access Token</h1>
            <div>{JSON.stringify(session)}</div>
            {token ? (
                <p>{token}</p>
            ) : (
                <p>ログインしてください。</p>
            )}
        </div>
    );
};

export default AccessTokenPage;
