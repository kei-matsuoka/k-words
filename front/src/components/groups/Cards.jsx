import { Card } from "../parts/Card";

export const Cards = ({ cards }) => {
  return (
    <div className="flex flex-col">
      {cards.map((card) => <Card card={card} key={card.id} />)}
    </div>
  );
}
