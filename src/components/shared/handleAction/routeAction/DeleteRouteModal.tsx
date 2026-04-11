

import { deleteRoute } from '@/app/(dashboardLayout)/dashboard/admin/routes-management/_action';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { IRoute } from '@/types/route.types';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { toast } from 'sonner';

interface Props {
  open: boolean;
  onClose: () => void;
  route?: IRoute | null;
}

const DeleteRouteModal = ({ open, onClose, route }: Props) => {

    const queryClient = useQueryClient();
    
      const handleDelete = async () => {
        if (!route) return;
    
        try {
          await deleteRoute(route.id);
    
          await queryClient.refetchQueries({
            queryKey: ["getAllRoute"],
            type: "active",
          });
          toast.success("Route deleted successfully");
          onClose();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          toast.error("Failed to delete route");
        }
      };

  return (
    <Dialog open={open} onOpenChange={onClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete this route?
              </DialogTitle>
            </DialogHeader>
    
            <Button variant="destructive" onClick={handleDelete} className={"hover:cursor-pointer"}>
              Confirm Delete
            </Button>
          </DialogContent>
        </Dialog>
  )
}

export default DeleteRouteModal