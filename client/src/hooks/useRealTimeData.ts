import { useCallback, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function useRealTimeData() {
  const queryClient = useQueryClient();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const simulateNewThreat = useCallback(async () => {
    try {
      await apiRequest("GET", "/api/simulate/new-threat");
      // Invalidate and refetch threat data
      queryClient.invalidateQueries({ queryKey: ["/api/threats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/metrics/latest"] });
    } catch (error) {
      console.error("Failed to simulate new threat:", error);
    }
  }, [queryClient]);

  const updateMetrics = useCallback(() => {
    // Invalidate metrics to trigger refetch
    queryClient.invalidateQueries({ queryKey: ["/api/metrics/latest"] });
    queryClient.invalidateQueries({ queryKey: ["/api/network/nodes"] });
  }, [queryClient]);

  const startRealTimeUpdates = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Update metrics every 2 seconds
    intervalRef.current = setInterval(() => {
      updateMetrics();
    }, 2000);

    // Simulate new threats every 8 seconds
    const threatInterval = setInterval(() => {
      simulateNewThreat();
    }, 8000);

    // Store threat interval reference for cleanup
    intervalRef.current = threatInterval;
  }, [updateMetrics, simulateNewThreat]);

  const stopRealTimeUpdates = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return {
    startRealTimeUpdates,
    stopRealTimeUpdates,
    simulateNewThreat,
    updateMetrics
  };
}
