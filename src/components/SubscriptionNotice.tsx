"use client";

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, X, AlertCircle, Clock, Shield, Zap, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SubscriptionModal } from './SubscriptionModal';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock subscription data - this would come from your backend in production
const mockSubscriptionData = {
  status: 'trial',
  trialEndsAt: '2024-03-23', // Format: YYYY-MM-DD
  daysLeft: 7,
  totalTrialDays: 14,
  features: [
    'Unlimited products',
    'Advanced analytics',
    'Priority support',
    'Custom domain'
  ]
};

export function SubscriptionNotice() {
  const [isOpen, setIsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const daysProgress = ((mockSubscriptionData.totalTrialDays - mockSubscriptionData.daysLeft) / mockSubscriptionData.totalTrialDays) * 100;
    setProgress(daysProgress);
  }, []);

  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-6 duration-300">
        <div className={cn(
          "bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white rounded-xl shadow-2xl overflow-hidden",
          "border border-gray-800/50 backdrop-blur-sm",
          "transform transition-all duration-300",
          isExpanded ? "w-[400px]" : "w-[340px]",
          isExpanded ? "scale-102" : "scale-100",
          "hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        )}>
          {/* Collapsed Header */}
          <div 
            className={cn(
              "flex items-center justify-between px-4 py-3.5 cursor-pointer group",
              "hover:bg-white/5 transition-colors duration-200",
              "border-b border-gray-800/50"
            )}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-red-500/20 group-hover:from-amber-500/30 group-hover:to-red-500/30 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Trial Period Active</span>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-amber-500/50 text-amber-500 bg-amber-500/10">
                    {mockSubscriptionData.daysLeft} days left
                  </Badge>
                </div>
                <span className="text-xs text-gray-400">Expires {formatDate(mockSubscriptionData.trialEndsAt)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              <button className="p-1.5 rounded-full text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors">
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Trial Progress */}
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Trial Progress</span>
              <span className="text-xs text-amber-500">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5 bg-gray-800/50" />
          </div>

          {/* Expandable Content */}
          {isExpanded && (
            <div className="border-t border-gray-800/50">
              {/* Features Section */}
              <div className="p-4 space-y-4 bg-white/5">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500" />
                    Trial Features Included
                  </h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {mockSubscriptionData.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs text-gray-300">
                        <Check className="h-3.5 w-3.5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-500" />
                        Special Launch Offer
                      </h4>
                      <p className="text-xs text-gray-400">First 3 months at reduced price</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline gap-1 justify-end">
                        <span className="text-xs text-gray-400 line-through">1,200 ETB</span>
                        <span className="text-lg font-bold text-white">50 ETB</span>
                      </div>
                      <span className="text-xs text-gray-400">/month</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button
                    className="w-full bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white font-medium border-0 shadow-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Upgrade Now
                  </Button>
                  <button 
                    className="text-xs text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1 group w-full"
                    onClick={() => setIsModalOpen(true)}
                  >
                    View all plans
                    <ChevronDown className="h-3 w-3 group-hover:translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Security Note */}
              <div className="px-4 py-3 bg-white/[0.02] border-t border-gray-800/50">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Shield className="h-3.5 w-3.5" />
                  <span>Secure payment processing with bank-grade encryption</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <SubscriptionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}