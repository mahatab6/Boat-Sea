import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { useGSAPAnimation } from '@/hooks/useGSAPAnimation';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  className?: string; 
}


const AnimatedModal = ({ open, onOpenChange, title, children, className } : AnimatedModalProps) => {
    const { prefersReducedMotion } = useGSAPAnimation();
  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`p-0 overflow-hidden border-0 bg-transparent shadow-none max-w-2xl ${className}`}>
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-background rounded-xl shadow-2xl border border-border flex flex-col max-h-[90vh]"
            >
              {title && (
                <DialogHeader className="p-6 pb-0">
                  <DialogTitle className="text-2xl font-serif">{title}</DialogTitle>
                </DialogHeader>
              )}
              <div className="p-6 overflow-y-auto">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

export default AnimatedModal