import { Check, MessageCircle, PartyPopper } from 'lucide-react';

const PERKS = [
  '4 Days, 3 Nights all-inclusive resort stay — accommodations, meals & drinks',
  'Cocktails and full resort access',
  '$50 Hotel Gift Card upon enrollment (instant)',
  'Choose your travel dates within 12 months',
  'A simple 15-minute feedback survey after your trip',
];

const NEXT_STEPS = [
  {
    num: 1,
    title: 'Get Matched',
    body: "We'll pair you with a 4–5 star all-inclusive resort that fits your style and schedule.",
  },
  {
    num: 2,
    title: 'Experience Luxury',
    body: 'Enjoy 4 days and 3 nights with meals, drinks, and often amenities included. Travel as a normal guest.',
  },
  {
    num: 3,
    title: 'Share Feedback',
    body: 'Complete a simple 15-minute survey about your experience and receive your $50 gift card.',
  },
];

export default function ThankYouPage() {
  return (
    <main className="container mx-auto px-4 py-10 md:py-14 lg:py-16 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center mb-6 md:mb-8">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-12 h-12 text-green-600" strokeWidth={3} />
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <PartyPopper className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
          <h1 className="text-3xl md:text-5xl font-bold text-primary-blue-950">Thank You!</h1>
        </div>
        <h2 className="text-lg md:text-2xl font-semibold text-gray-800 mb-5">
          Submission Complete — You're All Set!
        </h2>
        <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          A representative will call or text you within 1–2 business days to finalize your
          Secret Shopper consultation and discuss your resort match. Look out for our call!
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-6 md:mb-8">
        <h3 className="text-xl md:text-3xl font-bold text-primary-blue-950 mb-5 md:mb-6 text-center">
          As a Secret Shopper, You Receive:
        </h3>
        <ul className="space-y-3 max-w-2xl mx-auto">
          {PERKS.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
              <span className="text-gray-700 text-sm md:text-base lg:text-lg">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-6 md:mb-8">
        <h3 className="text-xl md:text-3xl font-bold text-primary-blue-950 mb-6 md:mb-8 text-center">
          What Happens Next
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {NEXT_STEPS.map((step) => (
            <div key={step.num} className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 text-white font-bold text-2xl md:text-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                {step.num}
              </div>
              <h4 className="font-bold text-lg md:text-xl text-primary-blue-950 mb-2">{step.title}</h4>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <MessageCircle className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl md:text-2xl font-bold text-primary-blue-950">
            Have a question while you wait?
          </h3>
        </div>
        <p className="text-gray-700 mb-6">Chat with us below.</p>
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl px-6 py-12 text-gray-500 text-sm">
          [ Chat Widget Embed Area ]
        </div>
      </div>
    </main>
  );
}
