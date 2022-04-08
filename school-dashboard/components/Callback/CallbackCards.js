import styled from 'styled-components';
import SingleCallbackCard from './SingleCallbackCard';

const CallBackCardsStyles = styled.div`
  display: grid;
  --numberOfCallbackColumns: ${(props) => props.maxColumns || 4};
  grid-template-columns: repeat(var(--numberOfCallbackColumns), 1fr);
  /* grid-template-columns: auto auto; */
  flex-wrap: wrap;
  justify-content: space-around;
  transition: all ease-in 1s;
  @media (max-width: 1300px) {
    --numberOfCallbackColumns: ${(props) => props.maxColumns - 1 || 4};
  }
  @media (max-width: 1100px) {
    --numberOfCallbackColumns: ${(props) => props.maxColumns - 2 || 4};
  }
  @media (max-width: 850px) {
    --numberOfCallbackColumns: 1;
  }
`;

export default function CallbackCards({ callbacks, maxColumns }) {
  return (
    <>
      <h1>You have {callbacks?.length > 0 ? callbacks.length : "no" } Items on callback</h1>
      <CallBackCardsStyles maxColumns={maxColumns}>
        {callbacks?.map((callback) => (
          <SingleCallbackCard
            callback={callback}
            key={`Callback${callback.id}`}
          />
        ))}
      </CallBackCardsStyles>
    </>
  );
}
