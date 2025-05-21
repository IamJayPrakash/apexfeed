import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const About = () => {
  return (
    <div>
      <Head>
        <title>About Us - ApexFeed</title>
        <meta
          name="description"
          content="Learn more about ApexFeed and our mission."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto py-12 px-4 md:px-8 lg:px-16 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-6">
            About ApexFeed
          </h1>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <Image
                src="/api/placeholder/600/400"
                alt="ApexFeed Team"
                className="rounded-lg shadow-lg w-full"
                width={600}
                height={400}
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At ApexFeed, we&apos;re passionate about delivering
                high-quality, informative content that keeps our readers ahead
                of the curve. We believe in the power of knowledge sharing and
                creating a space where tech enthusiasts, professionals, and
                curious minds can find valuable insights.
              </p>
              <p className="text-lg text-gray-600">
                Founded in 2024, our platform aims to bridge the gap between
                complex technological advancements and accessible information,
                making cutting-edge insights available to everyone.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-card rounded-xl p-8 shadow-sm mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-card p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">
                  Insightful Articles
                </h3>
                <p className="text-gray-600 text-center">
                  Well-researched, engaging content that explores the latest
                  trends and developments.
                </p>
              </div>

              <div className="bg-white dark:bg-card p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">
                  Expert Analysis
                </h3>
                <p className="text-gray-600 text-center">
                  Deep dives into complex topics with expert perspectives and
                  commentary.
                </p>
              </div>

              <div className="bg-white dark:bg-card p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">
                  Community Focus
                </h3>
                <p className="text-gray-600 text-center">
                  Building connections among like-minded individuals passionate
                  about technology and innovation.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Accuracy & Integrity
                  </h3>
                  <p className="text-gray-600">
                    We&apos;re committed to delivering factual, well-researched
                    content that our readers can trust and rely on.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Innovation
                  </h3>
                  <p className="text-gray-600">
                    We embrace new ideas and technologies, constantly evolving
                    our approach to content creation and delivery.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Accessibility
                  </h3>
                  <p className="text-gray-600">
                    We strive to make complex information accessible to
                    everyone, regardless of their technical background.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Community
                  </h3>
                  <p className="text-gray-600">
                    We value the power of community and encourage dialogue,
                    collaboration, and shared learning.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-card rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Join Our Community
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              We&apos;re more than just a blog — we&apos;re a community of
              forward-thinkers and innovators. Subscribe to our newsletter,
              follow us on social media, or get in touch to become part of the
              ApexFeed family.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
