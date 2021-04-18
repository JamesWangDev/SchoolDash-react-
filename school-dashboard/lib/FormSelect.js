import React from 'react';

export default function FormSelect({
  currentValue,
  setValue,
  name,
  listOfOptions,
}) {
  //   console.log(listOfOptions);
  return (
    <label htmlFor={name}>
      {name}
      <select
        type="select"
        id={name}
        name={name}
        // placeholder="class"
        value={currentValue}
        onChange={(e) => {
          //   console.log(e.target.value);
          setValue(e.target.value);
        }}
      >
        {listOfOptions.map((item) => (
          //   console.log(item);
          <option key={`item${item}`} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}
