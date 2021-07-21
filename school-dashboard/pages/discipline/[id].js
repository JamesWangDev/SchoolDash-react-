import gql from 'graphql-tag';
import React from 'react';
import { useGQLQuery } from '../../lib/useGqlQuery';
import Loading from '../../components/Loading';

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
    'allDisciplines',
    SINGLE_DISCIPLINE_DATA,
    { id: query.id }
  );
  if (isLoading) return <Loading />;
  const { Discipline } = data;
  const date = new Date(Discipline.date).toLocaleDateString();
  return (
    <div>
      <h1>
        Referral for {Discipline.student.name} on {date}
      </h1>
    </div>
  );
}
