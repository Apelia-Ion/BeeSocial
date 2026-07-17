import { cookies } from "next/headers";
import {
  LOCALE_COOKIE,
  defaultLocale,
  isLocale,
  translate,
  type Locale,
  type TranslationValues,
} from "./translations";

export function getLocale(): Locale {
  const value = cookies().get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
}

export function getTranslations() {
  const locale = getLocale();
  return {
    locale,
    t: (key: string, values?: TranslationValues) =>
      translate(locale, key, values),
  };
}
