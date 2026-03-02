import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

const processSteps = [
  {
    icon: "/frame-1171275677.svg",
    title: "Pick Your Industry",
    description:
      "Choose a starting point made for the way your customers usually buy.",
    bgClass: "bg-white",
    textClass: "text-[#0e0e0f]",
  },
  {
    icon: "/frame-1171275681.svg",
    title: "Answer a Few Questions",
    description:
      "Tell us what you do, what you charge, and where you serve. It takes about three minutes.",
    bgClass: "bg-[#1a80e7]",
    textClass: "text-slate-50",
  },
  {
    icon: "/frame-1171275685.svg",
    title: "It Builds Your Site",
    description:
      "Your pages, wording, and booking setup are created at the same time.",
    bgClass: "bg-white",
    textClass: "text-[#0e0e0f]",
  },
  {
    icon: "/frame-1171275689.svg",
    title: "Go Live and Get Paid",
    description:
      "Connect Stripe, publish, and start taking appointments and payments right away.",
    bgClass: "bg-white",
    textClass: "text-[#0e0e0f]",
  },
];

const lineSvg = "/images/waves-line.svg";

export default function HowItWorks  () {
  return (
   <section id="how-it-works" className="relative w-full py-12 md:py-16 lg:py-20 bg-[#2AA8D71A] overflow-hidden">
        

        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
             <div className="lg:block hidden absolute bottom-[10px]  right-28 w-[150px] z-10">
        <img src={lineSvg} alt="" />
      </div>
          <div className="flex flex-col items-center gap-4 max-w-[700px] mx-auto mb-12 md:mb-16">
            <Badge
              variant="outline" className="px-4"
            >
              How it Works
            </Badge>
            <h2 className="ff-jakarta font-bold text-[#000000] md:text-[40px] text-[36px] text-center leading-[120%]">
              From “Idea” to “Open for Business” in Minutes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {processSteps.map((step, index) => (
              <Card
                key={index}
                className={`${step.bgClass} rounded-[20px] border-0 shadow-sm hover:shadow-xl transition-shadow`}
              >
                <CardContent className="flex flex-col items-center gap-8 p-6 md:p-8">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                    step.bgClass === "bg-white"
                      ? "bg-white/20"
                      : "bg-white/20"
                  }`}>
                    <img className="w-full h-full" alt="Frame" src={step.icon} />
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <h3
                      className={`ff-jakarta font-bold ${step.textClass} text-[18px] text-center`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`ff-Graphik font-normal ${
                        step.bgClass === "bg-white"
                          ? "text-slate-600"
                          : step.textClass
                      } text-[16px] text-center`}
                    >
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
  );
};
