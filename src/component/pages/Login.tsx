export const Login = () => {
  return (
    <div>
      <h1>認証ページ</h1>
      <form>
        <label>メールアドレス</label>
        <input type="text" name="uname" required />
        <label>パスワード</label>
        <input type="password" />
      </form>
      <button>JWT取得</button>
    </div>
  );
};
