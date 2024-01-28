import { GetLangParams } from '@ngneat/transloco-persist-lang';

export function getLangFn({
  cachedLang,
  browserLang,
  cultureLang,
  defaultLang,
}: GetLangParams): string {
  if (cachedLang) {
    return cachedLang;
  }

  if (browserLang) {
    return browserLang;
  }

  if (cultureLang) {
    return cultureLang;
  }

  return defaultLang;
}
