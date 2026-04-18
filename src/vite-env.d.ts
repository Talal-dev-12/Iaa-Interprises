/// <reference types="vite/client" />

interface Window {
  grecaptcha?: {
    render: (
      container: HTMLElement,
      params: {
        sitekey: string;
        callback?: () => void;
        "expired-callback"?: () => void;
      }
    ) => number;
    getResponse: (widgetId?: number) => string;
    reset: (widgetId?: number) => void;
  };
}
