"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Store as StoreIcon, 
  Plus,
  Search,
  ChevronRight,
  Settings,
  LogOut
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

export default function ChooseStorePage() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Mock data for stores
  const stores = [
    {
      id: "my-store",
      name: "My Store",
      url: "mystore.axova.com",
      status: "active",
      icon: "MS",
      iconColor: "bg-emerald-500"
    },
    {
      id: "fashion-store",
      name: "Fashion Store",
      url: "fashion.axova.com",
      status: "active",
      icon: "FS",
      iconColor: "bg-violet-500"
    },
    {
      id: "tech-hub",
      name: "Tech Hub",
      url: "tech.axova.com",
      status: "active",
      icon: "TH",
      iconColor: "bg-blue-500"
    }
  ];

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden flex items-center justify-center py-8">
      <div className="gradient-blob gradient-blob-1" />
      <div className="gradient-blob gradient-blob-2" />
      <div className="gradient-blob gradient-blob-3" />
      
      <div className="relative z-10 w-full max-w-[560px] mx-auto px-4">
        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-200/50 backdrop-blur-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 pt-8 pb-6 border-b border-gray-100">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#008060] flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-[#008060]/10">
                <StoreIcon className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900">Select a store</h1>
              <p className="text-sm text-gray-500 mt-1">Choose a store to manage or create a new one</p>
            </div>

            {/* Search */}
            <div className="mt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search stores"
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-transparent"
                  onClick={() => setSearchOpen(true)}
                />
              </div>
            </div>
          </div>

          {/* Store List */}
          <div className="px-3 py-3">
            <div className="space-y-1">
              {stores.map((store) => (
                <button
                  key={store.id}
                  onClick={() => router.push(`/steps/setup`)}
                  className="w-full group hover:bg-gray-50 rounded-lg p-3 flex items-center justify-between transition-all duration-200"
                >
                  <div className="flex items-center">
                    <div className={`${store.iconColor} h-10 w-10 rounded-lg flex items-center justify-center text-white font-medium shadow-sm`}>
                      {store.icon}
                    </div>
                    <div className="ml-3 text-left">
                      <h3 className="text-sm font-medium text-gray-900">{store.name}</h3>
                      <p className="text-xs text-gray-500">{store.url}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                </button>
              ))}

              {/* Add Store Button */}
              <button
                onClick={() => router.push("/steps/setup")}
                className="w-full group hover:bg-gray-50 rounded-lg p-3 flex items-center justify-between transition-all duration-200"
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Plus className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="ml-3 text-left">
                    <h3 className="text-sm font-medium text-gray-900">Add new store</h3>
                    <p className="text-xs text-gray-500">Create a new store</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-900"
              onClick={() => router.push("/settings")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-900"
              onClick={() => router.push("/logout")}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </Button>
          </div>
        </div>
      </div>

      {/* Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-[480px] p-0">
          <Command>
            <CommandInput placeholder="Search stores..." />
            <CommandList>
              <CommandEmpty>No stores found.</CommandEmpty>
              <CommandGroup heading="Stores">
                {stores.map((store) => (
                  <CommandItem
                    key={store.id}
                    onSelect={() => {
                      router.push(`/steps/setup`);
                      setSearchOpen(false);
                    }}
                  >
                    <div className={`${store.iconColor} h-8 w-8 rounded-lg flex items-center justify-center text-white font-medium mr-3`}>
                      {store.icon}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{store.name}</p>
                      <p className="text-xs text-gray-500">{store.url}</p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
}

