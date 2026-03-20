"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface SplashScreensProps {
  onComplete: () => void;
}

const steps = [
  {
    title: "Welcome to Hachi",
    description: "Your simple, real-time shared family grocery list.",
    image: "/images/welcome.png",
  },
  {
    title: "Connect Multiple Devices",
    description: "Sync seamlessly across everyone's phones, tablets, and computers.",
    image: "/images/connect.png",
  },
  {
    title: "Track Your Groceries",
    description: "Never forget an item again. Know exactly what you need, when you need it.",
    image: "/images/track.png",
  },
];

export default function SplashScreens({ onComplete }: SplashScreensProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const skip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Skip Button */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={skip}
          className="text-sm font-semibold text-gray-500 hover:text-primary transition-colors"
        >
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm flex flex-col items-center text-center"
          >
            <div className="relative w-full aspect-square mb-8">
              <Image
                src={steps[currentStep].image}
                alt={steps[currentStep].title}
                fill
                priority
                className="object-contain grayscale dark:invert"
              />
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white mb-4">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed px-4">
              {steps[currentStep].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="p-8 pb-12 w-full max-w-md mx-auto relative z-10 flex flex-col gap-8">
        {/* Indicators */}
        <div className="flex justify-center gap-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentStep ? "w-8 bg-black dark:bg-white" : "w-2 bg-gray-200 dark:bg-zinc-800"
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <button
          onClick={nextStep}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-all font-bold text-lg active:scale-95 shadow-xl"
        >
          {currentStep < steps.length - 1 ? (
            <>
              Next <ChevronRight size={20} />
            </>
          ) : (
            "Get Started"
          )}
        </button>
      </div>

      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-black/5 dark:bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-black/5 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
