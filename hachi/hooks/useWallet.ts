"use client";

import { useAuth } from "./useAuth";
import { db } from "@/lib/firebase";
import { doc, updateDoc, increment } from "firebase/firestore";

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: any) => {
        openIframe: () => void;
      };
    };
  }
}

export function useWallet() {
  const { user, walletBalance } = useAuth();

  const initiateTopUp = (amount: number, onSuccess?: () => void) => {
    if (!user || !user.email) return;

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: user.email,
      amount: amount * 100, // Paystack amount is in kobo (or cents)
      currency: "NGN",
      callback: async (_response: unknown) => {
        // In a real app, you should verify the transaction on the server
        // _response.reference has the transaction ID
        
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          walletBalance: increment(amount)
        });

        if (onSuccess) onSuccess();
      },
      onClose: () => {
        console.log("Transaction closed");
      }
    });

    handler.openIframe();
  };

  return { walletBalance, initiateTopUp };
}
