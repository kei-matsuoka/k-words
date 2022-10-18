import { useParams } from 'react-router-dom';
import { PasswordResetForm } from "../forms/PasswordResetForm";
import { TokenResetForm } from "../forms/TokenResetForm";

export const Password = () => {
  const { id, email } = useParams();
  return (
    <>
      { email ? <PasswordResetForm id={id} email={email} /> : <TokenResetForm /> }
    </>
  );
}
