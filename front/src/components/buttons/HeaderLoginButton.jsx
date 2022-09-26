export default function HeaderLoginButton(props) {
  return (
    <button className="text-sm
                       text-gray-600
                       font-medium
                       py-3
                       px-4
                       rounded-md
                       duration-300
                       hover:bg-gray-100
                       ">{props.text}
    </button>
  )
}
