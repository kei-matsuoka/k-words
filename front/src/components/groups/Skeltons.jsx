import { Skelton } from "../parts/Skelton";

export const Skeltons = () => {
  const skelton_list = [];
  
  for (let i = 0; i < 5; i++) {
    skelton_list.push(<Skelton key={i}/>);
  }

  return (
    <div className='flex flex-col'>
      {skelton_list}
    </div>
  );
}
