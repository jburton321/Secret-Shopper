import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { Sparkles, Download, Send } from 'lucide-react';

/**
 * Chatti integration — branded card that streams the live Chatti API
 * directly through this component's right column.
 *
 * The official Chatti widget script is loaded for its JS API
 * (`window.chattiLive.api.*`) but its auto-rendered floating bubble +
 * drawer are suppressed via CSS so this card is the only chat surface
 * on the page.
 *
 * API surface used (all under window.chattiLive.api):
 *   - createSession()           — bootstrap a session
 *   - getMessagesBySession()    — load any prior history for this session
 *   - processMessage({message}) — send a message, get assistant response
 *
 * App.tsx also fires submission signals (DOM event, dataLayer push,
 * body.dataset.formSubmitted) that the Chatti backend may use to
 * pre-load context, etc.
 */
const CERTIFICATE_URL = 'https://directsalesincentives.com/pdfs/MTSS.pdf';
const CHATTI_SCRIPT_URL =
  'https://get.chattilive.ai/widgets/js/a1df788c-f06e-4d33-a26b-5248bab93bf2';

const QUICK_QUESTIONS = [
  'How do I activate my certificate?',
  'When will I get my $50 gift card?',
  "What's included on my trip?",
  'How do I choose my travel dates?',
];

type MessageRole = 'requester' | 'assistant';

interface ChattiMessage {
  id: string;
  from: MessageRole;
  text: string;
}

interface ChattiHistoryItem {
  from?: string;
  message?: string;
  createdAt?: string;
}

interface ChattiApi {
  createSession?: () => Promise<unknown>;
  processMessage?: (payload: { message: string }) => Promise<{
    data?: { responseText?: string };
  }>;
  getMessagesBySession?: () => Promise<{ data?: ChattiHistoryItem[] }>;
}

interface ChattiLiveGlobal {
  api?: ChattiApi;
}

function getChattiLive(): ChattiLiveGlobal | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as unknown as { chattiLive?: ChattiLiveGlobal }).chattiLive;
}

async function waitForChattiApi(timeoutMs = 15000): Promise<ChattiLiveGlobal | undefined> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const cl = getChattiLive();
    if (cl?.api?.processMessage) return cl;
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  return undefined;
}

export default function ChattiPanel() {
  const [messages, setMessages] = useState<ChattiMessage[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [ready, setReady] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Inject the Chatti widget script + hide its auto-rendered UI so this
  // card is the only chat surface on the page.
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const styleId = 'chatti-hide-auto-ui';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = '#chattiLive-container{display:none !important;}';
      document.head.appendChild(style);
    }

    if (!document.querySelector('script[data-chatti-widget="true"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = CHATTI_SCRIPT_URL;
      script.setAttribute('data-settings', '{"debug":false}');
      script.setAttribute('data-chatti-widget', 'true');
      document.body.appendChild(script);
    }
  }, []);

  // Once the API is available, ensure a session exists + load prior history
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cl = await waitForChattiApi();
      if (!cl || cancelled) return;

      try {
        await cl.api?.createSession?.();
        const history = await cl.api?.getMessagesBySession?.();
        if (cancelled) return;
        const items = history?.data ?? [];
        if (items.length > 0) {
          setMessages(
            items.map((m, i) => ({
              id: `${m.createdAt ?? 'msg'}-${i}`,
              from: m.from === 'assistant' ? 'assistant' : 'requester',
              text: m.message ?? '',
            })),
          );
        }
      } catch (err) {
        console.warn('[Chatti] session init failed', err);
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-scroll the conversation to the latest message
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isSending]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    const userMsg: ChattiMessage = {
      id: `u-${Date.now()}`,
      from: 'requester',
      text: trimmed,
    };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setIsSending(true);

    try {
      const cl = getChattiLive();
      const response = await cl?.api?.processMessage?.({ message: trimmed });
      const reply =
        response?.data?.responseText?.trim() ||
        "I'm having trouble responding right now — please try again in a moment.";
      setMessages((m) => [
        ...m,
        { id: `a-${Date.now()}`, from: 'assistant', text: reply },
      ]);
    } catch (err) {
      console.warn('[Chatti] send failed', err);
      setMessages((m) => [
        ...m,
        {
          id: `a-${Date.now()}`,
          from: 'assistant',
          text:
            "I couldn't reach the chat service. Please try again in a moment, or call (702) 703-2479.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const showGreetings = ready && messages.length === 0;

  return (
    <div className="relative z-20 -mt-20 md:-mt-28 lg:-mt-36">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden">
            <div className="grid lg:grid-cols-5 items-stretch">
              {/* Left: Branded intro panel */}
              <div className="lg:col-span-2 bg-gradient-to-br from-blue-800 via-blue-700 to-teal-700 text-white p-5 md:p-6 lg:p-7 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/15 ring-2 ring-white/40 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-300" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-base md:text-lg leading-tight">Chatti</div>
                    <div className="text-white/85 text-[11px] md:text-xs flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                      Secret Shopper Assistant · Online
                    </div>
                  </div>
                </div>

                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 leading-tight">
                  I'll help you activate your certificate.
                </h3>
                <p className="text-white/90 text-xs md:text-sm leading-relaxed mb-4">
                  Your enrollment is confirmed — a welcome email with your
                  certificate is on its way. Got questions? I'm right here.
                </p>

                <a
                  href={CERTIFICATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#E9C52D] text-black font-bold text-xs md:text-sm px-4 py-2.5 rounded-lg hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-lg self-start"
                >
                  <Download className="w-4 h-4" />
                  Download Certificate (PDF)
                </a>

                <div className="mt-auto pt-4 md:pt-5 text-white/60 text-[10px] uppercase tracking-widest">
                  Powered by Chatti
                </div>
              </div>

              {/* Right: Live chat — streams real Chatti API responses */}
              <div className="lg:col-span-3 flex flex-col bg-gradient-to-b from-tan-50/40 via-white to-white">
                <div className="bg-gray-50 border-b border-gray-200 px-4 md:px-5 py-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 uppercase tracking-widest font-semibold">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        ready ? 'bg-green-400 animate-pulse' : 'bg-gray-300'
                      }`}
                    ></span>
                    {ready ? 'Live conversation' : 'Connecting…'}
                  </div>
                </div>

                <div
                  ref={scrollRef}
                  className="flex-1 px-4 md:px-5 lg:px-6 py-4 md:py-5 space-y-3 min-h-[220px] max-h-[380px] overflow-y-auto"
                >
                  {showGreetings && (
                    <>
                      <ChattiBubble from="assistant">
                        Hey, welcome to the Secret Shopper program! Your enrollment is
                        confirmed — a welcome email with your <strong>certificate</strong>{' '}
                        is on its way to your inbox.
                      </ChattiBubble>
                      <ChattiBubble from="assistant">
                        I can walk you through activating it, answer questions about your
                        trip, or help with the $50 gift card — what would you like to
                        start with?
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
                              onClick={() => sendMessage(q)}
                              disabled={isSending}
                              className="text-left text-xs md:text-sm text-blue-700 font-semibold bg-blue-50 border border-blue-200 rounded-full px-3 py-1.5 hover:bg-blue-100 hover:border-blue-300 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {messages.map((m) => (
                    <ChattiBubble key={m.id} from={m.from}>
                      {m.text}
                    </ChattiBubble>
                  ))}

                  {isSending && (
                    <ChattiBubble from="assistant">
                      <TypingDots />
                    </ChattiBubble>
                  )}
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="border-t border-gray-200 bg-white px-4 md:px-5 py-3"
                >
                  <div className="flex items-center gap-2 bg-gray-100 focus-within:bg-blue-50 rounded-full px-4 py-2.5 transition-colors">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={ready ? 'Type your message to Chatti…' : 'Connecting to Chatti…'}
                      disabled={!ready || isSending}
                      className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none disabled:cursor-not-allowed"
                    />
                    <button
                      type="submit"
                      disabled={!ready || isSending || !input.trim()}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-700 to-teal-700 text-white flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChattiBubble({ from, children }: { from: MessageRole; children: ReactNode }) {
  if (from === 'requester') {
    return (
      <div className="flex justify-end">
        <div className="bg-gradient-to-br from-blue-700 to-teal-700 text-white rounded-2xl rounded-tr-md px-4 py-3 shadow-sm max-w-[85%] text-sm md:text-base leading-relaxed whitespace-pre-wrap">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-2.5">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-700 to-teal-700 flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-4 h-4 text-yellow-300" />
      </div>
      <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-gray-100 max-w-[88%]">
        <div className="text-sm md:text-base text-gray-800 leading-relaxed whitespace-pre-wrap">
          {children}
        </div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 py-1">
      <span
        className="w-2 h-2 rounded-full bg-blue-700 animate-bounce"
        style={{ animationDelay: '0ms' }}
      />
      <span
        className="w-2 h-2 rounded-full bg-blue-700 animate-bounce"
        style={{ animationDelay: '120ms' }}
      />
      <span
        className="w-2 h-2 rounded-full bg-blue-700 animate-bounce"
        style={{ animationDelay: '240ms' }}
      />
    </div>
  );
}
