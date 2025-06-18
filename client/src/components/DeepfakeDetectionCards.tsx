import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';
import {
  FileImage,
  Video,
  Mic,
  Camera,
  CheckCircle,
  AlertCircle,
  Eye,
  ArrowRight
} from 'lucide-react';

export default function DeepfakeDetectionCards() {
  const { toast } = useToast();

  const detectionTools = [
    {
      id: 'image',
      title: 'Image Analysis',
      description: 'Detect manipulated photos & generated images',
      icon: FileImage,
      accuracy: '98.2%',
      color: 'blue',
      bgColor: 'bg-slate-800/80',
      borderColor: 'border-slate-700',
      iconBg: 'bg-blue-600/20',
      iconColor: 'text-blue-400',
      features: [
        { text: 'Photoshop Detection', icon: CheckCircle, color: 'text-green-400' },
        { text: 'GAN Detection', icon: CheckCircle, color: 'text-green-400' },
        { text: 'Metadata Analysis', icon: CheckCircle, color: 'text-green-400' }
      ],
      route: '/advanced-analysis?type=image'
    },
    {
      id: 'video',
      title: 'Video Verification',
      description: 'Identify deepfake videos & facial manipulations',
      icon: Video,
      accuracy: '96.8%',
      color: 'green',
      bgColor: 'bg-slate-800/80',
      borderColor: 'border-slate-700',
      iconBg: 'bg-green-600/20',
      iconColor: 'text-green-400',
      features: [
        { text: 'Facial Inconsistencies', icon: CheckCircle, color: 'text-green-400' },
        { text: 'Temporal Analysis', icon: CheckCircle, color: 'text-green-400' },
        { text: 'Lip-Sync Verification', icon: CheckCircle, color: 'text-green-400' }
      ],
      route: '/advanced-analysis?type=video'
    },
    {
      id: 'audio',
      title: 'Audio Detection',
      description: 'Uncover voice cloning & synthetic speech',
      icon: Mic,
      accuracy: '95.3%',
      color: 'purple',
      bgColor: 'bg-slate-800/80',
      borderColor: 'border-slate-700',
      iconBg: 'bg-purple-600/20',
      iconColor: 'text-purple-400',
      features: [
        { text: 'Voice Cloning Detection', icon: CheckCircle, color: 'text-green-400' },
        { text: 'Natural Patterns Analysis', icon: CheckCircle, color: 'text-green-400' },
        { text: 'Neural Voice Filter', icon: AlertCircle, color: 'text-orange-400' }
      ],
      route: '/advanced-analysis?type=audio'
    },
    {
      id: 'webcam',
      title: 'Live Webcam',
      description: 'Real-time deepfake analysis & verification',
      icon: Camera,
      accuracy: '97.7%',
      color: 'red',
      bgColor: 'bg-slate-800/80',
      borderColor: 'border-slate-700',
      iconBg: 'bg-red-600/20',
      iconColor: 'text-red-400',
      features: [
        { text: 'Live Deepfake Alert', icon: CheckCircle, color: 'text-green-400' },
        { text: 'Facial Authentication', icon: CheckCircle, color: 'text-green-400' },
        { text: 'Low-Light Analysis', icon: AlertCircle, color: 'text-yellow-400' }
      ],
      route: '/real-time-analysis'
    }
  ];

  return (
    <div className="bg-slate-900/95 rounded-2xl p-8 border border-slate-700/50 backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Deepfake Detection Tools</h2>
          <p className="text-slate-400">Choose your media type for comprehensive analysis</p>
        </div>
        <Badge className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-4 py-2 text-sm">
          Using <span className="text-blue-300 font-semibold">Neural Vision v4.2</span> models
        </Badge>
      </div>

      {/* Detection Tool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {detectionTools.map((tool) => {
          const IconComponent = tool.icon;
          
          return (
            <div 
              key={tool.id}
              className={`${tool.bgColor} ${tool.borderColor} border rounded-xl p-6 hover:border-slate-500 transition-all duration-300 hover:transform hover:scale-[1.02] cursor-pointer group relative overflow-hidden`}
            >
              {/* Icon and Accuracy Badge */}
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-xl ${tool.iconBg} border border-slate-600/30`}>
                  <IconComponent className={`h-8 w-8 ${tool.iconColor}`} />
                </div>
                <Badge className="bg-green-600/20 text-green-400 border border-green-500/30 text-xs px-3 py-1 font-medium">
                  Accuracy {tool.accuracy}
                </Badge>
              </div>

              {/* Title and Description */}
              <div className="mb-6">
                <h3 className="text-white text-xl font-bold mb-3 group-hover:text-blue-200 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                {tool.features.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <FeatureIcon className={`h-4 w-4 ${feature.color} flex-shrink-0`} />
                      <span className="text-slate-300 text-sm">{feature.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Start Analysis Button */}
              <Link href={tool.route}>
                <Button 
                  className="w-full bg-slate-700/50 hover:bg-slate-600 text-white border border-slate-600 group-hover:bg-blue-600/20 group-hover:border-blue-500/50 group-hover:text-blue-300 transition-all duration-300 py-3 font-medium"
                >
                  <span className="flex items-center justify-center gap-2">
                    START ANALYSIS
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>

              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
            </div>
          );
        })}
      </div>

      {/* Quick Access Actions */}
      <div className="flex items-center justify-center gap-4 pt-6">
        <Link href="/real-time-analysis">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
            <Camera className="h-5 w-5 mr-2" />
            Quick Webcam Analysis
          </Button>
        </Link>
        <Link href="/comprehensive-threat-intelligence">
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-6 py-3">
            <Eye className="h-5 w-5 mr-2" />
            View Threat Intelligence
          </Button>
        </Link>
      </div>
    </div>
  );
}