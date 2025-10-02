import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Plane, 
  Clock, 
  Activity,
  AlertTriangle
} from 'lucide-react';
import { FlightChart } from './charts/FlightChart';
import { RegionMap } from './charts/RegionMap';
import { TimeDistribution } from './charts/TimeDistribution';
import { ExtendedMetrics } from './ExtendedMetrics';

interface DashboardProps {
  userRole: 'operator' | 'administrator';
}

export function Dashboard({ userRole }: DashboardProps) {
  // Мок-данные для демонстрации
  const stats = {
    totalFlights: 45672,
    averageDuration: 1.8,
    topRegions: 10,
    systemUptime: 99.7,
    dailyAverage: 1250,
    monthlyGrowth: 15.3
  };

  const recentAlerts = [
    { id: 1, type: 'warning', message: 'Превышение лимита полетов БАС в зоне АУВД МО', time: '2 мин назад' },
    { id: 2, type: 'info', message: 'Обновлены SHP-файлы границ субъектов РФ', time: '1 час назад' },
    { id: 3, type: 'success', message: 'Обработан пакет телеграмм: 2500 сообщений по Табелю №13', time: '3 часа назад' },
    { id: 4, type: 'info', message: 'Интеграция с ЕС ОрВД: получено 1200 новых планов полета', time: '4 часа назад' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Панель управления БАС</h1>
          <p className="text-muted-foreground">
            Мониторинг и аналитика полетов беспилотных авиационных систем
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Activity className="w-3 h-3" />
          Система работает
        </Badge>
      </div>

      {/* Основные метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Полеты БАС (всего)</CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFlights.toLocaleString('ru-RU')}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.monthlyGrowth}% за месяц | SLA: 99.7%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Средняя длительность</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageDuration} ч</div>
            <p className="text-xs text-muted-foreground">
              {stats.dailyAverage} полетов/день
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Графики и карты */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Динамика полетов по месяцам</CardTitle>
          </CardHeader>
          <CardContent>
            <FlightChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Распределение по времени суток</CardTitle>
          </CardHeader>
          <CardContent>
            <TimeDistribution />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Карта активности регионов</CardTitle>
            </CardHeader>
            <CardContent>
              <RegionMap />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Последние события
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'warning' ? 'bg-yellow-500' :
                    alert.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Расширенные метрики */}
      <ExtendedMetrics />
    </div>
  );
}