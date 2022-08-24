import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
//グローバルStateをインポート
import { useContext, useEffect } from "react";
import { TokenContext } from "../provider/dropDragProvider";

// import { useNavigate } from "react-router-dom";

export const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    accessToken,
    setAccessToken,
    errMassage,
    setErrMassage,
  } = useContext(TokenContext);

  //ログイン情報を格納
  const authData = {
    email: email,
    password: password,
  };

  //Buttonのクリックイベントで画面変異
  // const navigate = useNavigate();

  const getJWT = async () => {
    //JWT情報を取得する。
    try {
      const JWT = await axios.post(
        "https://raisetech-memo-api.herokuapp.com/api/login",
        authData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(JWT);

      //LocalStorageに保存する為、JWT情報をJSON文字列に変換する
      const token = JWT.data.access_token;
      //作成した際の時刻の時間を取得(ミリ秒から時間)
      const nowTime = new Date().getTime() / 1000 / 60 / 60;
      //JWTtokenのオブジェクトを作成（トークンと作成日時のオブジェクト）
      const jwtToken = { token: token, nowTime: nowTime };

      // LocalStorageに保存
      localStorage.setItem("token", JSON.stringify(jwtToken));
      // stateにアクセストークンを保存
      setAccessToken(token);
      // console.log(accessToken);

      //AuthenticatedPageへリダイレクトさせる
      // navigate("/AuthenticatedPage");

      //型をunknown型からany型に変更
    } catch (err: any) {
      console.log(err);
      setErrMassage(err.message);
    }
  };

  type Token = {
    token: string;
    nowTime: number;
  };

  // レンダリング後、リクエスト前にJWTの認証情報をLocalStorageより取得する。
  useEffect(() => {
    // ローカルストレージよりJWTの認証情報（AccessToken)をLocalStorageより取得する。
    // tokenStringを一旦Any型に変換し、そのあと型Tokenを割り当てる
    const tokenString: any = localStorage.getItem("token");

    // 取り出したトークンがあれば以下の処理になる。
    if (tokenString) {
      // ローカルストレージに保存したトークン作成時間を取り出す。
      const accessToken: Token = JSON.parse(tokenString);
      const tokenTime = accessToken.nowTime;
      // レンダリングされたタイミングの時間を取得する。時間にも菅さん
      const difTime = new Date().getTime() / 1000 / 60 / 60;

      // 24時間以上離れている場合、ローカルストレージからアクセストークンを削除する。
      if (difTime - tokenTime > 24) {
        localStorage.removeItem("token");
      }
    }

    // axios.interceptorsでリクエスト前に以下の処理を行う
    axios.interceptors.request.use((config) => {
      // config.headersの認証情報が無い場合以下の処理を行う。
      if (config.headers && !config.headers.Authorization) {
        config.headers.authorization = `Bearer ${accessToken}`;
        console.log(config);
        return config;
      }
    });
  }, []);

  //入力したEmailをStateに保管
  const valueEmailFetch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  //入力したPasswordをStateに保管
  const valuePassFetch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <div>
      <h1>認証ページ</h1>
      <form>
        <label>メールアドレス</label>
        <input
          type="text"
          value={email}
          // カスタムHookから取得した関数valueFetchを利用
          onChange={valueEmailFetch}
          name="uname"
          required
        />
        <label>パスワード</label>
        <input type="password" value={password} onChange={valuePassFetch} />
      </form>
      <button
        onClick={() => {
          getJWT();
        }}
      >
        JWT取得
      </button>
      {
        errMassage && <p>{errMassage}</p> // エラーがあった場合、エラー文言{errMassage}を表示する
      }
    </div>
  );
};
