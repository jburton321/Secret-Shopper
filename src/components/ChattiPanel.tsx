import { useEffect, useState } from 'react';
import { MessageCircle, Minimize2, Download, Sparkles } from 'lucide-react';

/**
 * Chatti integration mount + skeleton UI.
 *
 * Chatti is the post-submission engagement layer. It auto-launches the
 * instant the lead form is submitted, surfaces the certificate, and
 * drives toward activation.
 *
 * The actual Chatti widget is delivered later by Yamil. Until then this
 * component renders a branded skeleton in the same flyout the real
 * widget will replace. The live widget should mount into
 * `#chatti-mount` and may listen for either of these signals:
 *   - DOM event: `window.addEventListener('secretshopper:submitted', ...)`
 *   - dataLayer: `window.dataLayer.push({ event: 'secretshopper_submitted' })`
 *   - body attribute: `document.body.dataset.formSubmitted === 'true'`
 */
interface ChattiPanelProps {
  active: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CERTIFICATE_URL = 'https://directsalesincentives.com/pdfs/MTSS.pdf';

const QUICK_QUESTIONS = [
  'How do I activate my certificate?',
  'When will I get my $50 gift card?',
  "What's included on my trip?",
  'How do I choose my travel dates?',
];

export default function ChattiPanel({ active, isOpen, onOpenChange }: ChattiPanelProps) {
  const [hasAutoLaunched, setHasAutoLaunched] = useState(false);

  useEffect(() => {
    if (!active || hasAutoLaunched) return;
    const timer = window.setTimeout(() => {
      onOpenChange(true);
      setHasAutoLaunched(true);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [active, hasAutoLaunched, onOpenChange]);

  if (!active) return null;

  return (
    <>
      {/* Floating reopen bubble — visible only when the panel is minimized */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => onOpenChange(true)}
          className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 inline-flex items-center gap-2 bg-gradient-to-br from-blue-700 to-teal-700 text-white font-bold py-3 px-5 rounded-full shadow-2xl hover:scale-105 hover:shadow-3xl transition-all duration-300"
          aria-label="Reopen Chatti"
        >
          <span className="relative">
            <MessageCircle className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-yellow-400 rounded-full ring-2 ring-white animate-pulse"></span>
          </span>
          <span className="text-sm md:text-base">Chat with Chatti</span>
        </button>
      )}

      {/* Backdrop on mobile only — flyout behaves like a sheet on small screens */}
      <div
        onClick={() => onOpenChange(false)}
        className={`fixed inset-0 z-40 bg-black/40 sm:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Flyout panel */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] md:w-[420px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
        aria-hidden={!isOpen}
        aria-label="Chatti chat panel"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-800 via-blue-700 to-teal-700 text-white px-4 md:px-5 py-3.5 md:py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/15 ring-2 ring-white/40 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-base md:text-lg leading-tight truncate">Chatti</div>
              <div className="text-white/85 text-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                Secret Shopper Assistant · Online
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="p-2 rounded-lg hover:bg-white/15 transition-colors flex-shrink-0"
            aria-label="Minimize Chatti"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
        </div>

        {/* Conversation body (skeleton — replaced by live Chatti widget) */}
        <div className="flex-1 overflow-y-auto px-4 py-5 bg-gradient-to-b from-tan-50 via-white to-white space-y-4">
          {/* Greeting bubble */}
          <ChattiBubble>
            <p className="text-sm text-gray-800 leading-relaxed">
              Hey, welcome to the Secret Shopper program! Your enrollment is
              confirmed — a welcome email with your certificate is on its way to
              your inbox.
            </p>
          </ChattiBubble>

          <ChattiBubble>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              You can also download your certificate right here — I'll walk you
              through activating it whenever you're ready.
            </p>
            <a
              href={CERTIFICATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E9C52D] text-black font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-primary-blue-950 hover:text-white transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download Certificate (PDF)
            </a>
          </ChattiBubble>

          {/* Quick-reply chips */}
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
                  className="text-left text-xs text-blue-700 font-semibold bg-blue-50 border border-blue-200 rounded-full px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-80"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Live Chatti widget mounts here */}
          <div id="chatti-mount" data-chatti-state="submitted"></div>

          {/* Skeleton-state notice (will be hidden once live widget mounts) */}
          <div className="mt-2 pt-4 border-t border-dashed border-gray-300 text-center">
            <p className="text-[11px] text-gray-400 italic">
              Chatti AI is loading… live conversation will load in this panel.
            </p>
          </div>
        </div>

        {/* Footer input (skeleton — disabled until live widget loads) */}
        <div className="border-t border-gray-200 bg-white px-4 py-3 flex-shrink-0">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2.5">
            <input
              type="text"
              placeholder="Type your message…"
              disabled
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none disabled:cursor-not-allowed"
            />
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-2 uppercase tracking-widest">
            Powered by Chatti
          </p>
        </div>
      </aside>
    </>
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
