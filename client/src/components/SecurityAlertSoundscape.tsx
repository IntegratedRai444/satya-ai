import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Settings,
  Music,
  Heart,
  Brain,
  Zap,
  Moon,
  Sun,
  CloudRain,
  Waves
} from 'lucide-react';

interface AudioTheme {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  baseFrequency: number;
  waveType: 'sine' | 'square' | 'sawtooth' | 'triangle';
  effectTypes: string[];
}

interface AlertSound {
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  frequency: number;
  duration: number;
  volume: number;
  pattern: 'pulse' | 'continuous' | 'rising' | 'staccato';
}

interface MoodSettings {
  focus: number;
  alertness: number;
  calmness: number;
  productivity: number;
}

export function SecurityAlertSoundscape() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [masterVolume, setMasterVolume] = useState([0.5]);
  const [selectedTheme, setSelectedTheme] = useState('cyberpunk');
  const [moodSettings, setMoodSettings] = useState<MoodSettings>({
    focus: 75,
    alertness: 80,
    calmness: 40,
    productivity: 85
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [ambientEnabled, setAmbientEnabled] = useState(true);
  const [adaptiveMode, setAdaptiveMode] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  const audioThemes: AudioTheme[] = [
    {
      id: 'cyberpunk',
      name: 'Cyberpunk Matrix',
      description: 'Futuristic electronic sounds with digital glitches',
      icon: <Zap className="h-5 w-5 text-cyan-400" />,
      baseFrequency: 440,
      waveType: 'square',
      effectTypes: ['reverb', 'distortion', 'delay']
    },
    {
      id: 'ambient',
      name: 'Ambient Workspace',
      description: 'Calm atmospheric tones for focused work',
      icon: <CloudRain className="h-5 w-5 text-blue-400" />,
      baseFrequency: 220,
      waveType: 'sine',
      effectTypes: ['reverb', 'lowpass']
    },
    {
      id: 'binaural',
      name: 'Binaural Focus',
      description: 'Brain-enhancing frequencies for concentration',
      icon: <Brain className="h-5 w-5 text-purple-400" />,
      baseFrequency: 40,
      waveType: 'sine',
      effectTypes: ['binaural', 'white_noise']
    },
    {
      id: 'nature',
      name: 'Natural Alerts',
      description: 'Organic sounds inspired by nature',
      icon: <Waves className="h-5 w-5 text-green-400" />,
      baseFrequency: 330,
      waveType: 'triangle',
      effectTypes: ['echo', 'chorus']
    }
  ];

  const alertSounds: Record<string, AlertSound> = {
    LOW: {
      severity: 'LOW',
      frequency: 220,
      duration: 0.5,
      volume: 0.3,
      pattern: 'pulse'
    },
    MEDIUM: {
      severity: 'MEDIUM',
      frequency: 330,
      duration: 1.0,
      volume: 0.5,
      pattern: 'continuous'
    },
    HIGH: {
      severity: 'HIGH',
      frequency: 523,
      duration: 1.5,
      volume: 0.7,
      pattern: 'rising'
    },
    CRITICAL: {
      severity: 'CRITICAL',
      frequency: 880,
      duration: 2.0,
      volume: 0.9,
      pattern: 'staccato'
    }
  };

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      audioContextRef.current = new AudioContext();
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playAlertSound = (severity: keyof typeof alertSounds) => {
    if (!audioContextRef.current || !isEnabled) return;

    const alertConfig = alertSounds[severity];
    const theme = audioThemes.find(t => t.id === selectedTheme);
    if (!theme) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = theme.waveType;
    oscillator.frequency.setValueAtTime(alertConfig.frequency, ctx.currentTime);

    const adjustedVolume = alertConfig.volume * masterVolume[0];
    gainNode.gain.setValueAtTime(adjustedVolume, ctx.currentTime);

    // Apply pattern-specific effects
    switch (alertConfig.pattern) {
      case 'pulse':
        gainNode.gain.setValueCurveAtTime(
          [adjustedVolume, 0, adjustedVolume, 0],
          ctx.currentTime,
          alertConfig.duration
        );
        break;
      case 'rising':
        oscillator.frequency.linearRampToValueAtTime(
          alertConfig.frequency * 2,
          ctx.currentTime + alertConfig.duration
        );
        break;
      case 'staccato':
        for (let i = 0; i < 4; i++) {
          const startTime = ctx.currentTime + (i * 0.2);
          gainNode.gain.setValueAtTime(0, startTime);
          gainNode.gain.setValueAtTime(adjustedVolume, startTime + 0.05);
          gainNode.gain.setValueAtTime(0, startTime + 0.15);
        }
        break;
      default:
        gainNode.gain.setValueAtTime(adjustedVolume, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + alertConfig.duration);
    }

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + alertConfig.duration);
  };

  const startAmbientSoundscape = () => {
    if (!audioContextRef.current || !ambientEnabled) return;

    const ctx = audioContextRef.current;
    const theme = audioThemes.find(t => t.id === selectedTheme);
    if (!theme) return;

    // Create multiple oscillators for ambient layers
    const bass = ctx.createOscillator();
    const mid = ctx.createOscillator();
    const high = ctx.createOscillator();
    
    const bassGain = ctx.createGain();
    const midGain = ctx.createGain();
    const highGain = ctx.createGain();

    bass.connect(bassGain);
    mid.connect(midGain);
    high.connect(highGain);
    
    bassGain.connect(ctx.destination);
    midGain.connect(ctx.destination);
    highGain.connect(ctx.destination);

    bass.type = 'sine';
    mid.type = theme.waveType;
    high.type = 'triangle';

    bass.frequency.setValueAtTime(theme.baseFrequency * 0.5, ctx.currentTime);
    mid.frequency.setValueAtTime(theme.baseFrequency, ctx.currentTime);
    high.frequency.setValueAtTime(theme.baseFrequency * 2, ctx.currentTime);

    const ambientVolume = masterVolume[0] * 0.1;
    bassGain.gain.setValueAtTime(ambientVolume * 0.8, ctx.currentTime);
    midGain.gain.setValueAtTime(ambientVolume * 0.5, ctx.currentTime);
    highGain.gain.setValueAtTime(ambientVolume * 0.3, ctx.currentTime);

    bass.start();
    mid.start();
    high.start();

    oscillatorRef.current = bass; // Store reference for cleanup
    setIsPlaying(true);
  };

  const stopAmbientSoundscape = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
    setIsPlaying(false);
  };

  const getMoodColor = (value: number) => {
    if (value >= 80) return 'text-green-400';
    if (value >= 60) return 'text-yellow-400';
    if (value >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const calculateOverallMood = () => {
    const avg = (moodSettings.focus + moodSettings.alertness + moodSettings.calmness + moodSettings.productivity) / 4;
    if (avg >= 80) return { mood: 'Highly Productive', color: 'text-green-400', icon: <Sun className="h-4 w-4" /> };
    if (avg >= 60) return { mood: 'Focused', color: 'text-blue-400', icon: <Brain className="h-4 w-4" /> };
    if (avg >= 40) return { mood: 'Balanced', color: 'text-yellow-400', icon: <Heart className="h-4 w-4" /> };
    return { mood: 'Needs Rest', color: 'text-purple-400', icon: <Moon className="h-4 w-4" /> };
  };

  const overallMood = calculateOverallMood();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Music className="h-10 w-10 text-purple-400" />
            Security Alert Soundscape
          </h1>
          <p className="text-slate-300 text-lg">
            Customizable mood-based audio system for enhanced security awareness
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Master Controls */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Volume2 className="h-5 w-5 text-purple-400" />
                    Audio Controls
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">System</span>
                    <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white">Master Volume</span>
                    <span className="text-slate-400">{Math.round(masterVolume[0] * 100)}%</span>
                  </div>
                  <Slider
                    value={masterVolume}
                    onValueChange={setMasterVolume}
                    max={1}
                    min={0}
                    step={0.01}
                    className="text-purple-400"
                  />
                </div>

                <div>
                  <span className="text-white block mb-2">Audio Theme</span>
                  <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {audioThemes.map(theme => (
                        <SelectItem key={theme.id} value={theme.id} className="text-white hover:bg-slate-600">
                          <div className="flex items-center gap-2">
                            {theme.icon}
                            <div>
                              <div className="font-medium">{theme.name}</div>
                              <div className="text-xs text-slate-400">{theme.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-white">Ambient Mode</span>
                    <Switch checked={ambientEnabled} onCheckedChange={setAmbientEnabled} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white">Adaptive</span>
                    <Switch checked={adaptiveMode} onCheckedChange={setAdaptiveMode} />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={isPlaying ? stopAmbientSoundscape : startAmbientSoundscape}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    disabled={!isEnabled}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Stop Ambient
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Ambient
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Advanced
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Alert Sound Testing */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  Alert Sound Testing
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Test different alert severity levels and their audio patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(alertSounds).map(([severity, config]) => (
                    <Button
                      key={severity}
                      onClick={() => playAlertSound(severity as keyof typeof alertSounds)}
                      disabled={!isEnabled}
                      className={`
                        ${severity === 'CRITICAL' ? 'bg-red-600 hover:bg-red-700' : 
                          severity === 'HIGH' ? 'bg-orange-600 hover:bg-orange-700' :
                          severity === 'MEDIUM' ? 'bg-yellow-600 hover:bg-yellow-700' :
                          'bg-green-600 hover:bg-green-700'} 
                        text-white
                      `}
                    >
                      <div className="text-center">
                        <div className="font-medium">{severity}</div>
                        <div className="text-xs opacity-80">{config.frequency}Hz</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mood-Based Settings */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-400" />
                  Mood-Based Audio Adjustment
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Customize audio characteristics based on your current mood and needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(moodSettings).map(([mood, value]) => (
                  <div key={mood}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white capitalize">{mood}</span>
                      <span className={`font-medium ${getMoodColor(value)}`}>{value}%</span>
                    </div>
                    <Slider
                      value={[value]}
                      onValueChange={([newValue]) => 
                        setMoodSettings(prev => ({ ...prev, [mood]: newValue }))
                      }
                      max={100}
                      min={0}
                      step={1}
                      className="text-blue-400"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Status Panel */}
          <div className="space-y-6">
            {/* Current Status */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-400" />
                  Current Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${overallMood.color} flex items-center justify-center gap-2`}>
                    {overallMood.icon}
                    {overallMood.mood}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Audio System:</span>
                    <Badge className={isEnabled ? 'bg-green-600' : 'bg-red-600'}>
                      {isEnabled ? 'Active' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ambient:</span>
                    <Badge className={isPlaying ? 'bg-blue-600' : 'bg-gray-600'}>
                      {isPlaying ? 'Playing' : 'Stopped'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Theme:</span>
                    <span className="text-white text-sm">
                      {audioThemes.find(t => t.id === selectedTheme)?.name}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-purple-400" />
                  Recent Audio Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">APT Detection</span>
                    <Badge className="bg-red-600 text-white text-xs">CRITICAL</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Phishing Email</span>
                    <Badge className="bg-orange-600 text-white text-xs">HIGH</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Failed Login</span>
                    <Badge className="bg-yellow-600 text-white text-xs">MEDIUM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">System Update</span>
                    <Badge className="bg-green-600 text-white text-xs">LOW</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="h-5 w-5 text-gray-400" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  size="sm" 
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => setIsEnabled(false)}
                >
                  <VolumeX className="h-4 w-4 mr-2" />
                  Silence All Alerts
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Focus Mode
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Night Mode
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}