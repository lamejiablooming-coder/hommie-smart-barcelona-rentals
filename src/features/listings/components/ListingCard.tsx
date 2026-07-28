import React from "react";
import { Listing } from "@/shared/types";
import { Bookmark, Check, X } from "lucide-react";

interface ListingCardProps {
  key?: React.Key;
  listing: Listing;
  onSelect: (listing: Listing) => void;
  onToggleSave: (id: string) => void;
}

export default function ListingCard({ listing, onSelect, onToggleSave }: ListingCardProps) {
  return (
    <div 
      onClick={() => onSelect(listing)}
      className="flex flex-col group cursor-pointer"
    >
      {/* Image Container with 4:5 aspect ratio and subtle overlay */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f1edec] mb-3">
        <img
          src={listing.imageUrl}
          alt={`Piso en ${listing.neighborhood}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {/* Subtle Reliability Badge with dynamic safety colors */}
        <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-[2px] border border-[#ebebeb] px-2 py-1 flex items-center gap-1.5 shadow-[0_2px_6px_rgba(0,0,0,0.03)]">
          <span className={`w-1.5 h-1.5 rounded-full ${listing.securityScore >= 80 ? "bg-emerald-600" : "bg-[#c2410c]"}`}></span>
          <span className="text-[9px] font-mono font-black tracking-widest text-[#252525]">
            {listing.securityScore}% FIABILIDAD
          </span>
        </div>
      </div>

      {/* Details Area */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[15px] font-bold tracking-tight text-[#252525]">
              {listing.price.toLocaleString("es-ES")} €
            </p>
            <p className="text-xs text-[#a8a8a8]">
              {listing.neighborhood}
            </p>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(listing.id);
            }}
            className="text-[#a8a8a8] hover:text-[#252525] active:scale-90 transition-all p-1"
            aria-label="Guardar oferta"
          >
            <Bookmark
              className={`w-4 h-4 ${listing.isSaved ? "fill-[#252525] text-[#252525]" : "text-[#a8a8a8]"}`}
            />
          </button>
        </div>

        {/* Pros & Cons comparison list - Minimal style */}
        <div className="pt-1 space-y-1 text-xs">
          {/* Pro */}
          {listing.pros.slice(0, 1).map((pro, index) => (
            <div key={index} className="flex items-center gap-1.5 text-[#252525]">
              <Check className="w-3.5 h-3.5 text-[#252525] stroke-[2.5] flex-shrink-0" />
              <span className="text-[#252525] font-medium">{pro}</span>
            </div>
          ))}

          {/* Con */}
          {listing.cons.slice(0, 1).map((con, index) => (
            <div key={index} className="flex items-center gap-1.5 text-[#a8a8a8]">
              <X className="w-3.5 h-3.5 text-[#a8a8a8] stroke-[2] flex-shrink-0" />
              <span className="text-[#a8a8a8]">{con}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
