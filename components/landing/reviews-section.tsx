"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

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
    <div className="py-12 px-4 bg-neutral-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Google Review CTA Card */}
        <Card className="overflow-hidden border-none shadow-xl bg-white relative group h-full flex flex-col justify-center">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-green-500 to-saffron-500"></div>
          <CardContent className="p-8 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center mb-6 p-2">
              <Image
                src="/logo.png"
                alt="Logo"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>

            <h3 className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-2">
              Support Our Small Business
            </h3>

            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-6 h-6 fill-saffron-500 text-saffron-500"
                />
              ))}
            </div>

            <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-4 leading-tight">
              REVIEW US <br /> <span className="text-blue-600">ON GOOGLE</span>
            </h2>

            <p className="text-neutral-600 mb-8 max-w-xs mx-auto">
              Your opinion helps us reach more people! Rate us if you enjoyed
              our food and service!
            </p>

            <button
              onClick={handleReviewClick}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full max-w-xs"
            >
              Write a Review
            </button>
          </CardContent>
        </Card>

        {/* Animated Testimonials */}
        <div className="relative">
          <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-2 text-center md:text-left pl-4 border-l-4 border-green-500">
            What Our Customers Say
          </h3>
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
        </div>
      </div>
    </div>
  );
}
