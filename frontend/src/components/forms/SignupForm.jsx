import { useForm } from "react-hook-form";
import { Signup } from '../../apis/signup';
import styles from './SignupForm.module.css';

export default function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    criteriaMode: 'all',
  });
  const onSubmit = data => {
    data.preventDefault();
    Signup(data.name, data.email, data.password, data.password_confirmation);
  }
  var regex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>アカウントを作成</h2>
        <p>アカウントを作成することにより、利用規約およびプライバシポリシーに同意するものとします。</p>
        <div>
          <input
            className={styles.test}
            type="text"
            placeholder="ユーザー名"
            {...register("name", {
              required: {
                value: true,
                message: '入力してください'
              },
              maxLength: {
                value: 20,
                message: '20文字以内で入力してください'
              },
            })}
          />

          {errors.name?.types.required && (
            <div>{errors.name.message}</div>
          )}
          {errors.name?.types.maxLength && (
            <div>{errors.name.message}</div>
          )}

          <input
            className={styles.test}
            type="email"
            placeholder="メールアドレス"
            {...register("email", {
              required: {
                value: true,
                message: '入力してください'
              },
              pattern: {
                value: { regex },
                message: '有効なメールアドレスを入力してください'
              }
            })}
          />

          {errors.email?.types.required && (
            <div>{errors.email.message}</div>
          )}
          {errors.email?.types.pattern && (
            <div>{errors.email.message}</div>
          )}

          <input
            className={styles.test}
            type="password"
            placeholder="パスワード"
            {...register("password", {
              required: {
                value: true,
                message: '入力してください'
              },
              minLength: {
                value: 6,
                message: '6文字以上で入力してください'
              }
            })}
          />

          {errors.password?.types.required && (
            <div>{errors.password.message}</div>
          )}
          {errors.password?.types.minLength && (
            <div>{errors.password.message}</div>
          )}

          <input
            className={styles.test}
            type="password"
            placeholder="パスワード確認"
            {...register("password_confirmation", {
              required: {
                value: true,
                message: '入力してください'
              },
              minLength: {
                value: 6,
                message: '6文字以上で入力してください'
              }
            })}
          />

          {errors.password_confirmation?.types.required && (
            <div>{errors.password_confirmation.message}</div>
          )}
          {errors.password_confirmation?.types.minLength && (
            <div>{errors.password_confirmation.message}</div>
          )}

        </div>
        <div>
          <input className={styles.test} type="submit" value="新規登録" />
        </div>
      </form>
    </div>
  );
}
