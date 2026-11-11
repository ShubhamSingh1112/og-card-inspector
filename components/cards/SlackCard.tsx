'use client';

import React from 'react';
import { OgMetadata } from '@/types';
import { PreviewImage } from '@/components/PreviewImage';

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
            <PreviewImage
              key={metadata.favicon}
              src={metadata.favicon}
              alt=""
              className="h-4 w-4 shrink-0 overflow-hidden rounded-sm"
              imageClassName="h-full w-full object-contain"
              unavailableClassName="hidden"
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
          <PreviewImage
            key={metadata.image}
            src={metadata.image}
            alt={metadata.title}
            className="mt-2 aspect-[1.91/1] max-w-sm overflow-hidden rounded-lg border border-[#2d3136]"
            imageClassName="max-h-56 w-full object-cover"
            unavailableClassName="preview-image-unavailable min-h-24"
          />
        )}
      </div>
    </div>
  );
}
