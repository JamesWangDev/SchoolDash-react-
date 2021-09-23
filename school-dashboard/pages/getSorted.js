import gql from 'graphql-tag';
import { useState } from 'react';
import styled from 'styled-components';
import Loading from '../components/Loading';
import SortingHatQuestions from '../components/SortingHatQuestions';
import { useGQLQuery } from '../lib/useGqlQuery';

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

const SortingHatStyles = styled.div`
  @import url('http://fonts.cdnfonts.com/css/parry-hotter');

  font-family: 'HarryPotter7';

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
  font-size: 2rem;

  h1 {
    flex-basis: 100%;
    font-size: 4rem;
  }
  h2 {
    font-size: 3.5rem;
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
  }
`;
export default function GetSorted() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [housePoints, setHousePoints] = useState({
    gryffindor: 0,
    hufflepuff: 0,
    ravenclaw: 0,
    slytherin: 0,
  });

  const { data, isLoading, refetch } = useGQLQuery(
    'SortingHatQuestions',
    SORTING_HAT_QUESTION_QUERY,
    {}
  );
  console.log(data);

  if (isLoading) return <Loading />;
  const maxQuestionNumber = data.allSortingHatQuestions.length - 1;
  const currentQuestion = data?.allSortingHatQuestions[questionNumber];
  console.log(housePoints);
  console.log(questionNumber);
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
    setQuestionNumber(questionNumber + 1);
  }

  return (
    <>
      <link
        href="http://fonts.cdnfonts.com/css/harrypotter7"
        rel="stylesheet"
      />

      <SortingHatStyles>
        <h1>Get Sorted into your house</h1>
        {questionNumber <= maxQuestionNumber && (
          <SortingHatQuestions
            currentQuestion={currentQuestion}
            onAnswer={onAnswer}
          />
        )}
      </SortingHatStyles>
    </>
  );
}
