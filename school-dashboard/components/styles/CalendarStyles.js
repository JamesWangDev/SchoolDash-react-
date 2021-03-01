import styled from 'styled-components';

export const CalendarContainerStyle = styled.div`
  display: flex;
  margin: 1rem;
  flex-wrap: wrap;
`;

export const SingleCalendarStyle = styled.div`
  display: flex;
  flex-direction: column;

  margin: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  .title {
    background-image: linear-gradient(
      to top left,
      var(--red),
      var(--blue),
      /* url(/calendar.png) */
    );
    background-size: cover;
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
      padding: 1rem;
      background: var(--blue);
      border-radius: 1rem;
    }
  }
`;
