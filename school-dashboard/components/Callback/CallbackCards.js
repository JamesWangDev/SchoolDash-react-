import styled from 'styled-components';
import SingleCallbackCard from './SingleCallbackCard';

const CallBackCardsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  transition: all ease-in 1s;
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
