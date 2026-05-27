"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

interface UseApiOptions {
  immediate?: boolean;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useApi<T>(
  endpoint: string | null,
  options: UseApiOptions = { immediate: true }
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!!options.immediate && !!endpoint);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!endpoint) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{ success: boolean; data: T; meta?: unknown }>(
        endpoint
      );
      setData(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (options.immediate && endpoint) {
      fetchData();
    }
  }, [fetchData, options.immediate, endpoint]);

  return { data, loading, error, refetch: fetchData };
}
