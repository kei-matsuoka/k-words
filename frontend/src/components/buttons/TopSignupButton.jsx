export default function TopSignupButton(props) {
  return (
    <button className="button-color
                       button-color:hover
                       text-white
                       text-sm
                       font-semibold
                       py-3.5
                       px-12
                       rounded-md
                       duration-300
                       ">{props.text}
    </button>
  )
}
