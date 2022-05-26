import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import useForm from '../../lib/useForm';
import { useUser } from '../User';

const AssignmentUpdateStyles = styled.div`
  position: fixed; /* Stay in place */
  z-index: 4; /* Sit on top */
  /* right: 50%; */
  left: 25%;
  top: 40%;
  min-width: 50%;
  height: auto;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 2rem;
  h4 {
    color: white;
    margin: 0.5rem 0.5rem;
    text-align: center;
  }
  button {
    color: white;
    background: var(--blueTrans);
    border: none;
    border-radius: 100px;
    font-size: 2rem;
    margin: 0rem 0.5rem;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    label {
      padding: 10px;
      text-align: left;
    }
    input,
    textarea {
      margin: auto 2rem;
      min-width: 90%;
    }
    button {
      margin-bottom: 1rem;
      max-width: 10rem;
      /* margin-left: auto; */
      /* margin-right: auto; */
      padding-left: 2rem;
      padding-right: 3rem;
      text-align: center;
    }
  }
  .button-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
`;

const UPDATE_ASSIGNMENTS = gql`
  mutation UPDATE_ASSIGNMENTS(
    $id: ID!
    $block1Assignment: String
    $block1ClassName: String
    $block1AssignmentLastUpdated: DateTime
    $block2Assignment: String
    $block2ClassName: String
    $block2AssignmentLastUpdated: DateTime
    $block3Assignment: String
    $block3ClassName: String
    $block3AssignmentLastUpdated: DateTime
    $block4Assignment: String
    $block4ClassName: String
    $block4AssignmentLastUpdated: DateTime
    $block5Assignment: String
    $block5ClassName: String
    $block5AssignmentLastUpdated: DateTime
  ) {
    updateUser(
      where: {id: $id}
      data: {
        block1Assignment: $block1Assignment
        block1ClassName: $block1ClassName
        block1AssignmentLastUpdated: $block1AssignmentLastUpdated
        block2Assignment: $block2Assignment
        block2ClassName: $block2ClassName
        block2AssignmentLastUpdated: $block2AssignmentLastUpdated
        block3Assignment: $block3Assignment
        block3ClassName: $block3ClassName
        block3AssignmentLastUpdated: $block3AssignmentLastUpdated
        block4Assignment: $block4Assignment
        block4ClassName: $block4ClassName
        block4AssignmentLastUpdated: $block4AssignmentLastUpdated
        block5Assignment: $block5Assignment
        block5ClassName: $block5ClassName
        block5AssignmentLastUpdated: $block5AssignmentLastUpdated
      }
    ) {
      id
    }
  }
`;

export default function AssignmentUpdater({
  assignments,
  block,
  hide,
  refetch,
}) {
  const me = useUser();
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    classTitle: assignments[`block${block}ClassName`],
    assignment: assignments[`block${block}Assignment`],
  });
  const updateData = {};
  const [updateAssignment, { loading, error, data }] = useMutation(
    UPDATE_ASSIGNMENTS,
    {
      variables: updateData,
    }
  );

  return (
    <AssignmentUpdateStyles>
      <h4>
        Update Class Assignment for Block {block}
        <button type="button" onClick={() => hide(false)}>
          &times;
        </button>
      </h4>
      <form>
        <label htmlFor="Class Name">
          Class Name:
          <input
            type="text"
            id="classTitle"
            name="classTitle"
            placeholder="student Message"
            value={inputs.classTitle}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="message">
          Current Assignment:
          <textarea
            type="text"
            id="assignment"
            name="assignment"
            placeholder="Current Assignment"
            value={inputs.assignment}
            onChange={handleChange}
          />
        </label>
        <div className="button-container">
          <button
            type="button"
            onClick={async () => {
              updateData[
                `block${block}AssignmentLastUpdated`
              ] = new Date();
              updateData[`block${block}Assignment`] = inputs.assignment;
              updateData[`block${block}ClassName`] = inputs.classTitle;
              updateData.id = me.id;
              // console.log(updateData);
              await updateAssignment({ variables: updateData });
              toast.success(`Updated Assignment for Block ${block}`);
              await refetch();
              hide(false);
            }}
          >
            Update
          </button>
          <button
            type="button"
            onClick={async () => {
              const todaysDate = new Date();
              updateData[`block1AssignmentLastUpdated`] = todaysDate;
              updateData[`block2AssignmentLastUpdated`] = todaysDate;
              updateData[`block3AssignmentLastUpdated`] = todaysDate;
              updateData[`block4AssignmentLastUpdated`] = todaysDate;
              updateData[`block5AssignmentLastUpdated`] = todaysDate;
              updateData[`block1Assignment`] = inputs.assignment;
              updateData[`block1ClassName`] = inputs.classTitle;
              updateData[`block2Assignment`] = inputs.assignment;
              updateData[`block2ClassName`] = inputs.classTitle;
              updateData[`block3Assignment`] = inputs.assignment;
              updateData[`block3ClassName`] = inputs.classTitle;
              updateData[`block4Assignment`] = inputs.assignment;
              updateData[`block4ClassName`] = inputs.classTitle;
              updateData[`block5Assignment`] = inputs.assignment;
              updateData[`block5ClassName`] = inputs.classTitle;
              updateData.id = me.id;
              // console.log(updateData);
              await updateAssignment({ variables: updateData });
              toast.success(`Updated Assignment for Block ${block}`);
              await refetch();
              hide(false);
            }}
          >
            Update All Blocks
          </button>
        </div>
      </form>
    </AssignmentUpdateStyles>
  );
}
