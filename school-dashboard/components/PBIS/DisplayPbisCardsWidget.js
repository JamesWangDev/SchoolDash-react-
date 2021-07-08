export default function DisplayPbisCardsWidget({ cards }) {
  return (
    <div>
      {cards.map((card) => {
        console.log(card);
        const date = new Date(card.dateGiven).toLocaleDateString();
        return (
          <p key={card.id}>
            {card.category} - {card.teacher.name} - {card.cardMessage} - {date}
          </p>
        );
      })}
    </div>
  );
}
