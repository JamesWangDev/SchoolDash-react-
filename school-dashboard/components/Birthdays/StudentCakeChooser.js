import { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import GradientButton, { SmallGradientButton } from "../styles/Button";
import Form, { FormContainerStyles, FormGroupStyles } from "../styles/Form";
import useForm from "../../lib/useForm";
import DisplayError from "../ErrorMessage";

import { useUser } from "../User";

const UPDATE_BIRTHDAY_MUTATION = gql`
  mutation UPDATE_BIRTHDAY_MUTATION(
    $id: ID!
    $cakeType: String!
    $date: DateTime!
  ) {
    updateBirthday(
      where: { id: $id }
      data: { cakeType: $cakeType, date: $date }
    ) {
      id
    }
  }
`;

const validateDate = (dateToCheck) => {
  const canBeDate = new Date(dateToCheck);
  if (canBeDate.toString() === "Invalid Date") {
    return false;
  }
  const date = new Date(dateToCheck);
  // date is not in July, or August
  if (date.getMonth() === 6 || date.getMonth() === 7) {
    return false;
  }
  // if date is in June, it must be before the 15th
  if (date.getMonth() === 5 && date.getDate() >= 15) {
    return false;
  }
  // date is not a saturday or sunday
  if (date.getDay() === 5 || date.getDay() === 6) {
    return false;
  }
  return true;
};

export default function StudentCakeChooser({ birthday }) {
  const [showForm, setShowForm] = useState(false);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    cakeType: birthday.cakeType || "",
    date: birthday.date || "",
  });
  // const user = useUser();

  const [updateLink, { loading, error, data }] = useMutation(
    UPDATE_BIRTHDAY_MUTATION,
    {
      variables: {
        cakeType: inputs.cakeType,
        date: new Date(inputs?.date || null),
        id: birthday.id,
      },
    }
  );
  return (
    <div>
      <GradientButton
        style={{ margin: "5px" }}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "close" : "Choose Your Birthday Cake!!"}
      </GradientButton>
      <FormContainerStyles>
        <Form
          className={showForm ? "visible" : "hidden"}
          style={{ width: "500px" }}
          onSubmit={async (e) => {
            e.preventDefault();
            // Submit the input fields to the backend:
            if (!validateDate(new Date(inputs.date))) {
              alert(
                "Please select a valid date. You must chose a week day during the school year."
              );
              return;
            }

            const res = await updateLink();

            // refetch();
            setShowForm(false);
          }}
        >
          <h2>Choose Your Birthday Cake!!</h2>
          <p>
            This is where you chose the type of cake you would like, as well as
            the date you will receive it.
          </p>
          <p>
            If your birthday is during school, please chose that date. Otherwise
            chose a day during school to receive your cake.
          </p>
          <DisplayError error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            {/* <FormGroupStyles> */}
            <label htmlFor="cakeType">
              What Type Of Cake Would You Like?
              <select
                style={{ marginLeft: "0" }}
                required
                type="text"
                id="cakeType"
                name="cakeType"
                // placeholder="Title of Assignment"
                value={inputs.cakeType || ""}
                onChange={handleChange}
              >
                <option disabled value="">
                  Please Choose an option
                </option>
                <option value="Chocolate Cake - Chocolate Frosting">
                  Chocolate Cake - Chocolate Frosting
                </option>
                <option value="Chocolate Cake - Vanilla Frosting">
                  Chocolate Cake - Vanilla Frosting
                </option>
                <option value="Chocolate Cake - Strawberry Frosting">
                  Chocolate Cake - Strawberry Frosting
                </option>
                <option value="Vanilla Cake - Chocolate Frosting">
                  Vanilla Cake - Chocolate Frosting
                </option>
                <option value="Vanilla Cake - Vanilla Frosting">
                  Vanilla Cake - Vanilla Frosting
                </option>
                <option value="Vanilla Cake - Strawberry Frosting">
                  Vanilla Cake - Strawberry Frosting
                </option>
              </select>
            </label>
            {/* </FormGroupStyles> */}
            <input
              type="date"
              id="date"
              name="date"
              value={inputs.date || ""}
              onChange={handleChange}
            />
            {/* {new Date(inputs.date).toISOString()} */}
            {validateDate(new Date(inputs.date)) ? null : (
              <p style={{ color: "red" }}>Please select a valid date</p>
            )}

            <button type="submit">+ Submit</button>
          </fieldset>
        </Form>
      </FormContainerStyles>
    </div>
  );
}
