import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Check,
  Download,
  PartyPopper,
  Hotel,
  UtensilsCrossed,
  Gift,
  Calendar,
  FileCheck,
  Sparkles,
  KeyRound,
  Mail,
  Phone,
} from 'lucide-react';

const CERTIFICATE_URL = 'https://directsalesincentives.com/pdfs/MTSS.pdf';
const CELEBRATION_SOUND = '/SecretShopper/media/celebration.mp3';
const HERO_VIDEO = '/SecretShopper/media/HERO.mp4';
const RESORT_IMG = '/SecretShopper/images/images/resort.jpg';

const PERKS = [
  { icon: Hotel, text: '4 Days, 3 Nights All-Inclusive Resort Stay' },
  { icon: UtensilsCrossed, text: 'Accommodations + Meals + Drinks' },
  { icon: Sparkles, text: 'Cocktails & Full Resort Access' },
  { icon: Gift, text: '$50 Hotel Gift Card Upon Enrollment (Instant)' },
  { icon: Calendar, text: 'Choose Your Travel Dates Within 12 Months' },
  { icon: FileCheck, text: 'Simple 15-Minute Feedback Survey After Your Trip' },
];

const STEPS = [
  {
    num: 1,
    icon: KeyRound,
    title: 'Get Matched',
    body: "We'll pair you with a 4–5 star all-inclusive resort that fits your style and schedule.",
  },
  {
    num: 2,
    icon: Hotel,
    title: 'Experience Luxury',
    body: 'Enjoy 4 days and 3 nights with meals, drinks, and often amenities included. Travel as a normal guest.',
  },
  {
    num: 3,
    icon: FileCheck,
    title: 'Share Feedback',
    body: 'Complete a simple 15-minute survey about your experience and receive your $50 gift card.',
  },
];

export default function ThankYouPage() {
  const heroRef = useRef<HTMLElement | null>(null);

  // Reveal the Chatti launcher (it was hidden globally in index.html so
  // it doesn't show on the homepage) and immediately open the centered
  // modal. The script was eagerly loaded in App.tsx on initial page
  // load, so by the time the user submits the form the API is almost
  // always ready and the modal opens instantly. A short rAF-based poll
  // covers the rare case where the user is faster than the network.
  useEffect(() => {
    document.getElementById('chatti-hide-launcher')?.remove();

    type ChattiOpener = (mode?: string) => void;
    const tryOpen = (): boolean => {
      const open = (window as unknown as { OpenChattiLive?: ChattiOpener })
        .OpenChattiLive;
      if (typeof open === 'function') {
        open('modal');
        return true;
      }
      return false;
    };

    if (tryOpen()) return;

    let rafId = 0;
    let attempts = 0;
    const tick = () => {
      attempts += 1;
      if (tryOpen() || attempts > 600) return;
      rafId = window.requestAnimationFrame(tick);
    };
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  // Center-out confetti explosion on TY-page mount (i.e. right after the
  // homepage form submit flips us into the thank-you state).
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    const colors = ['#E9C52D', '#0f766e', '#1d4ed8', '#ffffff', '#22c55e'];

    const getOrigin = (): { x: number; y: number } => {
      const el = heroRef.current;
      if (!el) return { x: 0.5, y: 0.4 };
      const rect = el.getBoundingClientRect();
      return {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height * 0.45) / window.innerHeight,
      };
    };

    const burst = (overrides: confetti.Options = {}) => {
      const origin = getOrigin();
      confetti({
        origin,
        colors,
        zIndex: 60,
        scalar: 1,
        ticks: 240,
        ...overrides,
      });
    };

    // Celebration sound effect, fired in sync with the confetti burst.
    // The homepage form submit counts as a user gesture, so autoplay is
    // permitted here.
    const audio = new Audio(CELEBRATION_SOUND);
    audio.volume = 0.7;
    audio.preload = 'auto';

    // Single 360° explosion from the hero center on first paint.
    const t1 = window.setTimeout(() => {
      audio.play().catch(() => {
        // Silently ignore — browser blocked autoplay despite the gesture
        // (rare). Visual confetti still plays.
      });
      burst({
        particleCount: 220,
        spread: 360,
        startVelocity: 55,
        gravity: 0.85,
        decay: 0.92,
      });
      // Side cannons add the "outward explosion" feel in the same burst.
      burst({ particleCount: 90, spread: 80, angle: 60, startVelocity: 65 });
      burst({ particleCount: 90, spread: 80, angle: 120, startVelocity: 65 });
    }, 250);

    return () => {
      window.clearTimeout(t1);
      audio.pause();
    };
  }, []);

  return (
    <>
      {/* Hero confirmation — matches homepage hero pattern (video bg + dark overlay + yellow CTA) */}
      <section
        ref={heroRef}
        className="relative pt-14 md:pt-20 lg:pt-28 pb-32 md:pb-40 lg:pb-48 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-blue-900 to-teal-900">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-100"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/55"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-500 ring-4 ring-white/30 shadow-2xl mx-auto mb-6">
              <Check className="w-12 h-12 md:w-14 md:h-14 text-white" strokeWidth={3} />
            </div>

            <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
              <PartyPopper className="w-7 h-7 md:w-9 md:h-9 text-yellow-400 drop-shadow-lg" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
                Thank You!
              </h1>
              <PartyPopper className="w-7 h-7 md:w-9 md:h-9 text-yellow-400 drop-shadow-lg" />
            </div>

            <h2 className="text-lg md:text-2xl lg:text-3xl font-semibold text-white mb-5 md:mb-6 drop-shadow-lg">
              Submission Complete — Your Welcome Email Is On Its Way!
            </h2>

            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto drop-shadow-md">
              Check your inbox in the next few minutes for your Secret Shopper certificate and
              next steps. A representative will also call or text within 1–2 business days.
            </p>

            <a
              href={CERTIFICATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E9C52D] text-black font-bold py-4 px-8 md:px-10 rounded-lg text-base md:text-lg hover:bg-white hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg"
            >
              <Download className="w-5 h-5 md:w-6 md:h-6" />
              DOWNLOAD CERTIFICATE (PDF)
            </a>
            <div className="flex items-center justify-center gap-2 text-white/80 text-xs md:text-sm mt-4">
              <Mail className="w-4 h-4" />
              <span>A copy is also being emailed to you right now.</span>
            </div>
          </div>
        </div>
      </section>

      {/* "AS A SECRET SHOPPER, YOU RECEIVE:" — reuses the homepage's two-column pattern */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#F9FBFC] border-b-4 border-teal-600">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-blue-950">
                AS A SECRET SHOPPER, YOU RECEIVE:
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-stretch">
              {/* Left: Resort hero image */}
              <div className="relative rounded-xl md:rounded-2xl shadow-2xl overflow-hidden min-h-[260px] md:min-h-[320px]">
                <img src={RESORT_IMG} alt="Luxury Resort" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"></div>
                <div className="absolute bottom-4 left-0 right-0 z-10 text-center px-4">
                  <h3 className="text-white text-base md:text-lg font-bold drop-shadow-lg">
                    Your Resort Awaits
                  </h3>
                  <p className="text-white/90 text-xs md:text-sm drop-shadow-lg tracking-wider">
                    MEXICO & THE CARIBBEAN
                  </p>
                </div>
                <div className="absolute inset-0 border-4 border-white/10 rounded-xl md:rounded-2xl pointer-events-none"></div>
              </div>

              {/* Right: Benefits gradient card */}
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-xl flex">
                <div className="relative rounded-xl md:rounded-2xl flex-1">
                  <div className="bg-gradient-to-br from-teal-50 via-white to-blue-50 p-4 md:p-6 lg:p-8 h-full flex items-center">
                    <div className="space-y-2 md:space-y-3 w-full">
                      {PERKS.map((perk) => {
                        const Icon = perk.icon;
                        return (
                          <div
                            key={perk.text}
                            className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-[1.02] cursor-default group"
                          >
                            <Icon className="w-5 h-5 md:w-6 md:h-6 text-teal-600 flex-shrink-0 group-hover:text-teal-700 group-hover:scale-110 transition-all duration-300" />
                            <span className="text-sm md:text-base text-primary-blue-950 font-semibold group-hover:text-teal-700 transition-colors duration-300">
                              {perk.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "What Happens Next" — matches homepage steps section pattern */}
      <section className="relative py-12 md:py-16 lg:py-20 xl:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-blue-900 to-teal-900">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-100"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/55"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg">
              What Happens Next
            </h2>
            <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-4">
              Three simple steps from here to your complimentary all-inclusive vacation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="mb-6">
                    <div className="relative inline-block">
                      <div className="w-20 h-20 bg-teal-600 rounded-xl flex items-center justify-center mb-4">
                        <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold text-base flex items-center justify-center shadow-lg ring-2 ring-white">
                        {step.num}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-primary-blue-950 mb-3">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{step.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support / "Have a question?" section */}
      <section className="py-12 md:py-16 lg:py-20 bg-tan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-blue-950 mb-3">
                Have a Question Right Now?
              </h2>
              <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto">
                Two easy ways to get answers about your certificate and trip.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {/* Email card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-7 text-center hover:shadow-xl transition-shadow duration-300 border border-blue-100">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-primary-blue-950 mb-2">
                  Check Your Inbox
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Your welcome email with your certificate is on its way — usually arrives
                  within a few minutes.
                </p>
              </div>

              {/* Phone card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-7 text-center hover:shadow-xl transition-shadow duration-300 border border-blue-100">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-teal-600 flex items-center justify-center shadow-lg">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-primary-blue-950 mb-2">
                  Prefer to Call?
                </h3>
                <a
                  href="tel:7027032479"
                  className="inline-flex items-center gap-1.5 text-base md:text-lg font-bold text-blue-700 hover:text-blue-900 hover:underline"
                >
                  (702) 703-2479
                </a>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  Mon–Fri · 9am–6pm PT
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
