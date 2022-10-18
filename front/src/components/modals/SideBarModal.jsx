export const SideBarModal = ({children, handleClickSideBar}) => {
  return (
    <div className="fixed top-0 z-20 left-0 w-full h-full bg-black bg-opacity-50" onClick={handleClickSideBar}>
      <div onClick={(e) => e.stopPropagation()}>
      {children}
      </div>
    </div>
  );
}
