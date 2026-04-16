/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useMemo } from "react";
import {
  Star,
  Search,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Ship,
  Zap,
  Anchor,
  SlidersHorizontal,
  Badge,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

import BoatCard from "@/components/shared/BoatCard";
import { getAllBoats } from "@/services/getAllBoat.services";
import { IBoat } from "@/types/boat.types";
import { useSearchParams } from "next/navigation";

const BoatsListingPage = () => {
  const searchParams = useSearchParams();
  const urlSearchTerm = searchParams.get("searchTerm") || "";

  const typeIcons: Record<string, React.ReactNode> = {
    SPEEDBOAT: <Zap className="w-4 h-4" />,
    FERRY: <Ship className="w-4 h-4" />,
    LAUNCH: <Ship className="w-4 h-4" />,
    PRIVATE: <Anchor className="w-4 h-4" />,
    YACHT: <Anchor className="w-4 h-4" />,
  };

  const [searchTerm, setSearchTerm] = useState(urlSearchTerm);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("rating-desc" );

  const [filters, setFilters] = useState({
    priceRange: [0, 10000] as [number, number],
    boatTypes: [] as string[],
    rating: 0,
    capacity: "",
  });

  // Query Params
  const queryParams = useMemo(() => {
    const [sortField, sortOrder] = sortBy.includes("-") 
      ? sortBy.split("-") 
      : [sortBy, "asc"];

    return {
      searchTerm: searchTerm || undefined,
      page,
      limit: 12,
      sortBy: sortField,
      sortOrder,
      "pricePerTrip[gte]": filters.priceRange[0],
      "pricePerTrip[lte]": filters.priceRange[1],
      "rating[gte]": filters.rating || undefined,
      status: "AVAILABLE",
      ...(filters.boatTypes.length > 0 && { boatType: filters.boatTypes.join(",") }),
      ...(filters.capacity && { capacity: filters.capacity }),
    };
  }, [searchTerm, page, sortBy, filters]);

  const { data: response, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["boats", queryParams],
    queryFn: () => getAllBoats(queryParams),
    placeholderData: (prev) => prev,
  });

  const boats = response?.data ?? [];
  const meta = response?.meta;

  // Handlers
  const handleTypeToggle = (type: string) => {
    setPage(1);
    setFilters((prev) => ({
      ...prev,
      boatTypes: prev.boatTypes.includes(type)
        ? prev.boatTypes.filter((t) => t !== type)
        : [...prev.boatTypes, type],
    }));
  };

  const handlePriceChange = (val: number[]) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, priceRange: val as [number, number] }));
  };

  const handleRatingChange = (star: number) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, rating: prev.rating === star ? 0 : star }));
  };

  const handleReset = () => {
    setFilters({
      priceRange: [0, 10000],
      boatTypes: [],
      rating: 0,
      capacity: "",
    });
    setSearchTerm("");
    setPage(1);
    setSortBy("rating-desc");
  };

  const activeFilterCount =
    filters.boatTypes.length + (filters.rating > 0 ? 1 : 0) + (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0);

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-20">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-950 to-slate-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight mb-4">
              Discover Your <span className="italic text-primary">Perfect Vessel</span>
            </h1>
            <p className="text-slate-400 text-lg">
              Explore premium boats and unforgettable water experiences
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-10 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search boats by name, location, or type..."
                className="pl-14 h-16 bg-white/10 border-white/20 text-white placeholder:text-slate-400 text-lg rounded-3xl focus-visible:ring-primary"
                value={searchTerm}
                onChange={(e) => {
                  setPage(1);
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filter Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-800 sticky top-8 space-y-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold tracking-tight">Filters</h2>
                </div>
                {activeFilterCount > 0 && (
                  <Badge  className="px-3 py-1">
                    {activeFilterCount} active
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="text-muted-foreground hover:text-red-500 hover:cursor-pointer"
                >
                  <RotateCcw className="mr-2 w-4 h-4" />
                  Reset
                </Button>
              </div>

              {/* Sort */}
              <div>
                <Label className="text-sm font-semibold text-muted-foreground mb-3 block">Sort By</Label>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value || "")}>
                  <SelectTrigger className="h-12 rounded-2xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
          
                    <SelectItem value="pricePerTrip-asc">Price: Low to High</SelectItem>
                    <SelectItem value="pricePerTrip-desc">Price: High to Low</SelectItem>
                    
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <Label className="font-semibold">Price Range</Label>
                  <span className="text-sm font-medium text-primary">
                    ${filters.priceRange[0]} — ${filters.priceRange[1]}
                  </span>
                </div>
                <Slider
                  min={0}
                  max={10000}
                  step={25}
                  value={filters.priceRange}
                 onValueChange={(val) => handlePriceChange(val as number[])}
                  className="py-3"
                />
              </div>

              {/* Minimum Rating */}
              <div>
                <Label className="font-semibold mb-4 block">Minimum Rating</Label>
                <div className="flex gap-3">
                  {[4, 3, 2].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingChange(star)}
                      className={cn(
                        "flex-1 py-3 rounded-2xl border text-sm font-medium transition-all flex items-center justify-center gap-1.5",
                        filters.rating === star
                          ? "bg-primary text-white border-primary"
                          : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                      )}
                    >
                      {star} <Star className="w-4 h-4 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Boat Types */}
              <div>
                <Label className="font-semibold mb-4 block">Vessel Type</Label>
                <div className="space-y-2">
                  {["SPEEDBOAT", "FERRY", "LAUNCH", "PRIVATE", "YACHT"].map((type) => {
                    const isSelected = filters.boatTypes.includes(type);
                    return (
                      <div
                        key={type}
                        onClick={() => handleTypeToggle(type)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all",
                          isSelected
                            ? "border-primary bg-primary/5 dark:bg-primary/10"
                            : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center",
                              isSelected ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800"
                            )}
                          >
                            {typeIcons[type]}
                          </div>
                          <span className="font-medium text-sm capitalize">{type.toLowerCase()}</span>
                        </div>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleTypeToggle(type)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Results Section */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Available Boats
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  {meta?.total || 0} vessels found
                </p>
              </div>

              {isLoading && (
                <div className="text-sm text-muted-foreground">Loading boats...</div>
              )}
            </div>

            {/* Boat Grid */}
            {boats.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                <Ship className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-700 mb-6" />
                <h3 className="text-2xl font-semibold mb-2">No boats found</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                  We couldn't find any boats matching your current filters.
                </p>
                <Button onClick={handleReset} size="lg" className="rounded-2xl">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2  gap-8",
                  isPlaceholderData && "opacity-75 pointer-events-none"
                )}
              >
                {boats.map((boat: IBoat) => (
                  <BoatCard key={boat.id} boat={boat} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-16">
                <Button
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-2xl px-6"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <div className="px-6 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 font-medium">
                  Page {page} of {meta.totalPages}
                </div>

                <Button
                  variant="outline"
                  disabled={page >= meta.totalPages}
                  onClick={() => setPage((p) => Math.min(meta.totalPages ?? 1, p + 1))}
                  className="rounded-2xl px-6"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BoatsListingPage;