import { useParams } from 'react-router-dom';
import { PasswordResetForm } from "../forms/PasswordResetForm";
import { TokenResetForm } from "../forms/TokenResetForm";

export const Password = () => {
  const { id, email } = useParams();
  return (
    <div className='flex justify-center'>
      { id && email ? <PasswordResetForm id={id} email={email} /> : <TokenResetForm /> }
    </div>
  );
}
