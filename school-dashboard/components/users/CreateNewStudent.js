import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import useForm from '../../lib/useForm';
import { useGQLQuery } from '../../lib/useGqlQuery';
import useRevalidatePage from '../../lib/useRevalidatePage';
import DisplayError from '../ErrorMessage';
import GradientButton, { SmallGradientButton } from '../styles/Button';
import Form, { FormContainerStyles } from '../styles/Form';
import Link from 'next/link';

// TODO: update this edit into create new student


const CREATE_NEW_STUDENT_MUTATION = gql`
  mutation CREATE_NEW_STUDENT_MUTATION(
    $name: String!
    $email: String!
    $ta: ID!
    $block1: ID!
    $block2: ID!
    $block3: ID!
    $block4: ID!
    $block5: ID!
  ) {
    createUser(
      data: {
        name: $name
        email: $email
        taTeacher: { connect: { id: $ta } }
        block1Teacher: { connect: { id: $block1 } }
        block2Teacher: { connect: { id: $block2 } }
        block3Teacher: { connect: { id: $block3 } }
        block4Teacher: { connect: { id: $block4 } }
        block5Teacher: { connect: { id: $block5 } }
        isStudent: true
        password: "password"
      }
    ) {
      id
      name
    }
  }
`;

const LIST_OF_TEACHERS_QUERY = gql`
 query {
  teacherList: users(
    where: {
      AND: [
        { isTeacher: { equals: true } }
        { OR: [{ hasClasses: { equals: true } }, { hasTA: { equals: true } }] }
      ]
    }
  ) {
    id
    name
  }
}
`;
export default function NewStudent( ) {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const revalidateIndexPage = useRevalidatePage("/");
  const { data, isLoading } = useGQLQuery(
    `ListOfTeachers`,
    LIST_OF_TEACHERS_QUERY,
    {},
    { enabled: showForm }
  );
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: "",
    email: "",
    ta: "",
    block1: "",
    block2: "",
    block3: "",
    block4: "",
    block5: "",
  });

  const [createNewStudent, { loading, error }] = useMutation(CREATE_NEW_STUDENT_MUTATION, {
    variables: {
      ...inputs,
      email: inputs.email.toLowerCase(),
    },
  });
  const teacherListRaw = data?.teacherList || [];
  const teacherList = teacherListRaw.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div>
      <GradientButton onClick={() => setShowForm(!showForm)}>
        {showForm ? 'close' : 'Create a New Student'}
      </GradientButton>
      <FormContainerStyles>
        <Form
          className={showForm ? 'visible' : 'hidden'}
          style={{ width: '500px' }}
          onSubmit={async (e) => {
            e.preventDefault();
            // Submit the input fields to the backend:
            // console.log(inputs);
            const res = await createNewStudent();
            console.log(res);
            if(res.data.createUser) {

            queryClient.refetchQueries();
            setShowForm(false);
            resetForm();
            //toast success and link to student page
            toast.success(
              <Link href={`/userProfile/${res.data.createUser.id}`}>
              {`Created a new account for ${res.data.createUser.name}   Click here to view their profile`}
              </Link>,
               {duration: 10000}
            );
            revalidateIndexPage();
            } else {
              toast.error(
                `Error creating new account`
              );
            }
          }}
        >
          <h2>Create New Student</h2>
          <DisplayError error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            {/* <FormGroupStyles> */}
            <label htmlFor="name">
              Name
              <input
                style={{ marginLeft: '0' }}
                required
                type="text"
                id="name"
                name="name"
                placeholder="Student Name"
                value={inputs.name || ''}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                style={{ marginLeft: '0' }}
                required
                type="email"
                id="email"
                name="email"
                placeholder="Student Email"
                value={inputs.email || ''}
                onChange={handleChange}
              />
            </label>
            {/* </FormGroupStyles> */}
            <label htmlFor="ta">
              TA
              <select
                id="ta"
                name="ta"
                placeholder="TA Teacher"
                value={inputs.ta}
                onChange={handleChange}
                required
              >
                 <option value="" disabled>None</option>
                {teacherList.map((item) => (
                  <option key={`item${item.name}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="block1">
              Block 1
              <select
                id="block1"
                name="block1"
                placeholder="Block 1 Teacher"
                value={inputs.block1}
                onChange={handleChange}
                required
              >
                 <option value="" disabled>None</option>
                {teacherList.map((item) => (
                  <option key={`item${item.name}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="block2">
              Block 2
              <select
                id="block2"
                name="block2"
                placeholder="Block 2 Teacher"
                value={inputs.block2}
                onChange={handleChange}
                required
              >
                 <option value="" disabled>None</option>
                {teacherList.map((item) => (
                  <option key={`item${item.name}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="block3">
              Block 3
              <select
                id="block3"
                name="block3"
                placeholder="Block 3 Teacher"
                value={inputs.block3 || ''}
                onChange={handleChange}
                required
              >
                <option value="" disabled>None</option>
                {teacherList.map((item) => (
                  <option key={`item${item.name}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="block4">
              Block 4
              <select
                id="block4"
                name="block4"
                placeholder="Block 4 Teacher"
                value={inputs.block4}
                onChange={handleChange}
                required
              >
                 <option value="" disabled>None</option>
                {teacherList.map((item) => (
                  <option key={`item${item.name}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="block5">
              Block 5
              <select
                id="block5"
                name="block5"
                placeholder="Block 5 Teacher"
                value={inputs.block5}
                onChange={handleChange}
                required
              >
                 <option value="" disabled>None</option>
                {teacherList.map((item) => (
                  <option key={`item${item.name}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>

            <button type="submit"> + Publish </button>
            <button type="button" onClick={resetForm}>
              reset
            </button>
          </fieldset>
        </Form>
      </FormContainerStyles>
    </div>
  );
}
