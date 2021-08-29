import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useQueryClient } from 'react-query';
import { UPDATE_PBIS } from '../../lib/pbisUtils';
import GradientButton from '../styles/Button';
import { useUser } from '../User';
import useRecalculatePBIS from './useRecalculatePbis';

const CREATE_CLASS_PBIS_CARD = gql`
  mutation CREATE_CLASS_PBIS_CARD(
    $teacher: ID!
    $student: ID!
    $category: String
    $message: String
  ) {
    createPbisCard(
      data: {
        teacher: { connect: { id: $teacher } }
        student: { connect: { id: $student } }
        category: $category
        cardMessage: $message
      }
    ) {
      id
    }
  }
`;

function createCardsFromListOfStudents({ studentIds, teacher }) {
  const cardsToCreate = studentIds.map((studentId) => ({
    student: studentId,
    teacher: teacher.id,
    category: 'class',
    message: `${teacher.name} gave a card to the entire class`,
  }));
  return cardsToCreate;
}

export default function GiveListOfStudentsACardButton({ students, title }) {
  const me = useUser();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);
  const listOfStudentIds = students.map((student) => student.id);
  const { recalculatePbisFromId } = useRecalculatePBIS();
  const [updateCardCount, { loading: cardLoading }] = useMutation(
    UPDATE_PBIS,
    {}
  );

  const [createCard, { loading, error, data }] = useMutation(
    CREATE_CLASS_PBIS_CARD,
    {}
  );
  //   console.log(listOfStudentIds);
  if (students.length === 0) {
    return <GradientButton disabled>{title}</GradientButton>;
  }
  return (
    <>
      <GradientButton
        disabled={isLoading}
        onClick={async () => {
          setIsLoading(true);
          const cardsToCreate = await createCardsFromListOfStudents({
            studentIds: listOfStudentIds,
            teacher: me,
          });
          await Promise.all(
            cardsToCreate.map(async (card) => {
              //   console.log('card', card);
              const res = await createCard({ variables: card });
              const update = await updateCardCount({
                variables: { userId: card.student },
              });
            })
          );
          await queryClient.refetchQueries(`SingleTeacher-${me.id}`);
          setIsLoading(false);
        }}
      >
        {title}
      </GradientButton>
    </>
  );
}
