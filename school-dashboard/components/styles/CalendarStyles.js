import styled from 'styled-components';

export const CalendarContainerStyle = styled.div`
  display: flex;
  margin: 1rem;
  flex-wrap: wrap;
`;

export const SingleCalendarStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 25%;
  .title {
    margin: 1rem;
    padding: 1rem;
    border-radius: 2rem;
    opacity: 0.8;
    background: linear-gradient(to top left, var(--red), var(--blue));
    /* background-size: cover; */
  }

  .detailsContainer {
    margin-left: 10px;
    width: 10px;
    height: 10px;
    z-index: 100;
  }
  .details {
    width: 200px;
    overflow: visible;

    div {
      margin-top: -2rem;
      padding: 1rem;
      background: linear-gradient(to top right, var(--red), var(--blue));
      color: white;
      opacity: 0.8;
      border-radius: 1rem;
    }
  }
`;

export const WeeklyCalendarContainerStyles = styled.div`
  display: flex;
  div {
    padding: 0.2rem;
  }

  .title {
    margin: 1rem;
    padding: 1rem;
    border-radius: 2rem;
    opacity: 0.8;
    background: linear-gradient(to top left, var(--red), var(--blue));
    /* background-size: cover; */
  }

  .detailsContainer {
    margin-left: 10px;
    width: 10px;
    height: 10px;
    z-index: 100;
  }
  .details {
    width: 200px;
    overflow: visible;

    div {
      margin-top: -2rem;
      padding: 1rem;
      background: linear-gradient(to top right, var(--red), var(--blue));
      color: white;
      opacity: 0.8;
      border-radius: 1rem;
    }
  }
  div.today {
    background: linear-gradient(to top right, var(--red), var(--blue));
    padding: 1rem;
    border-radius: 2rem;
    width: 25vw;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    flex-basis: 35%;
  }
  div.notToday {
    color: var(--blue);
    margin: 0.1rem;
    border: 2px solid var(--blue);
    border-radius: 2rem;
    flex-basis: 10%;
    div {
      /* display: none; */
    }
  }
`;

export const OneDayCalendarStyles = styled.div``;
