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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

import BoatCard from "@/components/shared/BoatCard";
import { getAllBoats } from "@/services/getAllBoat.services";
import { IBoat } from "@/types/boat.types";

const BoatsListingPage = () => {
  /*
  ========================
  STATE
  ========================
  */
  const typeIcons = {
    Yacht: <Anchor className="w-4 h-4" />,
    Speedboat: <Zap className="w-4 h-4" />,
    Catamaran: <Ship className="w-4 h-4" />,
  };

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = searchTerm;

  const [page, setPage] = useState(1);

  const [sortBy, setSortBy] = useState("rating");

  const [filters, setFilters] = useState({
    priceRange: [0, 2000],
    boatTypes: [] as string[],
    rating: 0,
  });

  /*
  ========================
  QUERY PARAM BUILDER
  ========================
  */

  const queryParams = useMemo(() => {
    return {
      searchTerm: debouncedSearch,

      page,

      limit: 10,

      sortBy,

      sortOrder: "desc",

      "pricePerTrip[gte]": filters.priceRange[0],

      "pricePerTrip[lte]": filters.priceRange[1],

      "rating[gte]": filters.rating,

      status: "AVAILABLE",

      ...(filters.boatTypes.length > 0 && {
        "type[in]": filters.boatTypes,
      }),
    };
  }, [debouncedSearch, page, sortBy, filters]);

  /*
  ========================
  API CALL
  ========================
  */

  const {
    data: response,
    isLoading,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["boats", queryParams],

    queryFn: () => getAllBoats(queryParams),

    placeholderData: (prev) => prev,
  });

  const boats = response?.data ?? [];

  const meta = response?.meta;

  /*
  ========================
  HANDLERS
  ========================
  */

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

    setFilters((prev) => ({
      ...prev,

      priceRange: val,
    }));
  };

  const handleRatingChange = (star: number) => {
    setPage(1);

    setFilters((prev) => ({
      ...prev,

      rating: prev.rating === star ? 0 : star,
    }));
  };

  const handleReset = () => {
    setFilters({
      priceRange: [0, 2000],

      boatTypes: [],

      rating: 0,
    });

    setSearchTerm("");

    setPage(1);
  };

  /*
  ========================
  UI
  ========================
  */

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* HEADER */}

      <div className="bg-slate-950 py-20 mb-12 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-serif text-5xl font-bold mb-6">
            Find Your{" "}
            <span className="italic">Perfect Vessel</span>
          </h1>

          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

            <Input
              placeholder="Search by name, location or manufacturer..."
              className="pl-12 h-14 bg-white/10 border-white/20 rounded-2xl"
              value={searchTerm}
              onChange={(e) => {
                setPage(1);

                setSearchTerm(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      {/* CONTENT */}

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* FILTER SIDEBAR */}

          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-950 rounded-3xl p-6 shadow-xl shadow-black/[0.03] border border-zinc-200 dark:border-zinc-800 sticky top-28 space-y-8">
              {/* HEADER & SORT */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-2xl tracking-tight">Refine</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="text-muted-foreground hover:text-primary h-8 px-2"
                  >
                    <RotateCcw className="mr-2 w-3 h-3" />
                    Reset
                  </Button>
                </div>

                <div className="relative">
                  <Label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1.5 block">
                    Sort By
                  </Label>
                  <select
                    value={sortBy}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none appearance-none transition-all cursor-pointer"
                    onChange={(e) => {
                      setPage(1);
                      setSortBy(e.target.value);
                    }}
                  >
                    <option value="rating">Top Rated</option>
                    <option value="pricePerTrip">Price: Low to High</option>
                    <option value="createdAt">Newest Arrival</option>
                  </select>
                </div>
              </div>

              <hr className="border-zinc-100 dark:border-zinc-800" />

              {/* PRICE RANGE */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <Label className="font-semibold text-base">Price Range</Label>
                  <span className="text-sm font-medium text-primary">
                    ${filters.priceRange[0]} — ${filters.priceRange[1] || 2000}
                  </span>
                </div>
                <Slider
                  min={0}
                  max={2000}
                  step={50}
                  value={filters.priceRange}
                  onValueChange={handlePriceChange}
                  className="py-4"
                />
              </div>

              {/* RATING */}
              <div className="space-y-3">
                <Label className="font-semibold text-base">
                  Minimum Rating
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {[4, 3, 2].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingChange(star)}
                      className={cn(
                        "flex items-center justify-center gap-1 py-2 rounded-xl border text-sm font-medium transition-all",
                        filters.rating === star
                          ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                          : "bg-transparent border-zinc-200 hover:border-zinc-400",
                      )}
                    >
                      {star}{" "}
                      <Star
                        className={cn(
                          "w-3 h-3",
                          filters.rating === star
                            ? "fill-current"
                            : "text-yellow-500",
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* VESSEL TYPE */}
              <div className="space-y-3">
                <Label className="font-semibold text-base">Vessel Type</Label>
                <div className="space-y-2">
                  {["Yacht", "Speedboat", "Catamaran"].map((type) => {
                    const isSelected = filters.boatTypes.includes(type);
                    return (
                      <div
                        key={type}
                        onClick={() => handleTypeToggle(type)}
                        className={cn(
                          "group flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900",
                          isSelected
                            ? "border-primary bg-primary/[0.02] ring-1 ring-primary/20"
                            : "border-zinc-200 dark:border-zinc-800",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "p-2 rounded-lg transition-colors",
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500",
                            )}
                          >
                            {typeIcons[type]}
                          </div>
                          <span
                            className={cn(
                              "text-sm font-medium",
                              isSelected
                                ? "text-primary"
                                : "text-zinc-700 dark:text-zinc-300",
                            )}
                          >
                            {type}
                          </span>
                        </div>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleTypeToggle(type)}
                          className="rounded-full border-zinc-300 data-[state=checked]:bg-primary"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* RESULTS */}

          <div className="lg:col-span-3">
            {boats.length === 0 ? (
              <div className="text-center py-16 bg-muted/30 rounded-2xl border border-dashed">
                <p className="text-lg font-semibold mb-2">No vessels found.</p>
                <p className="text-muted-foreground mb-6">
                  Try changing your filters or search term.
                </p>
                <Button onClick={handleReset}>Reset filters</Button>
              </div>
            ) : (
              <>
                <div
                  className={cn(
                    "grid grid-cols-1 md:grid-cols-2 gap-8",

                    isPlaceholderData && "opacity-50",
                  )}
                >
                  {boats.map((boat: IBoat) => (
                    <BoatCard key={boat.id} boat={boat} />
                  ))}
                </div>

                {meta && meta.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 pt-6">
                    <Button
                      variant="outline"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                    </Button>

                    <span className="text-sm font-semibold">
                      Page {page} of {meta.totalPages}
                    </span>

                    <Button
                      variant="outline"
                      disabled={page >= meta.totalPages}
                      onClick={() =>
                        setPage((p) =>
                          Math.min(meta.totalPages ?? p + 1, p + 1),
                        )
                      }
                    >
                      Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BoatsListingPage;
