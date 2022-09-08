import gql from "graphql-tag";
import React, { useState } from "react";
import styled from "styled-components";
import { useGQLQuery } from "../../lib/useGqlQuery";
import Loading from "../../components/Loading";
import {
  classTypeList,
  locationList,
  othersInvolvedList,
  studentConductList,
  teacherActionList,
  timeOfDayList,
} from "../../lib/disciplineData";
import AdminDisciplineData from "../../components/discipline/AdminDisciplineData";
import { useUser } from "../../components/User";
import isAllowed from "../../lib/isAllowed";

const DisplaySingleDiscipline = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  div {
    margin: 10px;
  }
  flex-wrap: wrap;
  @media print {
    .hidePrint {
      display: none;
    }
  }
`;

export const SINGLE_DISCIPLINE_DATA = gql`
  query SINGLE_DISCIPLINE_DATA($id: ID!) {
    discipline(where: { id: $id }) {
      id
      date
      teacher {
        id
        name
      }
      student {
        name
        id
        studentDisciplineCount
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
      adminComments
    }
  }
`;

export default function SingleDisciplineReferralPage({ query }) {
  const me = useUser();
  const { data, isLoading, isError, refetch } = useGQLQuery(
    `singleDiscipline-${query.id}`,
    SINGLE_DISCIPLINE_DATA,
    {
      id: query.id,
    }
  );
  const [editing, setEditing] = useState(false);
  if (isLoading) return <Loading />;
  if (!me) return null;
  if (
    !(
      isAllowed(me, "canSeeAllDiscipline") ||
      isAllowed(me, "canManageDiscipline") ||
      me.id === data.discipline.teacher.id
    )
  )
    return null;
  const discipline = data?.discipline;
  const date = new Date(discipline?.date);
  // console.log(date);
  const dayAfterDate = date?.setDate(date.getDate() + 1).toLocaleString();
  // console.log(date);
  const dateToShow = date?.toDateString();
  // console.log(dateToShow);
  // get list of items in Discipline that are also in the others involved list
  const othersInvolvedListItems = othersInvolvedList.map((item) =>
    discipline[item] ? `☑️ ${item} ` : null
  );
  const studentConductListItems = studentConductList.map((item) =>
    discipline[item] ? `☑️ ${item} ` : null
  );
  const teacherActionListItems = teacherActionList.map((item) =>
    discipline[item] ? `☑️ ${item} ` : null
  );

  //  function take array of strings in camelcase and return words with spaces
  const getListItems = (list) => {
    const listWithoutNulls = list.filter((item) => item !== null);
    // console.log(listWithoutNulls);
    const listAddSpaceBeforeEachCapital = listWithoutNulls.map((item) =>
      item.replace(/([A-Z])/g, " $1")
    );
    const listCapuitalizeFirstLetterAfterSpace =
      listAddSpaceBeforeEachCapital.map(
        (item) => item.charAt(0).toUpperCase() + item.slice(1)
      );
    return listCapuitalizeFirstLetterAfterSpace;
  };
  return (
    <div>
      <h1>
        Referral for {discipline?.student?.name} on {dateToShow}{" "}
      </h1>
      <DisplaySingleDiscipline>
        <div>
          <h2>Teacher: {discipline.teacher.name}</h2>
          <h2>Student: {discipline.student.name}</h2>
        </div>
        <div>
          <h3>Date:</h3>
          <h3>{dateToShow}</h3>
          <p>
            Student's Referrals: {discipline.student.studentDisciplineCount}
          </p>
        </div>
        <div>
          <p>Class Type: {discipline.classType}</p>
          <p>Location: {discipline.location}</p>
          <p>Time Of Day: {discipline.timeOfDay}</p>
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
      <h2 className="hidePrint">
        Teacher Comments (This is the original. It does not print):
      </h2>
      <p className="hidePrint">{discipline.teacherComments}</p>
      <AdminDisciplineData discipline={discipline} refetch={refetch} />
    </div>
  );
}
