import LoginForm from "../forms/LoginForm";

export default function LoginModal () {
  return (
    <div className="flex flex-col items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50">
      <div className="mt-20 w-min" onClick={(e) => e.stopPropagation()}>
        <LoginForm />
      </div>
    </div>
  );
}
