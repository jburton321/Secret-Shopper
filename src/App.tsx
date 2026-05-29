import { useState } from 'react';
import { Phone, Check, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Star, Clock, Ship, Search, MessageSquare, Gift, Award, Shield, TrendingUp, Hotel, Users, Calendar, Palmtree, Sparkles, DollarSign, MapPin, HelpCircle, Lightbulb, CheckCircle, Building2, Plane, KeyRound, FileCheck, PartyPopper, UtensilsCrossed } from 'lucide-react';
import QuizForm from './components/QuizForm';
import TeamCollaborationSection from './components/TeamCollaborationSection';

function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [currentResort, setCurrentResort] = useState(1);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);

  const resorts = [
    {
      name: 'ATLANTIS PARADISE ISLAND',
      location: 'PARADISE ISLAND - BAHAMAS',
      image: 'https://jonburtondesign.com/SecretShopper/images/images/Atlantis.png',
      logo: 'https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Atlantis.png'
    },
    {
      name: 'SANDALS RESORTS',
      location: 'MONTEGO BAY - JAMAICA',
      image: 'https://jonburtondesign.com/SecretShopper/images/images/Sandles.png',
      logo: 'https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Sandles.png'
    },
    {
      name: 'SECRETS RESORTS & SPAS',
      location: 'RIVIERA MAYA - MEXICO',
      image: 'https://jonburtondesign.com/SecretShopper/images/images/Secrets.png',
      logo: 'https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Serets.png'
    },
    {
      name: 'HOTEL XCARET MÉXICO',
      location: 'PLAYA DEL CARMEN - MEXICO',
      image: 'https://jonburtondesign.com/SecretShopper/images/images/xcaret-mexico.png',
      logo: 'https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Mexico.png'
    },
    {
      name: 'VIDANTA RESORTS',
      location: 'RIVIERA MAYA - MEXICO',
      image: 'https://jonburtondesign.com/SecretShopper/images/images/VIDANTA.png',
      logo: 'https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Vidanta.png'
    },
    {
      name: 'THE FIVES HOTELS',
      location: 'PLAYA DEL CARMEN - MEXICO',
      image: 'https://jonburtondesign.com/SecretShopper/images/images/FIVES.png',
      logo: 'https://jonburtondesign.com/SecretShopper/images/ResortsLogo/The Fives.png'
    },
    {
      name: 'DREAMS RESORTS & SPAS',
      location: 'CANCÚN - MEXICO',
      image: 'https://jonburtondesign.com/SecretShopper/images/images/DREAMS.png',
      logo: 'https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Dreams.png'
    },
    {
      name: 'LIFESTYLE HOLIDAYS',
      location: 'PUERTO PLATA - DOMINICAN REPUBLIC',
      image: 'https://jonburtondesign.com/SecretShopper/images/images/LIFESTYLE.png',
      logo: 'https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Lifestyle.png'
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
      answer: 'You simply experience the resort as a normal guest would—check in, enjoy the amenities, dine at restaurants, use the pools and beach. After your stay, you\'ll complete an online evaluation form (15-20 minutes) covering areas like check-in & staff service, room quality & cleanliness, dining & beverage quality, amenities & activities, and overall satisfaction. That\'s the full extent of your "work" as a secret shopper.',
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

  return (
    <div className="min-h-screen bg-tan-50">
      <header className="bg-primary-blue-950 text-tan-50 py-3 md:py-4 sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://jonburtondesign.com/SecretShopper/images/logo/Logo-Main-Light.png"
              alt="Secret Shopper Resort Program"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </div>
          <a href="tel:7027032479" className="flex items-center gap-1 md:gap-2 text-white font-bold hover:text-yellow-200 transition-colors text-sm md:text-base">
            <Phone className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
            <span className="hidden sm:inline">CALL: (702) 703-2479</span>
          </a>
        </div>
      </header>

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
            <source src="https://jonburtondesign.com/SecretShopper/media/HERO.mp4" type="video/mp4" />
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
              <QuizForm />
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
          <h2 className="text-2xl md:text-3xl font-bold text-center text-primary-blue-950 mb-6 md:mb-8">
            Featured Resort Partners
          </h2>
          <div className="relative">
            <div className="flex gap-12 animate-scroll items-center">
              <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Atlantis.png" alt="Atlantis" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Dreams.png" alt="Dreams" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Lifestyle.png" alt="Lifestyle" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Mexico.png" alt="Mexico" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Sandles.png" alt="Sandals" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Serets.png" alt="Secrets" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/The Fives.png" alt="The Fives" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Vidanta.png" alt="Vidanta" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Atlantis.png" alt="Atlantis" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Dreams.png" alt="Dreams" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Lifestyle.png" alt="Lifestyle" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Mexico.png" alt="Mexico" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Sandles.png" alt="Sandals" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Serets.png" alt="Secrets" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/The Fives.png" alt="The Fives" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Vidanta.png" alt="Vidanta" className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
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
                        <span className="text-sm md:text-base text-primary-blue-950 font-semibold group-hover:text-teal-700 transition-colors duration-300">Accommodations + All Meals + Drinks</span>
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
            preload="auto"
            className="w-full h-full object-cover opacity-100"
          >
            <source src="https://jonburtondesign.com/SecretShopper/media/HERO.mp4" type="video/mp4" />
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
                Enjoy 4 days and 3 nights at your matched resort with all meals, drinks, and amenities included. Travel as a normal guest.
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
                  src="https://jonburtondesign.com/SecretShopper/images/images/resort.jpg"
                  alt="Resort"
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
                  <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Sandles.png" alt="Sandals Resorts" className="h-12 w-32 object-contain mb-3" />
                  <p className="text-sm text-gray-600 text-center mt-1">Caribbean Luxury</p>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-teal-600 transition-colors">
                  <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Dreams.png" alt="Dreams Resorts" className="h-12 w-32 object-contain mb-3" />
                  <p className="text-sm text-gray-600 text-center mt-1">Mexico & Caribbean</p>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-teal-600 transition-colors">
                  <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Atlantis.png" alt="Atlantis Paradise" className="h-12 w-32 object-contain mb-3" />
                  <p className="text-sm text-gray-600 text-center mt-1">Bahamas</p>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-teal-600 transition-colors">
                  <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/The Fives.png" alt="The Fives Hotels" className="h-12 w-32 object-contain mb-3" />
                  <p className="text-sm text-gray-600 text-center mt-1">Riviera Maya</p>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-teal-600 transition-colors">
                  <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Lifestyle.png" alt="Lifestyle Resorts" className="h-12 w-32 object-contain mb-3" />
                  <p className="text-sm text-gray-600 text-center mt-1">Caribbean Excellence</p>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-teal-600 transition-colors">
                  <img src="https://jonburtondesign.com/SecretShopper/images/ResortsLogo/Serets.png" alt="Secrets Resorts" className="h-12 w-32 object-contain mb-3" />
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
                  preload="auto"
                  className="w-full h-full object-cover"
                >
                  <source src="https://jonburtondesign.com/SecretShopper/media/couple.mp4" type="video/mp4" />
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-2">8 PARTNER RESORTS</h2>
          <p className="text-center text-gray-600 text-xs sm:text-sm tracking-widest mb-6 md:mb-8">ON THE BEST BEACHES</p>

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
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                    <img
                      src={resort.logo}
                      alt={`${resort.name} Logo`}
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
                    <img src="https://jonburtondesign.com/SecretShopper/images/images/resort.jpg" alt="" className="w-full h-full object-cover" />
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
                    <img src="https://jonburtondesign.com/SecretShopper/images/images/Atlantis.png" alt="" className="w-full h-full object-cover" />
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
                    <img src="https://jonburtondesign.com/SecretShopper/images/images/Secrets.png" alt="" className="w-full h-full object-cover" />
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
                    <img src="https://jonburtondesign.com/SecretShopper/images/images/DREAMS.png" alt="" className="w-full h-full object-cover" />
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
                    <img src="https://jonburtondesign.com/SecretShopper/images/images/xcaret-mexico.png" alt="" className="w-full h-full object-cover" />
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
                    <img src="https://jonburtondesign.com/SecretShopper/images/images/VIDANTA.png" alt="" className="w-full h-full object-cover" />
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
            src="https://jonburtondesign.com/SecretShopper/images/images/Sandles.png"
            alt="Sandals Resort Background"
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
            preload="auto"
            className="w-full h-full object-cover opacity-100"
          >
            <source src="https://jonburtondesign.com/SecretShopper/media/FinalCTA.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 py-12 md:py-16 lg:py-20">
          <div className="bg-white/95 p-4 sm:p-6 md:p-10 lg:p-12 rounded-xl md:rounded-2xl shadow-2xl max-w-4xl mx-auto">
            <div className="mb-4 md:mb-6 flex justify-center">
              <img
                src="https://jonburtondesign.com/SecretShopper/images/logo/Logo-Main-Dark.png"
                alt="Secret Shopper Program"
                className="h-14 sm:h-16 md:h-20 w-auto object-contain"
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
            src="https://jonburtondesign.com/SecretShopper/images/Misc-graphics/Vector-Object.png"
            alt=""
            className="w-full h-auto block"
          />
        </div>
      </section>

      <footer className="bg-primary-blue-950 text-white pt-8 md:pt-10 lg:pt-12 pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <img
              src="https://jonburtondesign.com/SecretShopper/images/logo/Logo-Main-Light.png"
              alt="Secret Shopper Resort Program"
              className="h-16 w-auto object-contain mb-6"
            />
          <div className="text-center">
            <p className="mb-4 text-sm text-gray-300">
              © 2025 The Fulfillment Center. This offer is managed by Review That Resort under partnership
              authorization from The Fulfillment Center. All rights reserved.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <button onClick={() => setShowPrivacyModal(true)} className="hover:text-teal-400 transition-colors">Privacy Policy</button>
              <span>|</span>
              <button onClick={() => setShowTermsModal(true)} className="hover:text-teal-400 transition-colors">Terms</button>
            </div>
          </div>
          </div>
        </div>
      </footer>

      {showTermsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4" onClick={() => setShowTermsModal(false)}>
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-primary-blue-950 text-white px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Terms & Conditions</h2>
              <button onClick={() => setShowTermsModal(false)} className="text-white hover:text-teal-400 transition-colors ml-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(95vh-80px)] sm:max-h-[calc(90vh-100px)] px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
              <div className="space-y-6 text-gray-700">
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Effective Date:</strong> August 29, 2025
                  </p>
                  <p className="mb-4">
                    Welcome to the ReviewThatResort.com and ShareLife Vacations Secret Shopper Program (the "Program"). By applying for, participating in, or using any part of the Program, you ("Participant," "you") agree to be bound by these Terms & Conditions. If you do not agree, you may not participate.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">1. Eligibility</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Participants must be at least 21 years old.</li>
                    <li>In some cases, Participants must apply as a couple between the ages of 35 and 70. Both individuals must meet Program and resort requirements.</li>
                    <li>Participants must provide accurate and complete information during application and throughout the Program.</li>
                    <li>Participants must possess valid travel documents when required, such as a government issued ID and passports for international travel.</li>
                    <li>ReviewThatResort.com and ShareLife Vacations may deny, pause, or revoke participation for failure to meet eligibility requirements, misuse of the Program, or providing false information.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">2. Program Participation</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Assignments may include visiting designated resorts, evaluating services, completing surveys, or submitting receipts and proof of visit.</li>
                    <li>Participants agree to provide honest, unbiased, and accurate feedback and to follow resort rules, local laws, and Program guidelines.</li>
                    <li>Failure to complete an assignment as directed may result in forfeiture of compensation or incentives and removal from the Program.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">3. Compensation & Incentives</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Participants may receive free or discounted accommodations, reimbursements, savings certificates, or other incentives as specified for each assignment.</li>
                    <li>All compensation terms will be provided in writing before an assignment is accepted.</li>
                    <li>Participants are responsible for their own transportation to and from the destination, including airfare and ground transfers, unless expressly stated otherwise.</li>
                    <li>Participants are responsible for required travel documents and for incidental charges such as resort fees, deposits, gratuities, parking, upgrades, internet, and room service unless expressly stated otherwise.</li>
                    <li>Participants are solely responsible for reporting and paying any taxes on compensation or incentives received.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">4. Confidentiality</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Participants may not disclose Program operations, internal scoring methods, or non public resort information.</li>
                    <li>Information marked confidential must not be shared outside the Program.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">5. Use of Participant Content</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>By submitting feedback, reviews, images, or other materials ("Content"), you grant ReviewThatResort.com and ShareLife Vacations a non exclusive, royalty free, worldwide license to use, reproduce, distribute, adapt, and display the Content for Program operations, marketing, and reporting.</li>
                    <li>Content may be anonymized when shared with third parties unless you give explicit permission to attribute it.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">6. Code of Conduct</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Do not provide fraudulent, misleading, or incomplete feedback.</li>
                    <li>Do not harass or disrupt resort staff, other guests, or Program representatives.</li>
                    <li>Do not use the Program for unlawful purposes.</li>
                    <li>Violations may result in termination from the Program.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">7. Disclaimer of Liability</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>ReviewThatResort.com, ShareLife Vacations, and their affiliates are not responsible for travel delays, cancellations, accidents, personal injury, loss, theft, or damages incurred during participation.</li>
                    <li>Resorts are independently owned and operated and are solely responsible for their facilities and services.</li>
                    <li>Participation is voluntary and at your own risk.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">8. Program Modifications</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>ReviewThatResort.com and ShareLife Vacations may modify, suspend, or terminate the Program at any time without prior notice.</li>
                    <li>Terms may be updated from time to time. Continued participation means you accept the revised Terms.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">9. Governing Law</h3>
                  <p>
                    These Terms are governed by the laws of the State of Nevada, without regard to conflict of law principles.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">10. Contact Information</h3>
                  <p className="mb-2"><strong>ReviewThatResort.com and ShareLife Vacations Secret Shopper Program</strong></p>
                  <p className="mb-1">Email: customercare@sharelife.vacations</p>
                  <p className="mb-1">Phone: (702) 703-2479</p>
                  <p>Mailing Address: ShareLife Vacations, LLC, 101 Convention Center Drive Ste 100, Las Vegas, NV 89109, USA</p>
                </div>

                <div className="text-center pt-4">
                  <p className="italic text-gray-600">
                    If any part of these Terms is held invalid, the remaining provisions remain in full force. Headings are for convenience only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4" onClick={() => setShowPrivacyModal(false)}>
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-primary-blue-950 text-white px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Privacy Policy</h2>
              <button onClick={() => setShowPrivacyModal(false)} className="text-white hover:text-teal-400 transition-colors ml-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(95vh-80px)] sm:max-h-[calc(90vh-100px)] px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
              <div className="space-y-6 text-gray-700">
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Effective Date:</strong> August 29, 2025 • <strong>Last Updated:</strong> August 29, 2025
                  </p>
                  <p className="mb-4">
                    ShareLife Vacations and ReviewThatResort.com ("we," "our," "us") operate the ShareLife Vacations and ReviewThatResort.com websites and the ShareLife Secret Shopper Program ("Program"). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, share, and safeguard information when you visit our websites or participate in the Program.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">Our Commitment to Privacy</h3>
                  <p>
                    This Policy reflects our commitment to combine quality products and services with integrity in our dealings with users. It is designed to help you understand how we collect, use, and protect the personal information you provide.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">The Information We Collect</h3>
                  <p className="mb-4">
                    When you visit our site ("Site") we collect two types of information: personal information you actively choose to disclose ("Active Information") and information that arises from your browsing of our Site ("Passive Information"). Passive Information is collected on an aggregate and anonymous basis.
                  </p>

                  <h4 className="text-lg font-bold text-primary-blue-900 mb-2">Personally Identifiable Information</h4>
                  <p className="mb-3">
                    Personally Identifiable Information ("PII") is information that identifies and is reasonably linked to you.
                  </p>

                  <h5 className="font-bold text-primary-blue-900 mb-2">Registration</h5>
                  <p className="mb-3">
                    When you create an account, register for the Program, or request to become an authorized reseller or partner, we collect PII such as name, address, email address, and telephone number. This PII is stored securely and may be accessed in your account. You are assigned a user ID and select your own password. Please safeguard your password. We are not responsible for access to your account when you share your credentials.
                  </p>

                  <h5 className="font-bold text-primary-blue-900 mb-2">Ordering</h5>
                  <p className="mb-3">
                    When you place an order or accept incentives or reimbursements, we collect PII such as contact and billing details, credit card information, and other transactional information. We use this information to deliver orders, process payment, and communicate status.
                  </p>

                  <h5 className="font-bold text-primary-blue-900 mb-2">Credit and Debit Card Storage</h5>
                  <p className="mb-3">
                    Card data collected for transactions is used only to process payment and is not retained on our Site unless you voluntarily elect to store one or more cards for future use. Stored cards are kept in a secure, tokenized system.
                  </p>

                  <h5 className="font-bold text-primary-blue-900 mb-2">Surveys and Promotions</h5>
                  <p className="mb-3">
                    You may voluntarily provide PII to complete surveys, polls, or promotions. We use this information to improve our products and services and to provide newsletters or marketing that match your preferences. You can adjust subscriptions and email options in your account or by using unsubscribe links.
                  </p>

                  <h5 className="font-bold text-primary-blue-900 mb-2">Active Information You Choose to Provide</h5>
                  <p className="mb-3">
                    To gain use of the Site and Program, we may require your name, address, phone number, and other details needed for eligibility and compliance. We use secure socket layer (SSL) encryption to protect data you submit through secure forms.
                  </p>

                  <h5 className="font-bold text-primary-blue-900 mb-2">Passive Information</h5>
                  <p className="mb-3">
                    We collect Passive Information on an aggregate and anonymous basis, including your Internet Protocol address, device operating system and browser type, cookies, and the address of a referring website.
                  </p>

                  <h5 className="font-bold text-primary-blue-900 mb-2">Aggregate Information</h5>
                  <p className="mb-3">
                    Aggregate Information does not by itself identify you. Examples include the URL that referred you to our Site, your IP address, browser type, and search terms used on our Site. We use this information to monitor Site activity, evaluate effectiveness, and improve content and services. If Aggregate Information is ever correlated to you, we protect it as PII.
                  </p>

                  <h5 className="font-bold text-primary-blue-900 mb-2">Cookies</h5>
                  <p>
                    Cookies are small data files stored by your browser that help our servers recognize your device. We use cookies to improve Site functionality, analyze usage, and personalize content. You may disable cookies in your browser, but some features may not work properly.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">How We Use the Information Collected</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Administer core business functions such as order fulfillment, customer care, and Program management.</li>
                    <li>Verify eligibility and compliance and process incentive payments, reimbursements, or rewards.</li>
                    <li>Improve the Site, Program, and resort partner experience through analytics and feedback.</li>
                    <li>Contact you about changes to the Site, new features or products, and Program updates. You can opt out of non essential marketing messages at any time.</li>
                    <li>Prevent, detect, and investigate fraud, security breaches, and other prohibited or illegal activity.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">Receiving and Sharing Information with Third Parties</h3>

                  <h5 className="font-bold text-primary-blue-900 mb-2">Resorts and Partners</h5>
                  <p className="mb-3">
                    We may share limited information or anonymized feedback with resorts and partners to verify Program activity and improve service. Personal identifiers are shared only when necessary for verification or fulfillment.
                  </p>

                  <h5 className="font-bold text-primary-blue-900 mb-2">Service Providers</h5>
                  <p className="mb-3">
                    Third parties that perform services for us, such as internet service providers, payment processors, merchant banks, survey platforms, and data storage vendors, may access information as needed to do their work.
                  </p>

                  <h5 className="font-bold text-primary-blue-900 mb-2">Fraud and Legal Compliance</h5>
                  <p className="mb-3">
                    We may share information to prevent fraud and security breaches. Law enforcement and government agencies may access information when required by law, regulation, or subpoena.
                  </p>

                  <h5 className="font-bold text-primary-blue-900 mb-2">Business Transfers</h5>
                  <p className="mb-3">
                    If we buy or sell assets or engage in a merger or similar transaction, information may be reviewed or transferred as part of that process.
                  </p>

                  <h5 className="font-bold text-primary-blue-900 mb-2">Advertising and Analytics</h5>
                  <p>
                    We may disclose anonymous usage information to analytics and advertising partners. This data does not identify you personally.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">Your Information Relating to Hyperlinks</h3>
                  <p>
                    You may access other websites through hyperlinks on our Site. Those sites have their own privacy policies and data practices. Review their policies before using those sites.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">How We Secure Active and Passive Information</h3>
                  <p>
                    We use reasonable administrative, technical, and physical safeguards to protect information against unauthorized access, disclosure, or loss. Email and standard mail are not always secure. Do not send sensitive information through those channels unless we advise that security measures are in place.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">Accessing and Correcting Your Information</h3>
                  <p>
                    We take reasonable steps to keep PII accurate and current. You can review and update your information in your account or by contacting us.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">Protecting Your Information</h3>
                  <p>
                    Protect your account password and notify us if you suspect it has been compromised. Your user ID and password are specific to you. You are responsible for activity conducted with your credentials.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">Links to Other Websites</h3>
                  <p>
                    Links to third party websites are provided for your convenience. This Policy does not cover those sites and we do not control their content or privacy practices. Review the privacy policies of each site you visit.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">Children's Privacy</h3>
                  <p>
                    Our Site and Program are not intended for children under the age of 18. We do not knowingly collect PII from children. If we discover personal data from a child, we will delete it.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">Changes to This Policy</h3>
                  <p>
                    Updates to this Policy will be posted on this page with a new Last Updated date. By using the Site you accept the Policy in effect at the time of use. Your continued use after changes are posted is your agreement to the changes.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-primary-blue-950 mb-3">Contact Information</h3>
                  <p className="mb-2"><strong>ShareLife Vacations and ReviewThatResort.com</strong></p>
                  <p className="mb-1">Email: customercare@sharelife.vacations</p>
                  <p className="mb-1">Phone: (702) 703-2479</p>
                  <p>Mailing Address: ShareLife Vacations, LLC, 101 Convention Center Drive Ste 100, Las Vegas, NV 89109, USA</p>
                </div>

                <div className="text-center pt-4">
                  <p className="italic text-gray-600">
                    Your use of our Site means that you accept the practices set forth in this Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
}

export default App;
