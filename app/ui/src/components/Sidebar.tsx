import { 
  BarChart3, 
  Upload, 
  Trophy, 
  TrendingUp, 
  FileText, 
  Settings,
  Plane,
  Shield,
  Users,
  Code
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  userRole: 'operator' | 'administrator';
}

export function Sidebar({ currentPage, setCurrentPage, userRole }: SidebarProps) {
  const navigationItems = [
    { id: 'dashboard', label: 'Главная панель', icon: BarChart3, roles: ['operator', 'administrator'] },
    { id: 'import', label: 'Импорт данных', icon: Upload, roles: ['operator', 'administrator'] },
    { id: 'rating', label: 'Рейтинг регионов', icon: Trophy, roles: ['operator', 'administrator'] },
    { id: 'analytics', label: 'Аналитика', icon: TrendingUp, roles: ['operator', 'administrator'] },
    { id: 'reports', label: 'Отчеты', icon: FileText, roles: ['operator', 'administrator'] },
    { id: 'api', label: 'API документация', icon: Code, roles: ['administrator'] },
    { id: 'settings', label: 'Настройки', icon: Settings, roles: ['administrator'] },
  ];

  const filteredItems = navigationItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="w-64 bg-card border-r border-border h-screen p-4 flex flex-col">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <Plane className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-medium">БАС Аналитика</h1>
            <p className="text-sm text-muted-foreground">Госкорпорация ОРВД</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-4">
          {userRole === 'operator' ? (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              Оператор
            </Badge>
          ) : (
            <Badge variant="default" className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Администратор
            </Badge>
          )}
        </div>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {filteredItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <li key={item.id}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setCurrentPage(item.id)}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Версия 1.0.0<br />
          © 2024 Госкорпорация ОРВД
        </p>
      </div>
    </div>
  );
}