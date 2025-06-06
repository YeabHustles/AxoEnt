"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import styles from "./globals.module.css";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Building2, 
  CreditCard,
  CheckCircle2,
  Laptop,
  Globe,
  Store as StoreIcon,
  Tent,
  Share2,
  Globe2,
  ShoppingBag,
  Rocket,
  Building,
  Zap,
  Package,
  BarChart3,
  Users,
  Target,
  Shirt,
  Coffee,
  Home,
  Gem,
  Smartphone,
  Gamepad,
  Baby,
  Dog,
  Dumbbell,
  Camera,
  Music,
  Book,
  Car,
  HeartPulse,
  Flower2,
  XCircle,
  Info,
  ArrowRight,
  Lightbulb,
  Shield,
} from "lucide-react";

const steps = [
  {
    title: "Store",
    description: "Basic store details",
    icon: StoreIcon,
  },
  {
    title: "Business",
    description: "Business information",
    icon: Building2,
  },
  {
    title: "Size",
    description: "Business size",
    icon: Users,
  },
  {
    title: "Platforms",
    description: "Current platforms",
    icon: Globe2,
  },
  {
    title: "Niche",
    description: "Your market focus",
    icon: Target,
  },
  {
    title: "Domain",
    description: "Choose your domain",
    icon: Globe,
  },
  {
    title: "Plan",
    description: "Choose your plan",
    icon: CreditCard,
  }
];

const sellingOptions = [
  {
    id: "online-store",
    title: "An online store",
    description: "Create a fully customizable website",
    icon: Globe,
  },
  {
    id: "retail-store",
    title: "In person at a retail store",
    description: "Brick-and-mortar stores",
    icon: StoreIcon,
  },
  {
    id: "events",
    title: "In person at events",
    description: "Markets, fairs, and pop-ups",
    icon: Tent,
  },
  {
    id: "social",
    title: "Social media",
    description: "Reach customers on Facebook, Instagram, TikTok, and more",
    icon: Share2,
  },
  {
    id: "existing-website",
    title: "An existing website or blog",
    description: "Add a Buy Button to your website",
    icon: Globe2,
  },
  {
    id: "marketplaces",
    title: "Online marketplaces",
    description: "List products on Etsy, Amazon, and more",
    icon: ShoppingBag,
  },
];

const businessTypes = [
  {
    id: "starting",
    title: "I'm just starting my business",
    description: "Get help setting up your new business",
    icon: Rocket,
  },
  {
    id: "already-selling",
    title: "I'm already selling but want to try Axova",
    description: "Import your existing products and customers",
    icon: Building,
  },
  {
    id: "switching",
    title: "I'm switching to Axova from another platform",
    description: "We'll help you migrate your data",
    icon: Zap,
  },
];

const businessSizes = [
  {
    id: "small",
    title: "Small",
    description: "Less than 250k ETB annually",
    icon: Users,
  },
  {
    id: "medium",
    title: "Medium",
    description: "$250k - 1M ETB annually",
    icon: Building,
  },
  {
    id: "large",
    title: "Large",
    description: "More than 1M ETB annually",
    icon: Building2,
  },
];

const platforms = [
  {
    id: "none",
    title: "No, I'm not using any platform",
    icon: Package,
  },
  {
    id: "shopify",
    title: "Shopify",
    icon: ShoppingBag,
  },
  {
    id: "amazon",
    title: "Amazon",
    icon: ShoppingBag,
  },
  {
    id: "etsy",
    title: "Etsy",
    icon: Globe,
  },
  {
    id: "ebay",
    title: "eBay",
    icon: Package,
  },
  {
    id: "wix",
    title: "Wix",
    icon: Globe2,
  },
  {
    id: "wordpress",
    title: "WordPress",
    icon: Globe,
  },
  {
    id: "woocommerce",
    title: "WooCommerce",
    icon: ShoppingBag,
  },
];

const niches = [
  {
    id: "fashion",
    title: "Fashion & Apparel",
    description: "Clothing, accessories, and footwear",
    icon: Shirt,
  },
  {
    id: "food-beverage",
    title: "Food & Beverage",
    description: "Specialty foods, drinks, and ingredients",
    icon: Coffee,
  },
  {
    id: "home-garden",
    title: "Home & Garden",
    description: "Furniture, decor, and gardening",
    icon: Home,
  },
  {
    id: "beauty",
    title: "Beauty & Cosmetics",
    description: "Skincare, makeup, and personal care",
    icon: Gem,
  },
  {
    id: "electronics",
    title: "Electronics & Gadgets",
    description: "Tech accessories and smart devices",
    icon: Smartphone,
  },
  {
    id: "gaming",
    title: "Gaming & Entertainment",
    description: "Video games, toys, and hobbies",
    icon: Gamepad,
  },
  {
    id: "baby-kids",
    title: "Baby & Kids",
    description: "Children's clothing, toys, and gear",
    icon: Baby,
  },
  {
    id: "pets",
    title: "Pets",
    description: "Pet food, supplies, and accessories",
    icon: Dog,
  },
  {
    id: "sports-fitness",
    title: "Sports & Fitness",
    description: "Athletic gear and equipment",
    icon: Dumbbell,
  },
  {
    id: "art-photography",
    title: "Art & Photography",
    description: "Prints, artwork, and equipment",
    icon: Camera,
  },
  {
    id: "music",
    title: "Music & Instruments",
    description: "Instruments, equipment, and accessories",
    icon: Music,
  },
  {
    id: "books-media",
    title: "Books & Media",
    description: "Books, digital content, and courses",
    icon: Book,
  },
  {
    id: "automotive",
    title: "Automotive",
    description: "Car parts and accessories",
    icon: Car,
  },
  {
    id: "health-wellness",
    title: "Health & Wellness",
    description: "Supplements, wellness products",
    icon: HeartPulse,
  },
  {
    id: "jewelry",
    title: "Jewelry & Accessories",
    description: "Fine jewelry, watches, and accessories",
    icon: Gem,
  },
  {
    id: "flowers-gifts",
    title: "Flowers & Gifts",
    description: "Bouquets, gift baskets, and novelties",
    icon: Flower2,
  }
];

const pricingPlans = [
  {
    id: "basic",
    title: "Basic",
    description: "Best for new ecommerce businesses with occasional in-person sales",
    price: 29,
    icon: Package,
    features: [
      "Basic reports",
      "Up to 1,000 inventory locations",
      "2 staff accounts",
    ],
  },
  {
    id: "Axova",
    title: "Axova",
    description: "Best for growing businesses selling online or in-store",
    price: 79,
    icon: BarChart3,
    features: [
      "Professional reports",
      "Up to 1,000 inventory locations",
      "5 staff accounts",
    ],
  },
  {
    id: "advanced",
    title: "Advanced",
    description: "Best for scaling businesses that require advanced reporting",
    price: 299,
    icon: Users,
    features: [
      "Custom report builder",
      "Up to 1,000 inventory locations",
      "15 staff accounts",
    ],
  },
];

export default function StoreSetup() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [businessType, setBusinessType] = useState("");
  const [businessSize, setBusinessSize] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [storeName, setStoreName] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [domain, setDomain] = useState("");
  const [isDomainChecking, setIsDomainChecking] = useState(false);
  const [isDomainAvailable, setIsDomainAvailable] = useState<boolean | null>(null);
  const [selectedDomainType, setSelectedDomainType] = useState<'free' | 'custom'>('free');
  const [storeDescription, setStoreDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAiHelper, setShowAiHelper] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  // Function to simulate checking store name availability
  const checkAvailability = async (name: string) => {
    setIsCheckingAvailability(true);
    setIsAvailable(null);

    // Simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate availability check logic
    const available = name.length > 3 && !["taken", "unavailable"].includes(name.toLowerCase());
    setIsAvailable(available);
    setIsCheckingAvailability(false);
  };

  // Effect to trigger availability check when storeName changes
  useEffect(() => {
    if (storeName) {
      checkAvailability(storeName);
    } else {
      setIsAvailable(null);
    }
  }, [storeName]);

  // Add domain check function
  const checkDomainAvailability = async (domainName: string) => {
    setIsDomainChecking(true);
    setIsDomainAvailable(null);

    // Simulate API call with delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate domain check logic
    const available = domainName.length > 3 && 
      !["google", "amazon", "facebook"].includes(domainName.toLowerCase());
    setIsDomainAvailable(available);
    setIsDomainChecking(false);
  };

  // Add effect for domain check
  useEffect(() => {
    if (domain) {
      const timeoutId = setTimeout(() => {
        checkDomainAvailability(domain);
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setIsDomainAvailable(null);
    }
  }, [domain]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <h1 className="text-2xl font-semibold">Let's set up your store</h1>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-base text-gray-600">What's the name of your store?</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="Enter your store name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                />
                {isCheckingAvailability && <div className="text-sm text-gray-500">Checking availability...</div>}
                {isAvailable !== null && (
                  <div className={`text-sm ${isAvailable ? "text-green-500" : "text-red-500"}`}>
                    {isAvailable ? "Store name is available!" : "Store name is taken."}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-base text-gray-600">Where would you like to sell?</div>
              <div className="text-sm text-gray-500">Select all that apply</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sellingOptions.map((option) => {
                  const Icon = option.icon
                  const isSelected = selectedOptions.includes(option.id)
                  return (
                    <div
                      key={option.id}
                      onClick={() => toggleOption(option.id)}
                      className={`relative p-6 rounded-lg border transition-all cursor-pointer hover:border-black ${
                        isSelected ? "border-black bg-black/5" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-2 rounded-lg ${isSelected ? "bg-black text-white" : "bg-gray-100 text-gray-600"}`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-medium">{option.title}</div>
                          <div className="text-sm text-gray-500">{option.description}</div>
                        </div>
                        {isSelected && (
                          <div className="absolute top-4 right-4">
                            <CheckCircle2 className="w-5 h-5 text-black" />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-2xl font-bold">Which best describes you?</div>
            <div className="text-gray-500 mb-6">Tell us about your business</div>
            <RadioGroup value={businessType} onValueChange={setBusinessType}>
              <div className="space-y-4">
                {businessTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <div
                      key={type.id}
                      className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer hover:border-black hover:shadow-lg ${
                        businessType === type.id ? "border-black bg-black/5" : "border-gray-200"
                      }`}
                      onClick={() => setBusinessType(type.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-xl ${businessType === type.id ? "bg-black text-white" : "bg-gray-100 text-gray-600"}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-semibold mb-1">{type.title}</div>
                          <div className="text-sm text-gray-500">{type.description}</div>
                        </div>
                        <RadioGroupItem
                          value={type.id}
                          id={type.id}
                          className="absolute top-4 right-4"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-2xl font-bold">What size is your business?</div>
            <div className="text-gray-500 mb-6">Select one to get tailored support. We won't share this with anyone.</div>
            <RadioGroup value={businessSize} onValueChange={setBusinessSize}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {businessSizes.map((size) => {
                  const Icon = size.icon;
                  return (
                    <div
                      key={size.id}
                      className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer hover:border-black hover:shadow-lg ${
                        businessSize === size.id ? "border-black bg-black/5" : "border-gray-200"
                      }`}
                      onClick={() => setBusinessSize(size.id)}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`p-2 rounded-xl mb-3 ${businessSize === size.id ? "bg-black text-white" : "bg-gray-100 text-gray-600"}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="font-semibold mb-1">{size.title}</div>
                        <div className="text-sm text-gray-500">{size.description}</div>
                        <RadioGroupItem
                          value={size.id}
                          id={size.id}
                          className="absolute top-4 right-4"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-2xl font-bold">Do you currently sell on other platforms?</div>
            <div className="text-gray-500 mb-6">We make it easy to migrate to Axova</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const isSelected = selectedPlatforms.includes(platform.id);
                return (
                  <div
                    key={platform.id}
                    onClick={() => {
                      if (platform.id === 'none') {
                        setSelectedPlatforms(['none']);
                      } else {
                        setSelectedPlatforms(prev => 
                          prev.includes(platform.id)
                            ? prev.filter(id => id !== platform.id)
                            : [...prev.filter(id => id !== 'none'), platform.id]
                        );
                      }
                    }}
                    className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer hover:border-black hover:shadow-lg ${
                      isSelected ? "border-black bg-black/5" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl ${isSelected ? "bg-black text-white" : "bg-gray-100 text-gray-600"}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="font-semibold">{platform.title}</div>
                      {isSelected && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle2 className="w-5 h-5 text-black" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-2xl font-bold">What's your primary market focus?</div>
            <div className="text-gray-500 mb-6">Select up to 3 niches that best describe your business</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {niches.map((niche) => {
                const Icon = niche.icon;
                const isSelected = selectedNiches.includes(niche.id);
                const isDisabled = selectedNiches.length >= 3 && !isSelected;
                
                return (
                  <div
                    key={niche.id}
                    onClick={() => {
                      if (!isDisabled) {
                        setSelectedNiches(prev => 
                          prev.includes(niche.id)
                            ? prev.filter(id => id !== niche.id)
                            : [...prev, niche.id]
                        );
                      }
                    }}
                    className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer hover:border-black hover:shadow-lg ${
                      isSelected 
                        ? "border-black bg-black/5" 
                        : isDisabled
                          ? "border-gray-100 opacity-50 cursor-not-allowed"
                          : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-xl ${
                        isSelected 
                          ? "bg-black text-white" 
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-semibold mb-1">{niche.title}</div>
                        <div className="text-sm text-gray-500">{niche.description}</div>
                      </div>
                      {isSelected && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle2 className="w-5 h-5 text-black" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold">Choose your domain name</h2>
              <p className="text-sm text-gray-500">This will be your store's web address</p>
            </div>

            {/* Main Domain Input Section */}
            <div className="max-w-md mx-auto space-y-6">
              <div className="relative">
                <div className="flex h-12 items-center bg-white rounded-lg border-2 border-gray-200 hover:border-gray-300 focus-within:border-black transition-colors overflow-hidden">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="yourstore"
                      className="w-full h-full px-4 bg-transparent outline-none text-[15px] text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                  <div className="px-4 h-full flex items-center bg-gray-50 border-l border-gray-200 text-sm text-gray-500 select-none">
                    .axova.com
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="absolute left-0 right-0 top-full mt-2">
                  {isDomainChecking && (
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                      <div className="animate-spin w-3 h-3 border-[1.5px] border-gray-400 border-t-transparent rounded-full" />
                      <span>Checking availability...</span>
                    </div>
                  )}
                  {isDomainAvailable !== null && !isDomainChecking && (
                    <div className={`flex items-center justify-center gap-1.5 text-xs font-medium ${
                      isDomainAvailable ? 'text-green-600' : 'text-red-500'
                    }`}>
                      {isDomainAvailable ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Perfect! This domain is available</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>This domain is taken</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Domain Tips - Show only when AI helper is not active */}
              {!showAiHelper && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">Tips for a great domain</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span className="text-xs text-gray-600">Keep it memorable</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span className="text-xs text-gray-600">Avoid numbers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span className="text-xs text-gray-600">Easy to spell</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span className="text-xs text-gray-600">Brand focused</span>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Helper Section - Show when activated */}
              {showAiHelper && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">
                      Describe your store
                    </label>
                    <textarea
                      value={storeDescription}
                      onChange={(e) => setStoreDescription(e.target.value)}
                      placeholder="e.g., A modern boutique selling handmade jewelry and accessories..."
                      className="w-full h-24 p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                    <Button 
                      onClick={async () => {
                        setIsGenerating(true);
                        // Simulate AI generation
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        const generatedSuggestions = [
                          'creativeboutique',
                          'modernstore',
                          'artisanhub',
                          'trendyshop',
                          'uniquemarket',
                          'stylestore'
                        ];
                        setAiSuggestions(generatedSuggestions);
                        setIsGenerating(false);
                      }}
                      disabled={isGenerating || !storeDescription}
                      className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed h-12"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          Generate Names
                        </>
                      )}
                    </Button>
                  </div>

                  {/* AI Generated Suggestions */}
                  {aiSuggestions.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">AI Generated Suggestions</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {aiSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => setDomain(suggestion)}
                            className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-black transition-colors group"
                          >
                            <span className="text-sm text-gray-600 group-hover:text-black">
                              {suggestion}
                            </span>
                            <div className="text-xs font-medium text-green-600">Available</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* AI Helper Toggle Button */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowAiHelper(prev => !prev)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
                >
                  {showAiHelper ? (
                    <>
                      <ArrowRight className="w-4 h-4" />
                      <span>Back to manual entry</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Need help? Try AI suggestions</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-2xl font-bold">Choose your plan</div>
            <div className="text-gray-500 mb-6">Select the plan that best fits your needs</div>
            
            {/* Pricing Plans Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {pricingPlans.map((pricingPlan) => {
                const Icon = pricingPlan.icon;
                return (
                  <div
                    key={pricingPlan.id}
                    onClick={() => setSelectedPlan(pricingPlan.id)}
                    className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer hover:border-black hover:shadow-lg ${
                      selectedPlan === pricingPlan.id ? "border-black bg-black/5" : "border-gray-200"
                    }`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-2 rounded-xl ${selectedPlan === pricingPlan.id ? "bg-black text-white" : "bg-gray-100 text-gray-600"}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        {selectedPlan === pricingPlan.id && (
                          <CheckCircle2 className="w-5 h-5 text-black" />
                        )}
                      </div>
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold">{pricingPlan.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{pricingPlan.description}</p>
                      </div>
                      <div className="mb-6">
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold">${pricingPlan.price}</span>
                          <span className="text-gray-500 ml-1">/month</span>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <ul className="space-y-3">
                          {pricingPlan.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <CheckCircle2 className="w-4 h-4 text-black mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Free Trial Option */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setSelectedPlan('free-trial')}
                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                  selectedPlan === 'free-trial' 
                    ? "border-black bg-black/5" 
                    : "border-gray-200 hover:border-black"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    selectedPlan === 'free-trial' 
                      ? "bg-black text-white" 
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Start with a Free Trial </div>
                    <div className="text-sm text-gray-500">Try all features free for 5 days</div>
                  </div>
                </div>
                {selectedPlan === 'free-trial' && (
                  <CheckCircle2 className="w-5 h-5 text-black" />
                )}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    switch (currentStep) {
      case 1:
        return selectedOptions.length === 0;
      case 2:
        return !businessType;
      case 3:
        return !businessSize;
      case 4:
        return selectedPlatforms.length === 0;
      case 5:
        return selectedNiches.length === 0;
      case 6:
        return !domain || !isDomainAvailable;
      case 7:
        return !selectedPlan;
      default:
        return false;
    }
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div className="gradient-bg min-h-screen flex items-center justify-center p-4">
        <div className="gradient-blob gradient-blob-1"></div>
        <div className="gradient-blob gradient-blob-2"></div>
        <div className="gradient-blob gradient-blob-3"></div>
        
        <div className="w-full max-w-6xl space-y-6 relative z-10">
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-black p-3 rounded-xl mb-4 transform transition-transform hover:scale-110 hover:rotate-3">
              <Laptop className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Set Up Your Store</h1>
            <div className="text-gray-600 mt-2">
              Complete the steps below to get your store ready
            </div>
          </div>

          {/* Stepper */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-4 sm:p-6 mb-6">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 w-full px-5">
                <div className="absolute h-0.5 w-full bg-gray-100 rounded-full" />
                <div 
                  className="absolute h-0.5 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                    background: 'linear-gradient(90deg, #000000 0%, #333333 100%)',
                  }}
                />
              </div>

              {/* Steps */}
              <div className="relative flex justify-between px-5">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = index + 1 === currentStep;
                  const isCompleted = index + 1 < currentStep;

                  return (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <div className="flex flex-col items-center">
                          <motion.div
                            className={`relative z-10 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-xl ${
                              isActive
                                ? "bg-black text-white"
                                : isCompleted
                                ? "bg-black text-white"
                                : "bg-white text-gray-400 border border-gray-100"
                            } transition-all duration-300 shadow-sm hover:shadow-md`}
                            initial={false}
                            animate={{
                              scale: isActive ? 1.1 : 1,
                              backgroundColor: isCompleted || isActive ? "#000000" : "#FFFFFF",
                            }}
                            whileHover={{ y: -2 }}
                          >
                            <StepIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                            {isCompleted && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5"
                              >
                                <CheckCircle2 className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
                              </motion.div>
                            )}
                          </motion.div>

                          <motion.div
                            className="mt-2 text-center hidden sm:block"
                            initial={false}
                            animate={{
                              opacity: isActive ? 1 : 0.7,
                              scale: isActive ? 1 : 0.95,
                            }}
                          >
                            <div className={`text-[10px] sm:text-xs font-semibold ${
                              isActive ? "text-black" : "text-gray-500"
                            }`}>
                              {step.title}
                            </div>
                            <div className="text-[8px] text-gray-400 mt-0.5 max-w-[60px] mx-auto">
                              {step.description}
                            </div>
                          </motion.div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        className="tooltip-content bg-white px-2 py-1 text-[10px] sm:text-xs font-medium text-gray-900 shadow-md rounded-md border border-gray-200"
                        side="bottom"
                      >
                        {step.description}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8">
            <div className="min-h-[400px]">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-6"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={isNextDisabled()}
                className="px-6 bg-black hover:bg-gray-900"
              >
                {currentStep === steps.length ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}