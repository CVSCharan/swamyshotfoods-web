"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useCallback } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 10000); // Slowed down to 10s
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 font-sans antialiased">
      <div className="flex flex-col items-center gap-8 md:gap-12">
        {/* Content Section - Centered and Larger Text */}
        <div className="flex flex-col items-center justify-between text-center max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{
                y: 10,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -10,
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
            >
              <motion.p className="text-2xl md:text-3xl font-medium text-neutral-700 leading-relaxed mb-8 font-heading">
                &ldquo;
                {testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(4px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                      delay: 0.05 * index, // Slower word reveal
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
                &rdquo;
              </motion.p>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-neutral-900">
                  {testimonials[active].name}
                </h3>
                <p className="text-sm text-neutral-500 font-medium uppercase tracking-wider">
                  {testimonials[active].designation}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-4 pt-10">
            <button
              onClick={handlePrev}
              className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 hover:bg-green-50 transition-colors"
            >
              <IconArrowLeft className="h-5 w-5 text-neutral-600 group-hover/button:text-green-600 transition-transform duration-300 group-hover/button:-translate-x-1" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 hover:bg-green-50 transition-colors"
            >
              <IconArrowRight className="h-5 w-5 text-neutral-600 group-hover/button:text-green-600 transition-transform duration-300 group-hover/button:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
