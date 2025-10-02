import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { hour: '00', flights: 45 },
  { hour: '02', flights: 38 },
  { hour: '04', flights: 42 },
  { hour: '06', flights: 125 },
  { hour: '08', flights: 280 },
  { hour: '10', flights: 420 },
  { hour: '12', flights: 380 },
  { hour: '14', flights: 450 },
  { hour: '16', flights: 390 },
  { hour: '18', flights: 310 },
  { hour: '20', flights: 180 },
  { hour: '22', flights: 95 }
];

export function TimeDistribution() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [value?.toLocaleString('ru-RU'), 'Полеты']}
            labelFormatter={(label) => `${label}:00`}
          />
          <Bar 
            dataKey="flights" 
            fill="#B4B73D" 
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}