import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Activity,
  AlertCircle,
  CheckCircle,
  Calendar,
  BarChart3
} from 'lucide-react';

export function ExtendedMetrics() {
  // Дополнительные метрики согласно п.7 ТЗ
  const extendedMetrics = {
    peakLoad: 45, // максимальное число полетов за час
    dailyAverage: 1250, // среднесуточная динамика
    dailyMedian: 1180, // медианное число полетов в сутки
    monthlyGrowth: 15.3, // рост/падение за месяц
    flightDensity: 12.4, // Flight Density: полетов на 1000 км²
    zeroDays: 8, // количество дней без полетов
    morningFlights: 28, // утренняя активность %
    dayFlights: 52, // дневная активность %
    eveningFlights: 20, // вечерняя активность %
    processingTime: 3.2, // время обработки 10К полетов (мин)
    parsingSuccess: 99.2, // процент успешного парсинга
    geoBindingAccuracy: 100 // точность геопривязки %
  };

  const getPerformanceBadge = (value: number, threshold: number, reverse = false) => {
    const isGood = reverse ? value <= threshold : value >= threshold;
    return (
      <Badge variant={isGood ? 'default' : 'destructive'} className="ml-2">
        {isGood ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
        {isGood ? 'Норма' : 'Внимание'}
      </Badge>
    );
  };

  const getTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Дополнительные метрики полетов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Пиковая нагрузка
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{extendedMetrics.peakLoad}</div>
            <p className="text-xs text-muted-foreground">полетов за час</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Среднесуточная динамика
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              Ср: {extendedMetrics.dailyAverage.toLocaleString('ru-RU')}
            </div>
            <div className="text-lg font-bold">
              Мед: {extendedMetrics.dailyMedian.toLocaleString('ru-RU')}
            </div>
            <p className="text-xs text-muted-foreground">полетов в сутки</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {getTrendIcon(extendedMetrics.monthlyGrowth)}
              Рост за месяц
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +{extendedMetrics.monthlyGrowth}%
            </div>
            <p className="text-xs text-muted-foreground">по сравнению с пред. месяцем</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Flight Density</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{extendedMetrics.flightDensity}</div>
            <p className="text-xs text-muted-foreground">полетов на 1000 км² (Росстат)</p>
          </CardContent>
        </Card>
      </div>

      {/* Дневная активность */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Распределение полетов по времени суток
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">{extendedMetrics.morningFlights}%</div>
              <div className="text-sm text-muted-foreground">Утро (06:00-12:00)</div>
              <Progress value={extendedMetrics.morningFlights} className="mt-2 h-2" />
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">{extendedMetrics.dayFlights}%</div>
              <div className="text-sm text-muted-foreground">День (12:00-18:00)</div>
              <Progress value={extendedMetrics.dayFlights} className="mt-2 h-2" />
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-orange-600">{extendedMetrics.eveningFlights}%</div>
              <div className="text-sm text-muted-foreground">Вечер (18:00-00:00)</div>
              <Progress value={extendedMetrics.eveningFlights} className="mt-2 h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Нулевые дни */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Анализ активности по субъектам
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-medium">Нулевые дни за месяц</div>
              <p className="text-sm text-muted-foreground">
                Количество дней без полетов по субъектам РФ
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-yellow-600">{extendedMetrics.zeroDays}</div>
              <div className="text-sm text-muted-foreground">дней в среднем</div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {[
              { region: 'Чукотский АО', days: 28 },
              { region: 'Ненецкий АО', days: 25 },
              { region: 'Магаданская область', days: 22 },
              { region: 'Камчатский край', days: 18 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span>{item.region}</span>
                <Badge variant={item.days > 20 ? 'destructive' : 'secondary'}>
                  {item.days} дней
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}