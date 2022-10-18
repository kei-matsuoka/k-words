export const Modal = ({children, onClick}) => {
  return (
    <div className="flex flex-col items-center justify-center fixed top-0 z-50 left-0 w-full h-full bg-black bg-opacity-50" onClick={onClick}>
      <div className="w-[480px] sp:w-11/12" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
