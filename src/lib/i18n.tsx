"use client";
import { createContext, useContext, ReactNode } from "react";
import en from "@/i18n/messages/en.json";
import zh from "@/i18n/messages/zh.json";
import ja from "@/i18n/messages/ja.json";

type Messages = Record<string, any>;

const messagesMap: Record<string, Messages> = { en, zh, ja };

const I18nContext = createContext<{ locale: string; messages: Messages }>({
  locale: "en",
  messages: en,
});

export function I18nProvider({ locale, children }: { locale: string; children: ReactNode }) {
  const messages = messagesMap[locale] || en;
  return (
    <I18nContext.Provider value={{ locale, messages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslations(namespace?: string) {
  const { messages } = useContext(I18nContext);
  return (key: string) => {
    const ns = namespace ? (messages as any)[namespace] : messages;
    const fallbackNs = namespace ? (en as any)[namespace] : en;
    if (!ns) return fallbackNs?.[key] || key;
    return (ns as any)[key] || fallbackNs?.[key] || key;
  };
}

export function useLocale() {
  return useContext(I18nContext).locale;
}
