"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
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

  const [rotations, setRotations] = useState<number[]>([]);

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 10000); // Slowed down to 10s
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  useEffect(() => {
    setRotations(testimonials.map(() => Math.floor(Math.random() * 21) - 10));
  }, [testimonials]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 font-sans antialiased">
      <div className="flex flex-col items-center gap-8 md:gap-12">
        {/* Image/Avatar Section - Reduced Size */}
        <div className="relative h-32 w-32 shrink-0">
          <AnimatePresence>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.src}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  rotate: rotations[index] ?? 0,
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  rotate: isActive(index) ? 0 : rotations[index] ?? 0,
                  zIndex: isActive(index)
                    ? 40
                    : testimonials.length + 2 - index,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  rotate: rotations[index] ?? 0,
                }}
                transition={{
                  duration: 0.6, // Slower transition
                  ease: "easeInOut",
                }}
                className="absolute inset-0"
              >
                <Image
                  src={testimonial.src}
                  alt={testimonial.name}
                  draggable={false}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-2xl object-cover object-center shadow-lg"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

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
