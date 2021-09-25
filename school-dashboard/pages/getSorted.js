import gql from 'graphql-tag';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { useQueryClient } from 'react-query';
import Loading from '../components/Loading';
import SortingHatQuestions from '../components/SortingHatQuestions';
import { useGQLQuery } from '../lib/useGqlQuery';
import { useUser } from '../components/User';
import SortedHouse from '../components/SortedHouse';

function arrayOfNumbersOneToFourInRandomOrder() {
  return [1, 2, 3, 4].sort(() => Math.random() - 0.5);
}

const SORTING_HAT_QUESTION_QUERY = gql`
  query SORTING_HAT_QUESTION_QUERY {
    allSortingHatQuestions {
      id
      question
      gryffindorChoice
      slytherinChoice
      ravenclawChoice
      hufflepuffChoice
      createdBy {
        id
        name
      }
    }
  }
`;

const UPDATE_HOUSE = gql`
  mutation UPDATE_HOUSE($id: ID!, $house: String) {
    updateUser(id: $id, data: { sortingHat: $house }) {
      id
    }
  }
`;

export const SortingHatStyles = styled.div`
  @import url('http://fonts.cdnfonts.com/css/parry-hotter');

  font-family: 'HarryPotter7';

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
  font-size: 2rem;
  transition: all 0.3s ease-in-out;

  h1 {
    flex-basis: 100%;
    font-size: 4rem;
  }
  h2 {
    font-size: 3.5rem;
    text-align: center;
  }

  button {
    margin-top: 20px;
    color: white;
    -webkit-text-stroke: 1px white;
    background: linear-gradient(
      80deg,
      rgba(14, 26, 64, 1) 5%,
      rgba(96, 96, 92, 1) 12%,
      rgba(42, 98, 61, 1) 29%,
      rgba(26, 71, 42, 1) 32%,
      rgba(170, 170, 170, 1) 39%,
      rgba(238, 186, 48, 1) 57%,
      rgba(116, 0, 1, 1) 68%,
      rgba(255, 244, 177, 1) 90%,
      rgba(255, 219, 0, 1) 94%,
      rgba(93, 93, 93, 1) 100%
    );
    border: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 3rem;
    cursor: pointer;
    font-family: 'HarryPotter7';
  }

  .questionContainer {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }
  button :nth-child(1) {
    order: ${(props) => props.gryffindorOrder};
  }
  button :nth-child(2) {
    order: ${(props) => props.slytherinOrder};
  }
  button :nth-child(3) {
    order: ${(props) => props.ravenclawOrder};
  }
  button :nth-child(4) {
    order: ${(props) => props.hufflepuffOrder};
  }
  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Firefox < 16 */
  @-moz-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Safari, Chrome and Opera > 12.1 */
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Internet Explorer */
  @-ms-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Opera < 12.1 */
  @-o-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
export default function GetSorted() {
  const me = useUser();
  const queryClient = useQueryClient();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [housePoints, setHousePoints] = useState({
    gryffindor: 0,
    hufflepuff: 0,
    ravenclaw: 0,
    slytherin: 0,
  });

  const [randomOrder, setRandomOrder] = useState(
    arrayOfNumbersOneToFourInRandomOrder()
  );

  const [updateHouse] = useMutation(UPDATE_HOUSE);

  const { data, isLoading, refetch } = useGQLQuery(
    'SortingHatQuestions',
    SORTING_HAT_QUESTION_QUERY,
    {}
  );
  // console.log(data);

  if (isLoading) return <Loading />;
  const maxQuestionNumber = data.allSortingHatQuestions.length - 1;

  const currentQuestion = data?.allSortingHatQuestions[questionNumber];
  console.log(housePoints);
  console.log(questionNumber);
  const winningHouse = Object.keys(housePoints).reduce((a, b) =>
    housePoints[a] > housePoints[b] ? a : b
  );
  console.log('house', winningHouse);

  function onAnswer(answer) {
    if (answer === currentQuestion.gryffindorChoice) {
      setHousePoints((prev) => ({
        ...prev,
        gryffindor: prev.gryffindor + 1,
      }));
    }
    if (answer === currentQuestion.hufflepuffChoice) {
      setHousePoints((prev) => ({
        ...prev,
        hufflepuff: prev.hufflepuff + 1,
      }));
    }
    if (answer === currentQuestion.ravenclawChoice) {
      setHousePoints((prev) => ({
        ...prev,
        ravenclaw: prev.ravenclaw + 1,
      }));
    }
    if (answer === currentQuestion.slytherinChoice) {
      setHousePoints((prev) => ({
        ...prev,
        slytherin: prev.slytherin + 1,
      }));
    }
    setRandomOrder(arrayOfNumbersOneToFourInRandomOrder());
    setQuestionNumber(questionNumber + 1);
  }

  if (me?.sortingHat)
    return (
      <SortedHouse house={me.sortingHat} updateHouse={updateHouse} me={me} />
    );

  return (
    <>
      <link
        href="http://fonts.cdnfonts.com/css/harrypotter7"
        rel="stylesheet"
      />

      <SortingHatStyles
        gryffindorOrder={randomOrder[0]}
        hufflepuffOrder={randomOrder[1]}
        ravenclawOrder={randomOrder[2]}
        slytherinOrder={randomOrder[3]}
      >
        <h1>Get Sorted into your house</h1>
        {questionNumber <= maxQuestionNumber ? (
          <SortingHatQuestions
            currentQuestion={currentQuestion}
            onAnswer={onAnswer}
          />
        ) : (
          <>
            <h2>You are {winningHouse}</h2>
            <button
              type="button"
              onClick={async () => {
                await updateHouse({
                  variables: {
                    id: me.id,
                    house: winningHouse,
                  },
                });
                await queryClient.refetchQueries('me');
                setQuestionNumber(0);
              }}
            >
              Accept your choice
            </button>
            <button
              type="button"
              onClick={() => {
                setHousePoints({
                  gryffindor: 0,
                  hufflepuff: 0,
                  ravenclaw: 0,
                  slytherin: 0,
                });
                setQuestionNumber(0);
              }}
            >
              {' '}
              Start Over
            </button>
          </>
        )}
      </SortingHatStyles>
    </>
  );
}
