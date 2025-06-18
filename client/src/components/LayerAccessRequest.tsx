import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  Shield,
  Lock,
  Crown,
  Building,
  Users,
  Brain,
  Target,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Send,
  Info
} from 'lucide-react';

interface SecurityLayer {
  id: number;
  name: string;
  description: string;
  features: string[];
  icon: any;
  color: string;
  priceRange: string;
}

const SECURITY_LAYERS: SecurityLayer[] = [
  {
    id: 1,
    name: "Public Access",
    description: "Basic threat intelligence viewing and general cybersecurity information",
    features: [
      "View general threat intelligence reports",
      "Access cybersecurity news and updates",
      "Basic security awareness training",
      "Public threat landscape overview"
    ],
    icon: Shield,
    color: "green",
    priceRange: "Free"
  },
  {
    id: 2,
    name: "Professional Access",
    description: "Advanced analysis tools with real-time monitoring capabilities",
    features: [
      "Real-time threat detection and monitoring",
      "Advanced media analysis (images, videos, audio)",
      "Behavioral pattern analysis",
      "Professional threat intelligence reports",
      "Downloadable forensic reports",
      "Basic AI-powered security recommendations"
    ],
    icon: Target,
    color: "blue",
    priceRange: "Professional Tier"
  },
  {
    id: 3,
    name: "Enterprise Access",
    description: "Comprehensive threat intelligence with team collaboration features",
    features: [
      "Full MISP & OpenCTI integration",
      "Machine learning threat predictions",
      "Real-time team collaboration tools",
      "Advanced export capabilities (PDF, DOCX, JSON, STIX)",
      "Custom threat intelligence dashboards",
      "Interactive security awareness games",
      "Personalized security recommendations",
      "One-click security health reports"
    ],
    icon: Building,
    color: "purple",
    priceRange: "Enterprise Tier"
  },
  {
    id: 4,
    name: "Founder Access",
    description: "Complete system control with user management capabilities",
    features: [
      "All Enterprise features",
      "Complete user access management",
      "Security layer administration",
      "System configuration and settings",
      "Audit trail and activity monitoring",
      "Advanced system analytics",
      "Custom integrations and API access"
    ],
    icon: Crown,
    color: "gold",
    priceRange: "Founder Only"
  }
];

interface AccessRequest {
  requestedLayer: number;
  businessJustification: string;
  organizationName: string;
  roleTitle: string;
  expectedUsage: string;
  contactEmail: string;
  phoneNumber: string;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  additionalNotes: string;
}

export default function LayerAccessRequest() {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const [formData, setFormData] = useState<AccessRequest>({
    requestedLayer: 0,
    businessJustification: '',
    organizationName: '',
    roleTitle: '',
    expectedUsage: '',
    contactEmail: '',
    phoneNumber: '',
    urgencyLevel: 'medium',
    additionalNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  // Get user's current access level
  const { data: currentAccess } = useQuery({
    queryKey: ['/api/security-layers/user-access'],
  });

  interface UserAccess {
    currentLayer: number;
    userId: string;
    grantedAt: string;
    permissions: string[];
    status: string;
  }

  // Submit access request mutation
  const submitRequestMutation = useMutation({
    mutationFn: async (requestData: AccessRequest) => {
      return apiRequest('POST', '/api/security-layers/request-access', requestData);
    },
    onSuccess: () => {
      toast({
        title: "Access Request Submitted",
        description: "Your access request has been submitted for review. You'll receive an email notification once it's processed.",
      });
      // Reset form
      setFormData({
        requestedLayer: 0,
        businessJustification: '',
        organizationName: '',
        roleTitle: '',
        expectedUsage: '',
        contactEmail: '',
        phoneNumber: '',
        urgencyLevel: 'medium',
        additionalNotes: ''
      });
      setSelectedLayer(null);
    },
    onError: (error: any) => {
      toast({
        title: "Request Failed",
        description: error.message || "Failed to submit access request. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedLayer) {
      toast({
        title: "Layer Selection Required",
        description: "Please select a security layer to request access.",
        variant: "destructive"
      });
      return;
    }

    const requestData = {
      ...formData,
      requestedLayer: selectedLayer
    };

    submitRequestMutation.mutate(requestData);
  };

  const getLayerIcon = (layer: SecurityLayer) => {
    const IconComponent = layer.icon;
    return <IconComponent className="h-6 w-6" />;
  };

  const getLayerBadgeColor = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-600';
      case 'blue': return 'bg-blue-600';
      case 'purple': return 'bg-purple-600';
      case 'gold': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const canRequestLayer = (layerId: number) => {
    const currentLevel = (currentAccess as UserAccess)?.currentLayer || 0;
    return layerId > currentLevel;
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-900 to-purple-900 border-blue-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Lock className="h-6 w-6 text-blue-400" />
            Request Security Layer Access
          </CardTitle>
          <CardDescription className="text-blue-100">
            Submit a request to gain access to higher security layers with advanced features
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Current Access Status */}
      {currentAccess && (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-white">Current Access Level:</span>
              </div>
              <Badge className={`${getLayerBadgeColor(SECURITY_LAYERS[(currentAccess as UserAccess).currentLayer - 1]?.color || 'gray')} text-white`}>
                {SECURITY_LAYERS[(currentAccess as UserAccess).currentLayer - 1]?.name || 'No Access'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Layer Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SECURITY_LAYERS.map((layer) => {
          const canRequest = canRequestLayer(layer.id);
          const isSelected = selectedLayer === layer.id;
          
          return (
            <Card 
              key={layer.id}
              className={`cursor-pointer transition-all duration-200 ${
                !canRequest 
                  ? 'bg-slate-700 border-slate-600 opacity-50 cursor-not-allowed'
                  : isSelected 
                    ? 'bg-slate-800 border-blue-500 ring-2 ring-blue-400' 
                    : 'bg-slate-800 border-slate-700 hover:border-slate-500'
              }`}
              onClick={() => canRequest && setSelectedLayer(layer.id)}
            >
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getLayerIcon(layer)}
                    {layer.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getLayerBadgeColor(layer.color)} text-white text-xs`}>
                      {layer.priceRange}
                    </Badge>
                    {!canRequest && (
                      <Badge className="bg-gray-600 text-white text-xs">
                        Current/Lower
                      </Badge>
                    )}
                  </div>
                </CardTitle>
                <CardDescription className="text-slate-300">
                  {layer.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-slate-300 text-sm font-medium">Key Features:</div>
                  <ul className="space-y-1">
                    {layer.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="text-slate-400 text-sm flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {layer.features.length > 4 && (
                      <li className="text-slate-500 text-sm">
                        +{layer.features.length - 4} more features...
                      </li>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Request Form */}
      {selectedLayer && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-400" />
              Access Request Form - {SECURITY_LAYERS.find(l => l.id === selectedLayer)?.name}
            </CardTitle>
            <CardDescription className="text-slate-300">
              Please provide detailed information to help us process your request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="organizationName" className="text-white">Organization Name *</Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Enter your organization name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="roleTitle" className="text-white">Role/Title *</Label>
                  <Input
                    id="roleTitle"
                    value={formData.roleTitle}
                    onChange={(e) => setFormData({...formData, roleTitle: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="e.g., Security Analyst, CISO, IT Manager"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contactEmail" className="text-white">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="your.email@company.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber" className="text-white">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="businessJustification" className="text-white">Business Justification *</Label>
                <Textarea
                  id="businessJustification"
                  value={formData.businessJustification}
                  onChange={(e) => setFormData({...formData, businessJustification: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                  placeholder="Explain why you need access to this security layer and how it will benefit your organization's security posture..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="expectedUsage" className="text-white">Expected Usage *</Label>
                <Textarea
                  id="expectedUsage"
                  value={formData.expectedUsage}
                  onChange={(e) => setFormData({...formData, expectedUsage: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white min-h-[80px]"
                  placeholder="Describe how you plan to use the features (e.g., daily threat monitoring, weekly reports, incident response...);"
                  required
                />
              </div>

              <div>
                <Label className="text-white">Request Urgency *</Label>
                <RadioGroup 
                  value={formData.urgencyLevel} 
                  onValueChange={(value: any) => setFormData({...formData, urgencyLevel: value})}
                  className="flex flex-wrap gap-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" className="border-slate-500" />
                    <Label htmlFor="low" className="text-slate-300">Low - No rush</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" className="border-slate-500" />
                    <Label htmlFor="medium" className="text-slate-300">Medium - Standard processing</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" className="border-slate-500" />
                    <Label htmlFor="high" className="text-slate-300">High - Priority request</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="critical" id="critical" className="border-slate-500" />
                    <Label htmlFor="critical" className="text-slate-300">Critical - Urgent security need</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="additionalNotes" className="text-white">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white min-h-[80px]"
                  placeholder="Any additional information that might help process your request..."
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button 
                  type="submit" 
                  disabled={submitRequestMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                >
                  {submitRequestMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Access Request
                    </>
                  )}
                </Button>

                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Info className="h-4 w-4" />
                  Request will be reviewed by the founder within 24-48 hours
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Information Panel */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            Important Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-blue-400 mt-0.5" />
            <div className="text-slate-300 text-sm">
              <strong>Processing Time:</strong> Most requests are processed within 24-48 hours during business days
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Users className="h-4 w-4 text-green-400 mt-0.5" />
            <div className="text-slate-300 text-sm">
              <strong>Approval Process:</strong> All requests are reviewed by the founder for security and compliance
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Shield className="h-4 w-4 text-purple-400 mt-0.5" />
            <div className="text-slate-300 text-sm">
              <strong>Security Notice:</strong> Higher security layers require additional verification and background checks
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}