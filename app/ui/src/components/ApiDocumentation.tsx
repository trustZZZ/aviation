import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Code, 
  FileText, 
  Download,
  ExternalLink,
  Database,
  Globe,
  Key,
  Clock
} from 'lucide-react';

export function ApiDocumentation() {
  const apiEndpoints = [
    {
      method: 'POST',
      path: '/api/v1/flights/import',
      description: 'Импорт пакета полетов БАС',
      params: 'Файл с телеграммами (Табель №13)',
      response: 'Статус обработки, метрики, ошибки'
    },
    {
      method: 'GET',
      path: '/api/v1/flights/rating',
      description: 'Рейтинг активности регионов',
      params: 'from, to, region_id (опционально)',
      response: 'Список регионов с метриками'
    },
    {
      method: 'GET',
      path: '/api/v1/flights/analytics',
      description: 'Аналитические данные полетов',
      params: 'period, metrics, format',
      response: 'Агрегированная статистика'
    },
    {
      method: 'POST',
      path: '/api/v1/reports/generate',
      description: 'Генерация отчета on-demand',
      params: 'report_type, period, regions, format',
      response: 'URL для скачивания отчета'
    },
    {
      method: 'GET',
      path: '/api/v1/geo/regions',
      description: 'Справочник субъектов РФ',
      params: 'Нет',
      response: 'Список регионов с границами'
    },
    {
      method: 'POST',
      path: '/api/v1/webhook/flights',
      description: 'Webhook для ERP интеграции',
      params: 'JSON с данными полетов',
      response: 'Подтверждение получения'
    }
  ];

  const sampleRequests = {
    import: `curl -X POST "${window.location.origin}/api/v1/flights/import" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@flights_batch.txt" \\
  -F "validate=true"`,
    
    rating: `curl -X GET "${window.location.origin}/api/v1/flights/rating?from=2024-01-01&to=2024-01-31" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Accept: application/json"`,
    
    webhook: `{
  "flight_id": "DRONE001-20240115",
  "aircraft_type": "БПЛА",
  "departure": {
    "coordinates": [55.7558, 37.6176],
    "region_code": "77",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "arrival": {
    "coordinates": [55.8558, 37.7176],
    "region_code": "77", 
    "timestamp": "2024-01-15T12:15:00Z"
  },
  "duration_minutes": 105
}`
  };

  const responseExamples = {
    rating: `{
  "success": true,
  "data": {
    "period": "2024-01",
    "regions": [
      {
        "region_id": "77",
        "name": "Московская область",
        "flights_count": 8420,
        "flight_density": 15.2,
        "growth_percent": 18.5,
        "rank": 1
      }
    ],
    "total_flights": 45672,
    "processing_time_ms": 234
  }
}`,
    
    metrics: `{
  "success": true,
  "metrics": {
    "peak_load_per_hour": 45,
    "daily_average": 1250,
    "daily_median": 1180,
    "monthly_growth": 15.3,
    "zero_days_count": 8,
    "time_distribution": {
      "morning": 28,
      "day": 52,
      "evening": 20
    }
  }
}`
  };

  const getMethodBadge = (method: string) => {
    const colors = {
      'GET': 'bg-green-500',
      'POST': 'bg-blue-500',
      'PUT': 'bg-yellow-500',
      'DELETE': 'bg-red-500'
    };
    return <Badge className={colors[method as keyof typeof colors] || 'bg-gray-500'}>{method}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>API документация</h1>
        <p className="text-muted-foreground">
          REST API для интеграции с системой анализа полетов БАС
        </p>
      </div>

      <Tabs defaultValue="endpoints" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="endpoints">Методы API</TabsTrigger>
          <TabsTrigger value="examples">Примеры запросов</TabsTrigger>
          <TabsTrigger value="responses">Ответы API</TabsTrigger>
          <TabsTrigger value="integration">Интеграция</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Доступные методы API
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center gap-3">
                      {getMethodBadge(endpoint.method)}
                      <code className="bg-muted px-2 py-1 rounded text-sm">{endpoint.path}</code>
                    </div>
                    <p className="text-sm">{endpoint.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div><strong>Параметры:</strong> {endpoint.params}</div>
                      <div><strong>Ответ:</strong> {endpoint.response}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <Key className="w-8 h-8 mx-auto text-blue-500" />
                  <h3 className="font-medium">Аутентификация</h3>
                  <p className="text-sm text-muted-foreground">OpenID Connect (Keycloak)</p>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Получить токен
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <FileText className="w-8 h-8 mx-auto text-green-500" />
                  <h3 className="font-medium">Swagger UI</h3>
                  <p className="text-sm text-muted-foreground">Интерактивная документация</p>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Открыть Swagger
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <Download className="w-8 h-8 mx-auto text-purple-500" />
                  <h3 className="font-medium">Postman Collection</h3>
                  <p className="text-sm text-muted-foreground">Готовые запросы</p>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Скачать
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Примеры cURL запросов</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Импорт полетов</h4>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{sampleRequests.import}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">Получение рейтинга регионов</h4>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{sampleRequests.rating}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">Webhook payload (ERP интеграция)</h4>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{sampleRequests.webhook}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Примеры ответов API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Рейтинг регионов</h4>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{responseExamples.rating}</code>
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">Расширенные метрики</h4>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{responseExamples.metrics}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Коды ошибок</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <code>400 Bad Request</code>
                  <span className="text-sm text-muted-foreground">Неверный формат данных</span>
                </div>
                <div className="flex items-center justify-between">
                  <code>401 Unauthorized</code>
                  <span className="text-sm text-muted-foreground">Требуется аутентификация</span>
                </div>
                <div className="flex items-center justify-between">
                  <code>403 Forbidden</code>
                  <span className="text-sm text-muted-foreground">Недостаточно прав</span>
                </div>
                <div className="flex items-center justify-between">
                  <code>429 Too Many Requests</code>
                  <span className="text-sm text-muted-foreground">Превышен лимит запросов</span>
                </div>
                <div className="flex items-center justify-between">
                  <code>500 Internal Server Error</code>
                  <span className="text-sm text-muted-foreground">Ошибка сервера</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Интеграция с внешними системами
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">ERP системы</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    <span>Двусторонний обмен через REST API</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Webhook уведомления в реальном времени</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>JSON формат обмена данными</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Система АУВД</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <span>Автоматический импорт планов полета</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    <span>Парсинг телеграмм по Табелю №13</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>Интеграция с ЕС ОрВД</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">GIS порталы</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    <span>PostGIS для геопространственных данных</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Поддержка SHP-файлов границ РФ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Ежемесячное обновление границ</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Техническая архитектура</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Backend технологии</h5>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>• Node.js / Java Spring Boot / Python</div>
                    <div>• PostgreSQL с PostGIS расширением</div>
                    <div>• GiST индексы для пространственных запросов</div>
                    <div>• Микросервисная архитектура</div>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Мониторинг и развертывание</h5>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>• CI/CD с автоматическим тестированием</div>
                    <div>• Prometheus + Grafana мониторинг</div>
                    <div>• ELK стек для логирования</div>
                    <div>• Linux совместимость (SUSE, CentOS)</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}