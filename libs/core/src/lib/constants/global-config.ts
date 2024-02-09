export const CONFIG_PREFIX = 'pf';

export const globalConfig = {
  cookies: {
    locale: `${CONFIG_PREFIX}-lang`,
    theme: `${CONFIG_PREFIX}-theme`
  },
  database: {
    name: 'pf-indexed-db'
  }
};
