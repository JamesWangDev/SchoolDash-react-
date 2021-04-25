import styled from 'styled-components';
import SingleCallbackCard from './SingleCallbackCard';

const CallBackCardsStyles = styled.div`
  display: grid;
  --numberOfCallbackColumns: 4;
  grid-template-columns: repeat(var(--numberOfCallbackColumns), 1fr);
  /* grid-template-columns: auto auto; */
  flex-wrap: wrap;
  justify-content: space-around;
  transition: all ease-in 1s;
  @media (max-width: 1300px) {
    --numberOfCallbackColumns: 3;
  }
  @media (max-width: 1100px) {
    --numberOfCallbackColumns: 2;
  }
  @media (max-width: 850px) {
    --numberOfCallbackColumns: 1;
  }
`;

export default function CallbackCards({ callbacks }) {
  return (
    <>
      <h1>You have {callbacks.length} Items on callback</h1>
      <CallBackCardsStyles>
        {callbacks.map((callback) => (
          <SingleCallbackCard
            callback={callback}
            key={`Callback${callback.id}`}
          />
        ))}
      </CallBackCardsStyles>
    </>
  );
}
