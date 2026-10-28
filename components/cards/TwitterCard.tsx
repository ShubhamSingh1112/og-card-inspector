'use client';

import React from 'react';
import { OgMetadata } from '@/types';
import { ExternalLink } from 'lucide-react';

interface Props {
  metadata: OgMetadata;
}

export function TwitterCard({ metadata }: Props) {
  const isLarge = metadata.twitterCard !== 'summary';
  const hostname = (() => {
    try {
      return new URL(metadata.url).hostname.replace(/^www\./, '');
    } catch {
      return metadata.siteName || 'website.com';
    }
  })();

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl bg-black border border-neutral-800 p-4 font-sans text-neutral-100 shadow-2xl">
      {/* Mock Tweet Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-md">
          {metadata.siteName ? metadata.siteName.slice(0, 2).toUpperCase() : 'OG'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 leading-tight">
            <span className="font-bold text-[15px] truncate">
              {metadata.siteName || 'Web Creator'}
            </span>
            <svg className="w-4 h-4 text-sky-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-neutral-500 text-[14px]">
              @{metadata.twitterSite?.replace('@', '') || hostname.split('.')[0] || 'brand'}
            </span>
            <span className="text-neutral-500 text-[14px]">· 12m</span>
          </div>
          <p className="text-[15px] text-neutral-200 mt-1 leading-normal">
            Check out what we just shipped! Let us know your thoughts 👇
          </p>
        </div>
      </div>

      {/* Tweet Card Container */}
      <a
        href={metadata.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 transition hover:border-neutral-700 hover:bg-neutral-900/40"
      >
        {isLarge ? (
          <div>
            {/* Large Image Aspect Ratio */}
            <div className="relative aspect-[1.91/1] w-full bg-neutral-900 overflow-hidden flex items-center justify-center">
              {metadata.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={metadata.image}
                  alt={metadata.title}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.01]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://placehold.co/1200x630/171717/737373?text=Image+Failed+To+Load';
                  }}
                />
              ) : (
                <div className="text-neutral-500 text-sm flex flex-col items-center gap-1 p-6 text-center">
                  <ExternalLink className="w-6 h-6 stroke-1 text-neutral-600" />
                  <span>No og:image specified</span>
                </div>
              )}

              {/* Hostname bottom badge */}
              <div className="absolute bottom-2 left-2 rounded-md bg-black/75 px-2 py-0.5 text-xs text-neutral-300 backdrop-blur-md">
                {hostname}
              </div>
            </div>

            {/* Info bar */}
            <div className="p-3.5 border-t border-neutral-800/50">
              <div className="text-xs text-neutral-400 font-medium truncate">{hostname}</div>
              <h4 className="font-semibold text-neutral-100 text-[15px] leading-snug line-clamp-1 mt-0.5">
                {metadata.title || 'No Title Found'}
              </h4>
              {metadata.description && (
                <p className="text-neutral-400 text-xs line-clamp-2 mt-1 leading-relaxed">
                  {metadata.description}
                </p>
              )}
            </div>
          </div>
        ) : (
          /* Small Summary Card Layout */
          <div className="flex items-center">
            <div className="w-32 h-32 shrink-0 bg-neutral-900 relative overflow-hidden flex items-center justify-center border-r border-neutral-800">
              {metadata.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={metadata.image}
                  alt={metadata.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-neutral-500">No Image</span>
              )}
            </div>
            <div className="p-3.5 flex-1 min-w-0">
              <div className="text-xs text-neutral-400 font-medium truncate">{hostname}</div>
              <h4 className="font-semibold text-neutral-100 text-[14px] leading-snug line-clamp-2 mt-0.5">
                {metadata.title || 'No Title Found'}
              </h4>
              {metadata.description && (
                <p className="text-neutral-400 text-xs line-clamp-1 mt-1">
                  {metadata.description}
                </p>
              )}
            </div>
          </div>
        )}
      </a>

      {/* Tweet Footer Mock */}
      <div className="flex items-center justify-between text-neutral-500 text-xs px-2 pt-3 mt-1">
        <span className="hover:text-sky-400 cursor-pointer">💬 14</span>
        <span className="hover:text-green-400 cursor-pointer">🔁 28</span>
        <span className="hover:text-pink-500 cursor-pointer">❤️ 184</span>
        <span className="hover:text-sky-400 cursor-pointer">📊 12.4K</span>
      </div>
    </div>
  );
}
