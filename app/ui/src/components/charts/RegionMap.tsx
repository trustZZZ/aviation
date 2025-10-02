import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { MapPin, Maximize2 } from 'lucide-react';

export function RegionMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Мок-данные для регионов
  const regions = [
    { name: 'Московская область', flights: 8420, density: 15.2, coords: { x: '35%', y: '25%' } },
    { name: 'Санкт-Петербург', flights: 6150, density: 45.8, coords: { x: '30%', y: '15%' } },
    { name: 'Краснодарский край', flights: 4320, density: 5.7, coords: { x: '40%', y: '70%' } },
    { name: 'Свердловская область', flights: 3890, density: 2.0, coords: { x: '60%', y: '30%' } },
    { name: 'Республика Татарстан', flights: 3240, density: 4.8, coords: { x: '50%', y: '35%' } },
    { name: 'Новосибирская область', flights: 2890, density: 1.6, coords: { x: '75%', y: '40%' } },
    { name: 'Челябинская область', flights: 2150, density: 2.4, coords: { x: '58%', y: '38%' } },
    { name: 'Ростовская область', flights: 1980, density: 2.0, coords: { x: '42%', y: '60%' } }
  ];

  const getIntensityColor = (flights: number) => {
    if (flights > 6000) return 'bg-red-500';
    if (flights > 4000) return 'bg-orange-500';
    if (flights > 2000) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="relative">
      {/* Упрощенная карта России */}
      <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg h-96 overflow-hidden">
        {/* Контур карты (упрощенный) */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400">
          <path
            d="M50,150 Q100,120 200,140 Q300,130 450,135 Q600,140 750,150 L750,300 Q600,280 450,285 Q300,290 200,295 Q100,300 50,280 Z"
            fill="rgba(59, 130, 246, 0.1)"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="2"
          />
        </svg>

        {/* Точки регионов */}
        {regions.map((region, index) => (
          <div
            key={index}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: region.coords.x, top: region.coords.y }}
            onClick={() => setSelectedRegion(selectedRegion === region.name ? null : region.name)}
          >
            <div 
              className={`w-4 h-4 rounded-full ${getIntensityColor(region.flights)} opacity-80 hover:opacity-100 transition-opacity animate-pulse`}
            />
            {selectedRegion === region.name && (
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white border border-border rounded-lg p-3 shadow-lg z-10 min-w-48">
                <h4 className="font-medium mb-2">{region.name}</h4>
                <div className="space-y-1 text-sm">
                  <div>Полеты: {region.flights.toLocaleString('ru-RU')}</div>
                  <div>Плотность: {region.density} полетов/1000км²</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Легенда */}
      <div className="mt-4 flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium">Интенсивность полетов:</span>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-xs">≤2000</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <span className="text-xs">2001-4000</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-orange-500 rounded-full" />
          <span className="text-xs">4001-6000</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-xs">&gt;6000</span>
        </div>
      </div>

      {/* Кнопка полноэкранного просмотра */}
      <Button 
        variant="outline" 
        size="sm" 
        className="absolute top-2 right-2"
      >
        <Maximize2 className="w-4 h-4" />
      </Button>
    </div>
  );
}