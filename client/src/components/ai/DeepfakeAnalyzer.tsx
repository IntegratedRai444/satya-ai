import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Upload, Camera, Mic, AlertTriangle, CheckCircle, Eye, AudioWaveform, Video, Play, Pause } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeepfakeResult {
  isDeepfake: boolean;
  confidence: number;
  analysis: {
    facial?: string;
    audio?: string;
    artifacts?: string[];
    recommendation: string;
  };
}

export default function DeepfakeAnalyzer() {
  const [dragActive, setDragActive] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<DeepfakeResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<'image' | 'video' | 'audio'>('image');
  const [isRecording, setIsRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const queryClient = useQueryClient();

  const analyzeDeepfake = useMutation({
    mutationFn: async (data: { file: File; fileType: string }) => {
      const formData = new FormData();
      formData.append('file', data.file);
      formData.append('fileType', data.fileType);
      
      const response = await fetch('/api/ai/analyze-deepfake', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error('Analysis failed');
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      queryClient.invalidateQueries({ queryKey: ['/api/ai/detections'] });
    }
  });

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: fileType === 'video' 
      });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }, [fileType]);

  const startRecording = useCallback(() => {
    if (!mediaStream) return;

    const mediaRecorder = new MediaRecorder(mediaStream);
    mediaRecorderRef.current = mediaRecorder;
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks(prev => [...prev, event.data]);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { 
        type: fileType === 'video' ? 'video/webm' : 'audio/webm' 
      });
      const file = new File([blob], `recorded_${fileType}.webm`, { 
        type: blob.type 
      });
      setSelectedFile(file);
      setRecordedChunks([]);
    };

    mediaRecorder.start();
    setIsRecording(true);
  }, [mediaStream, recordedChunks, fileType]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const capturePhoto = useCallback(() => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'captured_photo.jpg', { type: 'image/jpeg' });
          setSelectedFile(file);
        }
      }, 'image/jpeg', 0.9);
    }
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    
    if (file.type.startsWith('image/')) {
      setFileType('image');
    } else if (file.type.startsWith('video/')) {
      setFileType('video');
    } else if (file.type.startsWith('audio/')) {
      setFileType('audio');
    }
  };

  const startAnalysis = () => {
    if (selectedFile) {
      analyzeDeepfake.mutate({ file: selectedFile, fileType });
    }
  };

  const getSeverityColor = (confidence: number) => {
    if (confidence > 0.8) return "bg-red-500/20 text-red-400 border-red-500/30";
    if (confidence > 0.6) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-green-500/20 text-green-400 border-green-500/30";
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-400">
            <Eye className="h-5 w-5" />
            AI Deepfake Detection System
          </CardTitle>
          <CardDescription className="text-gray-300">
            Advanced multimodal deepfake analysis with real-time capture capabilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Media Type Selection */}
          <div className="flex gap-2">
            {(['image', 'video', 'audio'] as const).map((type) => (
              <Button
                key={type}
                variant={fileType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setFileType(type)}
                className={fileType === type ? "bg-cyan-600 text-white" : "border-gray-600 text-gray-300"}
              >
                {type === 'image' && <Camera className="h-4 w-4 mr-1" />}
                {type === 'video' && <Video className="h-4 w-4 mr-1" />}
                {type === 'audio' && <AudioWaveform className="h-4 w-4 mr-1" />}
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>

          {/* Real-time Capture Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* File Upload */}
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive 
                  ? 'border-cyan-400 bg-cyan-500/10' 
                  : 'border-gray-600 hover:border-cyan-500/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*,video/*,audio/*"
                onChange={handleFileSelect}
              />
              
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Upload className="h-8 w-8 text-cyan-400" />
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">Upload Media</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Drop files here or click to select
                  </p>
                  
                  {selectedFile && (
                    <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
                      <p className="text-cyan-400 font-mono text-sm">
                        {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    </div>
                  )}
                  
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                  >
                    Select File
                  </Button>
                </div>
              </div>
            </div>

            {/* Real-time Capture */}
            <div className="border-2 border-gray-600 rounded-lg p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Camera className="h-5 w-5 text-cyan-400" />
                Real-time Capture
              </h3>
              
              {/* Camera Preview */}
              {(fileType === 'image' || fileType === 'video') && (
                <div className="space-y-4">
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full h-48 object-cover"
                      style={{ display: mediaStream ? 'block' : 'none' }}
                    />
                    {!mediaStream && (
                      <div className="w-full h-48 flex items-center justify-center bg-gray-800">
                        <p className="text-gray-400">Camera not active</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 justify-center">
                    {!mediaStream ? (
                      <Button
                        onClick={startCamera}
                        className="bg-cyan-600 hover:bg-cyan-700"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Start Camera
                      </Button>
                    ) : (
                      <>
                        {fileType === 'image' && (
                          <Button
                            onClick={capturePhoto}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Camera className="h-4 w-4 mr-2" />
                            Capture Photo
                          </Button>
                        )}
                        {fileType === 'video' && (
                          <Button
                            onClick={isRecording ? stopRecording : startRecording}
                            className={isRecording ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                          >
                            {isRecording ? (
                              <>
                                <Pause className="h-4 w-4 mr-2" />
                                Stop Recording
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Start Recording
                              </>
                            )}
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Audio Recording */}
              {fileType === 'audio' && (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center ${
                      isRecording ? 'border-red-500 bg-red-500/20 animate-pulse' : 'border-gray-600'
                    }`}>
                      <Mic className={`h-8 w-8 ${isRecording ? 'text-red-400' : 'text-gray-400'}`} />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={isRecording ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                    >
                      {isRecording ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="h-4 w-4 mr-2" />
                          Start Recording
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Analysis Section */}
          {selectedFile && (
            <div className="space-y-4 border-t border-gray-700 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Ready for Analysis</h3>
                <Button
                  onClick={startAnalysis}
                  disabled={analyzeDeepfake.isPending}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
                >
                  {analyzeDeepfake.isPending ? 'Analyzing...' : 'Start AI Analysis'}
                </Button>
              </div>

              {/* Analysis Progress */}
              {analyzeDeepfake.isPending && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Neural network processing...</span>
                    <span className="text-cyan-400">87%</span>
                  </div>
                  <Progress value={87} className="bg-gray-800" />
                  <p className="text-xs text-gray-500">
                    Analyzing temporal inconsistencies and compression artifacts
                  </p>
                </div>
              )}

              {/* Analysis Results */}
              {analysisResult && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Analysis Results</h3>
                    <Badge className={getSeverityColor(analysisResult.confidence)}>
                      {analysisResult.isDeepfake ? (
                        <AlertTriangle className="h-3 w-3 mr-1" />
                      ) : (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      )}
                      {(analysisResult.confidence * 100).toFixed(1)}% Confidence
                    </Badge>
                  </div>

                  <Alert className={`border ${analysisResult.isDeepfake ? 'border-red-500/50 bg-red-500/10' : 'border-green-500/50 bg-green-500/10'}`}>
                    <AlertDescription className="text-white">
                      <strong>
                        {analysisResult.isDeepfake ? 'DEEPFAKE DETECTED' : 'AUTHENTIC CONTENT'}
                      </strong>
                      <br />
                      {analysisResult.analysis.recommendation}
                    </AlertDescription>
                  </Alert>

                  {/* Detailed Analysis */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analysisResult.analysis.facial && (
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <h4 className="font-semibold text-cyan-400 mb-2">Facial Analysis</h4>
                        <p className="text-sm text-gray-300">{analysisResult.analysis.facial}</p>
                      </div>
                    )}
                    
                    {analysisResult.analysis.audio && (
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <h4 className="font-semibold text-cyan-400 mb-2">Audio Analysis</h4>
                        <p className="text-sm text-gray-300">{analysisResult.analysis.audio}</p>
                      </div>
                    )}
                  </div>

                  {/* Artifacts */}
                  {analysisResult.analysis.artifacts && analysisResult.analysis.artifacts.length > 0 && (
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-semibold text-red-400 mb-2">Detected Artifacts</h4>
                      <div className="space-y-1">
                        {analysisResult.analysis.artifacts.map((artifact, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                            <span className="text-gray-300">{artifact}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}