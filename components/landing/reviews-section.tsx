"use client";

import Image from "next/image";
import { Star, MessageSquareQuote, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { motion } from "framer-motion";

// Static reviews data
const reviewsData = [
  {
    author_name: "Ravindra V",
    rating: 5,
    relative_time_description: "2 months ago",
    text: "The quality of tiffins is very good and it's pure veg hotel. Near by railway station. Initially hesitant to go inside as the place doesn't look good but took parcel by seeing a lot of crowd. It's worth trying.",
  },
  {
    author_name: "mamidi sudeep",
    rating: 5,
    relative_time_description: "2 months ago",
    text: "The taste of the available breakfast items are superb and the quality and quantity is worthy the amount we pay.sambar taste is very tasty.",
  },
  {
    author_name: "rajesh nare",
    rating: 5,
    relative_time_description: "a year ago",
    text: "Food quality is good. But quantity is not satisfactory for the price. For an average eater, it costs around ₹140 to feel stomach full.",
  },
  {
    author_name: "way2 tech",
    rating: 4,
    relative_time_description: "2 years ago",
    text: "This place is real nice for tasty tiffins,I can say it has a nice taste to a morning tiffins near railway station.I can sure say as Nellore is for best food and these hotel is a fine example for tiffins....I can also say it's clean very hygienic and good atmosphere.",
  },
  {
    author_name: "mohuk khatri",
    rating: 5,
    relative_time_description: "a week ago",
    text: "Tasty food. Hygiene maintained. Must visit. Location is right opposite to Nellore Railway Station.",
  },
  {
    author_name: "Anwarbasha Shaik",
    rating: 5,
    relative_time_description: "3 months ago",
    text: "Delicious , Sambar,idly,dosa,.....What not ...Everything is super tasty",
  },
];

export function ReviewsSection() {
  const handleReviewClick = () => {
    window.open(
      "https://g.page/r/Cf84CB0kaZ3yEBM/review",
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Map reviews to AnimatedTestimonials format
  const testimonials = reviewsData.map((review) => ({
    quote: review.text,
    name: review.author_name,
    designation: `Customer • ${review.relative_time_description}`,
    src: `https://ui-avatars.com/api/?name=${encodeURIComponent(
      review.author_name
    )}&background=22c55e&color=fff&size=200`,
  }));

  return (
    <section className="py-20 px-4 bg-neutral-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-saffron-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-medium"
          >
            <Sparkles className="w-4 h-4 text-saffron-500" />
            <span>Customer Love</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight"
          >
            What Our Guests Are Saying
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-neutral-600 max-w-2xl mx-auto"
          >
            Don&apos;t just take our word for it. Here&apos;s what our community
            loves about their experience at Swamy&apos;s Hot Foods.
          </motion.p>
        </div>

        <div className="flex flex-col gap-16 items-center">
          {/* Google Review CTA Card - Enhanced and Bigger */}
          <motion.div
            className="w-full max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.3,
            }}
          >
            <div className="relative group">
              {/* Animated gradient border */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-green-500 to-saffron-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-pulse" />

              <Card className="relative overflow-hidden border-2 border-blue-100 shadow-2xl bg-gradient-to-br from-white via-blue-50/30 to-white rounded-3xl">
                <CardContent className="p-10 md:p-14 text-center flex flex-col items-center justify-center">
                  <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full">
                    {/* Logo with enhanced animation */}
                    <motion.div
                      className="w-28 h-28 md:w-32 md:h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-4 ring-8 ring-blue-100/50 shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                    >
                      <Image
                        src="/logo.png"
                        alt="Logo"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </motion.div>

                    {/* Content - Bigger and bolder */}
                    <div className="text-center md:text-left space-y-4 flex-1">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                      >
                        <h3 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-2">
                          🌟 Support Our Small Business
                        </h3>
                        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight mb-4">
                          Share Your Experience on{" "}
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400">
                            Google
                          </span>
                        </h2>
                        <p className="text-neutral-600 text-base md:text-lg max-w-xl">
                          Your review helps us serve you better and helps others
                          discover authentic South Indian cuisine!
                        </p>
                      </motion.div>

                      {/* Star rating - Bigger */}
                      <div className="flex gap-2 justify-center md:justify-start">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.div
                            key={star}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + star * 0.1 }}
                            whileHover={{ scale: 1.2, rotate: 15 }}
                          >
                            <Star className="w-8 h-8 md:w-10 md:h-10 fill-saffron-500 text-saffron-500 drop-shadow-lg" />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button - Bigger and more prominent */}
                    <div className="md:ml-auto">
                      <motion.button
                        onClick={handleReviewClick}
                        whileHover={{ scale: 1.08, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-3 whitespace-nowrap group"
                      >
                        <MessageSquareQuote className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                        <span>Write a Review</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </motion.button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Animated Testimonials - Bottom Half */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.4,
            }}
          >
            <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
