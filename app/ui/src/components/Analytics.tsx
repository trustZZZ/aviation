import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Calendar,
  Clock,
  MapPin,
  Activity
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart as RechartPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Данные для различных аналитических графиков
  const droneTypeData = [
    { name: 'Мультикоптеры', value: 65, count: 15680 },
    { name: 'Самолетного типа', value: 25, count: 6040 },
    { name: 'Гибридные', value: 8, count: 1930 },
    { name: 'Прочие', value: 2, count: 480 }
  ];

  const hourlyActivity = [
    { hour: '00-02', flights: 45 }, { hour: '02-04', flights: 38 }, { hour: '04-06', flights: 85 },
    { hour: '06-08', flights: 280 }, { hour: '08-10', flights: 420 }, { hour: '10-12', flights: 380 },
    { hour: '12-14', flights: 450 }, { hour: '14-16', flights: 390 }, { hour: '16-18', flights: 310 },
    { hour: '18-20', flights: 180 }, { hour: '20-22', flights: 95 }, { hour: '22-00', flights: 62 }
  ];

  const weeklyPattern = [
    { day: 'Пн', flights: 3200, avg: 3100 }, { day: 'Вт', flights: 3800, avg: 3600 },
    { day: 'Ср', flights: 4200, avg: 4000 }, { day: 'Чт', flights: 3900, avg: 4100 },
    { day: 'Пт', flights: 4600, avg: 4400 }, { day: 'Сб', flights: 2800, avg: 3000 },
    { day: 'Вс', flights: 2200, avg: 2500 }
  ];

  const flightDuration = [
    { duration: '0-30 мин', count: 8520 }, { duration: '30-60 мин', count: 12340 },
    { duration: '1-2 ч', count: 15680 }, { duration: '2-4 ч', count: 8920 },
    { duration: '4-8 ч', count: 3240 }, { duration: '8+ ч', count: 1430 }
  ];

  const seasonalTrend = [
    { month: 'Янв', current: 3200, previous: 2800 }, { month: 'Фев', current: 3800, previous: 3200 },
    { month: 'Мар', current: 4200, previous: 3600 }, { month: 'Апр', current: 3900, previous: 3800 },
    { month: 'Май', current: 4600, previous: 4200 }, { month: 'Июн', current: 5200, previous: 4800 },
    { month: 'Июл', current: 5800, previous: 5400 }, { month: 'Авг', current: 5400, previous: 5200 },
    { month: 'Сен', current: 4900, previous: 4600 }, { month: 'Окт', current: 4300, previous: 4100 },
    { month: 'Ноя', current: 3700, previous: 3500 }, { month: 'Дек', current: 4100, previous: 3800 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Аналитика полетов БАС</h1>
          <p className="text-muted-foreground">
            Детальный анализ данных и тенденций полетной активности
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">За неделю</SelectItem>
              <SelectItem value="month">За месяц</SelectItem>
              <SelectItem value="quarter">За квартал</SelectItem>
              <SelectItem value="year">За год</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Регион" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все регионы</SelectItem>
              <SelectItem value="moscow">Московская область</SelectItem>
              <SelectItem value="spb">Санкт-Петербург</SelectItem>
              <SelectItem value="krasnodar">Краснодарский край</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="temporal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="temporal" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Временной анализ
          </TabsTrigger>
          <TabsTrigger value="geographic" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Географический
          </TabsTrigger>
          <TabsTrigger value="technical" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Технический
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Тренды
          </TabsTrigger>
        </TabsList>

        <TabsContent value="temporal" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Активность по часам</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={hourlyActivity}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip formatter={(value) => [value?.toLocaleString('ru-RU'), 'Полеты']} />
                      <Area type="monotone" dataKey="flights" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Недельная активность</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyPattern}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [
                        value?.toLocaleString('ru-RU'), 
                        name === 'flights' ? 'Текущий период' : 'Среднее'
                      ]} />
                      <Bar dataKey="flights" fill="hsl(var(--chart-1))" />
                      <Bar dataKey="avg" fill="hsl(var(--chart-2))" opacity={0.6} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Длительность полетов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={flightDuration}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="duration" />
                    <YAxis />
                    <Tooltip formatter={(value) => [value?.toLocaleString('ru-RU'), 'Полеты']} />
                    <Bar dataKey="count" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Тепловая карта активности</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="w-12 h-12 mx-auto mb-2" />
                      <p>Интерактивная карта регионов</p>
                      <p className="text-sm">с отображением плотности полетов</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Топ регионов</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: 'Московская область', flights: 8420, share: 25.2 },
                    { name: 'Санкт-Петербург', flights: 6150, share: 18.4 },
                    { name: 'Краснодарский край', flights: 4320, share: 12.9 },
                    { name: 'Свердловская область', flights: 3890, share: 11.6 },
                    { name: 'Республика Татарстан', flights: 3240, share: 9.7 }
                  ].map((region, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{region.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {region.flights.toLocaleString('ru-RU')} полетов
                        </div>
                      </div>
                      <Badge variant="outline">{region.share}%</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Типы БАС</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartPieChart>
                      <Pie
                        data={droneTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {droneTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                    </RechartPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Статистика по типам</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {droneTypeData.map((type, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{type.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {type.count.toLocaleString('ru-RU')} полетов
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${type.value}%`,
                          backgroundColor: COLORS[index % COLORS.length]
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Дополнительные технические метрики */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">2.1</div>
                  <div className="text-sm text-muted-foreground">Средняя длительность (ч)</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">45</div>
                  <div className="text-sm text-muted-foreground">Пиковая нагрузка (полетов/час)</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">12.3</div>
                  <div className="text-sm text-muted-foreground">Среднее расстояние (км)</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">98.7%</div>
                  <div className="text-sm text-muted-foreground">Успешность полетов</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Сезонные тренды</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={seasonalTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [
                      value?.toLocaleString('ru-RU'), 
                      name === 'current' ? 'Текущий год' : 'Предыдущий год'
                    ]} />
                    <Line type="monotone" dataKey="current" stroke="hsl(var(--chart-1))" strokeWidth={3} />
                    <Line type="monotone" dataKey="previous" stroke="hsl(var(--chart-2))" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Прогноз роста</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-green-600">+15.3%</div>
                  <div className="text-sm text-muted-foreground">Ожидаемый рост в следующем месяце</div>
                  <Badge variant="outline" className="mt-2">Высокая вероятность</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Активность выходных</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-blue-600">-22%</div>
                  <div className="text-sm text-muted-foreground">Снижение в выходные дни</div>
                  <Badge variant="secondary" className="mt-2">Стабильная тенденция</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Пиковое время</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-orange-600">12-14</div>
                  <div className="text-sm text-muted-foreground">Часы максимальной активности</div>
                  <Badge variant="default" className="mt-2">450 полетов/час</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}