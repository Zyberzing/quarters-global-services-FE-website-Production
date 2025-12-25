"use client";

export default function GlobalLoader({
  show,
  text = "Submitting your application",
}: {
  show: boolean;
  text?: string;
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl px-12 py-10 shadow-2xl flex flex-col items-center gap-5 animate-[fadeIn_0.3s_ease-out]">

        {/* 🔴 Red Spinner */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full border-[3px] border-gray-200 border-t-red-600 animate-spin" />
        </div>

        {/* 📝 Text */}
        <div className="text-center space-y-1">
          <p className="text-lg font-semibold text-black">
            {text}
            <span className="animate-pulse">…</span>
          </p>

          <p className="text-sm text-gray-600">
            Please wait while we securely process your request
          </p>
        </div>
      </div>
    </div>
  );
}
