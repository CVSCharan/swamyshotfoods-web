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
          {/* Google Review CTA Card - Top Half */}
          <motion.div
            className="w-full max-w-3xl mx-auto"
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
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-green-500 to-saffron-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <Card className="relative overflow-hidden border-none shadow-xl bg-white rounded-2xl">
                <CardContent className="p-8 md:p-10 text-center flex flex-col items-center justify-center">
                  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                    <motion.div
                      className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center p-3 ring-4 ring-green-50 shrink-0"
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
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </motion.div>

                    <div className="text-center md:text-left space-y-2">
                      <h3 className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
                        Support Our Small Business
                      </h3>
                      <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 leading-tight">
                        Review Us On{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                          Google
                        </span>
                      </h2>
                      <div className="flex gap-1 justify-center md:justify-start">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-5 h-5 fill-saffron-500 text-saffron-500"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="md:ml-auto">
                      <motion.button
                        onClick={handleReviewClick}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        <MessageSquareQuote className="w-4 h-4" />
                        Write a Review
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
