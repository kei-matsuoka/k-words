export const DropDownButton = ({user, handleClickDropDown}) => {
  return (
    <button 
      onClick={handleClickDropDown}
      className='hover:bg-gray-100 text-gray-800 text-sm px-6 py-2.5'>
      {user.name}
    </button>
  )
}
