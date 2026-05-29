import { Sparkles, Download } from 'lucide-react';

/**
 * Chatti integration mount + skeleton UI.
 *
 * Rendered as an inline section between the thank-you hero and the
 * "AS A SECRET SHOPPER, YOU RECEIVE:" section, elevated above both
 * neighbors with z-index + shadow + negative margins for a 3D
 * "bridging card" effect.
 *
 * Uses the same content-wrapper structure as the homepage sections:
 *   container mx-auto px-4 > max-w-7xl mx-auto > card.
 *
 * The live Chatti widget mounts into `#chatti-mount` and may listen on
 * any of these signals fired from App.tsx on submission:
 *   - DOM event: window.addEventListener('secretshopper:submitted', ...)
 *   - dataLayer: window.dataLayer.push({ event: 'secretshopper_submitted' })
 *   - body attr: document.body.dataset.formSubmitted === 'true'
 */
const CERTIFICATE_URL = 'https://directsalesincentives.com/pdfs/MTSS.pdf';

const QUICK_QUESTIONS = [
  'How do I activate my certificate?',
  'When will I get my $50 gift card?',
  "What's included on my trip?",
  'How do I choose my travel dates?',
];

export default function ChattiPanel() {
  return (
    <div className="relative z-20 -mt-20 md:-mt-28 lg:-mt-36">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden">
            <div className="grid lg:grid-cols-5 items-stretch">
              {/* Left: Branded intro panel */}
              <div className="lg:col-span-2 bg-gradient-to-br from-blue-800 via-blue-700 to-teal-700 text-white p-6 md:p-8 lg:p-10 flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/15 ring-2 ring-white/40 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-yellow-300" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-lg md:text-xl leading-tight">Chatti</div>
                    <div className="text-white/85 text-xs md:text-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                      Secret Shopper Assistant · Online
                    </div>
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 leading-tight">
                  I'll help you activate your certificate.
                </h3>
                <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6">
                  Your enrollment is confirmed — a welcome email with your
                  certificate is on its way. Got questions? I'm right here.
                </p>

                <a
                  href={CERTIFICATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#E9C52D] text-black font-bold text-sm md:text-base px-5 py-3 rounded-lg hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-lg self-start"
                >
                  <Download className="w-5 h-5" />
                  Download Certificate (PDF)
                </a>

                <div className="mt-auto pt-6 md:pt-8 text-white/60 text-[10px] uppercase tracking-widest">
                  Powered by Chatti
                </div>
              </div>

              {/* Right: Chat conversation skeleton — replaced by live Chatti widget */}
              <div className="lg:col-span-3 flex flex-col bg-gradient-to-b from-tan-50/40 via-white to-white">
                <div className="bg-gray-50 border-b border-gray-200 px-4 md:px-5 py-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 uppercase tracking-widest font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    Live conversation
                  </div>
                </div>

                <div className="flex-1 px-4 md:px-5 lg:px-6 py-5 md:py-6 space-y-4 min-h-[320px]">
                  <ChattiBubble>
                    <p className="text-sm md:text-base text-gray-800 leading-relaxed">
                      Hey, welcome to the Secret Shopper program! Your enrollment is
                      confirmed — a welcome email with your{' '}
                      <strong>certificate</strong> is on its way to your inbox.
                    </p>
                  </ChattiBubble>

                  <ChattiBubble>
                    <p className="text-sm md:text-base text-gray-800 leading-relaxed">
                      I can walk you through activating it, answer questions about
                      your trip, or help with the $50 gift card — what would you
                      like to start with?
                    </p>
                  </ChattiBubble>

                  <div className="pt-2">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-semibold">
                      Quick questions
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          type="button"
                          disabled
                          className="text-left text-xs md:text-sm text-blue-700 font-semibold bg-blue-50 border border-blue-200 rounded-full px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-80"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Chatti widget mounts here */}
                  <div id="chatti-mount" data-chatti-state="submitted"></div>

                  <div className="mt-2 pt-3 border-t border-dashed border-gray-300 text-center">
                    <p className="text-[11px] text-gray-400 italic">
                      Chatti AI is loading… live conversation will load here.
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 bg-white px-4 md:px-5 py-3">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2.5">
                    <input
                      type="text"
                      placeholder="Type your message…"
                      disabled
                      className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChattiBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2.5">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-700 to-teal-700 flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-4 h-4 text-yellow-300" />
      </div>
      <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-gray-100 max-w-[88%]">
        {children}
      </div>
    </div>
  );
}
