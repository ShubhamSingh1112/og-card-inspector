'use client';

import React from 'react';
import { OgMetadata } from '@/types';

interface Props {
  metadata: OgMetadata;
}

export function DiscordCard({ metadata }: Props) {
  const accentColor = metadata.themeColor || '#5865F2';

  return (
    <div className="w-full max-w-xl mx-auto rounded-xl bg-[#313338] border border-[#232428] p-4 font-sans text-neutral-200 shadow-2xl">
      {/* Discord Message Author */}
      <div className="flex items-start gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center font-bold text-white text-sm shrink-0">
          BOT
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white text-sm hover:underline cursor-pointer">
              OG Bot
            </span>
            <span className="bg-[#5865F2] text-white text-[10px] font-bold px-1 py-0.2 rounded">
              APP
            </span>
            <span className="text-[#949ba4] text-xs">Today at 12:45 PM</span>
          </div>
          <p className="text-sm text-[#00a8fc] hover:underline cursor-pointer break-all mt-0.5">
            {metadata.url}
          </p>
        </div>
      </div>

      {/* Discord Embed Box */}
      <div className="ml-13 pl-3 border-l-[4px] rounded-r-md bg-[#2b2d31] p-3.5 max-w-lg" style={{ borderColor: accentColor }}>
        {/* Site Name / Author */}
        {metadata.siteName && (
          <div className="text-xs text-[#b5bac1] font-medium mb-1">
            {metadata.siteName}
          </div>
        )}

        {/* Title */}
        <a
          href={metadata.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block font-semibold text-sm text-[#00a8fc] hover:underline leading-snug"
        >
          {metadata.title || 'Untitled Link'}
        </a>

        {/* Description */}
        {metadata.description && (
          <p className="text-xs text-[#dbdee1] mt-1.5 leading-relaxed line-clamp-3">
            {metadata.description}
          </p>
        )}

        {/* Embedded Image */}
        {metadata.image && (
          <div className="mt-3 overflow-hidden rounded-md max-w-md bg-[#1e1f22]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={metadata.image}
              alt={metadata.title}
              className="max-h-72 w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://placehold.co/1200x630/1e1f22/737373?text=Image+Failed+To+Load';
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
