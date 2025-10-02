import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  FileText, 
  Download, 
  Calendar,
  Filter,
  Image,
  Table,
  BarChart3,
  FileJson,
  FileSpreadsheet,
  Printer,
  Mail,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export function Reports() {
  const [reportType, setReportType] = useState('summary');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [dateFrom, setDateFrom] = useState('2024-01-01');
  const [dateTo, setDateTo] = useState('2024-01-31');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [includeCharts, setIncludeCharts] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const reportTypes = [
    { id: 'summary', name: 'Сводный отчет', description: 'Общая статистика по всем полетам' },
    { id: 'regional', name: 'Региональный анализ', description: 'Детальная статистика по регионам' },
    { id: 'technical', name: 'Технический отчет', description: 'Анализ типов БАС и технических параметров' },
    { id: 'temporal', name: 'Временной анализ', description: 'Динамика полетов по времени' },
    { id: 'compliance', name: 'Отчет соответствия', description: 'Соответствие нормативным требованиям' }
  ];

  const regions = [
    'Московская область', 'Санкт-Петербург', 'Краснодарский край',
    'Свердловская область', 'Республика Татарстан', 'Новосибирская область',
    'Челябинская область', 'Ростовская область'
  ];

  const recentReports = [
    {
      id: 1,
      name: 'Сводный отчет - Январь 2024',
      type: 'summary',
      format: 'PDF',
      created: '2024-01-31 18:30',
      size: '2.4 МБ',
      status: 'ready'
    },
    {
      id: 2,
      name: 'Региональный анализ - Q4 2023',
      type: 'regional',
      format: 'Excel',
      created: '2024-01-15 14:20',
      size: '5.8 МБ',
      status: 'ready'
    },
    {
      id: 3,
      name: 'Технический отчет - Декабрь 2023',
      type: 'technical',
      format: 'JSON',
      created: '2024-01-10 09:15',
      size: '890 КБ',
      status: 'ready'
    },
    {
      id: 4,
      name: 'Отчет соответствия - 2023',
      type: 'compliance',
      format: 'PDF',
      created: '2024-01-05 16:45',
      size: '3.2 МБ',
      status: 'processing'
    }
  ];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  };

  const handleRegionToggle = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'pdf': return <FileText className="w-4 h-4" />;
      case 'excel': return <FileSpreadsheet className="w-4 h-4" />;
      case 'json': return <FileJson className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Готов</Badge>;
      case 'processing':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Обработка</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Генерация отчетов</h1>
        <p className="text-muted-foreground">
          Создание и экспорт аналитических отчетов по полетам БАС
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Настройки отчета */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Параметры отчета
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Тип отчета */}
              <div>
                <Label>Тип отчета</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {reportTypes.map((type) => (
                    <div 
                      key={type.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        reportType === type.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setReportType(type.id)}
                    >
                      <div className="font-medium">{type.name}</div>
                      <div className="text-sm text-muted-foreground">{type.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Период */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date-from">Дата начала</Label>
                  <Input
                    id="date-from"
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="date-to">Дата окончания</Label>
                  <Input
                    id="date-to"
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
              </div>

              {/* Регионы */}
              <div>
                <Label>Регионы (оставьте пустым для всех)</Label>
                <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
                  {regions.map((region) => (
                    <div key={region} className="flex items-center space-x-2">
                      <Checkbox
                        id={region}
                        checked={selectedRegions.includes(region)}
                        onCheckedChange={() => handleRegionToggle(region)}
                      />
                      <Label htmlFor={region} className="text-sm">
                        {region}
                      </Label>
                    </div>
                  ))}
                </div>
                {selectedRegions.length > 0 && (
                  <div className="mt-2">
                    <Badge variant="outline">
                      Выбрано: {selectedRegions.length} регионов
                    </Badge>
                  </div>
                )}
              </div>

              {/* Дополнительные параметры */}
              <div>
                <Label>Дополнительные параметры</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-charts"
                      checked={includeCharts}
                      onCheckedChange={setIncludeCharts}
                    />
                    <Label htmlFor="include-charts">Включить графики и диаграммы</Label>
                  </div>
                </div>
              </div>

              {/* Формат экспорта */}
              <div>
                <Label>Формат экспорта</Label>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF документ</SelectItem>
                    <SelectItem value="excel">Excel таблица</SelectItem>
                    <SelectItem value="json">JSON данные</SelectItem>
                    <SelectItem value="csv">CSV файл</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Генерация */}
              <div className="space-y-4">
                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Генерация отчета...</span>
                      <span>{Math.round(generationProgress)}%</span>
                    </div>
                    <Progress value={generationProgress} />
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    onClick={handleGenerateReport}
                    disabled={isGenerating}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {isGenerating ? 'Генерация...' : 'Создать отчет'}
                  </Button>
                  <Button variant="outline" disabled={isGenerating}>
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" disabled={isGenerating}>
                    <Printer className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {generationProgress === 100 && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Отчет успешно создан! Файл готов для скачивания.
                <Button variant="link" className="p-0 h-auto ml-1">
                  Скачать сейчас
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Боковая панель */}
        <div className="space-y-4">
          {/* Быстрые шаблоны */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Быстрые шаблоны</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Месячная сводка
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Table className="w-4 h-4 mr-2" />
                Детальная таблица
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Image className="w-4 h-4 mr-2" />
                Графический отчет
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <FileJson className="w-4 h-4 mr-2" />
                API экспорт
              </Button>
            </CardContent>
          </Card>

          {/* Статистика */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Статистика периода</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Всего полетов</span>
                <span className="font-medium">24,130</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Регионов</span>
                <span className="font-medium">15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Средняя длительность</span>
                <span className="font-medium">2.1 ч</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Рост за период</span>
                <span className="font-medium text-green-600">+15.3%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* История отчетов */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Недавние отчеты
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getFormatIcon(report.format)}
                  <div>
                    <div className="font-medium">{report.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {report.created} • {report.size}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(report.status)}
                  {report.status === 'ready' && (
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}