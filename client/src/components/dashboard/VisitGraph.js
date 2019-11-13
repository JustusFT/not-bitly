import moment from 'moment';
import * as R from 'ramda';
import React from 'react';
import { Line } from 'react-chartjs-2';

var timeFormat = 'MM/DD/YYYY';

function generateData(visits) {
  const data = R.pipe(
    R.groupBy(visit =>
      moment(visit.created_at)
        .startOf('date')
        .format(timeFormat)
    ),
    R.mapObjIndexed((value, key) => ({
      x: key,
      y: value.length
    })),
    R.values
  )(visits);

  return {
    datasets: [
      {
        label: 'Visits',
        backgroundColor: 'hsla(172, 100%, 32%, 0.5)',
        borderColor: 'hsla(172, 100%, 32%, 1)',
        data
      }
    ]
  };
}

const options = {
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          unit: 'day',
          parser: timeFormat,
          tooltipFormat: timeFormat
        },
        scaleLabel: {
          display: true,
          labelString: 'Date'
        }
      }
    ],
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: 'Visits'
        },
        ticks: {
          min: 0
        }
      }
    ]
  }
};

export default function VisitGraph({ visits }) {
  return <Line data={generateData(visits)} options={options} />;
}
