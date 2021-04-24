import { check } from 'prettier';
import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e) {
    console.log(e.target);
    let { value, name, type, checked } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }
    if (type === 'date') {
      // console.log(value);
      const theDate = new Date(value);
      theDate.setHours(theDate.getHours() + 5);
      value = theDate.toISOString().split('T')[0];
      // value = new Date(value).toISOString();
      // console.log(`new ${value}`);
    }
    if (type === 'checkbox') {
      // console.log(`value: ${value}  checked: ${checked}`);
      if (checked === true) {
        value = true;
      }
      if (checked === false) {
        value = false;
      }
    }
    // if (type === 'radio') {
    //   console.log(`value: ${value} name:${name}  checked: ${checked}`);
    //   // console.log(e);
    // }
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
