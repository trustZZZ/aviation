import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Янв', flights: 3200, predictions: 3100 },
  { month: 'Фев', flights: 3800, predictions: 3600 },
  { month: 'Мар', flights: 4200, predictions: 4000 },
  { month: 'Апр', flights: 3900, predictions: 4100 },
  { month: 'Май', flights: 4600, predictions: 4400 },
  { month: 'Июн', flights: 5200, predictions: 5000 },
  { month: 'Июл', flights: 5800, predictions: 5600 },
  { month: 'Авг', flights: 5400, predictions: 5500 },
  { month: 'Сен', flights: 4900, predictions: 5200 },
  { month: 'Окт', flights: 4300, predictions: 4600 },
  { month: 'Ноя', flights: 3700, predictions: 4000 },
  { month: 'Дек', flights: 4100, predictions: 3900 }
];

export function FlightChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [
              value?.toLocaleString('ru-RU'), 
              name === 'flights' ? 'Полеты' : 'Прогноз'
            ]}
            labelFormatter={(label) => `Месяц: ${label}`}
          />
          <Line 
            type="monotone" 
            dataKey="flights" 
            stroke="#89B6FB" 
            strokeWidth={2}
            dot={{ fill: '#89B6FB', r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="predictions" 
            stroke="#B4B73D" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#B4B73D', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}