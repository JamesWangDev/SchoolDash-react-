import { GraphQLClient } from "graphql-request";
import { getDatasetAtEvent } from "react-chartjs-2";
import { endpoint, prodEndpoint } from "../../config";
import styled from "styled-components";
import { useUser } from "../../components/User";
import EditCalendarEvent from "../../components/calendars/EditCalendar";
import isAllowed from "../../lib/isAllowed";
import gql from "graphql-tag";

const CalendarStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--background-color);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export default function CalendarEvent({ query, data: calendar }) {
  const me = useUser();
  if (!calendar) {
    return <div>No Event Found...</div>;
  }

  const date = new Date(calendar.date).toLocaleDateString();
  const dateCreated = new Date(calendar.dateCreated).toLocaleDateString();
  const daysUntil = new Date(calendar.date).getTime() - Date.now();
  const daysUntilString = Math.ceil(daysUntil / (1000 * 60 * 60 * 24));
  const daysUntilStringPlural = daysUntilString === 1 ? "day" : "days";
  const eventDayOfTheWeek = new Date(calendar.date).toLocaleDateString(
    "en-US",
    { weekday: "long" }
  );
  const eventHasLink = calendar.link ? true : false;
  const linkWithHTTP = calendar.link.startsWith("http")
    ? calendar.link
    : `http://${calendar.link}`;
  const eventLinkTitle = calendar.linkTitle
    ? `Link: ${calendar.linkTitle}`
    : "Attached Link";
  return (
    <CalendarStyles>
      <h1>{calendar.name}</h1>
      <p>{calendar.description}</p>
      <p>
        {eventDayOfTheWeek} - {date}
      </p>
      <p>
        {daysUntilString} {daysUntilStringPlural} until event
      </p>
      {eventHasLink && <a href={linkWithHTTP}>{eventLinkTitle}</a>}
      <br />
      <p>Event is for Students or Teachers: {calendar.status}</p>
      <p>
        Event was created by: {calendar.author?.name} on {dateCreated}
      </p>
      {isAllowed(me, "isStaff") ? (
        <EditCalendarEvent calendar={calendar} />
      ) : null}
    </CalendarStyles>
  );
}

const GET_SINGLE_CALENDAR_EVENT = gql`
  query GET_SINGLE_CALENDAR($id: ID) {
    calendar(where: { id: $id }) {
      id
      name
      description
      status
      date
      dateCreated
      link
      linkTitle
      author {
        id
        name
      }
    }
  }
`;

export async function getServerSideProps(context) {
  const headers = {
    credentials: "include",
    mode: "cors",
    headers: {
      authorization: `test auth for keystone`,
    },
  };

  const graphQLClient = new GraphQLClient(
    process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
    headers
  );
  const fetchThisCalendar = async () =>
    graphQLClient.request(GET_SINGLE_CALENDAR_EVENT, { id: context.query.id });

  const thisCalendar = await fetchThisCalendar();

  return {
    props: {
      query: context.query,
      data: thisCalendar.calendar,
    },
  };
}
