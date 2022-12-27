export const LearningButton = ({text}) => {
  return (
    <button className="bg-gray-800
                       hover:bg-gray-600
                       text-white
                       text-sm
                       py-2.5
                       px-3.5
                       rounded 
                       duration-300
                       min-w-[110px]
                       sp:min-w-[90px]
                       ">{text}
    </button>
  )
}
