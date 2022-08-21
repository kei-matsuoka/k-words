function SignupForm() {
  return (
    <div>
      <form>
        <input id="name" type="text" name="name" placeholder="ユーザー名" />
        <input id="email" type="email" name="email" placeholder="メールアドレス" />
        <input id="password" type="password" name="password" placeholder="パスワード" />
        <input type="submit" value="新規登録" />
      </form>
    </div>
  );
}

export default SignupForm
