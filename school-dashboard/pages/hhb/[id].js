import gql from 'graphql-tag';
import React from 'react';
import Loading from '../../components/Loading';
import { useGQLQuery } from '../../lib/useGqlQuery';

const SINGLE_BULLYING_DATA_QUERY = gql`
  query SINGLE_BULLYING_DATA_QUERY {
    Bullying(where: { id: "612a25ae2e442acf37eab4f1" }) {
      id
      studentOffender {
        id
        name
      }
      teacherAuthor {
        id
        name
      }
      dateReported
      dateOfEvent
      studentReporter
      employeeWitness
      studentWitness
      initialActions
      nextSteps
      reporter
      description
    }
  }
`;

export default function ViewSingleHHB(query) {
  const { data, isLoading, isError, refetch } = useGQLQuery(
    `singleBullying${query.id}`,
    SINGLE_BULLYING_DATA_QUERY
  );
  if (isLoading) return <Loading />;
  const bullying = data.Bullying;
  const dateReported = new Date(bullying.dateReported).toLocaleDateString();
  const dateOfEvent = new Date(bullying.dateOfEvent).toLocaleDateString();
  const nameWithFirstLetterOfBothNamesCapitalized = (name) => {
    const nameArray = name.split(' ');
    const firstName = nameArray[0];
    const lastName = nameArray[1];
    const firstLetterOfFirstName = firstName[0].toUpperCase();
    const firstLetterOfLastName = lastName[0].toUpperCase();
    const restOfFirstName = firstName.slice(1);
    const restOfLastName = lastName.slice(1);
    return `${firstLetterOfFirstName}${restOfFirstName} ${firstLetterOfLastName}${restOfLastName}`;
  };

  return (
    <div>
      <h1>
        {nameWithFirstLetterOfBothNamesCapitalized(
          bullying.studentOffender.name
        )}
      </h1>
      <h3>Reported By: {bullying.teacherAuthor.name}</h3>
      <p>Reported on:{dateReported}</p>
      <p>Date of Events: {dateOfEvent}</p>
      <p>Student Reporter: {bullying.studentReporter}</p>
      <p>Employee Witness: {bullying.employeeWitness}</p>
      <p>Student Witness: {bullying.studentWitness}</p>
      <p>Initial Actions: {bullying.initialActions}</p>
      <p>Next Steps: {bullying.nextSteps}</p>
      <p>Reporter: {bullying.reporter}</p>
      <p>Description: {bullying.description}</p>
    </div>
  );
}
