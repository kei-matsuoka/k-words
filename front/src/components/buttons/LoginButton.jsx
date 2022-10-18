export const LoginButton = ({text}) => {
  return (
    <button className="text-sm
                       text-gray-800
                       py-2.5
                       px-3.5
                       rounded-sm
                       duration-300
                       hover:bg-gray-100
                       min-w-[110px]
                       sp:min-w-[90px]
                       ">{text}
    </button>
  )
}
