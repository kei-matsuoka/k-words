import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PasswordResetForm } from "../forms/PasswordResetForm";

export const Password = ({setTitle}) => {
  const { id, email } = useParams();

  useEffect(() => {
    setTitle("パスワード変更");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className='flex justify-center bg-white rounded-sm shadow w-full px-8 py-10'>
      <PasswordResetForm id={id} email={email} />
    </div>
  );
}
