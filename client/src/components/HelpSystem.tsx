import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  HelpCircle, 
  Search, 
  BookOpen, 
  Shield, 
  Brain, 
  Scale, 
  Eye, 
  Settings,
  ChevronRight,
  FileText,
  Video,
  Users
} from 'lucide-react';

interface FeatureGuide {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  usage: string;
  type: 'overview' | 'detailed';
}

const featureGuides: FeatureGuide[] = [
  {
    id: 'overview',
    title: 'Platform Overview',
    category: 'Getting Started',
    description: 'Comprehensive security operations platform providing threat monitoring, incident response, and intelligence analysis capabilities.',
    features: [
      'Real-time threat detection and monitoring',
      'Advanced security analytics and reporting',
      'Incident response workflow management',
      'Network topology visualization',
      'Security metrics dashboard'
    ],
    usage: 'Navigate between different sections using the main tabs. Each section provides specialized tools for security professionals.',
    type: 'overview'
  },
  {
    id: 'ai-intelligence',
    title: 'AI Intelligence Hub',
    category: 'Analysis Tools',
    description: 'Advanced artificial intelligence tools for security analysis, threat detection, and automated investigation.',
    features: [
      'Deepfake detection and analysis',
      'Voice clone identification',
      'Phishing URL scanning',
      'Malware behavior analysis',
      'Threat intelligence correlation',
      'Automated incident classification'
    ],
    usage: 'Upload files or input data for AI-powered analysis. Results include confidence scores and detailed explanations.',
    type: 'detailed'
  },
  {
    id: 'neural-networks',
    title: 'Neural Network Operations',
    category: 'AI Systems',
    description: 'Manage and monitor neural network models for security analysis and threat prediction.',
    features: [
      'Model performance monitoring',
      'GPU cluster management',
      'Training pipeline control',
      'Inference queue management',
      'Accuracy metrics tracking',
      'Resource optimization'
    ],
    usage: 'Monitor model status, initiate training jobs, and configure neural network parameters for optimal performance.',
    type: 'detailed'
  },
  {
    id: 'legal',
    title: 'Legal Compliance Tools',
    category: 'Compliance',
    description: 'Legal research, compliance checking, and regulatory analysis tools for cybersecurity operations.',
    features: [
      'Cyber law database search',
      'Compliance requirement checking',
      'Legal precedent analysis',
      'Regulatory framework guidance',
      'Documentation templates',
      'Evidence chain management'
    ],
    usage: 'Search legal databases, generate compliance reports, and access legal guidance for security incidents.',
    type: 'detailed'
  },
  {
    id: 'surveillance',
    title: 'Surveillance Systems',
    category: 'Monitoring',
    description: 'Advanced monitoring and surveillance capabilities for security operations.',
    features: [
      'Multi-camera feed management',
      'Facial recognition systems',
      'Behavioral analysis',
      'Motion detection alerts',
      'Recording management',
      'Access control integration'
    ],
    usage: 'Monitor live feeds, configure detection parameters, and manage surveillance data for security investigations.',
    type: 'detailed'
  },
  {
    id: 'utilities',
    title: 'Security Utilities',
    category: 'Tools',
    description: 'Collection of essential security tools and utilities for daily operations.',
    features: [
      'Network scanning tools',
      'Encryption utilities',
      'Log analysis tools',
      'System diagnostic utilities',
      'Data recovery tools',
      'Performance monitoring'
    ],
    usage: 'Access various security tools and utilities for specific tasks and troubleshooting operations.',
    type: 'detailed'
  }
];

export function HelpSystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGuide, setSelectedGuide] = useState<FeatureGuide | null>(null);

  const categories = ['all', ...Array.from(new Set(featureGuides.map(guide => guide.category)))];

  const filteredGuides = featureGuides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedGuide) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => setSelectedGuide(null)}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            ← Back to Help
          </Button>
          <Badge variant="secondary" className="bg-gray-700 text-gray-300">
            {selectedGuide.category}
          </Badge>
        </div>

        <Card className="detection-card">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-400" />
              {selectedGuide.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              {selectedGuide.description}
            </p>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
              <div className="grid gap-3">
                {selectedGuide.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded bg-gray-800/60">
                    <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Usage Instructions</h3>
              <div className="p-4 rounded bg-gray-800/60 border-l-4 border-blue-500">
                <p className="text-gray-300 leading-relaxed">{selectedGuide.usage}</p>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-gray-700">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Video className="w-4 h-4 mr-2" />
                Watch Tutorial
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <FileText className="w-4 h-4 mr-2" />
                Documentation
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <Users className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <HelpCircle className="w-8 h-8 text-blue-400" />
          Platform Documentation
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Comprehensive guides and documentation for all platform features and capabilities
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search guides and documentation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map(guide => (
          <Card 
            key={guide.id} 
            className="detection-card cursor-pointer hover:shadow-lg transition-all duration-200"
            onClick={() => setSelectedGuide(guide)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg text-white line-clamp-2">
                  {guide.title}
                </CardTitle>
                <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                  {guide.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                {guide.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {guide.features.length} features
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No guides found</h3>
          <p className="text-gray-500">Try adjusting your search terms or category filter</p>
        </div>
      )}

      <Card className="detection-card mt-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Settings className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Need Additional Help?</h3>
          </div>
          <p className="text-gray-300 mb-4">
            Can't find what you're looking for? Our support team is available 24/7 to assist with any questions or technical issues.
          </p>
          <div className="flex gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Contact Support
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              Request Training
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default HelpSystem;