import { Metadata } from "next";
import Link from "next/link";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Swamy's Hot Foods - How we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-neutral-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            <span>Your Privacy Matters</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
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
              Swamy's Hot Foods ("we," "our," or "us") is committed to
              protecting your privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              visit our website{" "}
              <a
                href="https://swamyshotfoods.in"
                className="text-green-600 hover:text-green-700"
              >
                swamyshotfoods.in
              </a>{" "}
              and use our services.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              1. Information We Collect
            </h2>

            <h3 className="font-semibold text-xl text-neutral-800 mb-3 mt-6">
              1.1 Information You Provide
            </h3>
            <p className="text-neutral-700 mb-4">
              We may collect information that you voluntarily provide when you:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2 mb-4">
              <li>Contact us via phone, email, or WhatsApp</li>
              <li>Submit reviews or feedback</li>
              <li>Interact with our social media pages</li>
              <li>Subscribe to our newsletter (if applicable)</li>
            </ul>
            <p className="text-neutral-700">
              This may include: name, email address, phone number, and feedback
              content.
            </p>

            <h3 className="font-semibold text-xl text-neutral-800 mb-3 mt-6">
              1.2 Automatically Collected Information
            </h3>
            <p className="text-neutral-700 mb-4">
              When you visit our website, we automatically collect:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Referring website addresses</li>
              <li>Cookie data (see Cookie Policy below)</li>
            </ul>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-neutral-700 mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              <li>Respond to your inquiries and provide customer service</li>
              <li>Process and fulfill your requests</li>
              <li>Improve our website and services</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Analyze website usage and trends</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and enhance security</li>
            </ul>
          </div>

          {/* Cookies */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              3. Cookies and Tracking Technologies
            </h2>
            <p className="text-neutral-700 mb-4">
              We use cookies and similar tracking technologies to enhance your
              browsing experience. Cookies are small data files stored on your
              device.
            </p>
            <h3 className="font-semibold text-xl text-neutral-800 mb-3 mt-6">
              Types of Cookies We Use:
            </h3>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              <li>
                <strong>Essential Cookies:</strong> Required for website
                functionality
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how
                visitors use our site
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your settings and
                preferences
              </li>
            </ul>
            <p className="text-neutral-700 mt-4">
              You can control cookies through your browser settings. Note that
              disabling cookies may affect website functionality.
            </p>
          </div>

          {/* Third-Party Services */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              4. Third-Party Services
            </h2>
            <p className="text-neutral-700 mb-4">
              We use the following third-party services:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              <li>
                <strong>Google Analytics:</strong> For website analytics
              </li>
              <li>
                <strong>Google Maps:</strong> For location services
              </li>
              <li>
                <strong>Social Media Platforms:</strong> Facebook, Instagram for
                social integration
              </li>
              <li>
                <strong>WhatsApp:</strong> For customer communication
              </li>
            </ul>
            <p className="text-neutral-700 mt-4">
              These services have their own privacy policies. We encourage you
              to review them.
            </p>
          </div>

          {/* Data Security */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              5. Data Security
            </h2>
            <p className="text-neutral-700">
              We implement appropriate technical and organizational security
              measures to protect your personal information. However, no method
              of transmission over the internet is 100% secure. While we strive
              to protect your data, we cannot guarantee absolute security.
            </p>
          </div>

          {/* Your Rights */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              6. Your Rights
            </h2>
            <p className="text-neutral-700 mb-4">
              Under Indian data protection laws, you have the right to:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="text-neutral-700 mt-4">
              To exercise these rights, please contact us using the information
              below.
            </p>
          </div>

          {/* Children's Privacy */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              7. Children's Privacy
            </h2>
            <p className="text-neutral-700">
              Our website is not intended for children under 13 years of age. We
              do not knowingly collect personal information from children. If
              you believe we have collected information from a child, please
              contact us immediately.
            </p>
          </div>

          {/* Changes to Policy */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              8. Changes to This Privacy Policy
            </h2>
            <p className="text-neutral-700">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              with an updated "Last Updated" date. We encourage you to review
              this policy periodically.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-br from-green-50 to-saffron-50 rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
              9. Contact Us
            </h2>
            <p className="text-neutral-700 mb-6">
              If you have questions about this Privacy Policy or our data
              practices, please contact us:
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
