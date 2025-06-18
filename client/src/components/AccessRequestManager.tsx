import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { SecurityLayer, SECURITY_LAYERS } from '@shared/securityLayers';
import { 
  Send, 
  CheckCircle, 
  XCircle,
  Clock,
  User,
  Building2,
  Code,
  Shield,
  AlertCircle,
  FileText,
  Calendar,
  MessageSquare,
  Crown,
  Filter,
  Search,
  RefreshCw
} from 'lucide-react';

interface AccessRequest {
  id: string;
  userId: string;
  userName: string;
  currentLayer: SecurityLayer;
  requestedLayer: SecurityLayer;
  reason: string;
  businessJustification?: string;
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

export default function AccessRequestManager() {
  const [selectedUserId] = useState('user1');
  const [requestFormData, setRequestFormData] = useState({
    requestedLayer: 'layer2' as SecurityLayer,
    reason: '',
    businessJustification: ''
  });
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    requestId: '',
    approved: true,
    reviewNotes: ''
  });
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [isFounderMode, setIsFounderMode] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user's access requests
  const { data: userRequests, isLoading: userRequestsLoading } = useQuery({
    queryKey: ['/api/security-layers/access-requests/user', selectedUserId],
  });

  // Fetch all access requests (for founder view)
  const { data: allRequests, isLoading: allRequestsLoading } = useQuery({
    queryKey: ['/api/security-layers/access-requests/all'],
    enabled: isFounderMode,
  });

  // Fetch pending requests for notifications
  const { data: pendingRequests } = useQuery({
    queryKey: ['/api/security-layers/access-requests/pending'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch access request stats
  const { data: requestStats } = useQuery({
    queryKey: ['/api/security-layers/access-requests/stats'],
  });

  // Create access request mutation
  const createRequestMutation = useMutation({
    mutationFn: async (requestData: any) => {
      return apiRequest('POST', '/api/security-layers/request-access', {
        userId: selectedUserId,
        userName: 'Current User', // In real app, get from auth context
        ...requestData
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/security-layers/access-requests'] });
      setShowRequestForm(false);
      setRequestFormData({
        requestedLayer: 'layer2',
        reason: '',
        businessJustification: ''
      });
      toast({
        title: "Request Submitted",
        description: "Your access request has been submitted for founder review.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Request Failed",
        description: error.message || "Failed to submit access request",
        variant: "destructive",
      });
    },
  });

  // Review access request mutation
  const reviewRequestMutation = useMutation({
    mutationFn: async (reviewData: any) => {
      return apiRequest('POST', '/api/security-layers/review-request', {
        ...reviewData,
        reviewerId: 'founder' // In real app, get from auth context
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/security-layers/access-requests'] });
      toast({
        title: reviewFormData.approved ? "Request Approved" : "Request Rejected",
        description: data.message,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Review Failed",
        description: error.message || "Failed to review access request",
        variant: "destructive",
      });
    },
  });

  const handleCreateRequest = () => {
    if (!requestFormData.reason.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a reason for your access request",
        variant: "destructive",
      });
      return;
    }

    createRequestMutation.mutate(requestFormData);
  };

  const handleReviewRequest = (requestId: string, approved: boolean) => {
    setReviewFormData({ ...reviewFormData, requestId, approved });
    reviewRequestMutation.mutate({
      requestId,
      approved,
      reviewNotes: reviewFormData.reviewNotes
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-600"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-600"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge className="bg-gray-600">{status}</Badge>;
    }
  };

  const getLayerIcon = (layer: SecurityLayer) => {
    switch (layer) {
      case 'layer1': return User;
      case 'layer2': return Building2;
      case 'layer3': return Code;
      case 'layer4': return Crown;
      default: return Shield;
    }
  };

  const filteredRequests = (allRequests || userRequests || []).filter((request: AccessRequest) => {
    if (statusFilter === 'all') return true;
    return request.status === statusFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Security Layer Access Management
          </h1>
          <p className="text-blue-200 text-lg">
            Request higher security clearance levels and manage access approvals
          </p>
        </div>

        {/* Quick Stats */}
        {requestStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{requestStats.total}</div>
                    <div className="text-slate-400 text-sm">Total Requests</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-yellow-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{requestStats.pending}</div>
                    <div className="text-slate-400 text-sm">Pending Review</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{requestStats.approved}</div>
                    <div className="text-slate-400 text-sm">Approved</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <XCircle className="h-8 w-8 text-red-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{requestStats.rejected}</div>
                    <div className="text-slate-400 text-sm">Rejected</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs value={isFounderMode ? 'founder' : 'user'} onValueChange={(value) => setIsFounderMode(value === 'founder')} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800 border-slate-700">
            <TabsTrigger value="user" className="data-[state=active]:bg-blue-600">
              <User className="h-4 w-4 mr-2" />
              User Requests
            </TabsTrigger>
            <TabsTrigger value="founder" className="data-[state=active]:bg-orange-600">
              <Crown className="h-4 w-4 mr-2" />
              Founder Dashboard
            </TabsTrigger>
          </TabsList>

          {/* User View */}
          <TabsContent value="user" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Request Higher Access Level</CardTitle>
                    <CardDescription className="text-slate-300">
                      Submit a request for Layer 2 (Corporate) or Layer 3 (Developer) access
                    </CardDescription>
                  </div>
                  <Dialog open={showRequestForm} onOpenChange={setShowRequestForm}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Send className="h-4 w-4 mr-2" />
                        New Request
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-white">Request Security Layer Access</DialogTitle>
                        <DialogDescription className="text-slate-300">
                          Submit a request for higher security clearance. Only Layer 2 and Layer 3 access can be requested.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="requested-layer" className="text-white">Requested Access Level</Label>
                          <select
                            id="requested-layer"
                            value={requestFormData.requestedLayer}
                            onChange={(e) => setRequestFormData({
                              ...requestFormData,
                              requestedLayer: e.target.value as SecurityLayer
                            })}
                            className="w-full mt-1 bg-slate-700 border-slate-600 text-white rounded-md p-2"
                          >
                            <option value="layer2">Layer 2 - Corporate Shield ($99/month)</option>
                            <option value="layer3">Layer 3 - Developer Arsenal ($499/month)</option>
                          </select>
                        </div>

                        <div>
                          <Label htmlFor="reason" className="text-white">Reason for Request *</Label>
                          <Textarea
                            id="reason"
                            value={requestFormData.reason}
                            onChange={(e) => setRequestFormData({
                              ...requestFormData,
                              reason: e.target.value
                            })}
                            className="mt-1 bg-slate-700 border-slate-600 text-white"
                            placeholder="Explain why you need this access level..."
                            rows={3}
                          />
                        </div>

                        <div>
                          <Label htmlFor="business-justification" className="text-white">Business Justification</Label>
                          <Textarea
                            id="business-justification"
                            value={requestFormData.businessJustification}
                            onChange={(e) => setRequestFormData({
                              ...requestFormData,
                              businessJustification: e.target.value
                            })}
                            className="mt-1 bg-slate-700 border-slate-600 text-white"
                            placeholder="Provide business case for this access level..."
                            rows={3}
                          />
                        </div>

                        <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                            <div>
                              <div className="text-blue-400 font-semibold mb-1">
                                {SECURITY_LAYERS[requestFormData.requestedLayer].name}
                              </div>
                              <div className="text-slate-300 text-sm">
                                {SECURITY_LAYERS[requestFormData.requestedLayer].description}
                              </div>
                              <div className="text-slate-400 text-xs mt-2">
                                Features: {SECURITY_LAYERS[requestFormData.requestedLayer].features.slice(0, 3).join(', ')}
                                {SECURITY_LAYERS[requestFormData.requestedLayer].features.length > 3 && '...'}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button
                            onClick={handleCreateRequest}
                            disabled={createRequestMutation.isPending}
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                          >
                            {createRequestMutation.isPending ? (
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Send className="h-4 w-4 mr-2" />
                            )}
                            Submit Request
                          </Button>
                          <Button
                            onClick={() => setShowRequestForm(false)}
                            variant="outline"
                            className="border-slate-600"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Layer 2 - Corporate Shield</h4>
                    <p className="text-slate-300 text-sm mb-3">Advanced analytics for businesses</p>
                    <div className="text-slate-400 text-xs">
                      • Advanced threat analysis • Data visualization • Team collaboration
                    </div>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Layer 3 - Developer Arsenal</h4>
                    <p className="text-slate-300 text-sm mb-3">Full development toolkit</p>
                    <div className="text-slate-400 text-xs">
                      • Full API access • Custom integrations • Advanced scripting
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User's Requests */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Your Access Requests</CardTitle>
                <CardDescription className="text-slate-300">
                  Track the status of your security layer access requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userRequestsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <RefreshCw className="h-8 w-8 text-blue-400 animate-spin" />
                    </div>
                  ) : !userRequests || userRequests.length === 0 ? (
                    <div className="text-center py-8 text-slate-400">
                      No access requests found. Submit your first request above.
                    </div>
                  ) : (
                    userRequests.map((request: AccessRequest) => {
                      const LayerIcon = getLayerIcon(request.requestedLayer);
                      return (
                        <div key={request.id} className="border border-slate-600 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <LayerIcon className="h-6 w-6 text-blue-400 mt-1" />
                              <div>
                                <div className="text-white font-semibold">
                                  {SECURITY_LAYERS[request.requestedLayer].name}
                                </div>
                                <div className="text-slate-400 text-sm">
                                  Requested: {new Date(request.requestedAt).toLocaleDateString()}
                                </div>
                                <div className="text-slate-300 text-sm mt-1">
                                  {request.reason}
                                </div>
                                {request.reviewNotes && (
                                  <div className="text-slate-400 text-xs mt-2 p-2 bg-slate-900 rounded">
                                    <strong>Review Notes:</strong> {request.reviewNotes}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              {getStatusBadge(request.status)}
                              {request.reviewedAt && (
                                <div className="text-slate-400 text-xs mt-1">
                                  Reviewed: {new Date(request.reviewedAt).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Founder View */}
          <TabsContent value="founder" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Access Request Management</CardTitle>
                    <CardDescription className="text-slate-300">
                      Review and approve security layer access requests
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="bg-slate-700 border-slate-600 text-white rounded-md px-3 py-1 text-sm"
                    >
                      <option value="all">All Requests</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allRequestsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <RefreshCw className="h-8 w-8 text-orange-400 animate-spin" />
                    </div>
                  ) : !filteredRequests || filteredRequests.length === 0 ? (
                    <div className="text-center py-8 text-slate-400">
                      No access requests found for the selected filter.
                    </div>
                  ) : (
                    filteredRequests.map((request: AccessRequest) => {
                      const LayerIcon = getLayerIcon(request.requestedLayer);
                      return (
                        <div key={request.id} className="border border-slate-600 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <LayerIcon className="h-6 w-6 text-orange-400 mt-1" />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-white font-semibold">{request.userName}</span>
                                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                                    {request.userId}
                                  </Badge>
                                </div>
                                <div className="text-blue-400 font-medium">
                                  {SECURITY_LAYERS[request.currentLayer].name} → {SECURITY_LAYERS[request.requestedLayer].name}
                                </div>
                                <div className="text-slate-400 text-sm">
                                  Requested: {new Date(request.requestedAt).toLocaleDateString()}
                                </div>
                                <div className="text-slate-300 text-sm mt-2">
                                  <strong>Reason:</strong> {request.reason}
                                </div>
                                {request.businessJustification && (
                                  <div className="text-slate-300 text-sm mt-1">
                                    <strong>Business Case:</strong> {request.businessJustification}
                                  </div>
                                )}
                                {request.reviewNotes && (
                                  <div className="text-slate-400 text-xs mt-2 p-2 bg-slate-900 rounded">
                                    <strong>Review Notes:</strong> {request.reviewNotes}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              {getStatusBadge(request.status)}
                              {request.status === 'pending' && (
                                <div className="flex gap-2 mt-2">
                                  <Button
                                    size="sm"
                                    onClick={() => handleReviewRequest(request.id, true)}
                                    disabled={reviewRequestMutation.isPending}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => handleReviewRequest(request.id, false)}
                                    disabled={reviewRequestMutation.isPending}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    <XCircle className="h-3 w-3 mr-1" />
                                    Reject
                                  </Button>
                                </div>
                              )}
                              {request.reviewedAt && (
                                <div className="text-slate-400 text-xs mt-1">
                                  Reviewed: {new Date(request.reviewedAt).toLocaleDateString()}
                                  {request.reviewedBy && <div>By: {request.reviewedBy}</div>}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}