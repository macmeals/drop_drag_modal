import { createContext } from "react";
import { useState } from "react";
import type { ReactNode } from "react";

//contextの器を作成.合わせてCreateContextの型も作成する。
//アサーションで型も付与する。
export const TokenContext = createContext(
  {} as {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    accessToken: string | boolean;
    setAccessToken: React.Dispatch<React.SetStateAction<string | boolean>>;
    errMassage: string;
    setErrMassage: React.Dispatch<React.SetStateAction<string>>;
  }
);

export const TokenProvider = (props: { children: ReactNode }) => {
  //入力したE-mail
  const [email, setEmail] = useState<string>("");
  //入力したパスワード
  const [password, setPassword] = useState<string>("");
  //JWT認証のアクセストークン（文字列でState)
  const [accessToken, setAccessToken] = useState<string | boolean>(""); //JWT認証のアクセストークンを保存
  //エラーメッセージをStateを保管（文字列でState)
  const [errMassage, setErrMassage] = useState<string>("");

  const { children } = props;

  return (
    <TokenContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        accessToken,
        setAccessToken,
        errMassage,
        setErrMassage,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};
