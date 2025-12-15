import { Metadata } from "next";
import Link from "next/link";
import { Scale, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Swamy's Hot Foods - Rules and guidelines for using our website and services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-neutral-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
            <Scale className="w-4 h-4" />
            <span>Legal Terms</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-green-100 text-lg">
            Last Updated: December 10, 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              Introduction
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              Welcome to Swamy's Hot Foods. These Terms of Service ("Terms")
              govern your use of our website{" "}
              <a
                href="https://swamyshotfoods.in"
                className="text-green-600 hover:text-green-700"
              >
                swamyshotfoods.in
              </a>{" "}
              and any services we provide. By accessing or using our website,
              you agree to be bound by these Terms. If you do not agree, please
              do not use our website.
            </p>
          </div>

          {/* Acceptance of Terms */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-neutral-700">
              By accessing and using this website, you accept and agree to be
              bound by these Terms and our Privacy Policy. These Terms apply to
              all visitors, users, and others who access or use the website.
            </p>
          </div>

          {/* Use of Website */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              2. Use of Website
            </h2>

            <h3 className="font-semibold text-xl text-neutral-800 mb-3 mt-6">
              2.1 Permitted Use
            </h3>
            <p className="text-neutral-700 mb-4">
              You may use our website for:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              <li>Viewing our menu and restaurant information</li>
              <li>Finding our location and contact details</li>
              <li>Reading customer reviews</li>
              <li>Contacting us for inquiries</li>
            </ul>

            <h3 className="font-semibold text-xl text-neutral-800 mb-3 mt-6">
              2.2 Prohibited Use
            </h3>
            <p className="text-neutral-700 mb-4">You agree NOT to:</p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Transmit viruses, malware, or harmful code</li>
              <li>
                Scrape, copy, or reproduce website content without permission
              </li>
              <li>Impersonate any person or entity</li>
              <li>Harass, abuse, or harm others</li>
              <li>Interfere with website functionality</li>
            </ul>
          </div>

          {/* Intellectual Property */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              3. Intellectual Property Rights
            </h2>
            <p className="text-neutral-700 mb-4">
              All content on this website, including but not limited to text,
              images, logos, graphics, photographs, and software, is the
              property of Swamy's Hot Foods or its content suppliers and is
              protected by Indian and international copyright laws.
            </p>
            <p className="text-neutral-700">
              You may not reproduce, distribute, modify, or create derivative
              works from any content without our express written permission.
            </p>
          </div>

          {/* User Content */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              4. User-Generated Content
            </h2>
            <p className="text-neutral-700 mb-4">
              If you submit reviews, comments, or other content ("User
              Content"), you grant us a non-exclusive, royalty-free, perpetual,
              and worldwide license to use, reproduce, modify, and display such
              content.
            </p>
            <p className="text-neutral-700 mb-4">
              You represent and warrant that:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              <li>You own or have rights to the User Content</li>
              <li>The content does not violate any third-party rights</li>
              <li>The content is accurate and not misleading</li>
              <li>
                The content does not contain offensive or illegal material
              </li>
            </ul>
          </div>

          {/* Restaurant Services */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              5. Restaurant Services
            </h2>

            <h3 className="font-semibold text-xl text-neutral-800 mb-3 mt-6">
              5.1 Menu and Pricing
            </h3>
            <p className="text-neutral-700 mb-4">
              Menu items, descriptions, and prices displayed on our website are
              subject to change without notice. We reserve the right to modify
              our menu, pricing, and availability at any time.
            </p>

            <h3 className="font-semibold text-xl text-neutral-800 mb-3 mt-6">
              5.2 Operating Hours
            </h3>
            <p className="text-neutral-700 mb-4">
              Our operating hours are displayed on the website and may change
              due to holidays, special events, or unforeseen circumstances. We
              are not liable for any inconvenience caused by changes in
              operating hours.
            </p>

            <h3 className="font-semibold text-xl text-neutral-800 mb-3 mt-6">
              5.3 Food Quality and Safety
            </h3>
            <p className="text-neutral-700">
              We maintain high standards of food quality and hygiene. However,
              we cannot guarantee that our food will be suitable for all dietary
              requirements or allergies. Please inform our staff of any dietary
              restrictions or allergies when ordering.
            </p>
          </div>

          {/* Third-Party Links */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              6. Third-Party Links and Services
            </h2>
            <p className="text-neutral-700 mb-4">
              Our website may contain links to third-party websites or services
              (e.g., Google Maps, social media platforms). We are not
              responsible for the content, privacy policies, or practices of
              these third-party sites.
            </p>
            <p className="text-neutral-700">
              Your use of third-party services is at your own risk and subject
              to their respective terms and conditions.
            </p>
          </div>

          {/* Disclaimer of Warranties */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              7. Disclaimer of Warranties
            </h2>
            <p className="text-neutral-700 mb-4">
              Our website and services are provided "AS IS" and "AS AVAILABLE"
              without warranties of any kind, either express or implied,
              including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              <li>Merchantability or fitness for a particular purpose</li>
              <li>Accuracy, reliability, or completeness of information</li>
              <li>Uninterrupted or error-free operation</li>
              <li>Freedom from viruses or harmful components</li>
            </ul>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              8. Limitation of Liability
            </h2>
            <p className="text-neutral-700 mb-4">
              To the fullest extent permitted by law, Swamy's Hot Foods shall
              not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising from:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              <li>Your use or inability to use the website</li>
              <li>Unauthorized access to your data</li>
              <li>Errors or omissions in website content</li>
              <li>Any third-party conduct or content</li>
            </ul>
            <p className="text-neutral-700 mt-4">
              Our total liability shall not exceed the amount you paid for
              services, if any.
            </p>
          </div>

          {/* Indemnification */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              9. Indemnification
            </h2>
            <p className="text-neutral-700">
              You agree to indemnify, defend, and hold harmless Swamy's Hot
              Foods, its owners, employees, and affiliates from any claims,
              damages, losses, liabilities, and expenses (including legal fees)
              arising from your use of the website, violation of these Terms, or
              infringement of any third-party rights.
            </p>
          </div>

          {/* Governing Law */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              10. Governing Law and Jurisdiction
            </h2>
            <p className="text-neutral-700 mb-4">
              These Terms shall be governed by and construed in accordance with
              the laws of India, without regard to conflict of law principles.
            </p>
            <p className="text-neutral-700">
              Any disputes arising from these Terms or your use of the website
              shall be subject to the exclusive jurisdiction of the courts in
              Nellore, Andhra Pradesh, India.
            </p>
          </div>

          {/* Changes to Terms */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              11. Changes to Terms
            </h2>
            <p className="text-neutral-700">
              We reserve the right to modify these Terms at any time. Changes
              will be effective immediately upon posting on this page with an
              updated "Last Updated" date. Your continued use of the website
              after changes constitutes acceptance of the modified Terms.
            </p>
          </div>

          {/* Termination */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              12. Termination
            </h2>
            <p className="text-neutral-700">
              We may terminate or suspend your access to the website
              immediately, without prior notice, for any reason, including
              breach of these Terms. Upon termination, your right to use the
              website will cease immediately.
            </p>
          </div>

          {/* Severability */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              13. Severability
            </h2>
            <p className="text-neutral-700">
              If any provision of these Terms is found to be unenforceable or
              invalid, that provision shall be limited or eliminated to the
              minimum extent necessary, and the remaining provisions shall
              remain in full force and effect.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-br from-green-50 to-saffron-50 rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              14. Contact Information
            </h2>
            <p className="text-neutral-700 mb-6">
              If you have questions about these Terms of Service, please contact
              us:
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-neutral-900">Address:</p>
                  <p className="text-neutral-700">
                    7-1-931, Opposite Railway Station
                    <br />
                    Nellore, Andhra Pradesh 524001
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-neutral-900">Phone:</p>
                  <a
                    href="tel:+919642415385"
                    className="text-green-600 hover:text-green-700"
                  >
                    +91 96424 15385
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-neutral-900">Email:</p>
                  <a
                    href="mailto:hello@swamyshotfoods.in"
                    className="text-green-600 hover:text-green-700"
                  >
                    hello@swamyshotfoods.in
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Acknowledgment */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mt-8">
            <p className="text-neutral-800 font-medium">
              By using our website, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Service.
            </p>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
