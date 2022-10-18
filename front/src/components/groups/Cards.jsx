import { Card } from "./Card";

export const Cards = ({ cards }) => {
  return (
    <div className="flex flex-col px-4 py-1">
      {cards.map((card) => <Card card={card} key={card.id} />)}
    </div>
  );
}
