import gql from 'graphql-tag';
import styled from 'styled-components';
import { useGQLQuery } from '../../lib/useGqlQuery';
import DisciplineTable from './DisciplineTable';

const DisciplinePageContainer = styled.div`
  h2 {
    text-align: center;
  }
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
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
  const { data, isLoading, isError } = useGQLQuery(
    'allDisciplines',
    DISCIPLINE_DATA
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <DisciplinePageContainer>
      <div>
        <h2>Discipline Table</h2>
        <DisciplineTable disciplines={data.allDisciplines} />
      </div>
      <div>
        <h2>Discipline data</h2>
      </div>
    </DisciplinePageContainer>
  );
}
