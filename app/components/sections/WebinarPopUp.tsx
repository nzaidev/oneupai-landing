"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WebinarPopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WebinarPopUp({ isOpen, onClose }: WebinarPopUpProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle form submission
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-[630px] rounded-[20px] shadow-2xl overflow-hidden"
              style={{ background: "#EAF6FB" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Inner padding */}
              <div className="p-7 sm:p-9 ff-jakarta">

                {/* Close button */}
                {/* <div className="flex justify-end -mt-1 -mr-1 mb-2">
                  <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-black/10 transition-all duration-200"
                    aria-label="Close"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div> */}

                {/* Heading */}
                <h2 className="ff-jakarta text-2xl sm:text-3xl font-bold text-[#1A80E7] mb-3 leading-tight">
                  Fill the form
                </h2>

                {/* Description */}
                <p className="text-[#140505] text-sm mb-5 ff-Graphik">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using.
                </p>

                {/* Divider */}
                <div className="h-px bg-[#4065d33b] mb-6" />

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#12715B80] mb-1.5 tracking-wide">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      required
                      className="w-full rounded-[12px] bg-white border border-transparent px-4 md:py-4 py-3 text-sm text-gray-700 placeholder-[#00000080] outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 shadow-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-[#12715B80] mb-1.5 tracking-wide">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      required
                      className="w-full rounded-[12px] bg-white border border-transparent px-4 md:py-4 py-3 text-sm text-gray-700 placeholder-[#00000080] outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 shadow-sm"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-xs font-semibold text-[#12715B80] mb-1.5 tracking-wide">
                      Country
                    </label>
                    <input
                      type="text"
                      placeholder="Country"
                      required
                      className="w-full rounded-[12px] bg-white border border-transparent px-4 md:py-4 py-3 text-sm text-gray-700 placeholder-[#00000080] outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 shadow-sm"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="mt-2 w-full rounded-[12px] bg-[#1A80E7] hover:bg-[#155FA0] active:scale-[0.98] text-white font-bold text-base md:py-4 py-3 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Join the Free Webinar
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}