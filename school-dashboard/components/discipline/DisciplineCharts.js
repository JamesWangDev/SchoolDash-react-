import React from 'react';
import {
  classTypeList,
  locationList,
  othersInvolvedList,
  studentConductList,
  teacherActionList,
  timeOfDayList,
} from '../../lib/disciplineData';
import totalsFromArray from '../../lib/totalsFromArray';
import DoughnutChart from '../Chart/DonutChart';
import BarChart from '../Chart/BarChart';
import totalsTrueInArray from '../../lib/totalsTrueInArray';

export default function DisciplineCharts({ disciplines }) {
  const totalDisciplines = disciplines.length;
  const classList = classTypeList;
  const totalPerClass = totalsFromArray(classList, 'classType', disciplines);
  const locations = totalsFromArray(locationList, 'location', disciplines);
  const times = totalsFromArray(timeOfDayList, 'timeOfDay', disciplines);
  const conducts = totalsTrueInArray(studentConductList, disciplines);
  const teacherActions = totalsTrueInArray(teacherActionList, disciplines);
  const others = totalsTrueInArray(othersInvolvedList, disciplines);
  return (
    <div>
      <h3>chart goes here</h3>
      <p>There are a total of {totalDisciplines} referrals</p>
      <DoughnutChart title="Class Type" chartData={totalPerClass} />
      <DoughnutChart title="Location" chartData={locations} />
      <DoughnutChart title="Time Of Day" chartData={times} />
      <BarChart title="Inappropriate Student Conduct" chartData={conducts} />
      <BarChart title="Teacher Actions" chartData={teacherActions} />
      <BarChart title="Others Involved" chartData={others} />
    </div>
  );
}
