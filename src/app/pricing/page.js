"use client";
import Pricing from "../../components/homeSections/Pricing";

export default function PricingPage() {
  return (
    <main className="bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Pricing />
      </div>
      {/* Footer */}
      <footer className="bg-dark-gray py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h4 className="text-lg font-semibold text-red-500 mb-2">
            Swyamvar.com
          </h4>
          <p className="text-gray-400 text-sm">
            © 2024 Swyamvar.com. All rights reserved. | Privacy Policy | Terms
            of Service
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
