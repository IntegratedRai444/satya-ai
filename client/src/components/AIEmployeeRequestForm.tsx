import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  Bot, 
  Building2, 
  User, 
  FileText,
  CheckCircle,
  Zap,
  Shield,
  Globe,
  Code,
  Database,
  Brain
} from "lucide-react";

interface AccessRequestForm {
  userName: string;
  userEmail: string;
  companyName: string;
  businessType: string;
  companySize: string;
  website: string;
  accessLevel: 'basic' | 'premium' | 'enterprise' | '';
  aiEmployeeCount: number;
  useCases: string[];
  businessJustification: string;
  technicalRequirements: string[];
  complianceNeeds: string[];
  expectedBenefit: string;
}

const businessTypes = [
  "Software Development",
  "Healthcare Technology",
  "Financial Services",
  "E-commerce",
  "Manufacturing",
  "Education Technology",
  "Marketing & Advertising",
  "Consulting Services",
  "Real Estate",
  "Media & Entertainment",
  "Other"
];

const companySizes = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-1000 employees",
  "1000+ employees"
];

const useCases = [
  "Customer Support Automation",
  "Code Review & Development",
  "Data Analysis & Reporting",
  "Content Creation & Marketing",
  "Quality Assurance Testing",
  "Sales & Lead Generation",
  "Document Processing",
  "Compliance Monitoring",
  "Research & Intelligence",
  "Training & Onboarding"
];

const technicalRequirements = [
  "API Integration",
  "Multi-language Support",
  "Real-time Processing",
  "Custom Model Training",
  "Advanced Analytics",
  "Webhook Support",
  "Database Integration",
  "Cloud Deployment",
  "Mobile Access",
  "Third-party Integrations"
];

const complianceNeeds = [
  "GDPR Compliance",
  "HIPAA Compliance",
  "SOC 2 Type II",
  "ISO 27001",
  "PCI DSS",
  "CCPA Compliance",
  "Industry-specific Regulations",
  "Data Residency Requirements"
];

export default function AIEmployeeRequestForm() {
  const [formData, setFormData] = useState<AccessRequestForm>({
    userName: "",
    userEmail: "",
    companyName: "",
    businessType: "",
    companySize: "",
    website: "",
    accessLevel: "",
    aiEmployeeCount: 5,
    useCases: [],
    businessJustification: "",
    technicalRequirements: [],
    complianceNeeds: [],
    expectedBenefit: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/ai-employee-access-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      const result = await response.json();
      
      toast({
        title: "Request Submitted Successfully",
        description: `Your AI employee access request has been submitted for review. Request ID: ${result.requestId}. Expected review time: ${result.expectedReviewTime}`,
      });

      // Reset form
      setFormData({
        userName: "",
        userEmail: "",
        companyName: "",
        businessType: "",
        companySize: "",
        website: "",
        accessLevel: "",
        aiEmployeeCount: 5,
        useCases: [],
        businessJustification: "",
        technicalRequirements: [],
        complianceNeeds: [],
        expectedBenefit: ""
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckboxChange = (field: keyof AccessRequestForm, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter(item => item !== value)
    }));
  };

  const getAccessLevelDetails = (level: string) => {
    switch (level) {
      case 'basic':
        return {
          name: 'Basic Access',
          limit: '1-5 AI Employees',
          features: ['Standard Templates', 'Basic Training', 'Email Support'],
          price: 'Free Trial'
        };
      case 'premium':
        return {
          name: 'Premium Access',
          limit: '6-25 AI Employees',
          features: ['Custom Training', 'API Access', 'Priority Support', 'Advanced Analytics'],
          price: '$299/month'
        };
      case 'enterprise':
        return {
          name: 'Enterprise Access',
          limit: '25+ AI Employees',
          features: ['Unlimited Customization', 'Dedicated Support', 'White-label Options', 'Compliance Features'],
          price: 'Custom Pricing'
        };
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Request AI Employee Access
          </h1>
          <p className="text-blue-200 text-lg">
            Apply for permission to create and customize AI employees for your business
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="h-5 w-5 text-blue-400" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-slate-300">
                Tell us about yourself and your role
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="userName" className="text-slate-300">Full Name *</Label>
                  <Input
                    id="userName"
                    value={formData.userName}
                    onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
                    className="bg-slate-900 border-slate-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="userEmail" className="text-slate-300">Business Email *</Label>
                  <Input
                    id="userEmail"
                    type="email"
                    value={formData.userEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, userEmail: e.target.value }))}
                    className="bg-slate-900 border-slate-600 text-white"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-400" />
                Company Information
              </CardTitle>
              <CardDescription className="text-slate-300">
                Details about your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName" className="text-slate-300">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    className="bg-slate-900 border-slate-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="website" className="text-slate-300">Company Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    className="bg-slate-900 border-slate-600 text-white"
                    placeholder="https://yourcompany.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessType" className="text-slate-300">Business Type *</Label>
                  <Select value={formData.businessType} onValueChange={(value) => setFormData(prev => ({ ...prev, businessType: value }))}>
                    <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="companySize" className="text-slate-300">Company Size *</Label>
                  <Select value={formData.companySize} onValueChange={(value) => setFormData(prev => ({ ...prev, companySize: value }))}>
                    <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      {companySizes.map(size => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Access Level Selection */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-400" />
                Access Level Request
              </CardTitle>
              <CardDescription className="text-slate-300">
                Choose the access level that best fits your needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['basic', 'premium', 'enterprise'].map(level => {
                  const details = getAccessLevelDetails(level);
                  return (
                    <div
                      key={level}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        formData.accessLevel === level
                          ? 'border-blue-500 bg-blue-900/20'
                          : 'border-slate-600 hover:border-slate-500'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, accessLevel: level as any }))}
                    >
                      <div className="text-center">
                        <h3 className="text-white font-semibold text-lg">{details?.name}</h3>
                        <p className="text-blue-400 text-sm mb-2">{details?.limit}</p>
                        <p className="text-green-400 font-bold mb-3">{details?.price}</p>
                        <ul className="text-slate-300 text-sm space-y-1">
                          {details?.features.map(feature => (
                            <li key={feature} className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div>
                <Label htmlFor="aiEmployeeCount" className="text-slate-300">
                  Estimated Number of AI Employees Needed
                </Label>
                <Input
                  id="aiEmployeeCount"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.aiEmployeeCount}
                  onChange={(e) => setFormData(prev => ({ ...prev, aiEmployeeCount: parseInt(e.target.value) || 1 }))}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Use Cases */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-400" />
                Use Cases & Requirements
              </CardTitle>
              <CardDescription className="text-slate-300">
                What will you use AI employees for?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-slate-300 text-lg mb-4 block">Primary Use Cases *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {useCases.map(useCase => (
                    <div key={useCase} className="flex items-center space-x-2">
                      <Checkbox
                        id={useCase}
                        checked={formData.useCases.includes(useCase)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('useCases', useCase, checked as boolean)
                        }
                      />
                      <Label htmlFor={useCase} className="text-slate-300 text-sm">
                        {useCase}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-slate-300 text-lg mb-4 block">Technical Requirements</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {technicalRequirements.map(requirement => (
                    <div key={requirement} className="flex items-center space-x-2">
                      <Checkbox
                        id={requirement}
                        checked={formData.technicalRequirements.includes(requirement)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('technicalRequirements', requirement, checked as boolean)
                        }
                      />
                      <Label htmlFor={requirement} className="text-slate-300 text-sm">
                        {requirement}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-slate-300 text-lg mb-4 block">Compliance Requirements</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {complianceNeeds.map(compliance => (
                    <div key={compliance} className="flex items-center space-x-2">
                      <Checkbox
                        id={compliance}
                        checked={formData.complianceNeeds.includes(compliance)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('complianceNeeds', compliance, checked as boolean)
                        }
                      />
                      <Label htmlFor={compliance} className="text-slate-300 text-sm">
                        {compliance}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Justification */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-400" />
                Business Justification
              </CardTitle>
              <CardDescription className="text-slate-300">
                Help us understand your business needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessJustification" className="text-slate-300">
                  Detailed Business Justification *
                </Label>
                <Textarea
                  id="businessJustification"
                  value={formData.businessJustification}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessJustification: e.target.value }))}
                  className="bg-slate-900 border-slate-600 text-white min-h-32"
                  placeholder="Explain how AI employees will benefit your business, current challenges you're facing, and expected outcomes..."
                  required
                />
              </div>
              <div>
                <Label htmlFor="expectedBenefit" className="text-slate-300">
                  Expected Benefits & ROI
                </Label>
                <Textarea
                  id="expectedBenefit"
                  value={formData.expectedBenefit}
                  onChange={(e) => setFormData(prev => ({ ...prev, expectedBenefit: e.target.value }))}
                  className="bg-slate-900 border-slate-600 text-white min-h-24"
                  placeholder="Describe the expected benefits, cost savings, efficiency improvements, etc..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || !formData.userName || !formData.userEmail || !formData.companyName || !formData.accessLevel || formData.useCases.length === 0 || !formData.businessJustification}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              {isSubmitting ? (
                <>
                  <Zap className="h-5 w-5 mr-2 animate-spin" />
                  Submitting Request...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Submit Access Request
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}