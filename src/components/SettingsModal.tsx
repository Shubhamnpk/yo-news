import React from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Moon, 
  Sun, 
  Monitor,
  Volume2,
  VolumeX,
  Bell,
  BellOff,
  Eye,
  EyeOff,
  Share2,
  Image,
  ImageOff,
  RefreshCw,
  Clock,
  Layout
} from 'lucide-react';
import { Settings } from '../types/news';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

export function SettingsModal({ isOpen, onClose, settings, onSettingsChange }: SettingsModalProps) {
  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    onSettingsChange({ ...settings, theme });
  };

  const SettingToggle = ({ 
    checked, 
    onChange, 
    label, 
    icon: Icon,
    offIcon: OffIcon,
    description 
  }: { 
    checked: boolean; 
    onChange: (value: boolean) => void; 
    label: string;
    icon: any;
    offIcon: any;
    description: string;
  }) => (
    <div className="flex items-start space-x-4 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
      <div className="flex-shrink-0 mt-1">
        {checked ? (
          <Icon className="h-6 w-6 text-primary" />
        ) : (
          <OffIcon className="h-6 w-6 text-secondary" />
        )}
      </div>
      <div className="flex-grow">
        <label className="flex items-center justify-between">
          <div>
            <span className="font-medium">{label}</span>
            <p className="text-sm text-secondary mt-1">{description}</p>
          </div>
          <div className="relative inline-block w-12 h-6 flex-shrink-0">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={checked}
              onChange={(e) => onChange(e.target.checked)}
            />
            <span className="absolute inset-0 bg-secondary/20 peer-checked:bg-primary rounded-full transition-colors cursor-pointer" />
            <span className="absolute inset-y-1 start-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:start-7" />
          </div>
        </label>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl p-6 rounded-2xl bg-surface border border-border/10 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-display font-bold">
              {settings.language === 'en' ? 'Settings' : 'सेटिङहरू'}
            </h2>
            <p className="text-secondary mt-1">Customize your news reading experience</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-8">
          {/* Theme Selection */}
          <section>
            <h3 className="text-lg font-medium mb-4">Theme</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleThemeChange('light')}
                className={`flex items-center justify-center gap-2 p-4 rounded-lg border transition-all ${
                  settings.theme === 'light'
                    ? 'bg-primary text-white border-primary ring-2 ring-primary/20'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Sun className="h-5 w-5" />
                <span>Light</span>
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className={`flex items-center justify-center gap-2 p-4 rounded-lg border transition-all ${
                  settings.theme === 'dark'
                    ? 'bg-primary text-white border-primary ring-2 ring-primary/20'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Moon className="h-5 w-5" />
                <span>Dark</span>
              </button>
              <button
                onClick={() => handleThemeChange('system')}
                className={`flex items-center justify-center gap-2 p-4 rounded-lg border transition-all ${
                  settings.theme === 'system'
                    ? 'bg-primary text-white border-primary ring-2 ring-primary/20'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Monitor className="h-5 w-5" />
                <span>System</span>
              </button>
            </div>
          </section>

          {/* Display Settings */}
          <section>
            <h3 className="text-lg font-medium mb-4">Display</h3>
            <div className="space-y-3">
              <SettingToggle
                checked={settings.showThumbnails}
                onChange={(value) => onSettingsChange({ ...settings, showThumbnails: value })}
                label="Show Thumbnails"
                icon={Image}
                offIcon={ImageOff}
                description="Display article thumbnails in the news feed"
              />
              <SettingToggle
                checked={settings.showReadingTime}
                onChange={(value) => onSettingsChange({ ...settings, showReadingTime: value })}
                label="Reading Time"
                icon={Clock}
                offIcon={Clock}
                description="Show estimated reading time for articles"
              />
              <div className="p-4 rounded-lg bg-background/50">
                <label className="block text-sm font-medium mb-2">Layout Density</label>
                <select
                  value={settings.articlesPerPage}
                  onChange={(e) => onSettingsChange({ ...settings, articlesPerPage: Number(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2"
                >
                  <option value="12">Comfortable (12 articles)</option>
                  <option value="24">Balanced (24 articles)</option>
                  <option value="36">Compact (36 articles)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Features */}
          <section>
            <h3 className="text-lg font-medium mb-4">Features</h3>
            <div className="space-y-3">
              <SettingToggle
                checked={settings.enableSocialShare}
                onChange={(value) => onSettingsChange({ ...settings, enableSocialShare: value })}
                label="Social Sharing"
                icon={Share2}
                offIcon={Share2}
                description="Enable social media sharing buttons"
              />
              <SettingToggle
                checked={settings.autoRefresh}
                onChange={(value) => onSettingsChange({ ...settings, autoRefresh: value })}
                label="Auto Refresh"
                icon={RefreshCw}
                offIcon={RefreshCw}
                description="Automatically refresh the news feed"
              />
            </div>
          </section>

          {/* Notifications */}
          <section>
            <h3 className="text-lg font-medium mb-4">Notifications</h3>
            <div className="space-y-3">
              <SettingToggle
                checked={settings.notifications}
                onChange={(value) => onSettingsChange({ ...settings, notifications: value })}
                label="Push Notifications"
                icon={Bell}
                offIcon={BellOff}
                description="Receive notifications for new articles"
              />
            </div>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
}