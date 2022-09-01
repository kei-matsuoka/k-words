export default function HeaderSignupButton(props) {
  return (
    <button className="button-color
                       button-color:hover
                       text-white
                       font-bold
                       text-xs
                       py-3
                       px-5
                       rounded
                       duration-300
                       ">{props.text}
    </button>
  )
}
