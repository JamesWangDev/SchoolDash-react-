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
  othersInvolvedList,
  studentConductList,
  teacherActionList,
  timeOfDayList,
} from '../../lib/disciplineData';
import FormCheckboxArray from '../../lib/FormCheckboxArray';
import { todaysDateForForm } from '../calendars/formatTodayForForm';

const CREATE_DISCIPLINE_MUTATION = gql`
  mutation CREATE_DISCIPLINE_MUTATION(
    $teacherComments: String!
    $date: String
    $teacher: ID!
    $student: ID!
    $classType: String!
    $location: String!
    $timeOfDay: String!
    $inappropriateLanguage: Boolean
    $physicalConduct: Boolean
    $nonCompliance: Boolean
    $disruption: Boolean
    $propertyMisuse: Boolean
    $otherConduct: Boolean
    $VerbalWarning: Boolean
    $buddyRoom: Boolean
    $conferenceWithStudent: Boolean
    $ParentContact: Boolean
    $PlanningRoomReferral: Boolean
    $FollowupPlan: Boolean
    $LossOfPrivilege: Boolean
    $DetentionWithTeacher: Boolean
    $IndividualizedInstruction: Boolean
    $GuidanceReferral: Boolean
    $ReferToAdministrator: Boolean
    $OtherAction: Boolean
    $none: Boolean
    $peers: Boolean
    $teacherInvolved: Boolean
    $substitute: Boolean
    $unknown: Boolean
    $othersInvolved: Boolean
  ) {
    createDiscipline(
      data: {
        teacherComments: $teacherComments
        date: $date
        teacher: { connect: { id: $teacher } }
        student: { connect: { id: $student } }
        classType: $classType
        location: $location
        timeOfDay: $timeOfDay
        inappropriateLanguage: $inappropriateLanguage
        physicalConduct: $physicalConduct
        nonCompliance: $nonCompliance
        disruption: $disruption
        propertyMisuse: $propertyMisuse
        otherConduct: $otherConduct
        VerbalWarning: $VerbalWarning
        buddyRoom: $buddyRoom
        conferenceWithStudent: $conferenceWithStudent
        ParentContact: $ParentContact
        PlanningRoomReferral: $PlanningRoomReferral
        FollowupPlan: $FollowupPlan
        LossOfPrivilege: $LossOfPrivilege
        DetentionWithTeacher: $DetentionWithTeacher
        IndividualizedInstruction: $IndividualizedInstruction
        GuidanceReferral: $GuidanceReferral
        ReferToAdministrator: $ReferToAdministrator
        OtherAction: $OtherAction
        none: $none
        peers: $peers
        teacherInvolved: $teacherInvolved
        substitute: $substitute
        unknown: $unknown
        othersInvolved: $othersInvolved
      }
    ) {
      id
    }
  }
`;

export default function NewDiscipline({ refetch }) {
  const [showForm, setShowForm] = useState(false);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    date: todaysDateForForm(),
  });
  const user = useUser();
  const [studentReferralIsFor, setStudentReferralIsFor] = useState(null);
  const [classType, setClassType] = useState('');
  const [location, setLocation] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  //   console.log(`user ${user.id}`);
  const [createDiscipline, { loading, error, data }] = useMutation(
    CREATE_DISCIPLINE_MUTATION,
    {
      variables: {
        ...inputs,
        teacher: user?.id,
        student: studentReferralIsFor?.userId,
        classType,
        location,
        timeOfDay,
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
            console.log(inputs);
            const res = await createDiscipline();
            clearForm();
            refetch();
            setShowForm(false);
            console.log(inputs);
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
                  value={inputs.date}
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
                required
              />
              <FormSelect
                currentValue={location}
                setValue={setLocation}
                name="location"
                listOfOptions={locationList}
                required
              />

              <FormSelect
                currentValue={timeOfDay}
                setValue={setTimeOfDay}
                name="Time of Day"
                required
                listOfOptions={timeOfDayList}
              />
            </FormGroupStyles>
            <FormGroupStyles>
              <FormCheckboxArray
                inputs={inputs}
                handleChange={handleChange}
                name="Inappropriate Student Conduct"
                listOfCheckBoxes={studentConductList}
              />
              <FormCheckboxArray
                inputs={inputs}
                handleChange={handleChange}
                name="Teacher Actions"
                listOfCheckBoxes={teacherActionList}
              />
              <FormCheckboxArray
                inputs={inputs}
                handleChange={handleChange}
                name="Others Involved"
                listOfCheckBoxes={othersInvolvedList}
              />
            </FormGroupStyles>
            <label htmlFor="description">
              Description
              <textarea
                id="teacherComments"
                name="teacherComments"
                placeholder="Teacher's Comments"
                required
                value={inputs.teacherComments}
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
