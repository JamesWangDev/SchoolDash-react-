import gql from 'graphql-tag';
import styled from 'styled-components';
import { useRouter } from 'next/dist/client/router';
import { useGQLQuery } from '../../lib/useGqlQuery';
import DisciplineCharts from './DisciplineCharts';
import DisciplineTable from './DisciplineTable';
import NewDiscipline from './DisciplineButton';
import { useUser } from '../User';
import isAllowed from '../../lib/isAllowed';
import CellPhoneAddButton from './CellPhoneAddButton';
import ShowCellphoneViolations from './ShowCellphoneViolations';
import GradientButton, { SmallGradientButton } from '../styles/Button';
import Loading from '../Loading';

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
  .big {
    flex-basis: 100%;

    width: 1000px;
    /* background-color: red; */
  }
`;

export const DISCIPLINE_DATA = gql`
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
    allCellPhoneViolations {
      id
      description
      dateGiven
      teacher {
        id
        name
      }
      student {
        id
        name
      }
    }
  }
`;

export default function DisciplineData() {
  const me = useUser();
  const router = useRouter();

  const { data, isLoading, isError, refetch } = useGQLQuery(
    'allDisciplines',
    DISCIPLINE_DATA
  );

  if (isLoading) return <Loading />;
  const { allDisciplines } = data || [];
  const canSeeAllDisciplines = isAllowed(me, 'canSeeAllDiscipline');
  const disciplinesToShow = canSeeAllDisciplines
    ? allDisciplines
    : allDisciplines.filter((d) => d?.teacher.id === me?.id);

  // get disciplines from current user
  const totalDisciplines = data?.allDisciplines?.length;
  if (!me || !me?.isStaff) return <p>Not available</p>;
  return (
    <>
      <DisciplinePageContainer>
        <NewDiscipline refetch={refetch} />
        <GradientButton
          onClick={() =>
            router.push({
              pathname: `Bullying`,
            })
          }
        >
          Hazing Harassment Bullying
        </GradientButton>
        <CellPhoneAddButton refetch={refetch} />
        <ShowCellphoneViolations
          cellViolations={data?.allCellPhoneViolations}
        />
      </DisciplinePageContainer>
      <DisciplinePageContainer>
        <div>
          <h2>{totalDisciplines} Total Referrals</h2>
          <DisciplineTable disciplines={disciplinesToShow} />
        </div>
        <div>
          <DisciplineCharts disciplines={allDisciplines} />
        </div>
      </DisciplinePageContainer>
    </>
  );
}
