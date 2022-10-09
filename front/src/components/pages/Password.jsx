import { useParams } from 'react-router-dom';
import { Header } from "../groups/Header";
import { PasswordResetForm } from "../forms/PasswordResetForm";
import { TokenResetForm } from "../forms/TokenResetForm";

export const Password = () => {
  const { id, email } = useParams();
  return (
    <>
      <Header/>
      { email ? <PasswordResetForm id={id} email={email} /> : <TokenResetForm /> }
    </>
  );
}
