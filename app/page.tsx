"use client";

import { useState, useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    openOfferwall_6a197ce3206037b2388c5382?: () => void;
  }
}

const ROBUX_LOGO = "https://i.postimg.cc/1RgP9DFD/robux-1.webp";
const NITRO_LOGO = "https://i.postimg.cc/T1bZnqjV/1cc22811-2ac2-4749-8dfe-501bd4dce238.webp";
const NITRO_BOOST_LOGO = "https://i.postimg.cc/3JgsR1xh/nitroboost.webp";
const ROBUX_TITLE_ICON = "https://i.postimg.cc/KvyWdTD8/es95yi.webp";
const NITRO_TITLE_ICON = "https://i.postimg.cc/xCzsZjkr/470pg7.webp";

type Item = { title: string; price?: string; desc: string; icon: string; badge?: string };

const OPTIONS: Record<"nitro" | "robux", Item[]> = {
  nitro: [
    { title: "Nitro Basic", price: "$29.99", desc: "Essentials: emojis, stickers, and 50MB upload", icon: NITRO_LOGO },
    { title: "Nitro Boost", price: "$99.99", desc: "Everything plus boosts, 4K streaming, and perks", icon: NITRO_BOOST_LOGO, badge: "Best Value" },
  ],
  robux: [
    { title: "450 Robux", desc: "Perfect for avatar items and game passes", icon: ROBUX_LOGO },
    { title: "1500 Robux", desc: "Ideal for bundles, boosts, and cosmetics", icon: ROBUX_LOGO },
    { title: "4500 Robux", desc: "Best option for bundles, passes, and more", icon: ROBUX_LOGO, badge: "Best Value" },
  ],
};

const PROGRESS_STEPS = [
  { label: "Preparing...", sub: "Generating", target: 22 },
  { label: "Checking...", sub: "Preparing Verification", target: 48 },
  { label: "Finalizing...", sub: "Redirecting verification", target: 76 },
  { label: "Almost there...", sub: "Just a few more seconds", target: 96 },
  { label: "Done...", sub: "Redirecting", target: 100 },
];

export default function Page() {
  const [platform, setPlatform] = useState<"nitro" | "robux" | null>(null);
  const [selected, setSelected] = useState<Item | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [stepIdx, setStepIdx] = useState(-1);
  const [barWidth, setBarWidth] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = platform ? OPTIONS[platform] : [];
  const isValid = username.trim().length >= 3;
  const inProgress = stepIdx >= 0;

  const triggerOfferwall = useCallback(() => {
    if (typeof window !== "undefined" && window.openOfferwall_6a197ce3206037b2388c5382) {
      window.openOfferwall_6a197ce3206037b2388c5382();
    }
  }, []);

  useEffect(() => {
    if (stepIdx < 0) return;
    if (stepIdx >= PROGRESS_STEPS.length) {
      triggerOfferwall();
      return;
    }
    const step = PROGRESS_STEPS[stepIdx];
    const dur = 1200 + Math.random() * 1400;
    setBarWidth(step.target);
    const t = setTimeout(() => setStepIdx((i) => i + 1), dur);
    return () => clearTimeout(t);
  }, [stepIdx, triggerOfferwall]);

  const startProgress = () => {
    if (!isValid) return;
    setShowModal(false);
    setStepIdx(0);
  };

  const pickPlatform = (p: "nitro" | "robux") => {
    setPlatform(p);
    setSelected(null);
  };

  const openModal = () => {
    if (!selected) return;
    setUsername("");
    setShowModal(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const currentStep = stepIdx >= 0 && stepIdx < PROGRESS_STEPS.length ? PROGRESS_STEPS[stepIdx] : PROGRESS_STEPS[PROGRESS_STEPS.length - 1];

  return (
    <div
      className="min-h-screen flex items-center justify-center p-3 md:p-7"
      style={{
        fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
        color: "#fff",
        background:
          "radial-gradient(900px 500px at 15% 15%, rgba(88,101,242,0.35), transparent 60%), radial-gradient(800px 500px at 85% 25%, rgba(91,188,255,0.18), transparent 60%), linear-gradient(145deg, #3d4188 0%, #2a2d55 35%, #171823 100%)",
      }}
    >
      <main className="w-full" style={{ maxWidth: 860 }}>
        <section
          className="relative overflow-hidden p-4 md:p-7"
          style={{
            background: "linear-gradient(160deg, #2b2d31, #313338)",
            borderRadius: 22,
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 28px 70px rgba(0,0,0,0.45)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              top: "-30%",
              right: 0,
              width: 240,
              height: 240,
              background: "radial-gradient(circle, rgba(88,101,242,0.35), transparent 70%)",
              filter: "blur(8px)",
            }}
          />

          {/* Header */}
          <header className="relative flex items-center gap-3 md:gap-4 mb-4 md:mb-5">
            <div
              className="grid place-items-center shrink-0"
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                background: "rgba(88,101,242,0.2)",
                border: "1px solid rgba(88,101,242,0.5)",
                boxShadow: "0 10px 30px rgba(88,101,242,0.25)",
              }}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#5865f2" strokeWidth="2.2">
                <path d="M5 8h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8z" />
                <path d="M12 3v18" />
                <path d="M3 8h18" />
                <path d="M7 3h10a2 2 0 0 1 2 2v3H5V5a2 2 0 0 1 2-2z" />
              </svg>
            </div>
            <div>
              <h1
                className="m-0"
                style={{ fontFamily: '"Unbounded", sans-serif', fontSize: "clamp(22px, 3vw, 30px)", letterSpacing: "0.4px" }}
              >
                Claim Your Reward
              </h1>
              <p className="m-0" style={{ color: "#e6e9f2", fontSize: "0.98rem" }}>
                Choose a platform to continue.
              </p>
            </div>
          </header>

          {/* Platform picker */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3.5 ${inProgress ? "opacity-50 pointer-events-none" : ""}`}>
            {([
              { key: "nitro", label: "Discord Nitro", icon: NITRO_TITLE_ICON },
              { key: "robux", label: "Robux", icon: ROBUX_TITLE_ICON },
            ] as const).map((opt) => {
              const active = platform === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => pickPlatform(opt.key)}
                  className="flex items-center justify-center gap-2.5 font-bold transition-all hover:-translate-y-0.5"
                  style={{
                    padding: "12px 16px",
                    borderRadius: 999,
                    fontSize: "0.98rem",
                    color: "#fff",
                    border: active ? "1px solid #6da8ff" : "1px solid rgba(255,255,255,0.08)",
                    background: active
                      ? "linear-gradient(135deg, rgba(109,168,255,0.4), rgba(47,91,255,0.2))"
                      : "rgba(255,255,255,0.06)",
                    boxShadow: active ? "0 0 0 1px rgba(109,168,255,0.6), 0 18px 40px rgba(79,124,255,0.35)" : undefined,
                  }}
                >
                  <img src={opt.icon} alt="" className="w-7 h-7 md:w-9 md:h-9 object-contain" />
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Tier choices */}
          {platform && !inProgress && (
            <div
              className={`mt-4 md:mt-5 grid gap-3 md:gap-4`}
              style={{
                gridTemplateColumns:
                  items.length === 3
                    ? "repeat(auto-fit, minmax(180px, 1fr))"
                    : "repeat(auto-fit, minmax(220px, 1fr))",
              }}
            >
              {items.map((item, i) => {
                const active = selected?.title === item.title;
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setSelected(item)}
                    className="relative text-center grid gap-2 md:gap-3 transition-all hover:-translate-y-1"
                    style={{
                      padding: "16px",
                      borderRadius: 18,
                      minHeight: 200,
                      border: active ? "1px solid #6da8ff" : "1px solid rgba(255,255,255,0.08)",
                      background: active
                        ? "linear-gradient(160deg, rgba(65,115,255,0.25), rgba(26,28,44,0.9))"
                        : "linear-gradient(160deg, rgba(44,48,66,0.9), rgba(26,28,44,0.9))",
                      boxShadow: active ? "0 0 0 1px rgba(109,168,255,0.6), 0 18px 36px rgba(79,124,255,0.35)" : undefined,
                      animation: `card-in 0.55s ease ${i * 90}ms both`,
                    }}
                  >
                    {item.badge && (
                      <span
                        className="absolute top-3 right-3"
                        style={{
                          padding: "3px 8px",
                          borderRadius: 999,
                          background: "rgba(88,101,242,0.18)",
                          border: "1px solid rgba(88,101,242,0.5)",
                          color: "#e8edff",
                          fontSize: "0.62rem",
                          fontWeight: 700,
                          letterSpacing: "0.5px",
                          textTransform: "uppercase",
                          fontFamily: '"Unbounded", sans-serif',
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                    <div
                      className="mx-auto grid place-items-center"
                      style={{
                        width: 88,
                        height: 88,
                        borderRadius: 20,
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04), 0 10px 20px rgba(10,12,24,0.35)",
                      }}
                    >
                      <img src={item.icon} alt={item.title} style={{ width: 56, height: 56, objectFit: "contain" }} />
                    </div>
                    <div
                      style={{
                        color: "#f4f7ff",
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        letterSpacing: "0.3px",
                        fontFamily: '"Unbounded", sans-serif',
                      }}
                    >
                      {item.title}
                    </div>
                    {item.price && (
                      <div
                        className="mx-auto"
                        style={{
                          color: "#f6c343",
                          fontSize: "0.96rem",
                          fontWeight: 700,
                          fontFamily: '"Unbounded", sans-serif',
                          padding: "4px 12px",
                          borderRadius: 999,
                          background: "rgba(246,195,67,0.12)",
                          border: "1px solid rgba(246,195,67,0.45)",
                          width: "fit-content",
                        }}
                      >
                        {item.price}
                      </div>
                    )}
                    <div style={{ color: "#d7defc", fontSize: "0.93rem", lineHeight: 1.5, maxWidth: 220, margin: "0 auto" }}>
                      {item.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Generate action */}
          {platform && !inProgress && (
            <div className="mt-4 md:mt-5 grid gap-2 justify-items-center">
              <button
                type="button"
                disabled={!selected}
                onClick={openModal}
                className="w-full md:w-auto transition-all"
                style={{
                  padding: "13px 26px",
                  borderRadius: 999,
                  color: "#fff",
                  fontWeight: 700,
                  letterSpacing: "0.4px",
                  border: "none",
                  cursor: selected ? "pointer" : "not-allowed",
                  background: selected
                    ? "linear-gradient(135deg, #74a6ff 0%, #4f7cff 45%, #2f5bff 100%)"
                    : "rgba(255,255,255,0.08)",
                  boxShadow: selected ? "0 18px 35px rgba(79,124,255,0.45), 0 0 24px rgba(116,166,255,0.45)" : "none",
                  opacity: selected ? 1 : 0.5,
                  animation: selected ? "blue-pulse 2.4s ease-in-out infinite" : undefined,
                }}
              >
                {selected ? `Claim ${selected.title}` : "Start Generation"}
              </button>
              {!selected && (
                <p className="m-0" style={{ color: "#e6e9f2", fontSize: "0.88rem" }}>
                  Select a reward to unlock the button.
                </p>
              )}
            </div>
          )}

          {/* Progress */}
          {inProgress && (
            <div className="mt-5 md:mt-6 grid gap-3.5 place-items-center">
              <div className="flex items-center gap-3">
                <div
                  style={{
                    width: 42,
                    height: 42,
                    border: "4px solid rgba(255,255,255,0.15)",
                    borderTopColor: "#5865f2",
                    borderRadius: "50%",
                    animation: "spin 0.9s linear infinite",
                    boxShadow: "0 0 18px rgba(88,101,242,0.35)",
                  }}
                />
                <div style={{ color: "#e6e9f2", fontSize: "0.98rem" }}>{currentStep.label}</div>
              </div>
              <div
                style={{
                  width: "min(420px, 100%)",
                  height: 8,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${barWidth}%`,
                    background: "linear-gradient(90deg, #5865f2, #7b86ff)",
                    transition: "width 1.6s ease",
                    boxShadow: "0 0 18px rgba(88,101,242,0.4)",
                  }}
                />
              </div>
              <div style={{ color: "#e6e9f2", fontSize: "0.9rem" }}>{currentStep.sub}</div>
            </div>
          )}
        </section>

        <footer className="mt-4 text-center" style={{ color: "#e6e9f2", fontSize: "0.8rem" }}>
          Event Sponsor · RBXRewards
        </footer>
      </main>

      {/* Username Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 grid place-items-center p-4"
          style={{ background: "rgba(10,12,18,0.7)", backdropFilter: "blur(8px)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full grid gap-3"
            style={{
              maxWidth: 420,
              background: "linear-gradient(160deg, rgba(40,42,60,0.95), rgba(24,26,38,0.95))",
              borderRadius: 20,
              padding: 22,
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 24px 50px rgba(0,0,0,0.45)",
              animation: "modal-pop 0.35s ease both",
            }}
          >
            <h2 className="m-0" style={{ fontFamily: '"Unbounded", sans-serif', fontSize: "1.2rem" }}>
              Select your {platform === "nitro" ? "Discord" : "Roblox"} username
            </h2>
            <label className="text-xs" style={{ color: "#e6e9f2" }} htmlFor="username-input">
              Username
            </label>
            <input
              ref={inputRef}
              id="username-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && startProgress()}
              placeholder="Ex: wumplus"
              style={{
                borderRadius: 12,
                border: isValid ? "1px solid rgba(59,165,92,0.9)" : "1px solid rgba(255,255,255,0.15)",
                background: "rgba(10,12,18,0.6)",
                color: "#fff",
                padding: "12px 14px",
                fontSize: "0.95rem",
                outline: "none",
                boxShadow: isValid ? "0 0 0 2px rgba(59,165,92,0.2), 0 0 18px rgba(59,165,92,0.35)" : undefined,
              }}
            />
            <div className="flex justify-end gap-2.5 mt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "transparent",
                  color: "#fff",
                  padding: "10px 18px",
                  borderRadius: 999,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!isValid}
                onClick={startProgress}
                style={{
                  border: "none",
                  padding: "10px 22px",
                  borderRadius: 999,
                  color: "#fff",
                  fontWeight: 700,
                  cursor: isValid ? "pointer" : "not-allowed",
                  opacity: isValid ? 1 : 0.5,
                  background: isValid
                    ? "linear-gradient(135deg, #41c66f 0%, #3ba55c 45%, #248a45 100%)"
                    : "rgba(255,255,255,0.1)",
                  boxShadow: isValid ? "0 18px 35px rgba(59,165,92,0.45), 0 0 24px rgba(65,198,111,0.45)" : "none",
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes card-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes modal-pop { 0% { opacity: 0; transform: translateY(8px) scale(0.98); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes blue-pulse {
          0%, 100% { transform: translateY(0); box-shadow: 0 18px 35px rgba(79,124,255,0.45), 0 0 24px rgba(116,166,255,0.45); }
          50% { transform: translateY(-1px); box-shadow: 0 22px 40px rgba(79,124,255,0.6), 0 0 32px rgba(116,166,255,0.6); }
        }
      `}</style>
    </div>
  );
}
