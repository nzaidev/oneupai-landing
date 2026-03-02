"use client";

import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useWebinarPopUp } from "./WebinarPopupProvider";

const features = [
  {
    icon: '/images/ec1.svg',
    title: "Expert Community",
    description: "Connect with successful entrepreneurs and AI automation experts",
  },
  {
    icon: '/images/ec2.svg',
    title: "Exclusive Training",
    description:
      "Access premium content and training materials not available elsewhere",
  },
  {
    icon: '/images/ec1.svg',
    title: "Early Access",
    description: "Be the first to try new features and provide feedback",
  },
];
const lineSvg = "/images/waves-line.svg";

export default function CommunityJoinSection () {

  const { openPopup } = useWebinarPopUp();
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#e8f4f8] to-[#d4eef6]">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-[24px] overflow-hidden shadow-xl">
              <Image
                src="/images/ec.png"
                alt="Community member working"
                className="w-full h-auto object-cover"
                height={100}
                width={100}
              />
            </div>
            <div className="lg:block hidden absolute bottom-[-120px] md:left-0 right-0 w-[150px] z-10">
        <img src={lineSvg} alt="" />
      </div>
          </div>

          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="flex flex-col gap-5">
              <Badge
                variant="outline" className="justify-start ml-0"
               >
                Exclusive Community Access
              </Badge>

              <h2 className="ff-jakarta font-bold text-[#000000] md:text-[40px] text-[36px] leading-[100%]">
                Join the OneUpAI Community
              </h2>

              <p className="ff-Graphik font-normal text-[#1E293B] md:text-xl text-base md:leading-[30px] leading-[24px]">
                It is a long established fact that a reader will be distracted
                by the readable content of
              </p>
            </div>

            <div className="flex flex-col gap-5 lg:gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex md:flex-row flex-col  gap-4 items-start">
                  <div className="flex-shrink-0">
                    <img src={feature.icon} alt="" />
                  </div>
                  <div className="flex-1">
                    <h3 className="ff-jakarta font-bold text-[#0e0e0f] text-lg md:text-xl mb-1">
                      {feature.title}
                    </h3>
                    <p className="ff-Graphik font-normal text-slate-600 text-sm md:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button variant='primary' size='md' onClick={openPopup}>
                Join Free Community
              </Button>
              <Button
                variant="outline"
                size='md'
                asChild>
                <a href="https://dashboard.oneupai.com/onboard">Get AI Strategy</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
