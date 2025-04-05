import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Home, Sun, Moon, Monitor, X } from 'lucide-react';
import { Settings } from '../types/news';

interface SetupWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (settings: Settings) => void;
  initialSettings: Settings;
}

export function SetupWizard({ isOpen, onClose, onComplete, initialSettings }: SetupWizardProps) {
  const [step, setStep] = useState(0);
  const [settings, setSettings] = useState(initialSettings);

  const handleComplete = () => {
    onComplete({ ...settings, hasSeenWelcome: true });
    onClose();
  };

  const steps = [
    {
      title: "Welcome to YoNews",
      description: "Let's personalize your news experience in just a few steps.",
      content: (
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">👋 Welcome to YoNews!</h3>
            <p className="text-secondary">Your personalized news aggregator</p>
          </div>
          <button
            onClick={() => setStep(1)}
            className="w-full px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
          >
            Get Started
          </button>
        </div>
      )
    },
    {
      title: "Choose Your News Sources",
      description: "Select where you'd like your news from",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                const newSources = settings.newsSources.includes('international')
                  ? settings.newsSources.filter(s => s !== 'international')
                  : [...settings.newsSources, 'international'];
                setSettings({ ...settings, newsSources: newSources });
              }}
              className={`p-6 rounded-xl border-2 transition-all ${
                settings.newsSources.includes('international')
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Globe className="h-8 w-8 mb-3 mx-auto" />
              <h4 className="font-medium">International</h4>
              <p className="text-sm text-secondary mt-1">Global news coverage</p>
            </button>
            <button
              onClick={() => {
                const newSources = settings.newsSources.includes('domestic')
                  ? settings.newsSources.filter(s => s !== 'domestic')
                  : [...settings.newsSources, 'domestic'];
                setSettings({ ...settings, newsSources: newSources });
              }}
              className={`p-6 rounded-xl border-2 transition-all ${
                settings.newsSources.includes('domestic')
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Home className="h-8 w-8 mb-3 mx-auto" />
              <h4 className="font-medium">Domestic</h4>
              <p className="text-sm text-secondary mt-1">Nepal-focused news</p>
            </button>
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={settings.newsSources.length === 0}
            className="w-full px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      )
    },
    {
      title: "Choose Your Theme",
      description: "Select your preferred appearance",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setSettings({ ...settings, theme: 'light' })}
              className={`p-6 rounded-xl border-2 transition-all ${
                settings.theme === 'light'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Sun className="h-6 w-6 mb-2 mx-auto" />
              <span className="text-sm font-medium">Light</span>
            </button>
            <button
              onClick={() => setSettings({ ...settings, theme: 'dark' })}
              className={`p-6 rounded-xl border-2 transition-all ${
                settings.theme === 'dark'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Moon className="h-6 w-6 mb-2 mx-auto" />
              <span className="text-sm font-medium">Dark</span>
            </button>
            <button
              onClick={() => setSettings({ ...settings, theme: 'system' })}
              className={`p-6 rounded-xl border-2 transition-all ${
                settings.theme === 'system'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Monitor className="h-6 w-6 mb-2 mx-auto" />
              <span className="text-sm font-medium">System</span>
            </button>
          </div>
          <button
            onClick={handleComplete}
            className="w-full px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
          >
            Complete Setup
          </button>
        </div>
      )
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-lg mx-4 p-6 rounded-2xl bg-surface border border-border/10 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">{steps[step].title}</h2>
                <p className="text-secondary text-sm mt-1">{steps[step].description}</p>
              </div>
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-secondary hover:text-primary transition-colors"
                >
                  Back
                </button>
              )}
            </div>
            {steps[step].content}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}