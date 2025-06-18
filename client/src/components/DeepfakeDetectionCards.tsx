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
      bgGradient: 'from-blue-900 to-blue-800',
      iconBg: 'bg-blue-600',
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
      bgGradient: 'from-green-900 to-green-800',
      iconBg: 'bg-green-600',
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
      bgGradient: 'from-purple-900 to-purple-800',
      iconBg: 'bg-purple-600',
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
      bgGradient: 'from-red-900 to-red-800',
      iconBg: 'bg-red-600',
      features: [
        { text: 'Live Deepfake Alert', icon: CheckCircle, color: 'text-green-400' },
        { text: 'Facial Authentication', icon: CheckCircle, color: 'text-green-400' },
        { text: 'Low-Light Analysis', icon: AlertCircle, color: 'text-yellow-400' }
      ],
      route: '/real-time-analysis'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Deepfake Detection Tools</h2>
          <p className="text-slate-400">Choose your media type for comprehensive analysis</p>
        </div>
        <Badge className="bg-blue-600 text-white px-3 py-1">
          Using Neural Vision v4.2 models
        </Badge>
      </div>

      {/* Detection Tool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {detectionTools.map((tool) => {
          const IconComponent = tool.icon;
          
          return (
            <Card 
              key={tool.id}
              className={`bg-gradient-to-b ${tool.bgGradient} border-slate-700 hover:border-slate-500 transition-all duration-300 hover:scale-105 cursor-pointer group`}
            >
              <CardHeader className="pb-4">
                {/* Icon and Accuracy Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${tool.iconBg}`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <Badge className="bg-green-600 text-white text-xs px-2 py-1">
                    Accuracy {tool.accuracy}
                  </Badge>
                </div>

                {/* Title and Description */}
                <div>
                  <CardTitle className="text-white text-xl mb-2 group-hover:text-blue-200 transition-colors">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-slate-300 text-sm leading-relaxed">
                    {tool.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Features List */}
                <div className="space-y-3 mb-6">
                  {tool.features.map((feature, index) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <FeatureIcon className={`h-4 w-4 ${feature.color}`} />
                        <span className="text-slate-300 text-sm">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Start Analysis Button */}
                <Link href={tool.route}>
                  <Button 
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white border-slate-600 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300"
                  >
                    <span className="flex items-center justify-center gap-2">
                      START ANALYSIS
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
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