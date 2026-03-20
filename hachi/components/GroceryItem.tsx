"use client";

import { GroceryItem, ItemStatus } from "@/types/grocery";
import { Check, Undo2, ArrowRightCircle } from "lucide-react";

interface Props {
  item: GroceryItem;
  onStatusChange: (itemId: string, newStatus: ItemStatus) => void;
}

export default function GroceryItemCard({ item, onStatusChange }: Props) {

  const handleStatusUpdate = (status: ItemStatus) => {
    onStatusChange(item.id, status);
  };

  return (
    <div className="flex flex-col p-5 mb-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[32px] shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col">
          <span className={`text-lg font-bold ${item.status === 'bought' ? 'line-through text-gray-400' : 'text-primary dark:text-gray-100'}`}>
            {item.name}
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs px-2.5 py-1 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 font-bold">
              {item.quantity}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          {item.status === 'needed' && (
            <button 
              onClick={() => handleStatusUpdate('buying')}
              className="w-10 h-10 flex items-center justify-center rounded-2xl bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-all active:scale-90"
            >
              <ArrowRightCircle size={20} />
            </button>
          )}
          {item.status === 'buying' && (
            <button 
              onClick={() => handleStatusUpdate('bought')}
              className="px-5 py-2 text-xs font-bold rounded-2xl bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-all flex items-center gap-2 active:scale-95 shadow-lg"
            >
              <Check size={16} /> Mark Bought
            </button>
          )}
          {item.status === 'bought' && (
            <button 
              onClick={() => handleStatusUpdate('needed')}
              className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-zinc-800 dark:text-zinc-500 hover:text-primary transition-all active:scale-90"
            >
              <Undo2 size={18} />
            </button>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Added by {item.added_by}
        </span>
      </div>
    </div>
  );
}
