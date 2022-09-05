export default function SignupModal({child,onClick}) {
  return (
    <div className="flex flex-col items-center fixed top-0 z-50 left-0 w-full h-full bg-black bg-opacity-50" onClick={onClick}>
      <div className="mt-20 w-min" onClick={(e) => e.stopPropagation()}>
        {child}
      </div>
    </div>
  );
}
