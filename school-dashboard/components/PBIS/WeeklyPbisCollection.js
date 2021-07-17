import React, { useEffect } from 'react';
import GradientButton from '../styles/Button';
import Form, { FormContainerStyles } from '../styles/Form';
import useForm from '../../lib/useForm';
import usePbisCollection from './usePbisCollection';

export default function WeeklyPbisCollection() {
  const [showForm, setShowForm] = React.useState(false);
  const { inputs, handleChange, clearForm } = useForm();
  const {
    running,
    runCardCollection,
    data,
    setGetData,
    getData,
    results,
  } = usePbisCollection();
  useEffect(() => {
    if (!running) {
      setShowForm(false);
    }
  }, [running]);
  // console.log(data);
  return (
    <div>
      <GradientButton
        style={{ marginTop: '10px' }}
        onClick={() => {
          setShowForm(!showForm);
          setGetData(!getData);
        }}
      >
        Run Weekly Pbis Collection
      </GradientButton>
      <div>
        <FormContainerStyles>
          <Form
            className={showForm ? 'visible' : 'hidden'}
            onSubmit={async (e) => {
              e.preventDefault();
              // Submit the inputfields to the backend:
              if (inputs.confirmation === 'yes') {
                await runCardCollection();
                // setShowForm(false);
              } else {
                setShowForm(false);
              }
              // clearForm();
            }}
          >
            <h1>Run the weekly PBIS Card Collection</h1>

            <fieldset disabled={running || !data} aria-busy={running || !data}>
              <label htmlFor="confirmation">
                Do You Really Want To Do this?
                <input
                  required
                  type="text"
                  id="confirmation"
                  name="confirmation"
                  placeholder="Do you want to do this?"
                  value={inputs.data}
                  onChange={handleChange}
                />
              </label>

              <button type="submit">Run Card Collection</button>
            </fieldset>
          </Form>
        </FormContainerStyles>
      </div>
      {JSON.stringify(results)}
      {/* {data && JSON.stringify(data)} */}
    </div>
  );
}
