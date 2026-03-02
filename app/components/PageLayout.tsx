import HeaderSection from "./sections/HeaderSection";
import FooterSection from "./sections/FooterSection";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  lastUpdated?: string;
}

export default function PageLayout({
  children,
  title,
  subtitle,
  lastUpdated,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with gradient background */}
      <div
        className="w-full rounded-b-[30px]"
        style={{
          background:
            "linear-gradient(280.71deg, rgba(77, 255, 182, 0.08) 31.34%, rgba(67, 230, 191, 0.08) 39.85%, rgba(42, 168, 215, 0.08) 53.55%, rgba(26, 128, 231, 0.08) 78%)",
        }}
      >
        <div className="w-full px-4 py-5 md:py-6">
          <nav className="flex items-center justify-between max-w-[1320px] mx-auto">
            <a href="/">
              <img
                className="w-32 h-9 md:w-40 md:h-11 lg:w-[180px] lg:h-[50px]"
                alt="OneUpAI Logo"
                src="/images/logo.svg"
              />
            </a>
            <a
              href="/"
              className="ff-Graphik font-normal text-black text-base px-4 py-2 hover:text-[#1a80e7] transition-colors"
            >
              Back to Home
            </a>
          </nav>
        </div>

        <div className="px-4 max-w-[1320px] mx-auto pb-10 md:pb-12 pt-8 md:pt-12">
          <div className="max-w-[900px]">
            <h1 className="ff-jakarta font-bold text-[#0e0e0f] text-3xl md:text-5xl lg:text-[56px] leading-[110%] mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="ff-Graphik text-[#1E293B] text-lg md:text-xl mb-2">
                {subtitle}
              </p>
            )}
            {lastUpdated && (
              <p className="ff-Graphik text-[#64748B] text-base md:text-lg italic">
                {lastUpdated}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main content - flex-grow to push footer down */}
      <div className="flex-grow">
        <div className="max-w-[900px] mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="space-y-8">{children}</div>
        </div>
      </div>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
