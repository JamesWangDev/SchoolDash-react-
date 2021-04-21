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

const weekday = new Array(7);
weekday[0] = 'Sunday';
weekday[1] = 'Monday';
weekday[2] = 'Tuesday';
weekday[3] = 'Wednesday';
weekday[4] = 'Thursday';
weekday[5] = 'Friday';
weekday[6] = 'Saturday';

const days = new Array(7);
days[0] = 0;
days[1] = 1;
days[2] = 2;
days[3] = 3;
days[4] = 4;
days[5] = 5;
days[6] = 6;

function getDayTotals(disciplines) {
  const arrayOfDayOfTheWeek = disciplines.map((individual) => {
    const day = new Date(individual.date).getDay();
    return day;
  });
  // console.log(arrayOfDayOfTheWeek);
  const counts = days.map((day) =>
    arrayOfDayOfTheWeek.reduce((total, currentDay) => {
      const isThatDay = currentDay === day;

      return total + (isThatDay ? 1 : 0);
    }, 0)
  );
  return counts.map((total, index) => ({ word: weekday[index], total }));
  // return counts;
}

export default function DisciplineCharts({ disciplines }) {
  const totalDisciplines = disciplines.length;
  const classList = classTypeList;
  const totalPerClass = totalsFromArray(classList, 'classType', disciplines);
  const locations = totalsFromArray(locationList, 'location', disciplines);
  const times = totalsFromArray(timeOfDayList, 'timeOfDay', disciplines);
  const conducts = totalsTrueInArray(studentConductList, disciplines);
  const teacherActions = totalsTrueInArray(teacherActionList, disciplines);
  const others = totalsTrueInArray(othersInvolvedList, disciplines);
  const dates = getDayTotals(disciplines);
  console.log(dates);
  return (
    <div>
      <h3>chart goes here</h3>
      <p>There are a total of {totalDisciplines} referrals</p>
      <DoughnutChart title="Day of the Week" chartData={dates} />
      <DoughnutChart title="Class Type" chartData={totalPerClass} />
      <DoughnutChart title="Location" chartData={locations} />
      <DoughnutChart title="Time Of Day" chartData={times} />
      <BarChart title="Inappropriate Student Conduct" chartData={conducts} />
      <BarChart title="Teacher Actions" chartData={teacherActions} />
      <BarChart title="Others Involved" chartData={others} />
    </div>
  );
}
