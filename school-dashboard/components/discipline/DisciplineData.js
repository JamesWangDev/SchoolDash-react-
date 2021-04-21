import gql from 'graphql-tag';
import styled from 'styled-components';
import { useGQLQuery } from '../../lib/useGqlQuery';
import DisciplineCharts from './DisciplineCharts';
import DisciplineTable from './DisciplineTable';
import NewDiscipline from './DisciplineButton';

const DisciplinePageContainer = styled.div`
  h2 {
    text-align: center;
  }
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  div {
    max-width: 500px;
  }
`;

const DISCIPLINE_DATA = gql`
  query DISCIPLINE_DATA {
    allDisciplines {
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

export default function DisciplineData() {
  const { data, isLoading, isError, refetch } = useGQLQuery(
    'allDisciplines',
    DISCIPLINE_DATA
  );

  if (isLoading) return <p>Loading...</p>;
  const totalDisciplines = data.allDisciplines.length;
  return (
    <>
      <NewDiscipline refetch={refetch} />
      <DisciplinePageContainer>
        <div>
          <h2>{totalDisciplines} Total Referrals</h2>
          <DisciplineTable disciplines={data.allDisciplines} />
        </div>
        <div>
          <DisciplineCharts disciplines={data.allDisciplines} />
        </div>
      </DisciplinePageContainer>
    </>
  );
}
