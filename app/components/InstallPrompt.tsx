"use client";

import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Optionally delay showing the UI until a good moment
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    // You can inspect choice.outcome ("accepted" | "dismissed")
    setDeferredPrompt(null);
    setVisible(false);
  };

  if (!visible || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-3 flex gap-2 items-center">
      <span>Install this app for easier access</span>
      <button
        onClick={handleInstall}
        className="px-3 py-1 bg-blue-600 text-white rounded"
      >
        Install
      </button>
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
        className="text-sm text-gray-500"
      >
        ×
      </button>
    </div>
  );
}
