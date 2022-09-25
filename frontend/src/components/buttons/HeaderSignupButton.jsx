export default function HeaderSignupButton(props) {
  return (
    <button className="bg-gray-600
                       hover:bg-gray-900
                       text-white
                       font-bold
                       text-xs
                       py-3
                       px-5
                       rounded-md
                       duration-300
                       ">{props.text}
    </button>
  )
}
