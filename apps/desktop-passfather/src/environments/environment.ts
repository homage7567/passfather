// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __BUILD_VERSION__: string;

export const environment = {
  production: false,
  version: __BUILD_VERSION__
};
