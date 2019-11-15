import moment from 'moment';
import * as R from 'ramda';
import React from 'react';
import { Line } from 'react-chartjs-2';

var timeFormat = 'MM/DD/YYYY';

// the visits must be sorted chronologically in order to use this function
function generateData(visits) {
  // Generate the basis. All dates from the first visit till today will begin with no visits
  const basis = {};

  if (visits[0]) {
    const earliestDate = moment(visits[0].created_at).startOf('date');
    for (
      let date = moment(earliestDate);
      !date.isSame(moment().add(1, 'days'), 'day');
      date.add(1, 'days')
    ) {
      basis[date.format(timeFormat)] = [];
    }
  }

  const data = R.pipe(
    R.groupBy(visit =>
      moment(visit.created_at)
        .startOf('date')
        .format(timeFormat)
    ),
    // merge dates with visits with the basis
    R.mergeRight(basis),
    // convert to chartjs point data format
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
        backgroundColor: 'hsla(215, 100%, 60%, 0.5)',
        borderColor: 'hsla(215, 100%, 60%, 1)',
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
        },
        ticks: {
          max: moment().format(timeFormat)
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
