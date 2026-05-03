import React from 'react';

const Statistics = () => {
  const stats = [
    { value: "500+", label: "Happy Customers" },
    { value: "120+", label: "Premium Boats" },
    { value: "45", label: "Unique Routes" },
    { value: "99%", label: "Satisfaction Rate" },
  ];

  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Abstract Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="waves" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q 25 0, 50 20 T 100 20" fill="none" stroke="currentColor" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waves)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                {stat.value}
              </h3>
              <p className="text-primary-foreground/80 font-medium text-sm md:text-base uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
