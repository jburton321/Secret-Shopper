import { useEffect } from 'react';
import { Phone, ArrowLeft } from 'lucide-react';

interface TermsPageProps {
  onNavigate: (path: string) => void;
}

export default function TermsPage({ onNavigate }: TermsPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const prevTitle = document.title;
    document.title = 'Terms & Conditions — Secret Shopper Resort Program';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  const goHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate('/');
  };

  const goPrivacy = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate('/privacy');
  };

  return (
    <div className="min-h-screen bg-tan-50 flex flex-col">
      <header className="bg-primary-blue-950 text-tan-50 py-3 md:py-4 sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <a href="/" onClick={goHome} className="flex items-center">
            <img
              src="/chatti-icon.png"
              alt="Secret Shopper Resort Program"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </a>
          <a
            href="tel:7027032479"
            className="flex items-center gap-1 md:gap-2 text-white font-bold hover:text-yellow-200 transition-colors text-sm md:text-base"
          >
            <Phone className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
            <span className="hidden sm:inline">CALL: (702) 703-2479</span>
          </a>
        </div>
      </header>

      <section className="bg-primary-blue-950 text-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <a
            href="/"
            onClick={goHome}
            className="inline-flex items-center gap-2 text-tan-50/80 hover:text-yellow-200 transition-colors text-sm mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </a>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Terms &amp; Conditions</h1>
          <p className="mt-3 text-tan-50/80 text-sm md:text-base">
            <strong>Effective Date:</strong> August 29, 2025
          </p>
        </div>
      </section>

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg px-4 sm:px-6 md:px-8 py-6 md:py-8">
            <div className="space-y-6 text-gray-700">
              <div>
                <p className="mb-4">
                  Welcome to the ReviewThatResort.com and The Fulfillment Center Secret Shopper Program (the "Program"). By applying for, participating in, or using any part of the Program, you ("Participant," "you") agree to be bound by these Terms & Conditions. If you do not agree, you may not participate.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-primary-blue-950 mb-3">1. Eligibility</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Participants must be at least 21 years old.</li>
                  <li>In some cases, Participants must apply as a couple between the ages of 35 and 70. Both individuals must meet Program and resort requirements.</li>
                  <li>Participants must provide accurate and complete information during application and throughout the Program.</li>
                  <li>Participants must possess valid travel documents when required, such as a government issued ID and passports for international travel.</li>
                  <li>ReviewThatResort.com and The Fulfillment Center may deny, pause, or revoke participation for failure to meet eligibility requirements, misuse of the Program, or providing false information.</li>
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
                <h3 className="text-xl font-bold text-primary-blue-950 mb-3">3. Compensation &amp; Incentives</h3>
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
                  <li>By submitting feedback, reviews, images, or other materials ("Content"), you grant ReviewThatResort.com and The Fulfillment Center a non exclusive, royalty free, worldwide license to use, reproduce, distribute, adapt, and display the Content for Program operations, marketing, and reporting.</li>
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
                  <li>ReviewThatResort.com, The Fulfillment Center, and their affiliates are not responsible for travel delays, cancellations, accidents, personal injury, loss, theft, or damages incurred during participation.</li>
                  <li>Resorts are independently owned and operated and are solely responsible for their facilities and services.</li>
                  <li>Participation is voluntary and at your own risk.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-primary-blue-950 mb-3">8. Program Modifications</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>ReviewThatResort.com and The Fulfillment Center may modify, suspend, or terminate the Program at any time without prior notice.</li>
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
                <p className="mb-2"><strong>ReviewThatResort.com and The Fulfillment Center Secret Shopper Program</strong></p>
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
      </main>

      <footer className="bg-primary-blue-950 text-white pt-8 md:pt-10 lg:pt-12 pb-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <img
              src="/chatti-icon.png"
              alt="Secret Shopper Resort Program"
              className="h-20 md:h-24 w-auto object-contain mb-6"
            />
            <div className="text-center">
              <p className="mb-4 text-sm text-gray-300 max-w-2xl">
                © 2025 The Fulfillment Center. This offer is managed by Review That Resort under partnership
                authorization from The Fulfillment Center. All rights reserved.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm">
                <a href="/privacy" onClick={goPrivacy} className="hover:text-teal-400 transition-colors">Privacy Policy</a>
                <span>|</span>
                <a href="/" onClick={goHome} className="hover:text-teal-400 transition-colors">Home</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
