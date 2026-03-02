"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
const lineSvg = "/images/waves-line.svg";

const portfolioItems = [
  {
    image: "/services/fractional.png",
    title: "Consultants and Coaches",
    description: "A clean page that drives discovery calls and consult bookings",
    templateUrl: "/fractional-ai-website-template",
  },
  {
    image: "/services/hvac.png",
    title: "Home Services (HVAC/Plumbing)",
    description: "Quick \"call now,\" service areas, and quote requests",
    templateUrl: "/hvac-ai-website-template",
  },
  {
    image: "/services/lawn.png",
    title: "Lawn Care and Landscaping",
    description: "Schedules, offerings, profiles, and membership-style sections",
    templateUrl: "/lawncare-ai-website-template",
  },
  {
    image: "/services/cleaning.png",
    title: "Cleaning Services",
    description: "Professional cleaning services with easy booking and service packages",
    templateUrl: "/cleaning-ai-website-template",
  },
  {
    image: "/services/contractor.png",
    title: "General Contractors",
    description: "Showcase projects, get quotes, and build trust with potential clients",
    templateUrl: "/contractor-ai-website-template",
  },
];

export default function PortfolioSection() {
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Handle responsive items per view
  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Mobile: 1 slide
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        // Tablet: 2 slides
        setItemsPerView(2);
      } else {
        // Desktop: 3 slides
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Create infinite carousel with items before and after
  const itemsToShow = portfolioItems.length;
  const infiniteItems = [
    ...portfolioItems.slice(-itemsPerView),
    ...portfolioItems,
    ...portfolioItems.slice(0, itemsPerView),
  ];
  
  // Start from the first "real" item
  const startIndex = itemsPerView;

  const handleTransitionEnd = useCallback(() => {
    // Jump to the real item without transition
    if (currentSlide === 0) {
      innerRef.current!.style.transition = "none";
      setCurrentSlide(itemsToShow);
      setTimeout(() => {
        innerRef.current!.style.transition = "transform 0.7s ease-out";
      }, 50);
    } else if (currentSlide === infiniteItems.length - itemsPerView) {
      innerRef.current!.style.transition = "none";
      setCurrentSlide(itemsPerView);
      setTimeout(() => {
        innerRef.current!.style.transition = "transform 0.7s ease-out";
      }, 50);
    }
  }, [currentSlide, infiniteItems.length, itemsToShow]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => prev - 1);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(startIndex + index);
  };

  // Auto play effect
  useEffect(() => {
    if (!mounted || !isAutoPlay) return;

    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay]);

  // Handle infinite loop wrapping
  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.addEventListener("transitionend", handleTransitionEnd);
      return () => {
        innerRef.current?.removeEventListener("transitionend", handleTransitionEnd);
      };
    }
  }, [handleTransitionEnd]);

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.targetTouches[0]) {
      setTouchStart(e.targetTouches[0].clientX);
      setIsAutoPlay(false);
    }
  };

  // Handle touch end
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches[0] && touchStart !== null) {
      const touchEndPos = e.changedTouches[0].clientX;
      const distance = touchStart - touchEndPos;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;

      if (isLeftSwipe) {
        nextSlide();
      } else if (isRightSwipe) {
        prevSlide();
      }

      setTouchStart(null);
      setIsAutoPlay(true);
    }
  };

  // Handle mouse down
  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStart(e.clientX);
    setIsAutoPlay(false);
  };

  // Handle mouse up
  const handleMouseUp = (e: React.MouseEvent) => {
    if (touchStart !== null) {
      const touchEndPos = e.clientX;
      const distance = touchStart - touchEndPos;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;

      if (isLeftSwipe) {
        nextSlide();
      } else if (isRightSwipe) {
        prevSlide();
      }

      setTouchStart(null);
      setIsAutoPlay(true);
    }
  };

  // Get the actual slide index for dot indicators
  const actualSlideIndex = ((currentSlide - startIndex) % itemsToShow + itemsToShow) % itemsToShow;

  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20 bg-white">
      <div className="block md:hidden absolute top-[-25px] right-[-50px] w-[150px] z-10">
        <img src={lineSvg} className="w-full" alt="" />
      </div>
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center gap-3 max-w-[750px] mx-auto mb-12 md:mb-16">
          <Badge variant="outline">Portfolio</Badge>
          <h2 className="ff-jakarta font-bold text-[#000000] md:text-[40px] text-[36px] text-center leading-[100%] md:whitespace-nowrap">
        Good-Looking Sites That Fit Your Business
          </h2>
          <p className="ff-Graphik font-normal text-[#1E293B] md:text-[20px] lg:text-xl text-base text-center md:leading-[30px] leading-[24px]">
            These are not “one-size-fits-all” themes. They are made for service businesses so your site feels clear, trustworthy, and easy to use.

          </p>
        </div>

        <div className="relative">
          <div
            className="overflow-hidden"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            <div
              ref={innerRef}
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)`,
              }}
            >
              {infiniteItems.map((item, index) => (
                <div
                  key={index}
                  style={{ width: `${100 / itemsPerView}%` }}
                  className="flex-shrink-0 px-2 md:px-3 lg:px-5"
                >
                  <Card className="bg-gradient-to-br from-[#e8f7fb] to-[#d4f1f9] rounded-[30px] border-0 shadow-sm hover:shadow-md transition-shadow h-full group">
                    <CardContent className="p-4 md:p-6 lg:p-8 h-full flex flex-col justify-between">
                      <div>
                        <div className="bg-[#f5f5f5] rounded-[15px] mb-4 md:mb-6 overflow-hidden relative h-[200px] md:h-[250px] lg:h-[300px]">
                        <div className="absolute inset-0 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.title}
                            className="w-full h-auto absolute top-0 left-0 ease-linear"
                            height={100}
                            width={100}
                            style={{
                              transition: 'transform 5s linear'
                            }}
                          />
                        </div>
                      </div>
                      <h3 className="ff-jakarta font-bold text-[#0E0E0F] text-lg lg:text-xl mb-3 leading-snug">
                        {item.title}
                      </h3>
                      <p className="ff-Graphik font-normal text-[#1E293B] md:text-base mb-3 md:mb-4 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                      </div>
                      <div className="flex gap-2 md:gap-3">
                        <Button
                          variant="outline"
                          size="md"
                          className="flex-1 max-h-[42px] text-sm md:text-base"
                          asChild
                        >
                          <a href={item.templateUrl}>Preview Template</a>
                        </Button>
                        <Button
                          variant="primary"
                          size="md"
                          className="flex-1 max-h-[42px] text-sm md:text-base"
                          asChild
                        >
                          <a href="https://dashboard.oneupai.com/onboard">Build Mine</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {/* <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
            aria-label="Previous slide"
          >
            <svg
              className="w-5 h-5 text-[#1a80e7]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
            aria-label="Next slide"
          >
            <svg
              className="w-5 h-5 text-[#1a80e7]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button> */}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="inline-flex justify-center items-center space-x-3 border border-[#00000033] py-3.5 px-7 rounded-full bg-white/90">
            {portfolioItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-300 ${
                  actualSlideIndex === index
                    ? "bg-[#1A80E7] w-[12px] h-[12px]"
                    : "bg-[#D9D9D9] w-[12px] h-[12px] hover:bg-[#B0B0B0]"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}