import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Lock,
  Globe,
  Database,
  Key,
  Activity
} from 'lucide-react';

export function CompliancePanel() {
  const complianceItems = [
    {
      category: 'Нормативное соответствие',
      items: [
        { 
          name: 'ФЗ №149 "Об информации"', 
          status: 'compliant', 
          description: 'Соответствие требованиям по защите информации'
        },
        { 
          name: 'ФЗ №152 "О персональных данных"', 
          status: 'compliant', 
          description: 'Обработка ПД согласно требованиям'
        },
        { 
          name: 'ГОСТ 34.602-89', 
          status: 'compliant', 
          description: 'Техническое задание АС'
        },
        { 
          name: 'ГОСТ 19.201-78', 
          status: 'compliant', 
          description: 'Программная документация'
        }
      ]
    },
    {
      category: 'Технические стандарты',
      items: [
        { 
          name: 'Табель сообщений №13', 
          status: 'compliant', 
          description: 'Приказ Минтранса от 24.01.2013'
        },
        { 
          name: 'Стандарты ИКАО', 
          status: 'compliant', 
          description: 'Международные требования гражданской авиации'
        },
        { 
          name: 'REST API стандарты', 
          status: 'compliant', 
          description: 'OpenAPI 3.0, Swagger документация'
        },
        { 
          name: 'PostGIS/PostgreSQL', 
          status: 'compliant', 
          description: 'Open Source СУБД из ЕРПО'
        }
      ]
    },
    {
      category: 'Безопасность и защита',
      items: [
        { 
          name: 'OpenID Connect', 
          status: 'active', 
          description: 'Аутентификация через Keycloak'
        },
        { 
          name: 'TLS 1.2+', 
          status: 'active', 
          description: 'Шифрование всех каналов связи'
        },
        { 
          name: 'PGP шифрование', 
          status: 'active', 
          description: 'Шифрование данных at-rest'
        },
        { 
          name: 'Раздельные каналы', 
          status: 'configured', 
          description: 'Для партнеров и контролирующих органов'
        }
      ]
    }
  ];

  const performanceMetrics = [
    { name: 'SLA соответствие', value: 99.7, target: 99.5, unit: '%' },
    { name: 'Время обработки 10К полетов', value: 3.2, target: 5.0, unit: 'мин', reverse: true },
    { name: 'Покрытие unit-тестами', value: 84, target: 80, unit: '%' },
    { name: 'Успешность парсинга', value: 99.2, target: 99.0, unit: '%' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'active':
        return <Shield className="w-4 h-4 text-blue-500" />;
      case 'configured':
        return <Key className="w-4 h-4 text-purple-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <Badge className="bg-green-500">Соответствует</Badge>;
      case 'active':
        return <Badge className="bg-blue-500">Активно</Badge>;
      case 'configured':
        return <Badge className="bg-purple-500">Настроено</Badge>;
      default:
        return <Badge variant="secondary">Проверка</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    if (category.includes('Нормативное')) return <FileText className="w-5 h-5" />;
    if (category.includes('Технические')) return <Database className="w-5 h-5" />;
    if (category.includes('Безопасность')) return <Shield className="w-5 h-5" />;
    return <Globe className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Метрики производительности */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Критерии приемки системы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">
                      {metric.value} {metric.unit}
                    </span>
                    {((metric.reverse && metric.value <= metric.target) || 
                      (!metric.reverse && metric.value >= metric.target)) ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <Progress 
                    value={metric.reverse ? 
                      ((metric.target - metric.value) / metric.target) * 100 :
                      (metric.value / metric.target) * 100
                    } 
                    className="h-2" 
                  />
                  <p className="text-xs text-muted-foreground">
                    Требование: {metric.reverse ? '≤' : '≥'} {metric.target} {metric.unit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Соответствие стандартам */}
      {complianceItems.map((section, sectionIndex) => (
        <Card key={sectionIndex}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getCategoryIcon(section.category)}
              {section.category}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    {getStatusIcon(item.status)}
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                  </div>
                  <div>
                    {getStatusBadge(item.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Архитектурная документация */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Техническая документация
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">API документация</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Swagger UI</span>
                  <Badge variant="outline">Доступно</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Postman Collection</span>
                  <Badge variant="outline">Готово</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">REST API методы</span>
                  <Badge variant="outline">Описаны</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Архитектурные диаграммы</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Archi диаграммы</span>
                  <Badge variant="outline">C4 модель</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Компонентная архитектура</span>
                  <Badge variant="outline">Готово</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Инструкции установки</span>
                  <Badge variant="outline">Linux ready</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Мониторинг и логирование */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Мониторинг и трассировка
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="text-lg font-bold text-green-600">Prometheus</div>
              <div className="text-sm text-muted-foreground">Система мониторинга</div>
              <Badge className="bg-green-500">Активно</Badge>
            </div>
            <div className="text-center space-y-2">
              <div className="text-lg font-bold text-blue-600">Grafana</div>
              <div className="text-sm text-muted-foreground">Визуализация метрик</div>
              <Badge className="bg-blue-500">Настроено</Badge>
            </div>
            <div className="text-center space-y-2">
              <div className="text-lg font-bold text-purple-600">Jaeger</div>
              <div className="text-sm text-muted-foreground">Трассировка запросов</div>
              <Badge className="bg-purple-500">Работает</Badge>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4" />
              <span className="font-medium">ELK Stack (логирование)</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>Elasticsearch: Поиск и индексация</div>
              <div>Logstash: Обработка логов</div>
              <div>Kibana: Аналитические дашборды</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}