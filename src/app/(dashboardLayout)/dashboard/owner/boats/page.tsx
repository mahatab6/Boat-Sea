"use client";

import { deleteBoatAction } from "@/components/modules/Dashboard/Boat-owner/BoatDeleteAction";
import BoatFormModal from "@/components/modules/Dashboard/Boat-owner/BoatFormModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getMyboat } from "@/services/getMyboat.services";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Anchor,
  ChevronLeft,
  ChevronRight,
  Edit,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const MyBoatPage = () => {
  const queryClient = useQueryClient();

  // --- 1. FILTER & PAGINATION STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");

  // Modal States
  const [formModalOpen, setFormModalOpen] = useState(false);


 
  const { data: response, isLoading } = useQuery({
    
    queryKey: ["get-my-boat", searchTerm, page, statusFilter, sortBy],
    queryFn: () =>
      getMyboat({
        searchTerm,
        page,
        limit,
        sortBy,
        sortOrder: "desc",
        ...(statusFilter !== "all" && { status: statusFilter }),
      }),
  });

  const resBoats = response?.data ?? [];
  const meta = response?.meta;

  // --- 3. HANDLERS ---
  const executeDeletion = async (boatId: string) => {
    const loadingId = toast.loading("Deleting...");
    try {
      await deleteBoatAction(boatId);
      queryClient.invalidateQueries({ queryKey: ["get-my-boat"] });
      toast.success("Boat deleted!", { id: loadingId });
    } catch (error) {
      toast.error("Failed to delete", { id: loadingId });
    }
  };

  const handleDelete = (boatId: string) => {
    const confirmToastId = toast(
      () => (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Delete this boat permanently?</span>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="destructive" 
              className={"hover:cursor-pointer"}
              onClick={() => { toast.dismiss(confirmToastId); executeDeletion(boatId); }}
            >
              OK
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className={"hover:cursor-pointer"}
              onClick={() => toast.dismiss(confirmToastId)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const openFormModal = () => {
    setFormModalOpen(true);
  };


  return (
    <div className="space-y-6">
      {/* --- FILTER BAR --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border">
        <div className="flex flex-1 flex-wrap items-center gap-3 w-full">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search boats..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1); // Reset to page 1 on search
              }}
              className="pl-9"
            />
          </div>

          <Select value={statusFilter} onValueChange={(val) => { if (val) { setStatusFilter(val); setPage(1); } }}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="AVAILABLE">Available</SelectItem>
              <SelectItem value="BOOKED">Booked</SelectItem>
            </SelectContent>
          </Select>

        </div>

        <Button onClick={() => openFormModal()} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 hover:cursor-pointer">
          <Plus className="w-4 h-4 mr-2" /> Add New Boat
        </Button>
      </div>

      {/* --- CONTENT --- */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse h-80 bg-muted" />
          ))}
        </div>
      ) : resBoats.length === 0 ? (
        <div className="text-center py-16 bg-muted/30 rounded-2xl border border-dashed">
          <Anchor className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
          <h3 className="text-lg font-medium">No vessels found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your filters or list a new boat.</p>
          <Button onClick={() => openFormModal()}>List a Boat</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {resBoats.map((boat) => (
            <Card key={boat.id} className="overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
              <div className="h-48 bg-muted relative overflow-hidden">
                {boat.primary_img ? (
                  <Image src={boat.primary_img} alt={boat.boatName} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100"><Anchor className="opacity-20" /></div>
                )}
                
              </div>
              <CardContent className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{boat.boatName}</h3>
                <p className="text-primary font-bold mb-4">${boat.pricePerTrip} / Trip</p>
                <div className="mt-auto flex gap-2 border-t pt-4">
                  <Link href={`boats/edit/${boat.id}`}>
                  <Button size="sm" variant="outline" className="flex-1 hover:cursor-pointer">
                     
                    <Edit className="w-4 h-4 mr-2" /> Edit
                  </Button>
                 </Link>
                  <Button size="sm" variant="destructive" className="hover:cursor-pointer" onClick={() => handleDelete(boat.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* --- PAGINATION --- */}
      {meta && meta.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-6">
          <Button variant="outline" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          <span className="text-sm font-semibold">Page {page} of {meta.totalPages}</span>
          <Button variant="outline" disabled={page >= meta.totalPages} onClick={() => setPage(p => p + 1)}>
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}

      {/* --- MODALS --- */}
      <BoatFormModal 
        open={formModalOpen} 
        onClose={() => setFormModalOpen(false)} 
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ["get-my-boat"] })}
      />
    </div>
  );
};

export default MyBoatPage;