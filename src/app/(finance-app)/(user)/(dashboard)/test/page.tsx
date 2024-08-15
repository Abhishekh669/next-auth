import { BarChart } from '@mantine/charts';

function Demo() {
  // const data = [
  //   { date: 'January', Smartphones: 1200,  },
  //   { date: 'February', Smartphones: 1900 },
  //   { date: 'March', Smartphones: 400,  },
  //   { date: 'April', Smartphones: 1000,  },
  //   { date: 'May', Smartphones: 800,  },
  //   { date: 'June', Smartphones: 750, },
  // ];

  const data = [
    {
       date  : "Mar 22", transactionAmount  : {value : 20000, type : "transportation"}
    },
    {
      date  : "Mar 23", transactionAmount  : {value : 60002, type : "others"}
    },
    {
    date  : "Mar 24", transactionAmount  : {value : 50000, type : "healdot"}
    },
    {
    date  : "Mar 25", transactionAmount  : {value : 40000, tpye : "household"}
    },
    {
    date  : "Mar 26", transactionAmount  : {value : 10000, type : "expense"}
    },

  ]
  return (
    <BarChart
      h={300}
      className='text-white '
      data={data}
      dataKey="date"
      xAxisLabel="Date"
      yAxisLabel="Amount"
      withLegend
      series={[
        { name: 'transactionAmount.value', color: 'green.3' },
      ]}
    />
  );
}

export default Demo