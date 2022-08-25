import { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useQueryClient } from "react-query";
import GradientButton, { SmallGradientButton } from "../styles/Button";
import Form, { FormContainerStyles, FormGroupStyles } from "../styles/Form";
import useForm from "../../lib/useForm";
import DisplayError from "../ErrorMessage";

import { useUser } from "../User";
import useRevalidatePage from "../../lib/useRevalidatePage";
import { useRouter } from "next/router";

const UPDATE_CALENDAR_MUTATION = gql`
  mutation UPDATE_CALENDAR_MUTATION(
    $id: ID!
    $name: String!
    $date: DateTime!
    $description: String
    $link: String
    $linkTitle: String
  ) {
    updateCalendar(
      where: { id: $id }
      data: {
        name: $name
        date: $date
        description: $description
        link: $link
        linkTitle: $linkTitle
      }
    ) {
      id
    }
  }
`;
const DELETE_CALENDAR_MUTATION = gql`
  mutation DELETE_CALENDAR_MUTATION($id: ID!) {
    deleteCalendar(where: { id: $id }) {
      id
    }
  }
`;

export default function EditCalendarEvent({ calendar, refetch }) {
  const initialDate = new Date(calendar.date);
  const revalidateIndex = useRevalidatePage("/");
  const revalidateCalendarPage = useRevalidatePage("/calendar");
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: calendar.name,
    description: calendar.description,
    link: calendar.link,
    linkTitle: calendar.linkTitle,
    date: initialDate.toISOString().split("T")[0],
  });
  const user = useUser();

  const [updateLink, { loading, error }] = useMutation(
    UPDATE_CALENDAR_MUTATION,
    {
      variables: {
        ...inputs,
        id: calendar.id,
        date: new Date(inputs.date + "T00:00:00"),
      },
    }
  );
  const [deleteLink, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_CALENDAR_MUTATION, {
      variables: {
        id: calendar.id,
      },
    });
  const queryClient = useQueryClient();
  return (
    <div>
      <GradientButton onClick={() => setShowForm(!showForm)}>
        {showForm ? "close" : "Edit Event"}
      </GradientButton>
      <FormContainerStyles>
        <Form
          className={showForm ? "visible" : "hidden"}
          style={{ width: "500px" }}
          onSubmit={async (e) => {
            e.preventDefault();
            // Submit the input fields to the backend:
            // console.log(inputs);
            const res = await updateLink();
            revalidateIndex();
            revalidateCalendarPage();
            setShowForm(false);
            router.reload();
            // console.log(inputs);
          }}
        >
          <h2>Edit Calendar Event</h2>
          <DisplayError error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            {/* <FormGroupStyles> */}
            <label htmlFor="name">
              Name
              <input
                style={{ marginLeft: "0" }}
                required
                type="text"
                id="name"
                name="name"
                placeholder="Title of Assignment"
                value={inputs.name || ""}
                onChange={handleChange}
              />
            </label>
            {/* </FormGroupStyles> */}
            <label htmlFor="description">
              Description
              <textarea
                id="description"
                name="description"
                placeholder="Assignment Description"
                required
                value={inputs.description}
                onChange={handleChange}
                rows="5"
              />
            </label>
            <label htmlFor="date">
              Date
              <input
                type="date"
                id="date"
                name="date"
                placeholder="Date"
                required
                value={inputs.date}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="link">
              Link
              <input
                style={{ marginLeft: "0" }}
                id="link"
                name="link"
                placeholder="Link to website"
                value={inputs.link}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="linkTitle">
              Link Title
              <input
                style={{ marginLeft: "0" }}
                id="linkTitle"
                name="linkTitle"
                placeholder="Link Title"
                value={inputs.linkTitle}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Publish</button>
            <button
              type="button"
              onClick={async () => {
                const res = await deleteLink();
                revalidateIndex();
                revalidateCalendarPage();
                queryClient.refetchQueries("allCalendars");
                router.push("/calendar");
              }}
            >
              Delete
            </button>
          </fieldset>
        </Form>
      </FormContainerStyles>
    </div>
  );
}
