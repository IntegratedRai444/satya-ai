import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import {
  Bell,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Shield,
  AlertTriangle,
  Info,
  Settings,
  Eye,
  EyeOff,
  RefreshCw,
  Trash2,
  Send,
  UserPlus,
  Building
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'access_request' | 'security_alert' | 'system_update' | 'user_activity';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  isRead: boolean;
  createdAt: string;
  data?: any;
  actionRequired: boolean;
}

interface AccessRequestNotification extends Notification {
  data: {
    requestId: string;
    userId: string;
    userName: string;
    organizationName: string;
    currentLayer: number;
    requestedLayer: number;
    urgencyLevel: string;
    businessJustification: string;
  };
}

export default function FounderNotificationCenter() {
  const [selectedTab, setSelectedTab] = useState('unread');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch notifications
  const { data: notifications, refetch } = useQuery({
    queryKey: ['/api/founder/notifications'],
    refetchInterval: autoRefresh ? 10000 : false, // Refresh every 10 seconds
  });

  // Mark notification as read
  const markAsReadMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      return apiRequest('PATCH', `/api/founder/notifications/${notificationId}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/founder/notifications'] });
    }
  });

  // Approve access request
  const approveRequestMutation = useMutation({
    mutationFn: async (data: { requestId: string; comments?: string }) => {
      return apiRequest('POST', '/api/founder/access-requests/approve', data);
    },
    onSuccess: () => {
      toast({
        title: "Access Approved",
        description: "User access request has been approved successfully"
      });
      queryClient.invalidateQueries({ queryKey: ['/api/founder/notifications'] });
      queryClient.invalidateQueries({ queryKey: ['/api/founder/access-requests'] });
    }
  });

  // Reject access request
  const rejectRequestMutation = useMutation({
    mutationFn: async (data: { requestId: string; reason: string }) => {
      return apiRequest('POST', '/api/founder/access-requests/reject', data);
    },
    onSuccess: () => {
      toast({
        title: "Access Rejected",
        description: "User access request has been rejected"
      });
      queryClient.invalidateQueries({ queryKey: ['/api/founder/notifications'] });
      queryClient.invalidateQueries({ queryKey: ['/api/founder/access-requests'] });
    }
  });

  // Delete notification
  const deleteNotificationMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      return apiRequest('DELETE', `/api/founder/notifications/${notificationId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/founder/notifications'] });
      setSelectedNotification(null);
    }
  });

  const getNotificationIcon = (type: string, priority: string) => {
    switch (type) {
      case 'access_request':
        return <UserPlus className={`h-5 w-5 ${priority === 'high' ? 'text-orange-500' : 'text-blue-500'}`} />;
      case 'security_alert':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'system_update':
        return <Settings className="h-5 w-5 text-green-500" />;
      case 'user_activity':
        return <User className="h-5 w-5 text-purple-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getLayerName = (layerId: number) => {
    const layers = ['Public', 'Professional', 'Developer', 'Enterprise', 'Founder'];
    return layers[layerId - 1] || 'Unknown';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const notificationList = (notifications as Notification[]) || [];
  const unreadNotifications = notificationList.filter((n: Notification) => !n.isRead);
  const readNotifications = notificationList.filter((n: Notification) => n.isRead);
  const accessRequests = notificationList.filter((n: Notification) => n.type === 'access_request');

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-900 to-blue-900 border-purple-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-6 w-6 text-purple-400" />
              Founder Notification Center
              {unreadNotifications.length > 0 && (
                <Badge className="bg-red-600 text-white animate-pulse">
                  {unreadNotifications.length} New
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={autoRefresh ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
                className="border-purple-500"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
                Auto-refresh
              </Button>
              <Button
                onClick={() => refetch()}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardTitle>
          <CardDescription className="text-purple-100">
            Real-time notifications for access requests, security alerts, and system updates
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notification List */}
        <div className="lg:col-span-2">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3 bg-slate-800">
              <TabsTrigger value="unread" className="data-[state=active]:bg-red-600">
                Unread ({unreadNotifications.length})
              </TabsTrigger>
              <TabsTrigger value="access_requests" className="data-[state=active]:bg-blue-600">
                Access Requests ({accessRequests.length})
              </TabsTrigger>
              <TabsTrigger value="all" className="data-[state=active]:bg-green-600">
                All Notifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="unread" className="mt-4">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Unread Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {unreadNotifications.length === 0 ? (
                        <div className="text-center text-slate-400 py-8">
                          <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No unread notifications</p>
                        </div>
                      ) : (
                        unreadNotifications.map((notification: Notification) => (
                          <NotificationCard
                            key={notification.id}
                            notification={notification}
                            onSelect={setSelectedNotification}
                            onMarkAsRead={markAsReadMutation.mutate}
                            getNotificationIcon={getNotificationIcon}
                            getPriorityColor={getPriorityColor}
                            formatTimestamp={formatTimestamp}
                          />
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="access_requests" className="mt-4">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Access Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {accessRequests.length === 0 ? (
                        <div className="text-center text-slate-400 py-8">
                          <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No access requests</p>
                        </div>
                      ) : (
                        accessRequests.map((notification: Notification) => (
                          <NotificationCard
                            key={notification.id}
                            notification={notification}
                            onSelect={setSelectedNotification}
                            onMarkAsRead={markAsReadMutation.mutate}
                            getNotificationIcon={getNotificationIcon}
                            getPriorityColor={getPriorityColor}
                            formatTimestamp={formatTimestamp}
                          />
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="all" className="mt-4">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">All Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {notificationList.map((notification: Notification) => (
                        <NotificationCard
                          key={notification.id}
                          notification={notification}
                          onSelect={setSelectedNotification}
                          onMarkAsRead={markAsReadMutation.mutate}
                          getNotificationIcon={getNotificationIcon}
                          getPriorityColor={getPriorityColor}
                          formatTimestamp={formatTimestamp}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Notification Details */}
        <div>
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Notification Details
                {selectedNotification && (
                  <Button
                    onClick={() => deleteNotificationMutation.mutate(selectedNotification.id)}
                    size="sm"
                    variant="destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedNotification ? (
                <NotificationDetails
                  notification={selectedNotification}
                  onApprove={approveRequestMutation.mutate}
                  onReject={rejectRequestMutation.mutate}
                  getLayerName={getLayerName}
                  formatTimestamp={formatTimestamp}
                  getPriorityColor={getPriorityColor}
                />
              ) : (
                <div className="text-center text-slate-400 py-8">
                  <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a notification to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Notification Card Component
function NotificationCard({
  notification,
  onSelect,
  onMarkAsRead,
  getNotificationIcon,
  getPriorityColor,
  formatTimestamp
}: any) {
  return (
    <div
      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
        notification.isRead
          ? 'bg-slate-700 border-slate-600'
          : 'bg-slate-600 border-blue-500 ring-1 ring-blue-400'
      } hover:bg-slate-600`}
      onClick={() => {
        onSelect(notification);
        if (!notification.isRead) {
          onMarkAsRead(notification.id);
        }
      }}
    >
      <div className="flex items-start gap-3">
        {getNotificationIcon(notification.type, notification.priority)}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-white font-medium text-sm truncate">
              {notification.title}
            </h4>
            <div className="flex items-center gap-2 ml-2">
              <Badge className={`${getPriorityColor(notification.priority)} text-white text-xs`}>
                {notification.priority}
              </Badge>
              {!notification.isRead && (
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              )}
            </div>
          </div>
          <p className="text-slate-300 text-sm line-clamp-2">
            {notification.message}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-slate-400 text-xs">
              {formatTimestamp(notification.createdAt)}
            </span>
            {notification.actionRequired && (
              <Badge className="bg-orange-600 text-white text-xs">
                Action Required
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Notification Details Component
function NotificationDetails({
  notification,
  onApprove,
  onReject,
  getLayerName,
  formatTimestamp,
  getPriorityColor
}: any) {
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  if (notification.type === 'access_request') {
    const data = notification.data;
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Badge className={`${getPriorityColor(notification.priority)} text-white`}>
            {notification.priority.toUpperCase()}
          </Badge>
          <span className="text-slate-400 text-sm">
            {formatTimestamp(notification.createdAt)}
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-white font-medium mb-2">Access Request Details</h4>
            <div className="bg-slate-700 p-3 rounded space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">User:</span>
                <span className="text-white">{data.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Organization:</span>
                <span className="text-white">{data.organizationName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Current Layer:</span>
                <span className="text-white">{getLayerName(data.currentLayer)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Requested Layer:</span>
                <span className="text-white">{getLayerName(data.requestedLayer)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Urgency:</span>
                <Badge className={data.urgencyLevel === 'high' ? 'bg-orange-600' : 'bg-blue-600'}>
                  {data.urgencyLevel}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-2">Business Justification</h4>
            <div className="bg-slate-700 p-3 rounded text-sm text-slate-300">
              {data.businessJustification}
            </div>
          </div>

          {!showRejectForm ? (
            <div className="flex gap-2 pt-4">
              <Button
                onClick={() => onApprove({ requestId: data.requestId })}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Access
              </Button>
              <Button
                onClick={() => setShowRejectForm(true)}
                variant="destructive"
                className="flex-1"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject Request
              </Button>
            </div>
          ) : (
            <div className="space-y-3 pt-4">
              <textarea
                placeholder="Reason for rejection..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                rows={3}
              />
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    onReject({ requestId: data.requestId, reason: rejectReason });
                    setShowRejectForm(false);
                    setRejectReason('');
                  }}
                  variant="destructive"
                  className="flex-1"
                  disabled={!rejectReason.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Rejection
                </Button>
                <Button
                  onClick={() => {
                    setShowRejectForm(false);
                    setRejectReason('');
                  }}
                  variant="outline"
                  className="flex-1 border-slate-600"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default notification details
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Badge className={`${getPriorityColor(notification.priority)} text-white`}>
          {notification.priority.toUpperCase()}
        </Badge>
        <span className="text-slate-400 text-sm">
          {formatTimestamp(notification.createdAt)}
        </span>
      </div>

      <div>
        <h4 className="text-white font-medium mb-2">{notification.title}</h4>
        <div className="bg-slate-700 p-3 rounded text-sm text-slate-300">
          {notification.message}
        </div>
      </div>

      {notification.data && (
        <div>
          <h4 className="text-white font-medium mb-2">Additional Details</h4>
          <div className="bg-slate-700 p-3 rounded text-sm text-slate-300">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(notification.data, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}