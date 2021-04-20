import React from 'react';
import {
  classTypeList,
  locationList,
  timeOfDayList,
} from '../../lib/disciplineData';
import totalsFromArray from '../../lib/totalsFromArray';
import DoughnutChart from '../Chart/DonutChart';

export default function DisciplineCharts({ disciplines }) {
  const totalDisciplines = disciplines.length;
  const classList = classTypeList;
  const totalPerClass = totalsFromArray(classList, 'classType', disciplines);
  const locations = totalsFromArray(locationList, `location`, disciplines);
  const times = totalsFromArray(timeOfDayList, 'timeOfDay', disciplines);
  return (
    <div>
      <h3>chart goes here</h3>
      <p>There are a total of {totalDisciplines} referrals</p>
      <DoughnutChart title="Class Type" chartData={totalPerClass} />
      <DoughnutChart title="Location" chartData={locations} />
      <DoughnutChart title="Time Of Day" chartData={times} />
    </div>
  );
}
