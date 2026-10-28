'use client';

import React from 'react';
import { OgMetadata } from '@/types';
import { ThumbsUp, MessageSquare, Repeat2, Send } from 'lucide-react';

interface Props {
  metadata: OgMetadata;
}

export function LinkedInCard({ metadata }: Props) {
  const hostname = (() => {
    try {
      return new URL(metadata.url).hostname.replace(/^www\./, '');
    } catch {
      return metadata.siteName || 'website.com';
    }
  })();

  return (
    <div className="w-full max-w-xl mx-auto rounded-xl bg-[#1b1f23] border border-neutral-700/60 p-4 font-sans text-neutral-100 shadow-2xl">
      {/* LinkedIn Post Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center font-semibold text-white text-base shrink-0 ring-1 ring-white/10">
          {metadata.siteName ? metadata.siteName[0].toUpperCase() : 'L'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 leading-tight">
            <span className="font-semibold text-sm hover:underline cursor-pointer">
              {metadata.siteName || 'Engineering & Product Team'}
            </span>
            <span className="text-neutral-400 text-xs">• 1st</span>
          </div>
          <p className="text-xs text-neutral-400 truncate mt-0.5">
            Building software that matters • 4,820 followers
          </p>
          <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-0.5">
            <span>2h</span>
            <span>•</span>
            <span>🌐</span>
          </div>
        </div>
      </div>

      {/* Post Text */}
      <p className="text-sm text-neutral-200 mb-3 leading-relaxed">
        Excited to share our newest release. Check out the link below for more details and live benchmarks:
      </p>

      {/* LinkedIn Link Card */}
      <a
        href={metadata.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group overflow-hidden rounded-lg border border-neutral-700/80 bg-[#16191d] transition hover:border-neutral-500"
      >
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
            <div className="text-neutral-500 text-xs">No Preview Image</div>
          )}
        </div>

        <div className="p-3 bg-[#1d2228] border-t border-neutral-700/60">
          <h4 className="font-semibold text-neutral-100 text-sm line-clamp-1 leading-snug">
            {metadata.title || 'Untitled Post'}
          </h4>
          <div className="text-[11px] text-neutral-400 uppercase tracking-wider mt-1 truncate">
            {hostname}
          </div>
        </div>
      </a>

      {/* LinkedIn Reactions and Action Bar */}
      <div className="border-t border-neutral-800 mt-4 pt-2 flex items-center justify-between text-neutral-400 text-xs px-2">
        <button className="flex items-center gap-1.5 py-1 px-2 rounded hover:bg-neutral-800/80 transition">
          <ThumbsUp className="w-4 h-4 text-neutral-400" />
          <span>Like</span>
        </button>
        <button className="flex items-center gap-1.5 py-1 px-2 rounded hover:bg-neutral-800/80 transition">
          <MessageSquare className="w-4 h-4 text-neutral-400" />
          <span>Comment</span>
        </button>
        <button className="flex items-center gap-1.5 py-1 px-2 rounded hover:bg-neutral-800/80 transition">
          <Repeat2 className="w-4 h-4 text-neutral-400" />
          <span>Repost</span>
        </button>
        <button className="flex items-center gap-1.5 py-1 px-2 rounded hover:bg-neutral-800/80 transition">
          <Send className="w-4 h-4 text-neutral-400" />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
}
