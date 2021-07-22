import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import { useGQLQuery } from '../../lib/useGqlQuery';
import Loading from '../../components/Loading';
import {
  classTypeList,
  locationList,
  othersInvolvedList,
  studentConductList,
  teacherActionList,
  timeOfDayList,
} from '../../lib/disciplineData';

const DisplaySingleDiscipline = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  div {
    margin: 10px;
  }
  flex-wrap: wrap;
`;

export const SINGLE_DISCIPLINE_DATA = gql`
  query SINGLE_DISCIPLINE_DATA($id: ID!) {
    Discipline(where: { id: $id }) {
      id
      date
      teacher {
        id
        name
      }
      student {
        name
        id
      }
      teacherComments
      classType
      location
      timeOfDay
      inappropriateLanguage
      physicalConduct
      nonCompliance
      disruption
      propertyMisuse
      otherConduct
      VerbalWarning
      buddyRoom
      conferenceWithStudent
      ParentContact
      PlanningRoomReferral
      FollowupPlan
      LossOfPrivilege
      DetentionWithTeacher
      IndividualizedInstruction
      GuidanceReferral
      ReferToAdministrator
      OtherAction
      none
      peers
      teacherInvolved
      substitute
      unknown
      othersInvolved
    }
  }
`;

export default function SingleDisciplineReferralPage({ query }) {
  const { data, isLoading, isError, refetch } = useGQLQuery(
    `singleDiscipline-${query.id}`,
    SINGLE_DISCIPLINE_DATA,
    {
      id: query.id,
    }
  );
  if (isLoading) return <Loading />;
  const { Discipline } = data;
  const date = new Date(Discipline?.date).toLocaleDateString();

  // get list of items in Discipline that are also in the others involved list
  const othersInvolvedListItems = othersInvolvedList.map((item) =>
    Discipline[item] ? `☑️ ${item} ` : null
  );
  const studentConductListItems = studentConductList.map((item) =>
    Discipline[item] ? `☑️ ${item} ` : null
  );
  const teacherActionListItems = teacherActionList.map((item) =>
    Discipline[item] ? `☑️ ${item} ` : null
  );

  //  function take array of strings in camelcase and return words with spaces
  const getListItems = (list) => {
    const listWithoutNulls = list.filter((item) => item !== null);
    console.log(listWithoutNulls);
    const listAddSpaceBeforeEachCapital = listWithoutNulls.map((item) =>
      item.replace(/([A-Z])/g, ' $1')
    );
    const listCapuitalizeFirstLetterAfterSpace = listAddSpaceBeforeEachCapital.map(
      (item) => item.charAt(0).toUpperCase() + item.slice(1)
    );
    return listCapuitalizeFirstLetterAfterSpace;
  };
  return (
    <div>
      <h1>
        Referral for {Discipline?.student?.name} on {date}
      </h1>
      <DisplaySingleDiscipline>
        <div>
          <h2>Teacher: {Discipline.teacher.name}</h2>
          <h2>Student: {Discipline.student.name}</h2>
        </div>
        <div>
          <h3>Date:</h3>
          <h3>{date}</h3>
        </div>
        <div>
          <p>Class Type: {Discipline.classType}</p>
          <p>Location: {Discipline.location}</p>
          <p>Time Of Day: {Discipline.timeOfDay}</p>
        </div>
        <div>
          <h3>Others Involved:</h3>
          <p>{getListItems(othersInvolvedListItems)}</p>
        </div>
        <div>
          <h3>Student Conduct:</h3>
          <p>{getListItems(studentConductListItems)}</p>
        </div>
        <div>
          <h3>Teacher Action:</h3>
          <p>{getListItems(teacherActionListItems)}</p>
        </div>
      </DisplaySingleDiscipline>
      <h2>Teacher Comments:</h2>
      <p>{Discipline.teacherComments}</p>
    </div>
  );
}
