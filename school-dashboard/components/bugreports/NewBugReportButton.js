import { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useRouter } from "next/dist/client/router";
import { useQueryClient } from "react-query";
import GradientButton from "../styles/Button";
import Form, { FormContainerStyles, FormGroupStyles } from "../styles/Form";
import useForm from "../../lib/useForm";
import DisplayError from "../ErrorMessage";
import SearchForUserName from "../SearchForUserName";
import { todaysDateForForm } from "../calendars/formatTodayForForm";

import { useUser } from "../User";
import useCreateMessage from "../Messages/useCreateMessage";
import useSendEmail from "../../lib/useSendEmail";

const CREATE_BUG_REPORT_MUTATION = gql`
  mutation CREATE_BUG_REPORT_MUTATION(
    $name: String!
    $submittedBy: ID!
    $description: String!
  ) {
    createBugReport(
      data: {
        name: $name
        submittedBy: { connect: { id: $submittedBy } }
        description: $description
      }
    ) {
      id
      submittedBy {
        id
        name
      }
    }
  }
`;

export default function NewBugReportButton() {
  const [showForm, setShowForm] = useState(false);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: "",
    description: "",
  });
  const me = useUser();
  const { sendEmail } = useSendEmail();

  const [createBugReport, { loading, error, data }] = useMutation(
    CREATE_BUG_REPORT_MUTATION,
    {
      variables: {
        name: inputs.name,
        description: inputs.description,
        submittedBy: me?.id,
      },
    }
  );
  // TODO: send message when callback assigned
  const createMessage = useCreateMessage();

  //   console.log(inputs);
  return (
    <div>
      <GradientButton
        onClick={() => setShowForm(!showForm)}
        style={{ display: "block" }}
      >
        {showForm ? "Close the form" : "Bug Report / Feature Request"}
      </GradientButton>
      <FormContainerStyles>
        <Form
          className={showForm ? "visible" : "hidden"}
          // hidden={!showForm}
          onSubmit={async (e) => {
            e.preventDefault();
            // Submit the input fields to the backend:
            // console.log(inputs);
            const res = await createBugReport();
            // console.log(res);

            // Todo: send message when callback assigned
            createMessage({
              subject: "New Bug Report",
              message: `${res?.data?.createBugReport?.submittedBy.name} reported a bug or asked for a feature`,
              receiver: "cl24ztaju149148z3qqm4c4d39",
              link: ``,
            });

            // Create email to send
            const email = {
              toAddress: "rboskind@gmail.com",
              fromAddress: me.email,
              subject: `NCUJHS.Tech Bug Report from ${res?.data?.createBugReport?.submittedBy.name}`,
              body: `
                  <p>This is a bug report from ${res?.data?.createBugReport?.submittedBy.name}. </p>
                  <p>${inputs.name}</p>
                  <p>${inputs.description}</p>
                  `,
            };

            //send email to Admin
            const emailRes = await sendEmail({
              variables: {
                emailData: JSON.stringify(email),
              },
            });
            console.log(emailRes);
            resetForm();
            setShowForm(false);
          }}
        >
          <h2>Add a New Bug Report</h2>
          <DisplayError error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="name">
              Subject
              <input
                required
                type="select"
                id="name"
                name="name"
                value={inputs.name}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="description">
              Description
              <textarea
                id="description"
                name="description"
                placeholder="description"
                required
                value={inputs.description}
                onChange={handleChange}
                rows="5"
              />
            </label>

            <button type="submit">+ Publish</button>
          </fieldset>
        </Form>
      </FormContainerStyles>
    </div>
  );
}
