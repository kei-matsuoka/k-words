export default function HeaderLoginButton(props) {
  return (
    <button className="text-xs
                       py-3
                       px-5
                       rounded
                       duration-300
                       hover:bg-gray-100
                       ">{props.text}
    </button>
  )
}
