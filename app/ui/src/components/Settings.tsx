import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Database,
  Bell,
  Key,
  Globe,
  RefreshCw,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { CompliancePanel } from './CompliancePanel';

interface SettingsProps {
  userRole: 'operator' | 'administrator';
  setUserRole: (role: 'operator' | 'administrator') => void;
}

export function Settings({ userRole, setUserRole }: SettingsProps) {
  const [notifications, setNotifications] = useState({
    emailReports: true,
    systemAlerts: true,
    importNotifications: false,
    errorAlerts: true
  });

  const [systemConfig, setSystemConfig] = useState({
    autoRefresh: true,
    refreshInterval: '30',
    maxRecordsPerImport: '10000',
    sessionTimeout: '120',
    logLevel: 'info'
  });

  const handleRoleChange = (newRole: string) => {
    setUserRole(newRole as 'operator' | 'administrator');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Настройки системы</h1>
        <p className="text-muted-foreground">
          Конфигурация системы анализа полетов БАС
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Профиль
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Уведомления
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Система
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Безопасность
          </TabsTrigger>
          <TabsTrigger value="integration" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Интеграция
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Соответствие
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Информация пользователя</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">Имя пользователя</Label>
                  <Input id="username" value="admin.user" disabled />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value="admin@orwd.ru" />
                </div>
              </div>

              <div>
                <Label htmlFor="role">Роль пользователя</Label>
                <Select value={userRole} onValueChange={handleRoleChange}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operator">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Оператор
                      </div>
                    </SelectItem>
                    <SelectItem value="administrator">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Администратор
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Подразделение</Label>
                  <Input id="department" value="Отдел ОРВД" />
                </div>
                <div>
                  <Label htmlFor="position">Должность</Label>
                  <Input id="position" value="Системный администратор" />
                </div>
              </div>

              <Button className="w-full">
                Сохранить изменения
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Права доступа</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Импорт данных</span>
                  <Badge variant="default">Разрешено</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Экспорт отчетов</span>
                  <Badge variant="default">Разрешено</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Настройки системы</span>
                  <Badge variant={userRole === 'administrator' ? 'default' : 'secondary'}>
                    {userRole === 'administrator' ? 'Разрешено' : 'Ограничено'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Управление пользователями</span>
                  <Badge variant={userRole === 'administrator' ? 'default' : 'secondary'}>
                    {userRole === 'administrator' ? 'Разрешено' : 'Запрещено'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Настройки уведомлений</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email отчеты</Label>
                  <p className="text-sm text-muted-foreground">
                    Автоматическая отправка ежедневных отчетов
                  </p>
                </div>
                <Switch 
                  checked={notifications.emailReports}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, emailReports: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Системные предупреждения</Label>
                  <p className="text-sm text-muted-foreground">
                    Уведомления о состоянии системы
                  </p>
                </div>
                <Switch 
                  checked={notifications.systemAlerts}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, systemAlerts: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Уведомления об импорте</Label>
                  <p className="text-sm text-muted-foreground">
                    Статус обработки загруженных файлов
                  </p>
                </div>
                <Switch 
                  checked={notifications.importNotifications}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, importNotifications: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Критические ошибки</Label>
                  <p className="text-sm text-muted-foreground">
                    Немедленные уведомления об ошибках
                  </p>
                </div>
                <Switch 
                  checked={notifications.errorAlerts}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, errorAlerts: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Системные параметры</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Автообновление данных</Label>
                  <p className="text-sm text-muted-foreground">
                    Автоматическое обновление дашборда
                  </p>
                </div>
                <Switch 
                  checked={systemConfig.autoRefresh}
                  onCheckedChange={(checked) => 
                    setSystemConfig(prev => ({ ...prev, autoRefresh: checked }))
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="refresh-interval">Интервал обновления (сек)</Label>
                  <Input 
                    id="refresh-interval"
                    type="number"
                    value={systemConfig.refreshInterval}
                    onChange={(e) => 
                      setSystemConfig(prev => ({ ...prev, refreshInterval: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="max-records">Макс. записей на импорт</Label>
                  <Input 
                    id="max-records"
                    type="number"
                    value={systemConfig.maxRecordsPerImport}
                    onChange={(e) => 
                      setSystemConfig(prev => ({ ...prev, maxRecordsPerImport: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="session-timeout">Таймаут сессии (мин)</Label>
                  <Input 
                    id="session-timeout"
                    type="number"
                    value={systemConfig.sessionTimeout}
                    onChange={(e) => 
                      setSystemConfig(prev => ({ ...prev, sessionTimeout: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="log-level">Уровень логирования</Label>
                  <Select 
                    value={systemConfig.logLevel} 
                    onValueChange={(value) => 
                      setSystemConfig(prev => ({ ...prev, logLevel: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debug">Debug</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Обслуживание системы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Очистить кэш
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Экспорт логов
                </Button>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Последнее обновление шейп-файлов границ: 15.01.2024
                  <Button variant="link" className="p-0 h-auto ml-1">
                    Обновить сейчас
                  </Button>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Настройки безопасности</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Смена пароля</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <Input type="password" placeholder="Текущий пароль" />
                  <Input type="password" placeholder="Новый пароль" />
                  <Input type="password" placeholder="Подтверждение пароля" />
                </div>
                <Button className="mt-2">
                  <Key className="w-4 h-4 mr-2" />
                  Изменить пароль
                </Button>
              </div>

              <div className="space-y-3">
                <Label>Активные сессии</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium">Текущая сессия</div>
                      <div className="text-sm text-muted-foreground">
                        IP: 192.168.1.10 • Браузер: Chrome
                      </div>
                    </div>
                    <Badge variant="default">Активна</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium">Сессия #2</div>
                      <div className="text-sm text-muted-foreground">
                        IP: 192.168.1.25 • Браузер: Firefox
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Завершить</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API и интеграции</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>API ключи</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center gap-2">
                    <Input value="sk-***************************" disabled />
                    <Button variant="outline" size="sm">Показать</Button>
                    <Button variant="outline" size="sm">Обновить</Button>
                  </div>
                </div>
              </div>

              <div>
                <Label>Webhook URL</Label>
                <Input 
                  className="mt-2"
                  placeholder="https://your-system.ru/webhooks/bas-flights"
                />
              </div>

              <div className="space-y-3">
                <Label>Статус интеграций</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>ERP система</span>
                    <Badge variant="default">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Подключено
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Система АУВД</span>
                    <Badge variant="default">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Активно
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>GIS портал</span>
                    <Badge variant="secondary">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Не настроено
                    </Badge>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Тестировать подключения
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <CompliancePanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}