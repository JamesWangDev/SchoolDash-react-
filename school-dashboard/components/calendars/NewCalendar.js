import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import GradientButton from '../styles/Button';
import Form, { FormContainerStyles } from '../styles/Form';
import useForm from '../../lib/useForm';
import DisplayError from '../ErrorMessage';
import { useUser } from '../User';
import { todaysDateForForm } from './formatTodayForForm';

const CREATE_CALENDAR_MUTATION = gql`
  mutation CREATE_CALENDAR_MUTATION(
    $name: String!
    $description: String!
    $status: String!
    $date: String!
    $link: String
    $linkTitle: String
    $author: ID!
  ) {
    createCalendar(
      data: {
        name: $name
        description: $description
        status: $status
        date: $date
        link: $link
        linkTitle: $linkTitle
        author: { connect: { id: $author } }
      }
    ) {
      id
    }
  }
`;

export default function NewCalendar({ refetchCalendars, hidden }) {
  const [showForm, setShowForm] = useState(false);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: '',
    description: '',
    status: 'Both',
    date: todaysDateForForm(),
  });
  const user = useUser();
  //   console.log(`user ${user.id}`);
  const [createCalendar, { loading, error, data }] = useMutation(
    CREATE_CALENDAR_MUTATION,
    {
      variables: {
        ...inputs,
        author: user?.id,
        date: inputs.date.concat('T24:00:00.000Z'),
      },
    }
  );
  if (hidden) return null;
  return (
    <div>
      <GradientButton
        onClick={() => setShowForm(!showForm)}
        style={{ marginLeft: '100px' }}
      >
        {showForm ? 'Close the form' : 'Add A New Event'}
      </GradientButton>
      <FormContainerStyles>
        <Form
          className={showForm ? 'visible' : 'hidden'}
          // hidden={!showForm}
          onSubmit={async (e) => {
            e.preventDefault();
            // Submit the inputfields to the backend:
            const res = await createCalendar();
            resetForm();
            refetchCalendars();
            setShowForm(false);
          }}
        >
          <h1>Add a New Calendar Event</h1>
          <DisplayError error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="name">
              Event Title
              <input
                required
                type="text"
                id="name"
                name="name"
                placeholder="Event Title"
                value={inputs.name}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="date">
              Date of Event
              <input
                required
                type="date"
                id="date"
                name="date"
                value={inputs.date}
                onChange={handleChange}
              />
            </label>
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
            <label htmlFor="status">
              Who can see this event?
              <select
                type="select"
                id="status"
                name="status"
                placeholder="Name"
                value={inputs.status}
                onChange={handleChange}
              >
                <option value="Both">Students and Teachers</option>
                <option value="Students">Students Only</option>
                <option value="Teachers">Teachers Only</option>
              </select>
            </label>
            <label htmlFor="link">
              Link
              <input
                type="text"
                id="link"
                name="link"
                placeholder="Input Link Here"
                value={inputs.link}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="linkTitle">
              Link Title
              <input
                type="text"
                id="linkTitle"
                name="linkTitle"
                placeholder="Input Link Here"
                value={inputs.linkTitle}
                onChange={handleChange}
              />
            </label>

            <button type="submit">+ Add A New Event</button>
          </fieldset>
        </Form>
      </FormContainerStyles>
    </div>
  );
}
