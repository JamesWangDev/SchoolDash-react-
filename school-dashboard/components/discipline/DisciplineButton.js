import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import GradientButton from '../styles/Button';
import Form, { FormContainerStyles, FormGroupStyles } from '../styles/Form';
import useForm from '../../lib/useForm';
import DisplayError from '../ErrorMessage';
import { useUser } from '../User';
import SearchForUserName from '../SearchForUserName';
import FormSelect from '../../lib/FormSelect';
import {
  classTypeList,
  locationList,
  timeOfDayList,
} from '../../lib/disciplineData';

const CREATE_DISCIPLINE_MUTATION = gql`
  mutation CREATE_DISCIPLINE_MUTATION(
    $name: String!
    $description: String!
    $date: String!
    $teacher: ID!
    $student: ID!
  ) {
    createDiscipline(
      data: {
        name: $name
        description: $description
        status: $status
        date: $date
        link: $link
        linkTitle: $linkTitle
        teacher: { connect: { id: $teacher } }
        student: { connect: { id: $student } }
      }
    ) {
      id
    }
  }
`;

export default function NewDiscipline({ refetch }) {
  const [showForm, setShowForm] = useState(false);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    date: new Date().toISOString,
  });
  const user = useUser();
  const [studentReferralIsFor, setStudentReferralIsFor] = useState();
  const [classType, setClassType] = useState();
  const [location, setLocation] = useState();
  const [timeOfDay, setTimeOfDay] = useState();
  //   console.log(`user ${user.id}`);
  const [createDiscipline, { loading, error, data }] = useMutation(
    CREATE_DISCIPLINE_MUTATION,
    {
      variables: {
        ...inputs,
        teacher: user?.id,
        student: studentReferralIsFor,
      },
    }
  );
  return (
    <div>
      <GradientButton
        onClick={() => setShowForm(!showForm)}
        style={{ marginLeft: '100px' }}
      >
        {showForm ? 'Close the form' : 'New Discipline Referral'}
      </GradientButton>
      <FormContainerStyles>
        <Form
          className={showForm ? 'visible' : 'hidden'}
          // hidden={!showForm}
          onSubmit={async (e) => {
            e.preventDefault();
            // Submit the input fields to the backend:
            const res = await createDiscipline();
            clearForm();
            refetch();
            setShowForm(false);
          }}
        >
          <h2>Add a New Referral</h2>
          <DisplayError error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <FormGroupStyles>
              <div>
                <label htmlFor="studentName">Student Name</label>
                <SearchForUserName
                  name="studentName"
                  // value={inputs.studentName}
                  updateUser={setStudentReferralIsFor}
                />
              </div>

              <label htmlFor="date">
                Date of Event
                <input
                  required
                  type="date"
                  id="date"
                  name="date"
                  value={inputs.value}
                  onChange={handleChange}
                />
              </label>
            </FormGroupStyles>
            <FormGroupStyles>
              <FormSelect
                currentValue={classType}
                setValue={setClassType}
                name="Class Type"
                listOfOptions={classTypeList}
              />
              <FormSelect
                currentValue={location}
                setValue={setLocation}
                name="location"
                listOfOptions={locationList}
              />

              <FormSelect
                currentValue={timeOfDay}
                setValue={setTimeOfDay}
                name="Time of Day"
                listOfOptions={timeOfDayList}
              />
            </FormGroupStyles>

            <label htmlFor="description">
              Description
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                required
                value={inputs.description}
                onChange={handleChange}
              />
            </label>

            <button type="submit">+ Publish</button>
          </fieldset>
        </Form>
      </FormContainerStyles>
    </div>
  );
}
