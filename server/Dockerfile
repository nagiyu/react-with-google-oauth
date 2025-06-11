# ベースイメージとしてNode.jsを使用
FROM node:18

# 作業ディレクトリを作成
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# TypeScriptをインストール
RUN npm install -g typescript

# アプリケーションのソースコードをコピー（node_modulesを除外）
COPY . .

# TypeScriptをコンパイル
RUN tsc

# アプリケーションがリッスンするポートを指定
EXPOSE 3000

# アプリケーションを起動
CMD ["node", "index.js"]
