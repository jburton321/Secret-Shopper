import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { Phone, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Star, Search, MessageSquare, Gift, Award, Shield, Hotel, Users, Calendar, Sparkles, HelpCircle, Lightbulb, CheckCircle, Plane, KeyRound, FileCheck, UtensilsCrossed } from 'lucide-react';
import QuizForm from './components/QuizForm';
import TeamCollaborationSection from './components/TeamCollaborationSection';

// Code-split routes/states that aren't part of the initial landing render.
// ThankYouPage only renders after the quiz is submitted; Terms & Privacy
// are separate routes. Splitting them shaves a meaningful chunk off the
// landing-page bundle and lets the browser parse less JS up front.
const ThankYouPage = lazy(() => import('./components/ThankYouPage'));
const TermsPage = lazy(() => import('./components/TermsPage'));
const PrivacyPage = lazy(() => import('./components/PrivacyPage'));

const CHATTI_WIDGET_SRC =
  'https://get.chattilive.ai/widgets/js/a1df788c-f06e-4d33-a26b-5248bab93bf2';

function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentResort, setCurrentResort] = useState(1);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/',
  );

  // Lightweight client-side router: keep `pathname` in sync with the URL so
  // back/forward (and direct `pushState` navigation) re-render the right page
  // without pulling in a routing library for two static pages.
  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((to: string) => {
    if (typeof window === 'undefined') return;
    if (window.location.pathname !== to) {
      window.history.pushState({}, '', to);
    }
    setPathname(to);
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (submitted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [submitted]);

  // Eagerly load the Chatti widget on app mount with:
  //   - openChattiLive: 'sidebar'     → launcher click defaults to the side
  //                                     drawer (Chatti's term is "sidebar";
  //                                     "drawer" is not a valid value).
  //   - openChattiLiveState: 'close'  → disable Chatti's auto-pop on first
  //                                     load. The home page should never
  //                                     auto-open the chat; the user must
  //                                     click the launcher.
  // The TY page still calls `OpenChattiLive('modal')` explicitly to auto-pop
  // the modal there. That goes through `chattiLive.chat._openInMode(...)`,
  // which is independent of `openChattiLiveState`, so the TY behavior is
  // unaffected by disabling auto-open here.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.querySelector(`script[src="${CHATTI_WIDGET_SRC}"]`)) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = CHATTI_WIDGET_SRC;
    script.setAttribute(
      'data-settings',
      '{"debug":false,"openChattiLive":"sidebar","openChattiLiveState":"close"}',
    );
    document.body.appendChild(script);
  }, []);

  const handleSubmitted = (_lead: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => {
    setSubmitted(true);
    if (typeof window === 'undefined') return;

    // 1) Body attribute hook for CSS/JS targeting
    document.body.dataset.formSubmitted = 'true';

    // 2) Custom DOM event for direct listeners
    window.dispatchEvent(new CustomEvent('secretshopper:submitted'));

    // 3) dataLayer push for analytics/tag-manager integrations
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: 'secretshopper_submitted' });
  };

  const resorts = [
    {
      name: 'ATLANTIS PARADISE ISLAND',
      location: 'PARADISE ISLAND - BAHAMAS',
      image: '/SecretShopper/images/images/Atlantis.png',
      logo: '/SecretShopper/images/ResortsLogo/Atlantis.png'
    },
    {
      name: 'SANDALS RESORTS',
      location: 'MONTEGO BAY - JAMAICA',
      image: '/SecretShopper/images/images/Sandles.png',
      logo: '/SecretShopper/images/ResortsLogo/Sandles.png'
    },
    {
      name: 'SECRETS RESORTS & SPAS',
      location: 'RIVIERA MAYA - MEXICO',
      image: '/SecretShopper/images/images/Secrets.png',
      logo: '/SecretShopper/images/ResortsLogo/Serets.png'
    },
    {
      name: 'HOTEL XCARET MÉXICO',
      location: 'PLAYA DEL CARMEN - MEXICO',
      image: '/SecretShopper/images/images/xcaret-mexico.png',
      logo: '/SecretShopper/images/ResortsLogo/Mexico.png'
    },
    {
      name: 'VIDANTA RESORTS',
      location: 'RIVIERA MAYA - MEXICO',
      image: '/SecretShopper/images/images/VIDANTA.png',
      logo: '/SecretShopper/images/ResortsLogo/Vidanta.png'
    },
    {
      name: 'THE FIVES HOTELS',
      location: 'PLAYA DEL CARMEN - MEXICO',
      image: '/SecretShopper/images/images/FIVES.png',
      logo: '/SecretShopper/images/ResortsLogo/The Fives.png'
    },
    {
      name: 'DREAMS RESORTS & SPAS',
      location: 'CANCÚN - MEXICO',
      image: '/SecretShopper/images/images/DREAMS.png',
      logo: '/SecretShopper/images/ResortsLogo/Dreams.png'
    },
    {
      name: 'LIFESTYLE HOLIDAYS',
      location: 'PUERTO PLATA - DOMINICAN REPUBLIC',
      image: '/SecretShopper/images/images/LIFESTYLE.png',
      logo: '/SecretShopper/images/ResortsLogo/Lifestyle.png'
    }
  ];

  const nextResort = () => {
    setCurrentResort((prev) => (prev + 1) % resorts.length);
  };

  const prevResort = () => {
    setCurrentResort((prev) => (prev - 1 + resorts.length) % resorts.length);
  };

  const goToResort = (index: number) => {
    setCurrentResort(index);
  };

  const toggleDropdown = (destination: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [destination]: !prev[destination]
    }));
  };

  const nextGalleryImage = () => {
    setCurrentGalleryImage((prev) => (prev + 1) % resorts.length);
  };

  const prevGalleryImage = () => {
    setCurrentGalleryImage((prev) => (prev - 1 + resorts.length) % resorts.length);
  };

  // Group resorts by destination
  const groupedResorts = resorts.reduce((acc, resort, index) => {
    const destination = resort.location.split(' - ')[1];
    if (!acc[destination]) {
      acc[destination] = [];
    }
    acc[destination].push({ ...resort, index });
    return acc;
  }, {} as Record<string, Array<typeof resorts[0] & { index: number }>>);

  const scrollToQuiz = () => {
    document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: 'What exactly is a secret shopper for resorts?',
      answer: 'A secret shopper is a real traveler who evaluates a resort\'s service, amenities, and overall guest experience. You stay as a normal guest and share honest feedback afterward. Resorts use this feedback to maintain quality standards and improve guest satisfaction. You get a complimentary vacation, and resorts get valuable insights—everyone benefits.',
    },
    {
      question: 'What\'s the catch? Why would resorts offer free stays?',
      answer: 'There\'s no catch. Five-star resorts invest heavily in quality assurance because their reputation depends on consistent excellence. Secret shopper programs are a standard industry practice—resorts pay us to recruit qualified travelers who provide detailed, honest evaluations. You vacation, they get feedback. It\'s that simple.',
    },
    {
      question: 'Can I choose which resort I evaluate as a secret shopper?',
      answer: 'Your travel dates and preferences are factored in, and The Fulfillment Center matches you with one of our partner resorts. While we can\'t guarantee a specific property, all our partners are highly-rated 4-5 star all-inclusive resorts, and we work to match you with the best available fit.',
    },
    {
      question: 'What do I have to do as a secret shopper?',
      answer: 'You simply experience the resort as a normal guest would—check in, enjoy the amenities, dine at restaurants, use the pools and beach. After your stay, you\'ll complete an online evaluation form (15-20 minutes) covering areas like check-in & staff service, room quality & cleanliness, dining & beverage quality, amenities, and overall satisfaction. That\'s the full extent of your "work" as a secret shopper.',
    },
    {
      question: 'How does selection work?',
      answer: 'The resort destination will be based on the dates you choose and selected by The Fulfillment Center.',
    },
    {
      question: 'What does the review involve?',
      answer: 'We\'ll send you a quick 10-question survey to see how you were treated from check-in to check-out.',
    },
    {
      question: 'Will I be charged?',
      answer: 'Enrolling is free. Some resorts may require a small resort fee. You will be responsible for your airfare and transfer from the airport to the resort.',
    },
  ];

  const testimonials = [
    {
      name: 'Jennifer & Michael T.',
      location: 'Orlando, FL',
      resort: 'Dreams Riviera Cancun',
      rating: 5,
      text: 'Becoming a secret shopper was one of the best decisions we made! We spent 4 incredible days at Dreams Riviera Cancun, enjoying gourmet dining, unlimited drinks, and beautiful beach views. The feedback form was simple—just answering questions about our experience. We can\'t wait for our next secret shopper assignment!',
    },
    {
      name: 'Robert & Susan L.',
      location: 'Austin, TX',
      resort: 'The Fives Azul Beach Resort',
      rating: 5,
      text: 'I was curious about the secret shopper program and I\'m so glad I enrolled! The quiz matched us perfectly with The Fives—it was everything we wanted in a resort. The evaluation was straightforward and felt good knowing our feedback helps future travelers. Already applied for our next assignment!',
    },
    {
      name: 'David & Patricia K.',
      location: 'Phoenix, AZ',
      resort: 'Sandals Royal Caribbean',
      rating: 5,
      text: 'The secret shopper program is brilliant. We got a genuine all-inclusive vacation at a stunning resort, and all we had to do was share honest feedback afterward. No pressure, no gimmicks—just a real vacation with a purpose. The $50 gift card was a nice bonus too. Highly recommend joining!',
    },
  ];

  if (pathname === '/terms') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-tan-50" />}>
        <TermsPage onNavigate={navigate} />
      </Suspense>
    );
  }

  if (pathname === '/privacy') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-tan-50" />}>
        <PrivacyPage onNavigate={navigate} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-tan-50">
      <header className="bg-primary-blue-950 text-tan-50 py-3 md:py-4 sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/chatti-icon.png"
              alt="Secret Shopper Resort Program"
              fetchPriority="high"
              decoding="async"
              width="56"
              height="56"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </div>
          <a href="tel:7027032479" className="flex items-center gap-1 md:gap-2 text-white font-bold hover:text-yellow-200 transition-colors text-sm md:text-base">
            <Phone className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
            <span className="hidden sm:inline">CALL: (702) 703-2479</span>
          </a>
        </div>
      </header>

      {submitted ? (
        <Suspense fallback={<div className="min-h-screen" />}>
          <ThankYouPage />
        </Suspense>
      ) : (
      <>
      <section className="relative py-12 md:py-16 lg:py-24 pb-28 md:pb-32 lg:pb-36 overflow-visible">
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-blue-900 to-teal-900">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-100"
          >
            <source src="/SecretShopper/media/HERO.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
            <div className="px-4 py-6 md:p-8 lg:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
                Get a Complimentary 4-Day All-Inclusive Resort Stay
                <div className="text-xl md:text-2xl lg:text-3xl font-normal mt-2">Just by Sharing Your Honest Feedback</div>
              </h1>

              <p className="text-sm md:text-base text-white leading-relaxed drop-shadow-lg">
                Join our Secret Shopper Program and enjoy luxury Mexico & Caribbean resorts completely FREE.
              </p>
            </div>

            <div id="quiz" className="bg-white/95 p-6 md:p-6 lg:p-8 rounded-2xl shadow-2xl flex flex-col">
              <QuizForm onSubmitted={handleSubmitted} />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 w-full max-w-5xl px-3 md:px-4">
          <div className="bg-white rounded-lg md:rounded-xl lg:rounded-2xl shadow-2xl border-2 border-gray-100">
            <div className="grid grid-cols-4 divide-x divide-gray-200">
              <div className="text-center py-2 md:py-3 lg:py-4 px-1 md:px-2 bg-gradient-to-br from-teal-600 to-blue-600 rounded-l-lg md:rounded-l-xl lg:rounded-l-2xl transition-all duration-300 hover:from-teal-700 hover:to-blue-700 hover:scale-105 hover:shadow-xl cursor-pointer group">
                <div className="text-xs sm:text-sm md:text-xl lg:text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">All for</div>
                <div className="text-sm sm:text-base md:text-2xl lg:text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-300">FREE!</div>
              </div>
              <div className="text-center py-2 md:py-3 lg:py-4 px-0.5 sm:px-1 md:px-2 transition-all duration-300 hover:bg-blue-50 hover:scale-105 hover:shadow-lg cursor-pointer group">
                <div className="text-sm sm:text-base md:text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300">4 Days</div>
                <div className="text-xs md:text-sm text-gray-600 group-hover:text-blue-500 transition-colors duration-300">3 Nights</div>
              </div>
              <div className="text-center py-2 md:py-3 lg:py-4 px-0.5 sm:px-1 md:px-2 transition-all duration-300 hover:bg-teal-50 hover:scale-105 hover:shadow-lg cursor-pointer group">
                <div className="text-xs sm:text-sm md:text-xl lg:text-2xl font-bold text-gray-900 leading-tight group-hover:text-teal-600 group-hover:scale-110 transition-all duration-300">All-Inclusive</div>
                <div className="text-xs md:text-sm text-gray-600 leading-tight group-hover:text-teal-500 transition-colors duration-300">Meals & Drinks</div>
              </div>
              <div className="text-center py-2 md:py-3 lg:py-4 px-0.5 sm:px-1 md:px-2 transition-all duration-300 hover:bg-cyan-50 hover:scale-105 hover:shadow-lg cursor-pointer group rounded-r-lg md:rounded-r-xl lg:rounded-r-2xl">
                <div className="text-xs sm:text-sm md:text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-cyan-600 group-hover:scale-110 transition-all duration-300">Enjoy</div>
                <div className="text-xs md:text-sm text-gray-600 leading-tight hidden sm:block group-hover:text-cyan-500 transition-colors duration-300">Complete Assignment</div>
                <div className="text-xs text-gray-600 leading-tight sm:hidden group-hover:text-cyan-500 transition-colors duration-300">& Review</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-12 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-primary-blue-950 mb-2">
            Featured Resort Partners
          </h2>
          <p className="text-center text-gray-600 text-xs sm:text-sm tracking-widest mb-6 md:mb-8">50+ PROPERTIES IN MEXICO & THE CARIBBEAN</p>
          <div className="relative">
            <div className="flex gap-12 animate-scroll items-center">
              <img src="/SecretShopper/images/ResortsLogo/Atlantis.png" alt="Atlantis" loading="lazy" decoding="async" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="/SecretShopper/images/ResortsLogo/Dreams.png" alt="Dreams" loading="lazy" decoding="async" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="/SecretShopper/images/ResortsLogo/Lifestyle.png" alt="Lifestyle" loading="lazy" decoding="async" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="/SecretShopper/images/ResortsLogo/Mexico.png" alt="Mexico" loading="lazy" decoding="async" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="/SecretShopper/images/ResortsLogo/Sandles.png" alt="Sandals" loading="lazy" decoding="async" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="/SecretShopper/images/ResortsLogo/Serets.png" alt="Secrets" loading="lazy" decoding="async" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="/SecretShopper/images/ResortsLogo/The Fives.png" alt="The Fives" loading="lazy" decoding="async" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="/SecretShopper/images/ResortsLogo/Vidanta.png" alt="Vidanta" loading="lazy" decoding="async" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="/SecretShopper/images/ResortsLogo/Atlantis.png" alt="Atlantis" loading="lazy" decoding="async" aria-hidden="true" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="/SecretShopper/images/ResortsLogo/Dreams.png" alt="Dreams" loading="lazy" decoding="async" aria-hidden="true" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="/SecretShopper/images/ResortsLogo/Lifestyle.png" alt="Lifestyle" loading="lazy" decoding="async" aria-hidden="true" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="/SecretShopper/images/ResortsLogo/Mexico.png" alt="Mexico" loading="lazy" decoding="async" aria-hidden="true" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="/SecretShopper/images/ResortsLogo/Sandles.png" alt="Sandals" loading="lazy" decoding="async" aria-hidden="true" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="/SecretShopper/images/ResortsLogo/Serets.png" alt="Secrets" loading="lazy" decoding="async" aria-hidden="true" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="/SecretShopper/images/ResortsLogo/The Fives.png" alt="The Fives" loading="lazy" decoding="async" aria-hidden="true" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="/SecretShopper/images/ResortsLogo/Vidanta.png" alt="Vidanta" loading="lazy" decoding="async" aria-hidden="true" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
            </div>
          </div>
        </div>
      </section>

      <TeamCollaborationSection />

      <section className="py-12 md:py-16 lg:py-20 bg-[#F9FBFC] border-b-4 border-teal-600">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-blue-950">
                AS A SECRET SHOPPER, YOU RECEIVE:
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-stretch">
              <div className="relative rounded-xl md:rounded-2xl shadow-2xl overflow-hidden min-h-[220px] md:min-h-[280px]">
                <img
                  src={resorts[currentGalleryImage].image}
                  alt={resorts[currentGalleryImage].name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                <button
                  onClick={prevGalleryImage}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-gray-800" />
                </button>

                <button
                  onClick={nextGalleryImage}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-gray-800" />
                </button>

                <div className="absolute bottom-4 left-0 right-0 z-10">
                  <div className="text-center mb-3">
                    <h3 className="text-white text-base md:text-lg font-bold drop-shadow-lg">{resorts[currentGalleryImage].name}</h3>
                    <p className="text-white/90 text-xs md:text-sm drop-shadow-lg">{resorts[currentGalleryImage].location}</p>
                  </div>
                  <div className="flex justify-center gap-2">
                    {resorts.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentGalleryImage(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentGalleryImage
                            ? 'bg-white w-8'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 border-4 border-white/10 rounded-xl md:rounded-2xl pointer-events-none"></div>
              </div>

              <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-xl flex">
                <div className="relative rounded-xl md:rounded-2xl flex-1">
                  <div className="bg-gradient-to-br from-teal-50 via-white to-blue-50 p-4 md:p-6 lg:p-8 h-full flex items-center">
                    <div className="space-y-2 md:space-y-3 w-full">
                      <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-[1.02] cursor-pointer group">
                        <Hotel className="w-5 h-5 md:w-6 md:h-6 text-teal-600 flex-shrink-0 group-hover:text-teal-700 group-hover:scale-110 transition-all duration-300" />
                        <span className="text-sm md:text-base text-primary-blue-950 font-semibold group-hover:text-teal-700 transition-colors duration-300">4 Days, 3 Nights All-Inclusive Resort Stay</span>
                      </div>
                      <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-[1.02] cursor-pointer group">
                        <UtensilsCrossed className="w-5 h-5 md:w-6 md:h-6 text-teal-600 flex-shrink-0 group-hover:text-teal-700 group-hover:scale-110 transition-all duration-300" />
                        <span className="text-sm md:text-base text-primary-blue-950 font-semibold group-hover:text-teal-700 transition-colors duration-300">Accommodations + Meals + Drinks</span>
                      </div>
                      <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-[1.02] cursor-pointer group">
                        <Gift className="w-5 h-5 md:w-6 md:h-6 text-teal-600 flex-shrink-0 group-hover:text-teal-700 group-hover:scale-110 transition-all duration-300" />
                        <span className="text-sm md:text-base text-primary-blue-950 font-semibold group-hover:text-teal-700 transition-colors duration-300">$50 Hotel Gift Card Upon Enrollment (Instant)</span>
                      </div>
                      <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-[1.02] cursor-pointer group">
                        <Calendar className="w-5 h-5 md:w-6 md:h-6 text-teal-600 flex-shrink-0 group-hover:text-teal-700 group-hover:scale-110 transition-all duration-300" />
                        <span className="text-sm md:text-base text-primary-blue-950 font-semibold group-hover:text-teal-700 transition-colors duration-300">Choose Your Travel Dates Within 12 Months</span>
                      </div>
                      <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-[1.02] cursor-pointer group">
                        <Star className="w-5 h-5 md:w-6 md:h-6 text-teal-600 flex-shrink-0 group-hover:text-teal-700 group-hover:scale-110 transition-all duration-300" />
                        <span className="text-sm md:text-base text-primary-blue-950 font-semibold group-hover:text-teal-700 transition-colors duration-300">Help Resorts Maintain Five-Star Standards</span>
                      </div>
                      <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-[1.02] cursor-pointer group">
                        <FileCheck className="w-5 h-5 md:w-6 md:h-6 text-teal-600 flex-shrink-0 group-hover:text-teal-700 group-hover:scale-110 transition-all duration-300" />
                        <span className="text-sm md:text-base text-primary-blue-950 font-semibold group-hover:text-teal-700 transition-colors duration-300">Simple 15-Minute Feedback Survey After Your Trip</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-12 md:py-16 lg:py-20 xl:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-blue-900 to-teal-900">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover opacity-100"
          >
            <source src="/SecretShopper/media/HERO.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
              Your Secret Shopper Journey in 4 Simple Steps
            </h2>
            <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-4">
              Our Secret Shopper Program is straightforward and transparent. Luxury resorts invest in quality assurance by partnering with us to gather honest feedback from real travelers. You get a complimentary vacation, and they get the valuable insights needed to maintain five-star standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="mb-6">
                <div className="w-20 h-20 bg-teal-600 rounded-xl flex items-center justify-center mb-4">
                  <Plane className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold text-primary-blue-950 mb-3">Complete Quiz</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Answer a quick 90-second questionnaire about your travel preferences and availability to get matched with your perfect resort.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="mb-6">
                <div className="w-20 h-20 bg-teal-600 rounded-xl flex items-center justify-center mb-4">
                  <KeyRound className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold text-primary-blue-950 mb-3">Get Matched</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We'll pair you with a 4-5 star all-inclusive resort that fits your style and schedule. A representative will contact you within 1-2 days.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="mb-6">
                <div className="w-20 h-20 bg-teal-600 rounded-xl flex items-center justify-center mb-4">
                  <Hotel className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold text-primary-blue-950 mb-3">Experience Luxury</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Enjoy 4 days and 3 nights at your matched resort with meals, drinks, and often amenities included. Travel as a normal guest.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="mb-6">
                <div className="w-20 h-20 bg-teal-600 rounded-xl flex items-center justify-center mb-4">
                  <FileCheck className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold text-primary-blue-950 mb-3">Share Feedback</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Complete a simple 15-minute survey about your experience. Your insights help maintain five-star standards. Get your $50 gift card.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={scrollToQuiz}
              className="bg-[#E9C52D] text-black font-bold py-4 px-10 rounded-lg text-lg hover:bg-[#1E3A5F] hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg"
            >
              START YOUR JOURNEY NOW →
            </button>
            <p className="text-white/60 text-sm mt-4">Join 12,847 travelers enjoying complimentary luxury vacations</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-tan-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">

            {/* Tile 1: Main Headline & Intro - Large Horizontal Block */}
            <div className="md:col-span-2 lg:col-span-2 rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src="/SecretShopper/images/images/resort.jpg"
                  alt="Resort"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                  Secret Shopper Assignments at World-Class Properties
                </h2>
                <p className="text-white text-base md:text-lg leading-relaxed drop-shadow-md">
                  Our Secret Shopper Program partners with recognized 4 and 5-star all-inclusive resorts throughout
                  Mexico and the Caribbean. Every property has been carefully vetted for quality and guest satisfaction.
                </p>
              </div>
            </div>

            {/* Tile 2: Trust Statement - Small Square Block */}
            <div className="bg-primary-blue-900 rounded-2xl p-6 md:p-8 shadow-lg flex flex-col justify-center items-center text-center">
              <CheckCircle className="w-16 h-16 text-teal-400 mb-4" />
              <div className="flex items-center justify-center gap-2 mb-3">
                <Shield className="w-6 h-6 text-teal-400" />
                <h3 className="text-xl font-bold text-tan-50">Verified Partners</h3>
              </div>
              <p className="text-tan-50 text-base italic leading-relaxed">
                "Every Secret Shopper Partner Resort has been personally evaluated and approved by our team."
              </p>
            </div>

            {/* Tile 3: Partner Logos - Large Vertical Block */}
            <div className="md:col-span-1 lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-primary-blue-950">Featured Partner Resorts</h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-teal-600 transition-colors">
                  <img src="/SecretShopper/images/ResortsLogo/Sandles.png" alt="Sandals Resorts" loading="lazy" decoding="async" className="h-12 w-32 object-contain mb-3" />
                  <p className="text-sm text-gray-600 text-center mt-1">Caribbean Luxury</p>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-teal-600 transition-colors">
                  <img src="/SecretShopper/images/ResortsLogo/Dreams.png" alt="Dreams Resorts" loading="lazy" decoding="async" className="h-12 w-32 object-contain mb-3" />
                  <p className="text-sm text-gray-600 text-center mt-1">Mexico & Caribbean</p>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-teal-600 transition-colors">
                  <img src="/SecretShopper/images/ResortsLogo/Atlantis.png" alt="Atlantis Paradise" loading="lazy" decoding="async" className="h-12 w-32 object-contain mb-3" />
                  <p className="text-sm text-gray-600 text-center mt-1">Bahamas</p>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-teal-600 transition-colors">
                  <img src="/SecretShopper/images/ResortsLogo/The Fives.png" alt="The Fives Hotels" loading="lazy" decoding="async" className="h-12 w-32 object-contain mb-3" />
                  <p className="text-sm text-gray-600 text-center mt-1">Riviera Maya</p>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-teal-600 transition-colors">
                  <img src="/SecretShopper/images/ResortsLogo/Lifestyle.png" alt="Lifestyle Resorts" loading="lazy" decoding="async" className="h-12 w-32 object-contain mb-3" />
                  <p className="text-sm text-gray-600 text-center mt-1">Caribbean Excellence</p>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-teal-600 transition-colors">
                  <img src="/SecretShopper/images/ResortsLogo/Serets.png" alt="Secrets Resorts" loading="lazy" decoding="async" className="h-12 w-32 object-contain mb-3" />
                  <p className="text-sm text-gray-600 text-center mt-1">Premium All-Inclusive</p>
                </div>
              </div>
            </div>

            {/* Tile 4: Final CTA - Action Block */}
            <div className="rounded-2xl p-8 shadow-lg flex flex-col justify-center items-center text-center cursor-pointer relative overflow-hidden" onClick={scrollToQuiz}>
              <div className="absolute inset-0">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  <source src="/SecretShopper/media/couple.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-blue-900/80 to-primary-blue-600/80"></div>
              </div>
              <div className="relative z-10">
                <Sparkles className="w-12 h-12 text-tan-50 mb-4" />
                <h3 className="text-2xl font-bold text-tan-50 mb-4">Ready to Start?</h3>
                <p className="text-tan-100 text-base mb-6">Join thousands of travelers experiencing luxury resorts</p>
                <button
                  onClick={scrollToQuiz}
                  className="bg-[#E9C52D] text-black font-bold py-4 px-8 rounded-lg text-lg hover:bg-[#1E3A5F] hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg w-full"
                >
                  BECOME A SECRET SHOPPER - START QUIZ →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Caribbean Resorts Carousel Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-2">50+ RESORT PROPERTIES</h2>
          <p className="text-center text-gray-600 text-xs sm:text-sm tracking-widest mb-6 md:mb-8">ACROSS 8 PARTNER BRANDS · ON THE BEST BEACHES</p>

          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            {Object.entries(groupedResorts).map(([destination, destinationResorts]) => {
              const hasMultiple = destinationResorts.length > 1;
              const isAnyActive = destinationResorts.some(r => r.index === currentResort);

              return (
                <div key={destination} className="relative">
                  {hasMultiple ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(destination)}
                        className={`font-bold text-sm transition-colors flex items-center gap-1 ${
                          isAnyActive
                            ? 'text-cyan-500'
                            : 'text-gray-700 hover:text-cyan-500'
                        }`}
                      >
                        {destination}
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      {openDropdowns[destination] && (
                        <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md border border-gray-200 py-2 z-10 min-w-[200px]">
                          {destinationResorts.map((resort) => (
                            <button
                              key={resort.index}
                              onClick={() => {
                                goToResort(resort.index);
                                toggleDropdown(destination);
                              }}
                              className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                                currentResort === resort.index
                                  ? 'text-cyan-500 bg-cyan-50'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-cyan-500'
                              }`}
                            >
                              {resort.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => goToResort(destinationResorts[0].index)}
                      className={`font-bold text-sm transition-colors ${
                        currentResort === destinationResorts[0].index
                          ? 'text-cyan-500'
                          : 'text-gray-700 hover:text-cyan-500'
                      }`}
                    >
                      {destination}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="relative h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out h-full"
              style={{ transform: `translateX(-${currentResort * 100}%)` }}
            >
              {resorts.map((resort, index) => (
                <div key={resort.name} className="min-w-full h-full relative">
                  <img
                    src={resort.image}
                    alt={`${resort.name} Resort`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                    <img
                      src={resort.logo}
                      alt={`${resort.name} Logo`}
                      loading="lazy"
                      decoding="async"
                      className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain mb-3 sm:mb-4 md:mb-6 brightness-0 invert"
                    />
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">{resort.name}</h3>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide">{resort.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevResort}
            className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 sm:p-3 md:p-4 shadow-lg transition-all z-10"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextResort}
            className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 sm:p-3 md:p-4 shadow-lg transition-all z-10"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Who Can Become a Secret Shopper?
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              We're looking for mature, professional travelers who can provide balanced, thoughtful feedback.
              Here are the key requirements:
            </p>
          </div>

          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group">
                <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 to-blue-600 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                    <img src="/SecretShopper/images/images/resort.jpg" alt="" loading="lazy" decoding="async" aria-hidden="true" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-white text-2xl mb-3 drop-shadow-lg">Must Travel as a Couple</h3>
                    <p className="text-white leading-relaxed drop-shadow-md">Couples are required for comprehensive resort evaluations. Both partners provide feedback on all aspects of the experience.</p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="relative overflow-hidden bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-teal-400 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                    <img src="/SecretShopper/images/images/Atlantis.png" alt="" loading="lazy" decoding="async" aria-hidden="true" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-20">
                    <div className="w-16 h-16 bg-teal-100 group-hover:bg-white/20 rounded-xl flex items-center justify-center mb-6 transition-colors">
                      <Calendar className="w-8 h-8 text-teal-700 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-white text-2xl mb-3 transition-colors">Available to Travel</h3>
                    <p className="text-gray-600 group-hover:text-white leading-relaxed transition-colors">Can commit to a 4-day, 3-night resort stay within the next 12 months.</p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="relative overflow-hidden bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-teal-400 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                    <img src="/SecretShopper/images/images/Secrets.png" alt="" loading="lazy" decoding="async" aria-hidden="true" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-20">
                    <div className="w-16 h-16 bg-teal-100 group-hover:bg-white/20 rounded-xl flex items-center justify-center mb-6 transition-colors">
                      <Star className="w-8 h-8 text-teal-700 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-white text-2xl mb-3 transition-colors">Appreciate Luxury</h3>
                    <p className="text-gray-600 group-hover:text-white leading-relaxed transition-colors">Enjoy and understand five-star resort experiences and amenities.</p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="relative overflow-hidden bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-teal-400 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                    <img src="/SecretShopper/images/images/DREAMS.png" alt="" loading="lazy" decoding="async" aria-hidden="true" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-20">
                    <div className="w-16 h-16 bg-teal-100 group-hover:bg-white/20 rounded-xl flex items-center justify-center mb-6 transition-colors">
                      <MessageSquare className="w-8 h-8 text-teal-700 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-white text-2xl mb-3 transition-colors">Constructive Feedback</h3>
                    <p className="text-gray-600 group-hover:text-white leading-relaxed transition-colors">Provide balanced observations highlighting both strengths and areas for improvement.</p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="relative overflow-hidden bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-teal-400 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                    <img src="/SecretShopper/images/images/xcaret-mexico.png" alt="" loading="lazy" decoding="async" aria-hidden="true" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-20">
                    <div className="w-16 h-16 bg-teal-100 group-hover:bg-white/20 rounded-xl flex items-center justify-center mb-6 transition-colors">
                      <Search className="w-8 h-8 text-teal-700 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-white text-2xl mb-3 transition-colors">Detail-Oriented</h3>
                    <p className="text-gray-600 group-hover:text-white leading-relaxed transition-colors">Notice and appreciate the finer details that make luxury experiences exceptional.</p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="relative overflow-hidden bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-teal-400 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                    <img src="/SecretShopper/images/images/VIDANTA.png" alt="" loading="lazy" decoding="async" aria-hidden="true" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-20">
                    <div className="w-16 h-16 bg-teal-100 group-hover:bg-white/20 rounded-xl flex items-center justify-center mb-6 transition-colors">
                      <Award className="w-8 h-8 text-teal-700 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-white text-2xl mb-3 transition-colors">Quality Focused</h3>
                    <p className="text-gray-600 group-hover:text-white leading-relaxed transition-colors">Dedicated to helping elevate standards in luxury travel and hospitality.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/SecretShopper/images/images/Sandles.png"
            alt="Sandals Resort Background"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/85"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
              What Our Secret Shoppers Are Saying
            </h2>
            <p className="text-cyan-200 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-4">
              Over 1,000 secret shoppers have experienced luxury all-inclusive resorts through our program.
              Here's what they have to say about their assignments:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-8 md:mb-12">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-white text-lg mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="border-t border-white/20 pt-4">
                  <p className="font-bold text-cyan-300 text-lg">{testimonial.name}</p>
                  <p className="text-sm text-cyan-200/80">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={scrollToQuiz}
              className="bg-[#E9C52D] text-black font-bold py-5 px-10 rounded-lg text-lg hover:bg-[#1E3A5F] hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg"
            >
              BECOME A SECRET SHOPPER - START QUIZ →
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary-blue-800 text-center mb-8 md:mb-12 px-4">
            Secret Shopper Program: Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-sm md:text-base text-primary-blue-950 text-left flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary-blue-600 flex-shrink-0" />
                    {faq.question}
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-6 h-6 text-primary-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-primary-blue-600 flex-shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-t-2 border-gray-200">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-5 h-5 text-primary-blue-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-700 text-sm md:text-base">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={scrollToQuiz}
              className="bg-[#E9C52D] text-black font-bold py-4 px-8 rounded-lg text-lg hover:bg-[#1E3A5F] hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg"
            >
              BECOME A SECRET SHOPPER - START QUIZ →
            </button>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-blue-900 to-teal-900">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover opacity-100"
          >
            <source src="/SecretShopper/media/FinalCTA.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 py-12 md:py-16 lg:py-20">
          <div className="bg-white/95 p-4 sm:p-6 md:p-10 lg:p-12 rounded-xl md:rounded-2xl shadow-2xl max-w-4xl mx-auto">
            <div className="mb-4 md:mb-6 flex justify-center">
              <img
                src="/chatti-icon.png"
                alt="Secret Shopper Program"
                loading="lazy"
                decoding="async"
                className="h-20 sm:h-24 md:h-28 w-auto object-contain"
              />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4 lg:mb-6 px-2">Ready to Become a Resort Secret Shopper?</h2>
            <p className="text-sm sm:text-base md:text-lg mb-6 md:mb-8 lg:mb-12 text-gray-800 leading-relaxed px-2">
              We're enrolling qualified travelers for upcoming resort opportunities. Limited spots available as we
              carefully match secret shoppers with resort capacity and evaluation needs.
            </p>

            <button
              onClick={scrollToQuiz}
              className="bg-[#E9C52D] text-black font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg text-base md:text-lg hover:bg-[#1E3A5F] hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg w-full sm:w-auto"
            >
              BECOME A SECRET SHOPPER - START QUIZ →
            </button>
          </div>
        </div>

        <div className="w-full relative -mb-1 z-10">
          <img
            src="/SecretShopper/images/Misc-graphics/Vector-Object.png"
            alt=""
            loading="lazy"
            decoding="async"
            aria-hidden="true"
            className="w-full h-auto block"
          />
        </div>
      </section>

      </>
      )}

      <footer className="bg-primary-blue-950 text-white pt-8 md:pt-10 lg:pt-12 pb-36 sm:pb-32 md:pb-32 lg:pb-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <img
              src="/chatti-icon.png"
              alt="Secret Shopper Resort Program"
              loading="lazy"
              decoding="async"
              className="h-20 md:h-24 w-auto object-contain mb-6"
            />
          <div className="text-center">
            <p className="mb-4 text-sm text-gray-300">
              © 2025 The Fulfillment Center. This offer is managed by Review That Resort under partnership
              authorization from The Fulfillment Center. All rights reserved.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <a
                href="/privacy"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/privacy');
                }}
                className="hover:text-teal-400 transition-colors"
              >
                Privacy Policy
              </a>
              <span>|</span>
              <a
                href="/terms"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/terms');
                }}
                className="hover:text-teal-400 transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
          </div>
        </div>
      </footer>

      {!submitted && (
        <div className="fixed bottom-0 left-0 right-0 bg-primary-blue-950 text-tan-50 py-2.5 sm:py-3 md:py-4 shadow-2xl z-50 border-t-4 border-teal-700">
          <div className="container mx-auto px-3 md:px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 md:gap-4 lg:gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 md:gap-3 text-center sm:text-left w-full sm:w-auto">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Gift className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-teal-700 flex-shrink-0" />
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-tight">
                    GET YOUR $50 INSTANT BONUS!
                  </span>
                </div>
                <span className="hidden sm:inline text-tan-50">|</span>
                <span className="text-xs sm:text-sm md:text-base lg:text-lg leading-tight">
                  Receive a <span className="text-teal-700 font-bold text-sm sm:text-base md:text-lg lg:text-xl">$50 Hotel Gift Card</span> just for enrolling today.
                </span>
              </div>
              <button
                onClick={scrollToQuiz}
                className="bg-[#E9C52D] text-black font-bold py-2 sm:py-2.5 md:py-3 px-4 sm:px-5 md:px-6 rounded-lg text-xs sm:text-sm md:text-base lg:text-lg hover:bg-[#1E3A5F] hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg whitespace-nowrap w-full sm:w-auto"
              >
                START QUIZ NOW →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
