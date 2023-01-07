import { useForm } from "react-hook-form";
import { MdClear } from 'react-icons/md';

export const WarningForm = ({ handleDestroy, handleWarning, type }) => {
  const { handleSubmit } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const onSubmit = async () => {
    handleDestroy();
    handleWarning();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form relative">
        <h2 className='text-lg font-bold mb-4'>
          この{type}を本当に削除しますか？
        </h2>
        <MdClear className='button-clear' onClick={handleWarning} />
        <input className="button-danger"
          type="submit" value="削除" />
      </form>
    </>
  );
}
