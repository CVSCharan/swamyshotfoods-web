"use client";

import Link from "next/link";
import {
  Heart,
  Users,
  Award,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section - Since 1944 */}
      <motion.section className="relative bg-gradient-to-br from-green-900 via-green-800 to-neutral-900 text-white">
        {/* Background Elements Wrapper - Clipped */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-mesh-gradient opacity-20"></div>
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-saffron-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 sm:py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Timeline Badge */}
            <motion.div
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-saffron-500/20 backdrop-blur-md border border-saffron-500/30 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 200, damping: 20 },
              }}
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
            >
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-saffron-400" />
              <span className="text-saffron-300 font-bold tracking-wide text-sm sm:text-base">
                80+ Years of Excellence
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 leading-tight px-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                  delay: 0.1,
                },
              }}
            >
              Since{" "}
              <motion.span
                className="text-saffron-400 inline-block"
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  transition: {
                    scale: { type: "spring", stiffness: 300, damping: 10 },
                    rotate: { duration: 0.5 },
                  },
                }}
              >
                1944
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl md:text-3xl text-green-100 font-serif italic mb-4 sm:mb-6 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                  delay: 0.2,
                },
              }}
            >
              Three Generations, One Passion
            </motion.p>

            <motion.div
              className="w-16 sm:w-24 h-1 bg-gradient-to-r from-transparent via-saffron-500 to-transparent mx-auto mb-6 sm:mb-8"
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.3,
                },
              }}
            />

            <motion.p
              className="text-base sm:text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto leading-relaxed px-4 mb-12 sm:mb-16 md:mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                  delay: 0.4,
                },
              }}
            >
              A story of dedication, tradition, and love for authentic South
              Indian vegetarian cuisine, passed down through generations.
            </motion.p>
          </div>
        </div>

        {/* Decorative Wave - Not Clipped */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-[1px] z-20 pointer-events-none">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto block"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V122H1380C1320 122 1200 122 1080 122C960 122 840 122 720 122C600 122 480 122 360 122C240 122 120 122 60 122H0Z"
              fill="#fdfcfb"
            />
          </svg>
        </div>
      </motion.section>

      {/* Section 1: The Beginning (1944) */}
      <motion.section
        className="py-12 sm:py-16 md:py-24 px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 100, damping: 20 },
        }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <motion.div
              className="order-2 md:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.2,
                },
              }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-green-100 text-green-700 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4">
                The Beginning
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6">
                Roots from{" "}
                <span className="text-green-600 relative">
                  Goa
                  <svg
                    className="absolute -bottom-1 sm:-bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 200 8"
                    fill="none"
                  >
                    <path
                      d="M0 4C50 2 100 6 150 4C175 3 200 4 200 4"
                      stroke="#22c55e"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>

              <div className="space-y-3 sm:space-y-4 text-neutral-700 text-base sm:text-lg leading-relaxed">
                <p>
                  Our story begins long before independence, when our
                  forefathers journeyed from the beautiful coastal lands of{" "}
                  <strong className="text-green-700">Goa</strong> to establish
                  roots in what would become our home.
                </p>

                <p>
                  In <strong className="text-saffron-600">1944</strong>, my
                  grandfather, a proud{" "}
                  <strong className="text-blue-600">Konkani Brahmin</strong>,
                  started this business with a simple vision: to serve hot,
                  hygienic, and authentic South Indian vegetarian food to the
                  community.
                </p>

                <blockquote className="border-l-4 border-green-500 pl-4 sm:pl-6 py-2 bg-green-50 rounded-r-lg italic text-green-900 text-sm sm:text-base">
                  &quot;From humble beginnings, a legacy was born — one plate at
                  a time.&quot;
                </blockquote>
              </div>
            </motion.div>

            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.3,
                },
              }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -top-4 -left-4 w-20 h-20 sm:w-24 sm:h-24 bg-saffron-200 rounded-full blur-2xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 bg-green-200 rounded-full blur-2xl"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.4, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    rotate: [0, -1, 1, 0],
                    transition: {
                      scale: { type: "spring", stiffness: 300, damping: 20 },
                      rotate: { duration: 0.5 },
                    },
                  }}
                >
                  <Card className="relative overflow-hidden border-2 border-green-200 shadow-2xl">
                    <CardContent className="p-6 sm:p-8 bg-gradient-to-br from-white to-green-50">
                      <div className="flex items-center justify-center h-48 sm:h-56 md:h-64">
                        <div className="text-center">
                          <div className="text-6xl sm:text-7xl md:text-8xl font-heading font-bold text-green-600 mb-2">
                            1944
                          </div>
                          <p className="text-neutral-600 font-medium text-sm sm:text-base">
                            Where it all began
                          </p>
                          <div className="mt-3 sm:mt-4 flex justify-center gap-1.5 sm:gap-2">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-saffron-600" />
                            <span className="text-xs sm:text-sm text-neutral-700">
                              Nellore, Andhra Pradesh
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Decorative Divider */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent"></div>
          <Sparkles className="w-6 h-6 text-saffron-500" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent"></div>
        </div>
      </div>

      {/* Section 2: The Legacy Continues */}
      <section className="py-12 sm:py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-block bg-blue-100 text-blue-700 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4">
              Building the Legacy
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6 px-4">
              Generations of <span className="text-blue-600">Excellence</span>
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-500 via-blue-500 to-saffron-500 hidden md:block"></div>

            {/* Timeline Items */}
            <div className="space-y-8 sm:space-y-10 md:space-y-12">
              {/* First Generation */}
              <div className="relative grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                <Card className="md:text-right shadow-lg border-green-200">
                  <CardContent className="p-5 sm:p-6">
                    <div className="inline-block bg-green-600 text-white px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-3">
                      1st Generation
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-neutral-900 mb-1.5 sm:mb-2">
                      The Founder
                    </h3>
                    <p className="text-neutral-600 text-sm sm:text-base">
                      Established the foundation of quality and tradition that
                      defines us today.
                    </p>
                  </CardContent>
                </Card>
                <div className="hidden md:block"></div>
              </div>

              {/* Second Generation */}
              <div className="relative grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                <div className="hidden md:block"></div>
                <Card className="shadow-lg border-blue-200">
                  <CardContent className="p-5 sm:p-6">
                    <div className="inline-block bg-blue-600 text-white px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-3">
                      2nd Generation
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-neutral-900 mb-1.5 sm:mb-2">
                      My Father&apos;s Era
                    </h3>
                    <p className="text-neutral-600 text-sm sm:text-base">
                      Expanded the reputation for hot, hygienic food served in
                      authentic South Indian style.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Third Generation */}
              <div className="relative grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                <Card className="md:text-right shadow-lg border-saffron-200">
                  <CardContent className="p-5 sm:p-6">
                    <div className="inline-block bg-saffron-600 text-white px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-3">
                      3rd Generation
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-neutral-900 mb-1.5 sm:mb-2">
                      Present Day
                    </h3>
                    <p className="text-neutral-600 text-sm sm:text-base">
                      Continuing the legacy with the same dedication and love
                      for our craft.
                    </p>
                  </CardContent>
                </Card>
                <div className="hidden md:block"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Sugunaram's Personal Journey */}
      <section className="py-12 sm:py-16 md:py-24 px-4 bg-gradient-to-br from-neutral-100 to-green-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-block bg-saffron-100 text-saffron-700 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4">
              A Personal Journey
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6 px-4">
              My Story
            </h2>
          </div>

          <Card className="shadow-2xl border-none overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-1">
              <CardContent className="bg-white p-6 sm:p-8 md:p-12">
                <div className="prose prose-base sm:prose-lg max-w-none">
                  <p className="text-lg sm:text-xl text-neutral-800 leading-relaxed mb-5 sm:mb-6">
                    My name is{" "}
                    <strong className="text-green-700">Sugunaram</strong>, and
                    I&apos;m 37 years old. I am the third generation of this
                    business, carrying forward a legacy that spans over eight
                    decades.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 sm:p-6 rounded-r-lg mb-5 sm:mb-6">
                    <p className="text-neutral-700 italic text-sm sm:text-base">
                      At the age of 11, I stopped my studies (6th class
                      incomplete) to help my father at the shop. It was a
                      sacrifice made with love and dedication to our family
                      business.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 my-6 sm:my-8">
                    <div className="bg-green-50 p-3 sm:p-4 rounded-lg text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-green-700 mb-1">
                        2012
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-600">
                        November 19th
                        <br />
                        Got Married ❤️
                      </p>
                    </div>
                    <div className="bg-neutral-100 p-3 sm:p-4 rounded-lg text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-neutral-700 mb-1">
                        2013
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-600">
                        March 14th
                        <br />
                        Father&apos;s Passing
                      </p>
                    </div>
                    <div className="bg-saffron-50 p-3 sm:p-4 rounded-lg text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-saffron-700 mb-1">
                        2013
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-600">
                        March 31st
                        <br />
                        Took Over Business
                      </p>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
                    Just 17 days after my father&apos;s passing, I took over the
                    responsibility of continuing his legacy. With the support of
                    my family members, I&apos;ve been running this business with{" "}
                    <strong className="text-green-700">
                      full satisfaction
                    </strong>{" "}
                    and dedication ever since.
                  </p>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Section 4: The Family Today */}
      <section className="py-12 sm:py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-block bg-green-100 text-green-700 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4">
              Our Beautiful Family
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6 px-4">
              The Heart of Our Business
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto px-4">
              Family-run with love, maintained by our own family members&apos;
              surveillance with good responsible staff.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {/* Wife */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow border-pink-200">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                  ❤️
                </div>
                <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">
                  My Wife
                </h3>
                <p className="text-neutral-600">
                  My partner in life and business
                </p>
              </CardContent>
            </Card>

            {/* Daughter 1 */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow border-purple-200">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                  👸
                </div>
                <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">
                  Sreelakshmi
                </h3>
                <p className="text-neutral-600">Our eldest daughter</p>
              </CardContent>
            </Card>

            {/* Daughter 2 */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow border-purple-200">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                  👸
                </div>
                <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">
                  Sravani
                </h3>
                <p className="text-neutral-600">Our youngest daughter</p>
              </CardContent>
            </Card>

            {/* Mother */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow border-orange-200">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                  👩‍🦳
                </div>
                <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">
                  My Mother
                </h3>
                <p className="text-neutral-600">The pillar of our family</p>
              </CardContent>
            </Card>

            {/* Pet */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow border-amber-200">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                  🐶
                </div>
                <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">
                  Ramu
                </h3>
                <p className="text-neutral-600">Our beloved pet</p>
              </CardContent>
            </Card>

            {/* Family Unit */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow border-green-200 md:col-span-2 lg:col-span-1">
              <CardContent className="p-6 text-center flex flex-col justify-center h-full">
                <Heart className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">
                  Together
                </h3>
                <p className="text-neutral-600">This is our beautiful family</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 5: Our Promise */}
      <section className="py-12 sm:py-16 md:py-24 px-4 bg-gradient-to-br from-neutral-50 via-white to-green-50/30 relative overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,94,0.15)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(251,191,36,0.12)_0%,transparent_50%)]" />
        </div>

        {/* Decorative Geometric Shapes */}
        <motion.div
          className="absolute top-10 right-10 w-64 h-64 bg-green-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-64 h-64 bg-saffron-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-8 sm:mb-10 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 100, damping: 20 },
            }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-saffron-100 to-green-100 border-2 border-saffron-300/50 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-5 text-saffron-700 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Sparkles className="w-4 h-4" />
              Our Commitment
            </motion.div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4 bg-gradient-to-r from-green-700 via-green-600 to-green-700 bg-clip-text text-transparent">
              Our Promise to You
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-saffron-500 to-transparent mx-auto" />
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-14">
            {/* Hot & Hygienic */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.1,
                },
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="bg-white border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden group">
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardContent className="p-6 sm:p-7 text-center relative z-10">
                  <motion.div
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mx-auto mb-4 sm:mb-5 flex items-center justify-center shadow-lg shadow-green-500/30"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </motion.div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-neutral-900">
                    Hot & Hygienic
                  </h3>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                    Freshly prepared with the highest standards of cleanliness
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pure Vegetarian */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.2,
                },
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="bg-white border-2 border-saffron-200 shadow-xl hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden group">
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-saffron-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardContent className="p-6 sm:p-7 text-center relative z-10">
                  <motion.div
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-2xl mx-auto mb-4 sm:mb-5 flex items-center justify-center shadow-lg shadow-saffron-500/30"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </motion.div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-neutral-900">
                    Pure Vegetarian
                  </h3>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                    Authentic South Indian style, 100% vegetarian
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Family Values */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.3,
                },
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="bg-white border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden group">
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardContent className="p-6 sm:p-7 text-center relative z-10">
                  <motion.div
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-4 sm:mb-5 flex items-center justify-center shadow-lg shadow-blue-500/30"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </motion.div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-neutral-900">
                    Family Values
                  </h3>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                    Run with love and dedication by our family
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            className="text-center bg-gradient-to-r from-green-50 via-white to-green-50 rounded-3xl p-8 sm:p-10 md:p-12 border-2 border-green-200 shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              transition: { type: "spring", stiffness: 100, damping: 20 },
            }}
            viewport={{ once: true }}
          >
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-800 mb-6 sm:mb-8 leading-relaxed px-4 font-medium">
              For over{" "}
              <span className="text-green-700 font-bold">80 years</span>,
              we&apos;ve been serving our community with the same passion and
              dedication that my grandfather started with in{" "}
              <span className="text-saffron-600 font-bold">1944</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center px-4">
              <Link href="/menu" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-bold text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 rounded-2xl shadow-xl shadow-saffron-500/30 hover:shadow-2xl transition-all"
                  >
                    Explore Our Menu
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </Link>

              <Link href="/" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto bg-white hover:bg-green-50 text-green-700 border-2 border-green-300 hover:border-green-400 font-bold text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Visit Us Today
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
