import React from 'react';
import styled from 'styled-components';

const CheckBoxArrayStyles = styled.div`
  h3 {
    text-align: center;
    border-bottom: solid var(--grey);
  }
  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  input[type='checkbox'] {
    display: none;
  }
  input[type='checkbox'] + span {
    display: inline-block;
    position: relative;
    font-size: 1.5rem;
    top: -1px;
    /* width: 12px; */
    /* height: 12px; */
    margin: 0;
    vertical-align: middle;
    /* background: white left top no-repeat; */
    padding: 1px 10px;
    cursor: pointer;
    border-radius: 1rem;
  }
  input[type='checkbox']:checked + span {
    border: 1px solid var(--blue);
    background: var(--red);
  }

  input[type='checkbox'] + span {
    margin-right: 4px;
  }
`;

export default function FormCheckboxArray({
  inputs,
  handleChange,
  name,
  listOfCheckBoxes,
}) {
  return (
    <CheckBoxArrayStyles>
      <h3>{name}</h3>
      <div>
        {listOfCheckBoxes.map((singleCheckBox) => (
          //   console.log(singleCheckBox);
          <label key={`item#${singleCheckBox}`} htmlFor={singleCheckBox}>
            <input
              type="checkbox"
              id={singleCheckBox}
              name={singleCheckBox}
              checked={inputs[singleCheckBox] || false}
              onChange={handleChange}
            />
            <span> {singleCheckBox}</span>
          </label>
        ))}
      </div>
    </CheckBoxArrayStyles>
  );
}
