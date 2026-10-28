"use client";

import { useState } from "react";
import { AtSign, BriefcaseBusiness, Hash, LayoutGrid, MessageSquare, type LucideIcon } from "lucide-react";
import type { OgMetadata, PlatformType } from "@/types";
import { DiscordCard } from "./cards/DiscordCard";
import { LinkedInCard } from "./cards/LinkedInCard";
import { SlackCard } from "./cards/SlackCard";
import { TwitterCard } from "./cards/TwitterCard";

interface Props {
  metadata: OgMetadata;
}

const platforms: { id: PlatformType; label: string; icon: LucideIcon }[] = [
  { id: "all", label: "All previews", icon: LayoutGrid },
  { id: "twitter", label: "X", icon: AtSign },
  { id: "linkedin", label: "LinkedIn", icon: BriefcaseBusiness },
  { id: "discord", label: "Discord", icon: MessageSquare },
  { id: "slack", label: "Slack", icon: Hash },
];

export function PlatformSwitcher({ metadata }: Props) {
  const [activePlatform, setActivePlatform] = useState<PlatformType>("all");

  const previewCards = [
    { id: "twitter" as const, label: "X (Twitter)", detail: metadata.twitterCard, icon: AtSign, card: <TwitterCard metadata={metadata} /> },
    { id: "linkedin" as const, label: "LinkedIn", detail: "1200 × 630 image target", icon: BriefcaseBusiness, card: <LinkedInCard metadata={metadata} /> },
    { id: "discord" as const, label: "Discord", detail: metadata.themeColor || "Default accent", icon: MessageSquare, card: <DiscordCard metadata={metadata} /> },
    { id: "slack" as const, label: "Slack", detail: "Link unfurl", icon: Hash, card: <SlackCard metadata={metadata} /> },
  ];

  return (
    <div>
      <div className="platform-tabs" role="group" aria-label="Choose platform previews">
        {platforms.map(({ id, label, icon: Icon }) => (
          <button
            aria-pressed={activePlatform === id}
            className="platform-tab"
            key={id}
            onClick={() => setActivePlatform(id)}
            type="button"
          >
            <Icon size={15} />{label}
          </button>
        ))}
      </div>
      {activePlatform === "all" ? (
        <div className="platform-grid">
          {previewCards.map(({ id, label, detail, icon: Icon, card }) => (
            <div className="platform-preview" key={id}>
              <div className="platform-label"><span><Icon size={13} /> {label}</span><span>{detail}</span></div>
              {card}
            </div>
          ))}
        </div>
      ) : (
        <div className="single-preview">
          {previewCards.find((preview) => preview.id === activePlatform)?.card}
        </div>
      )}
    </div>
  );
}
