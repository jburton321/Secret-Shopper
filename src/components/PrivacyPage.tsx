import { useEffect } from 'react';
import { Phone, ArrowLeft } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (path: string) => void;
}

export default function PrivacyPage({ onNavigate }: PrivacyPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const prevTitle = document.title;
    document.title = 'Privacy Policy — Secret Shopper Resort Program';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  const goHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate('/');
  };

  const goTerms = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate('/terms');
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
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Privacy Policy</h1>
          <p className="mt-3 text-tan-50/80 text-sm md:text-base">
            <strong>Effective Date:</strong> August 29, 2025 • <strong>Last Updated:</strong> August 29, 2025
          </p>
        </div>
      </section>

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg px-4 sm:px-6 md:px-8 py-6 md:py-8">
            <div className="space-y-6 text-gray-700">
              <div>
                <p className="mb-4">
                  The Fulfillment Center and ReviewThatResort.com ("we," "our," "us") operate The Fulfillment Center and ReviewThatResort.com websites and the Secret Shopper Program ("Program"). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, share, and safeguard information when you visit our websites or participate in the Program.
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
                <p className="mb-2"><strong>The Fulfillment Center and ReviewThatResort.com</strong></p>
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
                <a href="/terms" onClick={goTerms} className="hover:text-teal-400 transition-colors">Terms</a>
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
