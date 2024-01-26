import { memo } from 'react';
import {
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

const BarDashboardChart = ({ chart, yAxisLabel }) => {
  const formatValueWithPercentage = value => `${value} %`;

  const formatAxisValue = value => {
    return value;
  };

  const formatStringToInt = value => {
    if (typeof value === 'string') {
      const parsedValue = parseInt(value.split(' ')[0]);
      return parsedValue;
    }
    return value;
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        width={700}
        height={250}
        data={chart}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          unit="%"
          ticks={[0, 25, 50, 75, 100]}
          domain={[0, 'dataMax - 100']}
          // tickFormatter={formatAxisValue}
          label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
        />
        <Tooltip formatter={formatValueWithPercentage} />
        <Legend verticalAlign="top" height={36} />
        <Bar
          name="Actual"
          dataKey={value => formatStringToInt(value['current'])}
          stackId="a"
          fill="#82ca9d"
        />
        <Bar
          name="Anterior"
          dataKey={value => formatStringToInt(value['last'])}
          stackId="a"
          fill="#8884d8"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default memo(BarDashboardChart);
