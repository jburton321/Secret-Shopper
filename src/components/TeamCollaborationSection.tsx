import { Lock, CreditCard } from 'lucide-react';

const TeamCollaborationSection = () => {
  const teamMembers = [
    {
      name: '4 Days, 3 Nights',
      image: '/SecretShopper/images/images/Atlantis.png',
      position: { top: '8%', right: '25%' },
      delay: '0s'
    },
    {
      name: 'All-Inclusive Dining',
      image: '/SecretShopper/images/images/DREAMS.png',
      position: { top: '42%', left: '12%' },
      delay: '0.8s'
    },
    {
      name: 'Cocktails',
      image: '/SecretShopper/images/images/Secrets.png',
      position: { top: '35%', right: '8%' },
      delay: '1.6s'
    },
    {
      name: 'Full Resort Access',
      image: '/SecretShopper/images/images/VIDANTA.png',
      position: { bottom: '18%', left: '32%' },
      delay: '2.4s'
    },
    {
      name: '$50 Gift Card',
      image: '/SecretShopper/images/images/LIFESTYLE.png',
      position: { bottom: '20%', right: '25%' },
      delay: '3.2s'
    }
  ];

  return (
    <section className="relative py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-white overflow-hidden">
      <style>{`
        @keyframes float-wave {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>

      {/* Background decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-blue-50 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-cyan-50 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">
          {/* Left side - Text content */}
          <div className="relative space-y-4 md:space-y-6">
            {/* Background map image */}
            <div className="absolute -inset-8 md:-inset-16 pointer-events-none opacity-30 md:opacity-100">
              <img
                src="/SecretShopper/images/Misc-graphics/Map-Mexico-8.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Your Complete <br />Package<span className="text-blue-500">.</span>
              </h2>
              <div className="flex items-center gap-2 md:gap-3 text-gray-400 mt-4 md:mt-6">
                <div className="w-8 md:w-12 h-px bg-gray-300"></div>
                <p className="text-sm md:text-base lg:text-lg">Everything included for an unforgettable experience</p>
              </div>
              <div className="pt-3 md:pt-4">
                <button
                  onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#E9C52D] text-black font-bold text-sm md:text-base lg:text-lg px-4 md:px-6 lg:px-8 py-3 md:py-4 rounded-lg shadow-lg hover:bg-[#1E3A5F] hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2 group w-full sm:w-auto justify-center"
                >
                  <span className="hidden sm:inline">BECOME A SECRET SHOPPER - START QUIZ</span>
                  <span className="sm:hidden">START QUIZ NOW</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Circular diagram (now shown on all breakpoints) */}
          <div className="relative h-[420px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center">
            {/* Outer circle border */}
            <div className="absolute inset-0 flex items-center justify-center z-[1]">
              <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full border-2 border-blue-200"></div>
            </div>

            {/* Middle circle with gradient */}
            <div className="absolute inset-0 flex items-center justify-center z-[2]">
              <div className="w-[230px] h-[230px] sm:w-[300px] sm:h-[300px] md:w-[380px] md:h-[380px] lg:w-[460px] lg:h-[460px] rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-2xl">
                {/* Inner white circle */}
                <div className="w-[200px] h-[200px] sm:w-[270px] sm:h-[270px] md:w-[350px] md:h-[350px] lg:w-[420px] lg:h-[420px] rounded-full bg-white flex items-center justify-center">
                  {/* Center circle with avatar */}
                  <div className="relative z-[3]">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-56 lg:h-56 rounded-full border-4 border-cyan-400 overflow-hidden shadow-lg">
                      <img
                        src="/SecretShopper/images/images/resort.jpg"
                        alt="Luxury Resort"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team member avatars positioned around the circle */}
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="absolute z-[4]"
                style={{
                  ...member.position,
                  animation: 'float-wave 4s ease-in-out infinite',
                  animationDelay: member.delay
                }}
              >
                <div className="relative group">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-lg ring-4 ring-white transition-transform group-hover:scale-110">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Name label */}
                  <div className="absolute -bottom-5 sm:-bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                    <div className="bg-white px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 md:py-1.5 rounded-full shadow-md">
                      <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-700 font-medium">{member.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Icon hexagons */}
            <div className="absolute top-[15%] left-[28%] z-[5]">
              <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-45">
                <Lock className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 text-white -rotate-45 drop-shadow-md" />
              </div>
            </div>

            <div className="absolute bottom-[15%] right-[10%] z-[5]">
              <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-45">
                <CreditCard className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 text-white -rotate-45 drop-shadow-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamCollaborationSection;
