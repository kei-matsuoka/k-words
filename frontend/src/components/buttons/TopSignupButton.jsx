export default function TopSignupButton(props) {
  return (
    <button className="button-color
                       button-color:hover
                       text-white
                       font-bold
                       py-3
                       px-12
                       rounded-md
                       duration-300
                       ">{props.text}
    </button>
  )
}
