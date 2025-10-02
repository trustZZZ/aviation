import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Trophy, 
  Search, 
  Filter,
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Activity
} from 'lucide-react';

export function RegionRating() {
  const [sortBy, setSortBy] = useState('flights');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('month');

  // Мок-данные рейтинга регионов
  const regions = [
    {
      rank: 1,
      name: 'Московская область',
      flights: 8420,
      density: 15.2,
      growth: 18.5,
      avgDuration: 2.1,
      peakLoad: 45,
      zeroDays: 2,
      area: 44300
    },
    {
      rank: 2,
      name: 'Санкт-Петербург',
      flights: 6150,
      density: 45.8,
      growth: 12.3,
      avgDuration: 1.8,
      peakLoad: 38,
      zeroDays: 0,
      area: 1439
    },
    {
      rank: 3,
      name: 'Краснодарский край',
      flights: 4320,
      density: 5.7,
      growth: -2.1,
      avgDuration: 2.5,
      peakLoad: 28,
      zeroDays: 5,
      area: 75485
    },
    {
      rank: 4,
      name: 'Свердловская область',
      flights: 3890,
      density: 2.0,
      growth: 8.9,
      avgDuration: 1.9,
      peakLoad: 22,
      zeroDays: 8,
      area: 194307
    },
    {
      rank: 5,
      name: 'Республика Татарстан',
      flights: 3240,
      density: 4.8,
      growth: 15.2,
      avgDuration: 2.0,
      peakLoad: 19,
      zeroDays: 3,
      area: 67847
    },
    {
      rank: 6,
      name: 'Новосибирская область',
      flights: 2890,
      density: 1.6,
      growth: 5.7,
      avgDuration: 2.3,
      peakLoad: 16,
      zeroDays: 12,
      area: 177756
    },
    {
      rank: 7,
      name: 'Челябинская область',
      flights: 2150,
      density: 2.4,
      growth: -5.3,
      avgDuration: 1.7,
      peakLoad: 14,
      zeroDays: 18,
      area: 88529
    },
    {
      rank: 8,
      name: 'Ростовская область',
      flights: 1980,
      density: 2.0,
      growth: 3.8,
      avgDuration: 2.2,
      peakLoad: 12,
      zeroDays: 15,
      area: 100967
    }
  ];

  const getTrendIcon = (growth: number) => {
    if (growth > 5) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (growth < -5) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-yellow-500" />;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Badge className="bg-yellow-500 text-white">🥇 1</Badge>;
    if (rank === 2) return <Badge className="bg-gray-400 text-white">🥈 2</Badge>;
    if (rank === 3) return <Badge className="bg-amber-600 text-white">🥉 3</Badge>;
    return <Badge variant="outline">{rank}</Badge>;
  };

  const filteredRegions = regions.filter(region =>
    region.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1>Рейтинг активности регионов БАС</h1>
        <p className="text-muted-foreground">
          Анализ полетной активности по субъектам Российской Федерации
        </p>
      </div>

      {/* Фильтры и поиск */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Поиск по названию региона..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterPeriod} onValueChange={setFilterPeriod}>
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
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flights">По количеству полетов</SelectItem>
                <SelectItem value="density">По плотности</SelectItem>
                <SelectItem value="growth">По росту</SelectItem>
                <SelectItem value="duration">По длительности</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Топ-3 регионов */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {regions.slice(0, 3).map((region, index) => (
          <Card key={region.rank} className={`relative overflow-hidden ${
            index === 0 ? 'ring-2 ring-yellow-500' : ''
          }`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                {getRankBadge(region.rank)}
                {getTrendIcon(region.growth)}
              </div>
              <CardTitle className="text-lg">{region.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Полеты</span>
                  <span className="font-medium">{region.flights.toLocaleString('ru-RU')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Плотность</span>
                  <span className="font-medium">{region.density} п/1000км²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Рост</span>
                  <span className={`font-medium ${
                    region.growth > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {region.growth > 0 ? '+' : ''}{region.growth}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Полная таблица рейтинга */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Полный рейтинг регионов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Место</th>
                  <th className="text-left p-2">Регион</th>
                  <th className="text-right p-2">Полеты</th>
                  <th className="text-right p-2">Плотность</th>
                  <th className="text-right p-2">Рост</th>
                  <th className="text-right p-2">Ср. время</th>
                  <th className="text-right p-2">Пик нагрузки</th>
                  <th className="text-right p-2">Нулевые дни</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegions.map((region) => (
                  <tr key={region.rank} className="border-b hover:bg-muted/50">
                    <td className="p-2">
                      {getRankBadge(region.rank)}
                    </td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {region.name}
                      </div>
                    </td>
                    <td className="text-right p-2 font-medium">
                      {region.flights.toLocaleString('ru-RU')}
                    </td>
                    <td className="text-right p-2">
                      {region.density}
                    </td>
                    <td className="text-right p-2">
                      <div className="flex items-center justify-end gap-1">
                        {getTrendIcon(region.growth)}
                        <span className={
                          region.growth > 0 ? 'text-green-600' : 
                          region.growth < 0 ? 'text-red-600' : 'text-yellow-600'
                        }>
                          {region.growth > 0 ? '+' : ''}{region.growth}%
                        </span>
                      </div>
                    </td>
                    <td className="text-right p-2">
                      {region.avgDuration} ч
                    </td>
                    <td className="text-right p-2">
                      <div className="flex items-center justify-end gap-1">
                        <Activity className="w-3 h-3 text-muted-foreground" />
                        {region.peakLoad}
                      </div>
                    </td>
                    <td className="text-right p-2">
                      <Badge variant={region.zeroDays === 0 ? 'default' : 'secondary'}>
                        {region.zeroDays}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Дополнительная статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{regions.length}</div>
              <div className="text-sm text-muted-foreground">Активных регионов</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {regions.reduce((sum, r) => sum + r.flights, 0).toLocaleString('ru-RU')}
              </div>
              <div className="text-sm text-muted-foreground">Всего полетов</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {(regions.reduce((sum, r) => sum + r.growth, 0) / regions.length).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Средний рост</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {(regions.reduce((sum, r) => sum + r.density, 0) / regions.length).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Средняя плотность</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}