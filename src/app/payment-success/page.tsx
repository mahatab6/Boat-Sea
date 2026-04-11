"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      // OPTIONAL: Call your backend here to verify the session
      // httpClient.get(`/bookings/verify-payment?session_id=${sessionId}`)
      console.log("Payment Session ID:", sessionId);
    }
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle2 className="w-20 h-20 text-green-500" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Payment Successful!</h1>
          <p className="text-slate-500">
            Your voyage has been confirmed. Get ready for an amazing trip.
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-400 break-all font-mono">
          Ref: {sessionId}
        </div>

        <Button 
          onClick={() => router.push("/dashboard")} 
          className="w-full h-12 rounded-xl"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;