export const SignupButton = ({text}) => {
  return (
    <button className="bg-gray-600
                       hover:bg-gray-900
                       text-white
                       text-sm
                       py-2.5
                       px-3.5
                       rounded-sm
                       duration-300
                       min-w-[110px]
                       sp:min-w-[90px]
                       ">{text}
    </button>
  )
}
