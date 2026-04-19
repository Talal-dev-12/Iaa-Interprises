/* eslint-disable @typescript-eslint/no-explicit-any */

interface GRecaptcha {
  render: (container: HTMLElement, params: Record<string, any>) => number;
  getResponse: (widgetId?: number) => string;
  reset: (widgetId?: number) => void;
}

interface Window {
  grecaptcha?: GRecaptcha;
}
