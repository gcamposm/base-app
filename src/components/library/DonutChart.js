import { memo } from 'react';
import {
  ResponsiveContainer,
  Tooltip,
  Pie,
  PieChart,
  Sector,
  Cell
} from 'recharts';
import numbro from 'numbro';

const DonutMySuiteChart = ({ chart, type }) => {
  const formatValue = value => {
    if (type === 'int') return numbro(value).format({ spaceSeparated: true });
    return numbro(value).format({ spaceSeparated: true, totalLength: 3, average: true });
  };

  // From this on, only dummy data
  const data = [
    { name: 'Retirado', value: 100 },
    { name: 'Entregado a Courier', value: 500 },
    { name: 'En ruta', value: 300 },
    { name: 'Entregado', value: 100 },
    { name: 'Gestión pendiente', value: 100 }
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF0000', '#5D1048'];  

  // Until here

  return (
    <ResponsiveContainer width="100%" height={230}>
      <PieChart
        width={500}
        height={200}
        // data={chart}
      >
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data}
          cx={130}
          cy={100}
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          label
          >
          {
            data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default memo(DonutMySuiteChart);
