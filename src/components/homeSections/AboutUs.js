export default function AboutUs() {
  return (
    <section className="relative bg-black min-h-screen py-8 px-4 sm:px-6 lg:px-16 flex flex-col lg:flex-row justify-between items-center rounded-md">
      <div className="lg:w-1/2 text-white text-justify">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
          About Us
        </h1>
        <p className="text-base sm:text-lg mb-3 sm:mb-4 text-gray-300">
          Swyamvar.com is dedicated to connecting individuals seeking meaningful
          relationships. Our platform provides a safe space where people can
          find true companionship based on shared values and interests.
        </p>
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Innovation</h2>
          <p className="text-sm sm:text-md mb-2 sm:mb-4">
            Our pioneering approach combines cutting-edge technology with
            traditional matchmaking principles to offer a unique and effective
            solution for finding meaningful relationships.
          </p>
          <hr className="border-t border-gray-600" />
        </div>

        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            Customer-Centric
          </h2>
          <p className="text-sm sm:text-md mb-2 sm:mb-4 text-gray-300">
            We are committed to providing our clients with exceptional service,
            ensuring privacy and security while fostering genuine connections
            based on compatibility and shared values.
          </p>
          <hr className="border-t border-gray-600" />
        </div>

        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Expertise</h2>
          <p className="text-sm sm:text-md mb-2 sm:mb-4 text-gray-300">
            Our team of experienced professionals brings a wealth of knowledge
            in relationship dynamics, technology, and customer service, ensuring
            a high-quality experience for every user.
          </p>
          <hr className="border-t border-gray-600" />
        </div>

        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Integrity</h2>
          <p className="text-sm sm:text-md mb-2 sm:mb-4 text-gray-300">
            Transparency and honesty are at the core of our values, guiding
            every decision we make and fostering trust and integrity in all our
            interactions.
          </p>
          <hr className="border-t border-gray-600" />
        </div>
      </div>
      <div className="lg:w-1/2 flex justify-center mt-6 lg:mt-0 animate-fadeIn">
        <img
          src="/AboutUs.jpg"
          alt="About Us"
          className="rounded-sm w-full sm:w-2/3 md:w-1/2 lg:w-3/5 shadow-lg"
        />
      </div>
    </section>
  );
}
