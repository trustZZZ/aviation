import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  XCircle,
  Download,
  RefreshCw
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export function FlightImport() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importResults, setImportResults] = useState<any>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      setUploadProgress(0);
      
      // Симуляция загрузки
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsProcessing(false);
            setImportResults({
              totalRecords: 2500,
              processed: 2485,
              errors: 15,
              duplicates: 12,
              newFlights: 2473,
              processingTime: '3.2 мин',
              regions: 15
            });
            return 100;
          }
          return prev + Math.random() * 10;
        });
      }, 200);
    }
  };

  const simulateBatchImport = () => {
    setIsProcessing(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setImportResults({
            totalRecords: 8750,
            processed: 8720,
            errors: 30,
            duplicates: 45,
            newFlights: 8675,
            processingTime: '4.8 мин',
            regions: 23
          });
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Импорт данных полетов БАС</h1>
        <p className="text-muted-foreground">
          Загрузка и обработка стандартных сообщений в соответствии с Табелем сообщений
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Загрузка файлов */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Загрузка файлов
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="file-upload">Файл с телеграммами (Табель №13)</Label>
              <Input
                id="file-upload"
                type="file"
                accept=".txt,.csv,.xml,.json"
                onChange={handleFileUpload}
                disabled={isProcessing}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Форматы: TXT, CSV, XML, JSON | Приказ Минтранса №13 от 24.01.2013
              </p>
            </div>

            <div>
              <Label htmlFor="batch-import">Пакетный импорт</Label>
              <div className="flex gap-2 mt-1">
                <Button 
                  onClick={simulateBatchImport}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Импорт из АУВД
                </Button>
                <Button variant="outline" disabled={isProcessing}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {isProcessing && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Обработка данных...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ручной ввод */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Ручной ввод телеграммы
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="telegram-input">Текст телеграммы (ИКАО формат)</Label>
              <Textarea
                id="telegram-input"
                placeholder="FPL-DRONE001-VG&#10;-LKME1200&#10;-N0050A150 LKMR LKMI&#10;-TAS/0050 SEL/ABCD&#10;Пример стандартного сообщения Табеля №13..."
                rows={6}
                disabled={isProcessing}
              />
            </div>
            <Button className="w-full" disabled={isProcessing}>
              Обработать сообщение
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Результаты обработки */}
      {importResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Результаты импорта
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {importResults.processed.toLocaleString('ru-RU')}
                </div>
                <div className="text-sm text-muted-foreground">Обработано</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {importResults.newFlights.toLocaleString('ru-RU')}
                </div>
                <div className="text-sm text-muted-foreground">Новых полетов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {importResults.duplicates}
                </div>
                <div className="text-sm text-muted-foreground">Дубликатов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {importResults.errors}
                </div>
                <div className="text-sm text-muted-foreground">Ошибок</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">
                Время обработки: {importResults.processingTime} (≤5 мин)
              </Badge>
              <Badge variant="outline">
                Субъектов РФ: {importResults.regions} (геопривязка)
              </Badge>
              <Badge variant="outline">
                Записей: {importResults.totalRecords.toLocaleString('ru-RU')} (PostGIS)
              </Badge>
              <Badge variant="outline">
                Парсинг: 99.2% (Табель №13)
              </Badge>
            </div>

            {importResults.errors > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Обнаружены ошибки в {importResults.errors} записях. 
                  <Button variant="link" className="p-0 h-auto ml-1">
                    Скачать отчет об ошибках
                  </Button>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* История импортов */}
      <Card>
        <CardHeader>
          <CardTitle>История импортов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '2024-01-15 14:30', records: 2485, status: 'success', file: 'flights_batch_150124.txt' },
              { date: '2024-01-15 09:15', records: 1890, status: 'success', file: 'morning_flights.csv' },
              { date: '2024-01-14 16:45', records: 3250, status: 'warning', file: 'daily_report_140124.xml' },
              { date: '2024-01-14 11:20', records: 890, status: 'error', file: 'test_data.json' }
            ].map((import_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  {import_.status === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                  {import_.status === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-500" />}
                  {import_.status === 'error' && <XCircle className="w-4 h-4 text-red-500" />}
                  <div>
                    <div className="font-medium">{import_.file}</div>
                    <div className="text-sm text-muted-foreground">{import_.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{import_.records.toLocaleString('ru-RU')} записей</div>
                  <Button variant="ghost" size="sm">
                    Детали
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}