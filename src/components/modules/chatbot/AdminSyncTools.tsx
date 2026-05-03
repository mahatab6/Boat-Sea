"use client";

import React, { useState } from "react";
import {
  RefreshCw, Database, Ship, Star, UserCheck, Route, CheckCircle2,
  AlertCircle, Loader2, Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SourceType = "boats" | "reviews" | "owners" | "routes" | "schedules";

interface SyncResult {
  type: string;
  status: "success" | "error";
  message: string;
  count?: number;
}

const sourceConfig: {
  type: SourceType;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    type: "boats",
    label: "Boats",
    description: "Index all boat listings with details, images & specs",
    icon: <Ship className="h-5 w-5" />,
    color: "text-blue-500",
  },
  {
    type: "reviews",
    label: "Reviews",
    description: "Index user reviews, ratings & feedback",
    icon: <Star className="h-5 w-5" />,
    color: "text-amber-500",
  },
  {
    type: "owners",
    label: "Boat Owners",
    description: "Index owner profiles & fleet information",
    icon: <UserCheck className="h-5 w-5" />,
    color: "text-emerald-500",
  },
  {
    type: "routes",
    label: "Routes",
    description: "Index route data, distances & difficulty",
    icon: <Route className="h-5 w-5" />,
    color: "text-purple-500",
  },
  {
    type: "schedules",
    label: "Schedules",
    description: "Index trip schedules, times & availability",
    icon: <Database className="h-5 w-5" />,
    color: "text-cyan-500",
  },
];

const AdminSyncTools = () => {
  const [syncingAll, setSyncingAll] = useState(false);
  const [syncingType, setSyncingType] = useState<string | null>(null);
  const [results, setResults] = useState<SyncResult[]>([]);
  const [deletingType, setDeletingType] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const syncAll = async () => {
    setSyncingAll(true);
    setResults([]);

    try {
      const res = await fetch(`${baseUrl}/rag/index/all`, { method: "POST" });
      const data = await res.json();

      if (data?.success) {
        setResults([
          {
            type: "all",
            status: "success",
            message: "All data re-indexed successfully",
            count: data.data?.total,
          },
        ]);
      } else {
        setResults([
          {
            type: "all",
            status: "error",
            message: data?.message || "Re-indexing failed",
          },
        ]);
      }
    } catch {
      setResults([{ type: "all", status: "error", message: "Network error" }]);
    } finally {
      setSyncingAll(false);
    }
  };

  const syncByType = async (sourceType: SourceType) => {
    setSyncingType(sourceType);

    try {
      const res = await fetch(`${baseUrl}/rag/index/${sourceType}`, {
        method: "POST",
      });
      const data = await res.json();

      const result: SyncResult = data?.success
        ? { type: sourceType, status: "success", message: `${sourceType} indexed`, count: data.data?.count }
        : { type: sourceType, status: "error", message: data?.message || "Failed" };

      setResults((prev) => [
        ...prev.filter((r) => r.type !== sourceType),
        result,
      ]);
    } catch {
      setResults((prev) => [
        ...prev.filter((r) => r.type !== sourceType),
        { type: sourceType, status: "error", message: "Network error" },
      ]);
    } finally {
      setSyncingType(null);
    }
  };

  const deleteByType = async (sourceType: SourceType) => {
    setDeletingType(sourceType);

    try {
      const res = await fetch(`${baseUrl}/rag/embeddings/${sourceType}`, {
        method: "DELETE",
      });
      const data = await res.json();

      const result: SyncResult = data?.success
        ? { type: `${sourceType}-delete`, status: "success", message: `${sourceType} embeddings deleted`, count: data.data?.deleted }
        : { type: `${sourceType}-delete`, status: "error", message: data?.message || "Failed" };

      setResults((prev) => [
        ...prev.filter((r) => r.type !== `${sourceType}-delete`),
        result,
      ]);
    } catch {
      setResults((prev) => [
        ...prev.filter((r) => r.type !== `${sourceType}-delete`),
        { type: `${sourceType}-delete`, status: "error", message: "Network error" },
      ]);
    } finally {
      setDeletingType(null);
    }
  };

  const getResultForType = (type: string) =>
    results.find((r) => r.type === type);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">RAG Sync Tools</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage vector embeddings for the AI chatbot assistant
          </p>
        </div>

        <button
          onClick={syncAll}
          disabled={syncingAll}
          className={cn(
            "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer",
            "bg-gradient-to-r from-primary to-primary/85 text-primary-foreground",
            "hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]",
            "disabled:opacity-60 disabled:cursor-not-allowed"
          )}
        >
          {syncingAll ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          {syncingAll ? "Re-indexing all..." : "Re-index All Data"}
        </button>
      </div>

      {/* Full re-index result */}
      {getResultForType("all") && (
        <div
          className={cn(
            "flex items-center gap-3 p-4 rounded-xl border text-sm",
            getResultForType("all")?.status === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400"
              : "bg-destructive/10 border-destructive/20 text-destructive"
          )}
        >
          {getResultForType("all")?.status === "success" ? (
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
          )}
          <span>{getResultForType("all")?.message}</span>
        </div>
      )}

      {/* Source Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sourceConfig.map((source) => {
          const result = getResultForType(source.type);
          const deleteResult = getResultForType(`${source.type}-delete`);
          const isSyncing = syncingType === source.type;
          const isDeleting = deletingType === source.type;

          return (
            <div
              key={source.type}
              className="group relative rounded-2xl border border-border/60 bg-card p-5 transition-all duration-200 hover:shadow-md hover:border-border"
            >
              {/* Icon & Label */}
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={cn(
                    "h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center",
                    source.color
                  )}
                >
                  {source.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-foreground">
                    {source.label}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {source.description}
                  </p>
                </div>
              </div>

              {/* Status */}
              {(result || deleteResult) && (
                <div className="mb-3 space-y-1.5">
                  {result && (
                    <div
                      className={cn(
                        "flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg",
                        result.status === "success"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-destructive/10 text-destructive"
                      )}
                    >
                      {result.status === "success" ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <AlertCircle className="h-3 w-3" />
                      )}
                      {result.message}
                      {result.count != null && ` (${result.count})`}
                    </div>
                  )}
                  {deleteResult && (
                    <div
                      className={cn(
                        "flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg",
                        deleteResult.status === "success"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : "bg-destructive/10 text-destructive"
                      )}
                    >
                      {deleteResult.status === "success" ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <AlertCircle className="h-3 w-3" />
                      )}
                      {deleteResult.message}
                      {deleteResult.count != null && ` (${deleteResult.count})`}
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => syncByType(source.type)}
                  disabled={isSyncing || syncingAll}
                  className={cn(
                    "flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer",
                    "bg-primary/10 text-primary hover:bg-primary/20",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {isSyncing ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <RefreshCw className="h-3.5 w-3.5" />
                  )}
                  {isSyncing ? "Syncing..." : "Sync"}
                </button>

                <button
                  onClick={() => deleteByType(source.type)}
                  disabled={isDeleting || syncingAll}
                  className={cn(
                    "inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer",
                    "bg-destructive/10 text-destructive hover:bg-destructive/20",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {isDeleting ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSyncTools;
