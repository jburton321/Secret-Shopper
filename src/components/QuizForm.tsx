import { useState, useEffect } from 'react';
import { Gift, MapPin, CheckCircle } from 'lucide-react';

interface QuizFormProps {
  onSubmitted?: (lead: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => void;
}

type VacationWith = 'My spouse or partner' | 'My spouse and/or my children' | 'I vacation with my friends' | 'I travel alone';
type EmploymentStatus = 'Gainfully Employed' | 'Happily Retired' | 'Not Currently Working';
type TravelBookingMethod = 'With a major Credit Card (AmEx, Visa, MC, Discover)' | 'With cash or debit cards';
type ResortPreference = 'Adults-Only Luxury' | 'Family-Friendly All-Inclusive' | 'Adventure & Eco Resorts' | 'Mega-Resorts with Entertainment' | 'Boutique & Intimate Properties' | 'Open to any 4-5 star resort';

interface FormData {
  first_name: string;
  last_name: string;
  mobile_phone: string;
  zip_code: string;
  tcpa_consent: boolean;
  vacation_with: VacationWith | '';
  spouse_first_name: string;
  spouse_last_name: string;
  employment_status: EmploymentStatus | '';
  travel_booking_method: TravelBookingMethod | '';
  resort_preference: ResortPreference | '';
  email: string;
  consent_terms_1: boolean;
  consent_terms_2: boolean;
  consent_terms_3: boolean;
}

export default function QuizForm({ onSubmitted }: QuizFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    mobile_phone: '',
    zip_code: '',
    tcpa_consent: false,
    vacation_with: '',
    spouse_first_name: '',
    spouse_last_name: '',
    employment_status: '',
    travel_booking_method: '',
    resort_preference: '',
    email: '',
    consent_terms_1: false,
    consent_terms_2: false,
    consent_terms_3: false,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const formatPhoneNumber = (value: string) => {
    const phone = value.replace(/\D/g, '');
    if (phone.length <= 3) return phone;
    if (phone.length <= 6) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setFormData({ ...formData, mobile_phone: formatted });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const needsSpouseInfo = () => {
    return formData.vacation_with === 'My spouse or partner' ||
      formData.vacation_with === 'My spouse and/or my children';
  };

  const handleNext = () => {
    if (currentStep === 1 && !needsSpouseInfo()) {
      setCurrentStep(3);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 3 && !needsSpouseInfo()) {
      setCurrentStep(1);
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitted?.({
      firstName: formData.first_name,
      lastName: formData.last_name,
      email: formData.email,
      phone: formData.mobile_phone,
    });
  };

  if (!showForm) {
    return (
      <div className="h-full flex flex-col justify-center py-8">
        <div className="text-center space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Secret Shoppers Get</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-base text-gray-900">4 Day / 3 Night Resort Stay</div>
                    <div className="text-xs text-gray-600">Luxury resort accommodations</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gradient-to-br from-teal-50 to-white rounded-xl border border-teal-100">
                  <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-base text-gray-900">$50 Hotel Gift Card</div>
                    <div className="text-xs text-gray-600">Instant bonus for enrolling</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gradient-to-br from-teal-50 to-white rounded-xl border border-teal-100">
                  <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-base text-gray-900">All-Inclusive</div>
                    <div className="text-xs text-gray-600">Meals, drinks & amenities</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-base text-gray-900">50+ Resort Properties</div>
                    <div className="text-xs text-gray-600">Across 8 brands in Mexico & the Caribbean</div>
                  </div>
                </div>
              </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setShowForm(true)}
              className="relative group w-full bg-[#E9C52D] text-black font-bold py-5 px-8 rounded-lg text-lg hover:bg-[#1E3A5F] hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg"
            >
              <span className="flex items-center justify-center gap-2">
                CLAIM MY FREE VACATION NOW
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        {currentStep === 0 && (
          <div className="space-y-3 sm:space-y-4 flex-1 flex flex-col justify-center">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">
              Please enter your contact information.
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                required
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                placeholder="First Name *"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 bg-white rounded-lg focus:border-blue-400 focus:outline-none"
              />
              <input
                type="text"
                required
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                placeholder="Last Name *"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 bg-white rounded-lg focus:border-blue-400 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email Address *"
                className="col-span-2 sm:col-span-1 w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 bg-white rounded-lg focus:border-blue-400 focus:outline-none"
              />
              <input
                type="tel"
                required
                value={formData.mobile_phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="Mobile Phone *"
                maxLength={14}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 bg-white rounded-lg focus:border-blue-400 focus:outline-none"
              />
              <input
                type="text"
                required
                value={formData.zip_code}
                onChange={(e) => setFormData({ ...formData, zip_code: e.target.value.replace(/\D/g, '').slice(0, 5) })}
                maxLength={5}
                placeholder="Zip Code *"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 bg-white rounded-lg focus:border-blue-400 focus:outline-none"
              />
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg border-2 border-blue-400">
              <label className="flex items-start gap-2.5 sm:gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.tcpa_consent}
                  onChange={(e) => setFormData({ ...formData, tcpa_consent: e.target.checked })}
                  className="mt-0.5 sm:mt-1 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 flex-shrink-0"
                />
                <span className="text-[11px] leading-snug sm:text-xs sm:leading-normal text-gray-700">
                  By clicking here you agree to receive promotional emails, SMS texts and calls, including pre-recorded
                  messages and/or calls or texts made from an Auto-dial telephone dialing system from The Fulfillment Center,
                  and its affiliates, parents and subsidiaries (text/data and other charges may apply) at the address/numbers
                  provided regardless of that number being on any Do not Call Registry. Your consent is not a condition of any purchase. *
                </span>
              </label>
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={!formData.first_name || !formData.last_name || !formData.email || !validateEmail(formData.email) || !formData.mobile_phone || !formData.zip_code || !formData.tcpa_consent}
              className="w-full bg-[#E9C52D] text-black font-bold py-3 sm:py-4 px-8 rounded-lg hover:bg-[#1E3A5F] hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
            >
              CONTINUE →
            </button>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">Who normally vacations with you?</h3>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {(['My spouse or partner', 'My spouse and/or my children', 'I vacation with my friends', 'I travel alone'] as VacationWith[]).map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.vacation_with === option
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="vacation_with"
                    value={option}
                    checked={formData.vacation_with === option}
                    onChange={(e) => setFormData({ ...formData, vacation_with: e.target.value as VacationWith })}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0"
                  />
                  <span className="text-gray-700 font-medium text-xs leading-snug sm:text-sm md:text-base">{option}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-gray-300 text-gray-700 font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-lg hover:bg-gray-400 transition-colors duration-200"
              >
                ← BACK
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!formData.vacation_with}
                className="flex-1 bg-[#E9C52D] text-black font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-lg hover:bg-[#1E3A5F] hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
              >
                CONTINUE →
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && needsSpouseInfo() && (
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">What's your spouse's name?</h3>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                required
                value={formData.spouse_first_name}
                onChange={(e) => setFormData({ ...formData, spouse_first_name: e.target.value })}
                placeholder="Spouse First Name *"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none"
              />
              <input
                type="text"
                required
                value={formData.spouse_last_name}
                onChange={(e) => setFormData({ ...formData, spouse_last_name: e.target.value })}
                placeholder="Spouse Last Name *"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-gray-300 text-gray-700 font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-lg hover:bg-gray-400 transition-colors duration-200"
              >
                ← BACK
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!formData.spouse_first_name || !formData.spouse_last_name}
                className="flex-1 bg-[#E9C52D] text-black font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-lg hover:bg-[#1E3A5F] hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
              >
                CONTINUE →
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">Are you currently:</h3>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {(['Gainfully Employed', 'Happily Retired', 'Not Currently Working'] as EmploymentStatus[]).map((option, idx) => (
                <label
                  key={option}
                  className={`${idx === 2 ? 'col-span-2' : ''} flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.employment_status === option
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="employment_status"
                    value={option}
                    checked={formData.employment_status === option}
                    onChange={(e) => setFormData({ ...formData, employment_status: e.target.value as EmploymentStatus })}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0"
                  />
                  <span className="text-gray-700 font-medium text-xs leading-snug sm:text-sm md:text-base">{option}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-gray-300 text-gray-700 font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-lg hover:bg-gray-400 transition-colors duration-200"
              >
                ← BACK
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!formData.employment_status}
                className="flex-1 bg-[#E9C52D] text-black font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-lg hover:bg-[#1E3A5F] hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
              >
                CONTINUE →
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">How do you normally book your travel online?</h3>

            <div className="space-y-2 sm:space-y-3">
              {(['With a major Credit Card (AmEx, Visa, MC, Discover)', 'With cash or debit cards'] as TravelBookingMethod[]).map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.travel_booking_method === option
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="travel_booking_method"
                    value={option}
                    checked={formData.travel_booking_method === option}
                    onChange={(e) => setFormData({ ...formData, travel_booking_method: e.target.value as TravelBookingMethod })}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0"
                  />
                  <span className="text-gray-700 font-medium text-sm leading-snug sm:text-base">{option}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-gray-300 text-gray-700 font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-lg hover:bg-gray-400 transition-colors duration-200"
              >
                ← BACK
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!formData.travel_booking_method}
                className="flex-1 bg-[#E9C52D] text-black font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-lg hover:bg-[#1E3A5F] hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
              >
                CONTINUE →
              </button>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">What type of resort experience do you prefer?</h3>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {(['Adults-Only Luxury', 'Family-Friendly All-Inclusive', 'Adventure & Eco Resorts', 'Mega-Resorts with Entertainment', 'Boutique & Intimate Properties', 'Open to any 4-5 star resort'] as ResortPreference[]).map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.resort_preference === option
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="resort_preference"
                    value={option}
                    checked={formData.resort_preference === option}
                    onChange={(e) => setFormData({ ...formData, resort_preference: e.target.value as ResortPreference })}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0"
                  />
                  <span className="text-gray-700 font-medium text-xs leading-snug sm:text-sm md:text-base">{option}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-gray-300 text-gray-700 font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-lg hover:bg-gray-400 transition-colors duration-200"
              >
                ← BACK
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!formData.resort_preference}
                className="flex-1 bg-[#E9C52D] text-black font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-lg hover:bg-[#1E3A5F] hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
              >
                CONTINUE →
              </button>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-4">Reserve your secret shopper consultation</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4">All checkboxes are required to continue</p>

            <div className="space-y-2 sm:space-y-4">
              <label className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 border-2 border-blue-400 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent_terms_1}
                  onChange={(e) => setFormData({ ...formData, consent_terms_1: e.target.checked })}
                  className="mt-0.5 sm:mt-1 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 flex-shrink-0"
                />
                <span className="text-[11px] leading-snug sm:text-sm sm:leading-normal text-gray-700">
                  I understand I will be matched with a 4- or 5-star all-inclusive resort in Mexico or the Caribbean based on my preferences and availability.
                </span>
              </label>

              <label className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 border-2 border-blue-400 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent_terms_2}
                  onChange={(e) => setFormData({ ...formData, consent_terms_2: e.target.checked })}
                  className="mt-0.5 sm:mt-1 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 flex-shrink-0"
                />
                <span className="text-[11px] leading-snug sm:text-sm sm:leading-normal text-gray-700">
                  I understand I will provide the dates I can travel (within the next 12 months), and I will be matched with dates available at our partner resorts.
                </span>
              </label>

              <label className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 border-2 border-blue-400 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent_terms_3}
                  onChange={(e) => setFormData({ ...formData, consent_terms_3: e.target.checked })}
                  className="mt-0.5 sm:mt-1 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 flex-shrink-0"
                />
                <span className="text-[11px] leading-snug sm:text-sm sm:leading-normal text-gray-700">
                  I understand I will receive complimentary resort accommodations (4 days/3 nights), including meals, drinks, and often resort amenities. I am responsible for my airfare and transportation from the airport to the resort.
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-gray-300 text-gray-700 font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-lg hover:bg-gray-400 transition-colors duration-200"
              >
                ← BACK
              </button>
              <button
                type="submit"
                disabled={!formData.consent_terms_1 || !formData.consent_terms_2 || !formData.consent_terms_3}
                className="flex-1 bg-[#E9C52D] text-black font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-lg hover:bg-[#1E3A5F] hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
              >
                SUBMIT
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
