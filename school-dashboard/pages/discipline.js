import gql from 'graphql-tag';
import styled from 'styled-components';
import { useRouter } from 'next/dist/client/router';
import { GraphQLClient } from 'graphql-request';
import { useUser } from '../components/User';
import { useGQLQuery } from '../lib/useGqlQuery';
import GradientButton from '../components/styles/Button';
import DisciplineCharts from '../components/discipline/DisciplineCharts';
import DisciplineTable from '../components/discipline/DisciplineTable';
import NewDiscipline from '../components/discipline/DisciplineButton';
import CellPhoneAddButton from '../components/discipline/CellPhoneAddButton';
import ShowCellphoneViolations from '../components/discipline/ShowCellphoneViolations';
import Loading from '../components/Loading';
import isAllowed from '../lib/isAllowed';
import { endpoint, prodEndpoint } from '../config';

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
    disciplines(orderBy: {date: desc}) {
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
    cellPhoneViolations(orderBy: {dateGiven:desc}) {
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

export default function Discipline(props) {
  // console.log('Discipline props: ', props);
  const me = useUser();
  const router = useRouter();

  const { data, isLoading, isError, refetch } = useGQLQuery(
    'allDisciplines',
    DISCIPLINE_DATA,
    {},
    {
      staleTime: 0,
      initialData: props?.initialDisciplineData,
    }
  );

  // if (isLoading) return <Loading />;
  const allDisciplines  = data?.disciplines || [];
  const disciplinesWithDateIncrimented = allDisciplines?.map((d) => {
    const date = new Date(d.date);
    const dateIncrimented = new Date(date.setDate(date.getDate() + 1));
    return {
      ...d,
      date: dateIncrimented,
    };
  });
  const canSeeAllDisciplines = isAllowed(me, 'canSeeAllDiscipline');
  const disciplinesToShow = canSeeAllDisciplines
    ? disciplinesWithDateIncrimented
    : disciplinesWithDateIncrimented?.filter((d) => d?.teacher.id === me?.id);

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
          style={{ maxHeight: '4rem' }}
        >
          Hazing Harassment Bullying
        </GradientButton>
        <CellPhoneAddButton refetch={refetch} />
        <ShowCellphoneViolations
          cellViolations={data?.cellPhoneViolations}
        />
      </DisciplinePageContainer>
      <DisciplinePageContainer>
        <div>
          <h2>{totalDisciplines} Total Referrals</h2>
          <DisciplineTable disciplines={disciplinesToShow} />
        </div>
        <div>
          <DisciplineCharts disciplines={disciplinesWithDateIncrimented} />
        </div>
      </DisciplinePageContainer>
    </>
  );
}

export async function getStaticProps(context) {
  // console.log(context);
  // fetch PBIS Page data from the server
  const headers = {
    credentials: 'include',
    mode: 'cors',
    headers: {
      authorization: `test auth for keystone`,
    },
  };

  const graphQLClient = new GraphQLClient(
    process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    headers
  );
  const fetchDisciplineData = async () =>
    graphQLClient.request(DISCIPLINE_DATA);

  const initialDisciplineData = await fetchDisciplineData();

  return {
    props: {
      initialDisciplineData,
    }, // will be passed to the page component as props
    revalidate: 1200, // In seconds
  };
}
