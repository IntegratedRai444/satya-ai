import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { FileText, AlertTriangle, CheckCircle, Brain, Shield, Globe } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface FakeNewsResult {
  isFake: boolean;
  confidence: number;
  indicators: string[];
}

interface InjectionResult {
  hasInjection: boolean;
  type: string;
  confidence: number;
}

export default function TextAnalyzer() {
  const [inputText, setInputText] = useState('');
  const [analysisType, setAnalysisType] = useState<'fake-news' | 'injection'>('fake-news');
  const [fakeNewsResult, setFakeNewsResult] = useState<FakeNewsResult | null>(null);
  const [injectionResult, setInjectionResult] = useState<InjectionResult | null>(null);
  const queryClient = useQueryClient();

  const analyzeFakeNews = useMutation({
    mutationFn: async (text: string) => {
      const response = await fetch('/api/ai/analyze-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      
      if (!response.ok) throw new Error('Analysis failed');
      return response.json();
    },
    onSuccess: (data) => {
      setFakeNewsResult(data);
      queryClient.invalidateQueries({ queryKey: ['/api/ai/detections'] });
    }
  });

  const analyzeInjection = useMutation({
    mutationFn: async (input: string) => {
      const response = await fetch('/api/security/detect-injection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
      });
      
      if (!response.ok) throw new Error('Analysis failed');
      return response.json();
    },
    onSuccess: (data) => {
      setInjectionResult(data);
    }
  });

  const startAnalysis = () => {
    if (!inputText.trim()) return;
    
    if (analysisType === 'fake-news') {
      setFakeNewsResult(null);
      analyzeFakeNews.mutate(inputText);
    } else {
      setInjectionResult(null);
      analyzeInjection.mutate(inputText);
    }
  };

  const getSeverityColor = (confidence: number, isPositive = false) => {
    if (isPositive) {
      if (confidence > 0.8) return "bg-green-500/20 text-green-400 border-green-500/30";
      if (confidence > 0.6) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      return "bg-red-500/20 text-red-400 border-red-500/30";
    } else {
      if (confidence > 0.8) return "bg-red-500/20 text-red-400 border-red-500/30";
      if (confidence > 0.6) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      return "bg-green-500/20 text-green-400 border-green-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Brain className="h-5 w-5" />
            AI Text Analysis System
          </CardTitle>
          <CardDescription className="text-gray-300">
            Advanced NLP analysis for misinformation detection and security threats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Analysis Type Selection */}
          <div className="flex gap-2">
            <Button
              variant={analysisType === 'fake-news' ? "default" : "outline"}
              size="sm"
              onClick={() => setAnalysisType('fake-news')}
              className={analysisType === 'fake-news' ? "bg-purple-600 text-white" : "border-gray-600 text-gray-300"}
            >
              <Globe className="h-4 w-4 mr-1" />
              Fake News Detection
            </Button>
            <Button
              variant={analysisType === 'injection' ? "default" : "outline"}
              size="sm"
              onClick={() => setAnalysisType('injection')}
              className={analysisType === 'injection' ? "bg-purple-600 text-white" : "border-gray-600 text-gray-300"}
            >
              <Shield className="h-4 w-4 mr-1" />
              Code Injection Scan
            </Button>
          </div>

          {/* Text Input */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-purple-400" />
              <h3 className="font-semibold text-white">
                {analysisType === 'fake-news' ? 'News Article or Text Content' : 'Input String to Analyze'}
              </h3>
            </div>
            
            <Textarea
              placeholder={
                analysisType === 'fake-news' 
                  ? "Paste news article, social media post, or any text content to analyze for misinformation..."
                  : "Enter user input, query parameters, or any string to check for injection attacks..."
              }
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[200px] bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 resize-none"
            />
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">
                {inputText.length} characters • {inputText.split(/\s+/).filter(Boolean).length} words
              </p>
              
              <Button
                onClick={startAnalysis}
                disabled={(analyzeFakeNews.isPending || analyzeInjection.isPending) || !inputText.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500"
              >
                {(analyzeFakeNews.isPending || analyzeInjection.isPending) ? 'Analyzing...' : 'Start Analysis'}
              </Button>
            </div>
          </div>

          {/* Analysis Progress */}
          {(analyzeFakeNews.isPending || analyzeInjection.isPending) && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">
                  {analysisType === 'fake-news' ? 'Analyzing linguistic patterns...' : 'Scanning for malicious patterns...'}
                </span>
                <span className="text-purple-400">92%</span>
              </div>
              <Progress value={92} className="bg-gray-800" />
              <p className="text-xs text-gray-500">
                {analysisType === 'fake-news' 
                  ? 'Checking credibility indicators and bias markers' 
                  : 'Detecting SQL injection, XSS, and command injection patterns'}
              </p>
            </div>
          )}

          {/* Fake News Results */}
          {fakeNewsResult && analysisType === 'fake-news' && (
            <div className="space-y-4 border-t border-gray-700 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Misinformation Analysis</h3>
                <Badge className={getSeverityColor(fakeNewsResult.confidence, !fakeNewsResult.isFake)}>
                  {fakeNewsResult.isFake ? (
                    <AlertTriangle className="h-3 w-3 mr-1" />
                  ) : (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  )}
                  {(fakeNewsResult.confidence * 100).toFixed(1)}% Confidence
                </Badge>
              </div>

              <Alert className={`border ${fakeNewsResult.isFake ? 'border-red-500/50 bg-red-500/10' : 'border-green-500/50 bg-green-500/10'}`}>
                <AlertDescription className="text-white">
                  <strong>
                    {fakeNewsResult.isFake ? 'POTENTIAL MISINFORMATION DETECTED' : 'CONTENT APPEARS CREDIBLE'}
                  </strong>
                  <br />
                  {fakeNewsResult.isFake 
                    ? 'This content shows indicators of misinformation or bias'
                    : 'No significant misinformation indicators found'}
                </AlertDescription>
              </Alert>

              {fakeNewsResult.indicators.length > 0 && (
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-400 mb-2">Detected Indicators</h4>
                  <div className="space-y-1">
                    {fakeNewsResult.indicators.map((indicator, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-gray-300">{indicator}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Injection Results */}
          {injectionResult && analysisType === 'injection' && (
            <div className="space-y-4 border-t border-gray-700 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Security Analysis</h3>
                <Badge className={getSeverityColor(injectionResult.confidence, !injectionResult.hasInjection)}>
                  {injectionResult.hasInjection ? (
                    <AlertTriangle className="h-3 w-3 mr-1" />
                  ) : (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  )}
                  {(injectionResult.confidence * 100).toFixed(1)}% Confidence
                </Badge>
              </div>

              <Alert className={`border ${injectionResult.hasInjection ? 'border-red-500/50 bg-red-500/10' : 'border-green-500/50 bg-green-500/10'}`}>
                <AlertDescription className="text-white">
                  <strong>
                    {injectionResult.hasInjection ? `${injectionResult.type.toUpperCase()} DETECTED` : 'INPUT APPEARS SAFE'}
                  </strong>
                  <br />
                  {injectionResult.hasInjection 
                    ? `Potential ${injectionResult.type} attack pattern identified`
                    : 'No malicious injection patterns detected'}
                </AlertDescription>
              </Alert>

              {injectionResult.hasInjection && (
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-400 mb-2">Threat Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Attack Type:</span>
                      <span className="text-red-400 font-mono">{injectionResult.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Risk Level:</span>
                      <span className={`font-semibold ${
                        injectionResult.confidence > 0.8 ? 'text-red-400' : 
                        injectionResult.confidence > 0.6 ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {injectionResult.confidence > 0.8 ? 'HIGH' : 
                         injectionResult.confidence > 0.6 ? 'MEDIUM' : 'LOW'}
                      </span>
                    </div>
                    <div className="mt-3 p-3 bg-red-900/20 rounded border border-red-500/30">
                      <p className="text-red-300 text-sm">
                        <strong>Recommendation:</strong> Block this input and sanitize all user data before processing.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}