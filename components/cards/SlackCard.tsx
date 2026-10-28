'use client';

import React from 'react';
import { OgMetadata } from '@/types';

interface Props {
  metadata: OgMetadata;
}

export function SlackCard({ metadata }: Props) {
  return (
    <div className="w-full max-w-xl mx-auto rounded-xl bg-[#1a1d21] border border-[#2d3136] p-4 font-sans text-neutral-200 shadow-2xl">
      {/* Slack Message Header */}
      <div className="flex items-start gap-3 mb-2">
        <div className="w-9 h-9 rounded-md bg-[#611f69] flex items-center justify-center font-bold text-white text-sm shrink-0">
          U
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-white text-sm">alex.dev</span>
            <span className="text-[#abacad] text-xs">12:47 PM</span>
          </div>
          <p className="text-sm text-[#1d9bd1] hover:underline cursor-pointer break-all mt-0.5">
            {metadata.url}
          </p>
        </div>
      </div>

      {/* Slack Unfurl Attachment */}
      <div className="ml-12 pl-3 border-l-[3px] border-[#4c525a] space-y-2">
        {/* Favicon & Site Name */}
        <div className="flex items-center gap-1.5 text-xs text-[#d1d2d3]">
          {metadata.favicon ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={metadata.favicon}
              alt=""
              className="w-4 h-4 rounded-sm object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-3.5 h-3.5 rounded bg-neutral-600" />
          )}
          <span className="font-semibold">{metadata.siteName || 'Website'}</span>
        </div>

        {/* Title */}
        <a
          href={metadata.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block font-bold text-sm text-[#1d9bd1] hover:underline leading-snug"
        >
          {metadata.title || 'Untitled'}
        </a>

        {/* Description */}
        {metadata.description && (
          <p className="text-xs text-[#d1d2d3] leading-relaxed line-clamp-3">
            {metadata.description}
          </p>
        )}

        {/* Image Attachment */}
        {metadata.image && (
          <div className="mt-2 overflow-hidden rounded-lg max-w-sm border border-[#2d3136]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={metadata.image}
              alt={metadata.title}
              className="w-full max-h-56 object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://placehold.co/1200x630/222529/737373?text=Image+Failed+To+Load';
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
