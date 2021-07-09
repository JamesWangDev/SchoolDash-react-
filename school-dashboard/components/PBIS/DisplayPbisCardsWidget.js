import styled from 'styled-components';

const PbisCardWidgetStyles = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  width: auto;
  div,
  singleCard {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    color: white;
    background: linear-gradient(to top right, var(--red), var(--blue));
    border-radius: 2rem;
    padding: 10px;
    margin: 10px;
    flex-basis: 400px;
    p {
      margin: 5px;
      margin-right: auto;
      margin-left: auto;
      text-align: center;
      font-size: 1.3rem;
    }
  }
`;

export default function DisplayPbisCardsWidget({ cards }) {
  return (
    <>
      <h3 style={{ textAlign: 'center' }}>Recent PBIS Cards</h3>
      <PbisCardWidgetStyles>
        {cards.map((card) => {
          console.log(card);
          const date = new Date(card.dateGiven).toLocaleDateString();
          return (
            <div className="singleCard" key={card.id}>
              <p>
                {card.teacher.name} - {card.category.toUpperCase()}
              </p>
              <p>
                {card.cardMessage} - {date}
              </p>
            </div>
          );
        })}
      </PbisCardWidgetStyles>
    </>
  );
}
