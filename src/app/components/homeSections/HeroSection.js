export default function HeroSection() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat h-[70vh] sm:h-screen pt-16"
      style={{
        backgroundImage: "url('/HeroBackground.jpg')",
        backgroundSize: "cover",
      }}
    >
      <div className="relative z-10 max-w-10xl mx-auto px-4 sm:px-8 lg:px-16 flex items-center h-full">
        <div className="text-left text-slate-500">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Find Your Soulmate
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6">
            Join millions in the quest for love and companionship.
          </p>
          <a
            href="/register"
            className="inline-block bg-red-500 hover:bg-red-600 text-white text-sm sm:text-lg py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium"
          >
            Register Now
          </a>
        </div>
      </div>
    </section>
  );
}
