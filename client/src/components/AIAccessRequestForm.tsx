import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  Shield, 
  Users, 
  Building2, 
  Crown, 
  ArrowLeft,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface AccessRequestForm {
  companyName: string;
  contactEmail: string;
  businessType: string;
  employeeCount: string;
  requestedTier: 'basic' | 'premium' | 'enterprise';
  useCase: string;
  securityRequirements: string;
  timelineNeeds: string;
  budgetRange: string;
  additionalInfo: string;
}

export default function AIAccessRequestForm() {
  const [formData, setFormData] = useState<AccessRequestForm>({
    companyName: '',
    contactEmail: '',
    businessType: '',
    employeeCount: '',
    requestedTier: 'basic',
    useCase: '',
    securityRequirements: '',
    timelineNeeds: '',
    budgetRange: '',
    additionalInfo: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const requestAccessMutation = useMutation({
    mutationFn: async (data: AccessRequestForm) => {
      return await apiRequest('POST', '/api/request-ai-access', data);
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Access Request Submitted",
        description: "Your request has been submitted for review. You'll receive a response within 24-48 hours.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit access request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestAccessMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof AccessRequestForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Request Submitted Successfully</h2>
              <p className="text-slate-300 mb-6">
                Thank you for your interest in SatyaAI's Intelligent Workforce Creator. 
                Your access request has been received and is being reviewed by our team.
              </p>
              <div className="bg-slate-900 rounded-lg p-4 mb-6">
                <h3 className="text-white font-semibold mb-2">What happens next?</h3>
                <ul className="text-slate-300 text-sm space-y-1 text-left">
                  <li>• Security clearance verification (24-48 hours)</li>
                  <li>• Technical requirements assessment</li>
                  <li>• Access tier confirmation</li>
                  <li>• Account activation notification</li>
                </ul>
              </div>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => window.location.href = '/'}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Return to Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Submit Another Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => window.location.href = '/intelligent-workforce'}
            className="mb-4 border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Workforce Creator
          </Button>
          
          <div className="text-center">
            <Shield className="h-16 w-16 text-blue-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">
              Request AI Worker Access
            </h1>
            <p className="text-blue-200 text-lg">
              Complete this form to request access to create and manage AI workers
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-400" />
                Company Information
              </CardTitle>
              <CardDescription className="text-slate-300">
                Tell us about your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName" className="text-white">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="bg-slate-900 border-slate-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail" className="text-white">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    className="bg-slate-900 border-slate-600 text-white"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessType" className="text-white">Business Type</Label>
                  <Select onValueChange={(value) => handleInputChange('businessType', value)}>
                    <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Startup</SelectItem>
                      <SelectItem value="smb">Small/Medium Business</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="nonprofit">Non-Profit</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="employeeCount" className="text-white">Employee Count</Label>
                  <Select onValueChange={(value) => handleInputChange('employeeCount', value)}>
                    <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                      <SelectValue placeholder="Company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-1000">201-1000 employees</SelectItem>
                      <SelectItem value="1000+">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-400" />
                Access Requirements
              </CardTitle>
              <CardDescription className="text-slate-300">
                Specify your AI worker needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white">Requested Access Tier *</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div 
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      formData.requestedTier === 'basic' 
                        ? 'border-blue-500 bg-blue-950' 
                        : 'border-slate-600 bg-slate-900'
                    }`}
                    onClick={() => handleInputChange('requestedTier', 'basic')}
                  >
                    <div className="text-center">
                      <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                      <h4 className="text-white font-medium">Basic Access</h4>
                      <p className="text-slate-400 text-sm">1-5 AI Workers</p>
                      <p className="text-green-400 text-sm font-bold">Free Trial</p>
                    </div>
                  </div>
                  <div 
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      formData.requestedTier === 'premium' 
                        ? 'border-purple-500 bg-purple-950' 
                        : 'border-slate-600 bg-slate-900'
                    }`}
                    onClick={() => handleInputChange('requestedTier', 'premium')}
                  >
                    <div className="text-center">
                      <Building2 className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                      <h4 className="text-white font-medium">Premium Access</h4>
                      <p className="text-slate-400 text-sm">6-25 AI Workers</p>
                      <p className="text-purple-400 text-sm font-bold">$299/month</p>
                    </div>
                  </div>
                  <div 
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      formData.requestedTier === 'enterprise' 
                        ? 'border-yellow-500 bg-yellow-950' 
                        : 'border-slate-600 bg-slate-900'
                    }`}
                    onClick={() => handleInputChange('requestedTier', 'enterprise')}
                  >
                    <div className="text-center">
                      <Crown className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                      <h4 className="text-white font-medium">Enterprise Access</h4>
                      <p className="text-slate-400 text-sm">25+ AI Workers</p>
                      <p className="text-yellow-400 text-sm font-bold">Custom Pricing</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="useCase" className="text-white">Primary Use Case *</Label>
                <Textarea
                  id="useCase"
                  value={formData.useCase}
                  onChange={(e) => handleInputChange('useCase', e.target.value)}
                  placeholder="Describe how you plan to use AI workers in your organization..."
                  className="bg-slate-900 border-slate-600 text-white"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timelineNeeds" className="text-white">Implementation Timeline</Label>
                  <Select onValueChange={(value) => handleInputChange('timelineNeeds', value)}>
                    <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                      <SelectValue placeholder="When do you need access?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediately">Immediately</SelectItem>
                      <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                      <SelectItem value="1month">Within 1 month</SelectItem>
                      <SelectItem value="3months">Within 3 months</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="budgetRange" className="text-white">Budget Range</Label>
                  <Select onValueChange={(value) => handleInputChange('budgetRange', value)}>
                    <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                      <SelectValue placeholder="Monthly budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free tier only</SelectItem>
                      <SelectItem value="under-500">Under $500/month</SelectItem>
                      <SelectItem value="500-2000">$500-$2,000/month</SelectItem>
                      <SelectItem value="2000-10000">$2,000-$10,000/month</SelectItem>
                      <SelectItem value="10000+">$10,000+/month</SelectItem>
                      <SelectItem value="custom">Custom enterprise pricing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-400" />
                Security & Compliance
              </CardTitle>
              <CardDescription className="text-slate-300">
                Help us understand your security requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="securityRequirements" className="text-white">Security Requirements</Label>
                <Textarea
                  id="securityRequirements"
                  value={formData.securityRequirements}
                  onChange={(e) => handleInputChange('securityRequirements', e.target.value)}
                  placeholder="Describe any specific security, compliance, or regulatory requirements..."
                  className="bg-slate-900 border-slate-600 text-white"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="additionalInfo" className="text-white">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  placeholder="Any additional information or special requirements..."
                  className="bg-slate-900 border-slate-600 text-white"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold">Review Process</h3>
                <p className="text-slate-300 text-sm">
                  All access requests undergo security clearance verification and technical assessment. 
                  Processing typically takes 24-48 hours for standard requests and up to 1 week for enterprise inquiries.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.location.href = '/intelligent-workforce'}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={requestAccessMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4 mr-2" />
                {requestAccessMutation.isPending ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}