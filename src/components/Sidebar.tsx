import {
  Zap,
  GraduationCap,
  Settings
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { useUserMode } from '@/contexts/UserModeContext';
import { NAVIGATION_ITEMS, APP_BRANDING, USER_MODE_LABELS, SETTINGS_MENU } from '@/constants';

export function Sidebar() {
  const { userMode, setUserMode } = useUserMode();

  return (
    <aside className="w-72 bg-black/30 backdrop-blur-xl border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white">{APP_BRANDING.name}</h1>
            <p className="text-xs text-white/60">{APP_BRANDING.tagline}</p>
          </div>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="p-4 border-b border-white/10">
        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-white/80">모드</span>
            </div>
            <Badge variant={userMode === 'beginner' ? 'default' : 'secondary'} className="text-xs">
              {USER_MODE_LABELS[userMode]}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/60">{USER_MODE_LABELS.beginner}</span>
            <Switch
              checked={userMode === 'expert'}
              onCheckedChange={(checked: boolean) => setUserMode(checked ? 'expert' : 'beginner')}
            />
            <span className="text-xs text-white/60">{USER_MODE_LABELS.expert}</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {NAVIGATION_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${isActive
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-purple-500/30'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <Button variant="ghost" className="w-full justify-start text-white/60 hover:text-white hover:bg-white/5">
          <Settings className="w-5 h-5 mr-3" />
          {SETTINGS_MENU.label}
        </Button>
      </div>
    </aside>
  );
}
