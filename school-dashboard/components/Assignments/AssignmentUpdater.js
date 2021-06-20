import styled from 'styled-components';

const AssignmentUpdateStyles = styled.div`
  position: fixed; /* Stay in place */
  z-index: 4; /* Sit on top */
  right: 50%;
  top: 50%;
  width: auto; /* Full width */
  height: auto; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.8); /* Black w/ opacity */
  border-radius: 2rem;
  p {
    color: white;
  }
`;

export default function AssignmentUpdater({ messages, block, hide }) {
  console.log(messages);
  return (
    <AssignmentUpdateStyles>
      <p onClick={() => hide(false)}>
        Update Class Assignment for Block {block}
      </p>
      <form>
        <p>form goes here</p>
      </form>
    </AssignmentUpdateStyles>
  );
}
