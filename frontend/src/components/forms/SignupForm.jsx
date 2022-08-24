import { useState } from 'react';
import { Signup } from '../../apis/signup';

export default function SignupForm() {
  const initialState = { name: '', email: '', password: '', password_confirmation: '' };
  const [state, setState] = useState(initialState);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    Signup(state.name, state.email, state.password, state.password_confirmation);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="name" placeholder="ユーザー名" value={state.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="メールアドレス" onChange={handleChange} />
          <input type="password" name="password" placeholder="パスワード" onChange={handleChange} />
          <input type="password" name="password_confirmation" placeholder="パスワード確認" onChange={handleChange} />
        </div>
        <div>
          <input type="submit" value="新規登録" />
        </div>
      </form>
    </div>
  );
}
