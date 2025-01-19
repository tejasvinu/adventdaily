import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pt-16">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Your Journey to
            <span className="text-blue-600 dark:text-blue-400"> Triathlon </span>
            Excellence
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Comprehensive 2-month training plans that adapt to your progress and schedule
          </p>

          <div className="flex gap-4 justify-center mb-16">
            <a
              href="/create-plan"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Start Your Plan
            </a>
            <a
              href="/sample-plan"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold border border-blue-600 hover:bg-blue-50 transition"
            >
              View Sample Plan
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-20">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">🏊‍♂️ Swim Training</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Structured swim workouts with technique analysis and pacing strategies
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">🚴‍♂️ Cycling Progress</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Power-based training zones and route planning for optimal preparation
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">🏃‍♂️ Run Development</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Progressive run training with heart rate monitoring and pace guidance
              </p>
            </div>
          </div>

          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8">Adaptive Training Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Dynamic Plan Adjustment</h3>
                <ul className="text-left space-y-3">
                  <li>• Real-time workout modifications based on performance</li>
                  <li>• Recovery-based training intensity adjustments</li>
                  <li>• Weather-adaptive outdoor session alternatives</li>
                  <li>• Schedule flexibility for work-life balance</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Progress Tracking</h3>
                <ul className="text-left space-y-3">
                  <li>• Discipline-specific performance metrics</li>
                  <li>• Transition practice timing</li>
                  <li>• Weekly progress reports</li>
                  <li>• Race-day readiness indicators</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="text-left mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">2-Month Plan Overview</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-semibold mb-2">Weeks 1-2: Foundation</h3>
                <p className="text-gray-600 dark:text-gray-300">Base endurance building and technique focus</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold mb-2">Weeks 3-4: Build Phase</h3>
                <p className="text-gray-600 dark:text-gray-300">Increasing intensity and brick workouts</p>
              </div>
              <div className="border-l-4 border-blue-400 pl-4">
                <h3 className="font-semibold mb-2">Weeks 5-6: Peak Training</h3>
                <p className="text-gray-600 dark:text-gray-300">Race-specific workouts and endurance peaks</p>
              </div>
              <div className="border-l-4 border-blue-300 pl-4">
                <h3 className="font-semibold mb-2">Weeks 7-8: Taper & Race Prep</h3>
                <p className="text-gray-600 dark:text-gray-300">Recovery, race simulation, and final preparations</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          © 2024 AdventDaily. Achieve your triathlon dreams.
        </div>
      </footer>
    </div>
  );
}
