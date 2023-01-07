import { useState, useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useForm } from "react-hook-form";
import { destroyUser } from '../../apis/users';
import { Modal } from '../modals/Modal';
import { WarningForm } from '../forms/WarningForm';
import { flash_blue, flash_red } from '../../constants';

export const AccountDestroyOutlet = () => {
  const { setLoading, setCurrentUser, currentUser, setIsSignedIn, setLogoutMessage } = useContext(AuthContext);
  const [warningModalIsOpen, setWarningModalIsOpen] = useState(false);
  const { handleSubmit } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const handleDestroyUser = async () => {
    try {
      const res = await destroyUser(currentUser.id);
      if (res?.status === 200) {
        setCurrentUser(null);
        setIsSignedIn(false);
        setLogoutMessage({ color: flash_blue, message: res.message });
      } else {
        setLogoutMessage({ color: flash_red, message: res.message });
      }
    } catch (e) {
      console.error(e);
      setLogoutMessage({ color: flash_red, message: e.message });
    }
    setLoading(false);
  };

  const onSubmit = () => {
    setWarningModalIsOpen(warningModalIsOpen ? false : true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[480px] sb:w-full">
        <h2 className='text-lg font-bold mb-4'>アカウント削除</h2>
        <input className="button-danger"
          type="submit" value="削除" />
      </form>
      <Modal onClick={onSubmit} isOpen={warningModalIsOpen}>
        <WarningForm
          handleDestroy={handleDestroyUser}
          handleWarning={onSubmit}
          type="アカウント"
        />
      </Modal>
    </>
  );
}
