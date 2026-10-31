"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Cookie, Moon, Sun, X } from "lucide-react";

const CONSENT_COOKIE = "og-inspector-cookie-consent";
const THEME_STORAGE_KEY = "og-inspector-theme";

type Theme = "light" | "dark";
type Consent = "essential" | "all";

let cookieCardForcedOpen = false;

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribeTheme(onChange: () => void) {
  window.addEventListener("theme-preference-change", onChange);
  return () => window.removeEventListener("theme-preference-change", onChange);
}

function hasConsentCookie() {
  return document.cookie.split("; ").some((cookie) => cookie.startsWith(`${CONSENT_COOKIE}=`));
}

function getCookieCardSnapshot() {
  return cookieCardForcedOpen || !hasConsentCookie();
}

function subscribeCookieCard(onChange: () => void) {
  const openSettings = () => {
    cookieCardForcedOpen = true;
    onChange();
  };
  const consentChanged = () => {
    cookieCardForcedOpen = false;
    onChange();
  };
  window.addEventListener("open-cookie-settings", openSettings);
  window.addEventListener("cookie-consent-change", consentChanged);
  return () => {
    window.removeEventListener("open-cookie-settings", openSettings);
    window.removeEventListener("cookie-consent-change", consentChanged);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => "light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "light" || savedTheme === "dark") applyTheme(savedTheme);
    window.dispatchEvent(new Event("theme-preference-change"));
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    window.dispatchEvent(new Event("theme-preference-change"));
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
      <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
    </button>
  );
}

export function CookieConsentCard() {
  const visible = useSyncExternalStore(subscribeCookieCard, getCookieCardSnapshot, () => false);
  const [showPolicy, setShowPolicy] = useState(false);

  useEffect(() => {
    const resetPolicy = () => setShowPolicy(false);
    window.addEventListener("open-cookie-settings", resetPolicy);
    return () => window.removeEventListener("open-cookie-settings", resetPolicy);
  }, []);

  const saveConsent = (consent: Consent) => {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${CONSENT_COOKIE}=${consent}; Max-Age=15552000; Path=/; SameSite=Lax${secure}`;
    window.dispatchEvent(new Event("cookie-consent-change"));
  };

  if (!visible) return null;

  return (
    <aside className="cookie-card" aria-label="Cookie preferences">
      <div className="cookie-card-heading">
        <span className="cookie-icon"><Cookie size={17} /></span>
        <p className="cookie-kicker">YOUR PRIVACY, YOUR CALL</p>
        <button
          className="cookie-close"
          type="button"
          aria-label="Use essential storage only"
          onClick={() => saveConsent("essential")}
        >
          <X size={16} />
        </button>
      </div>
      <h2>Cookies, minus the mystery.</h2>
      <p className="cookie-copy">
        We use essential storage to remember this choice and your theme. No ads or analytics cookies are used.
      </p>
      {showPolicy && (
        <div className="cookie-policy-copy" id="cookie-policy-summary">
          <strong>What we store</strong>
          <p>
            A first-party preference cookie remembers your choice for 180 days. Your theme is saved in this
            browser&apos;s local storage. Neither is used to track you. You can clear either in your browser settings.
          </p>
          <a href="/cookies">Read the full cookie policy <span aria-hidden="true">↗</span></a>
        </div>
      )}
      <button
        className="cookie-policy-toggle"
        type="button"
        aria-expanded={showPolicy}
        aria-controls="cookie-policy-summary"
        onClick={() => setShowPolicy((current) => !current)}
      >
        {showPolicy ? "Hide details" : "Cookie policy"}
      </button>
      <div className="cookie-actions">
        <button className="cookie-essential" type="button" onClick={() => saveConsent("essential")}>
          Essential only
        </button>
        <button className="cookie-accept" type="button" onClick={() => saveConsent("all")}>
          Accept all
        </button>
      </div>
      <p className="cookie-required-note">Essential storage is always on so the site can work.</p>
    </aside>
  );
}

export function CookieSettingsButton() {
  return (
    <button
      className="footer-cookie-settings"
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
    >
      Cookie settings
    </button>
  );
}
