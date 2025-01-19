"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-gray-900 dark:via-blue-900 dark:to-gray-800 pt-16">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl sm:text-7xl font-bold text-gray-900 dark:text-white mb-8">
            Transform into a
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Triathlete </span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Your personalized to triathlon mastery
          </motion.p>

          <div className="flex gap-6 justify-center mb-16">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/create-plan"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Begin Your Journey
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/sample-plan"
              className="bg-white text-blue-600 px-10 py-4 rounded-full font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all"
            >
              View Sample Plan
            </motion.a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-20">
            {[
              {
                icon: "🏊‍♂️",
                title: "Swim Training",
                desc: "Master the water with expert technique analysis"
              },
              {
                icon: "🚴‍♂️",
                title: "Cycling Progress",
                desc: "Dominate the roads with power-based training"
              },
              {
                icon: "🏃‍♂️",
                title: "Run Development",
                desc: "Perfect your pace with smart progression"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                whileHover={{ scale: 1.03 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
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
        </motion.div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          © 2025 AdventDaily. Your triathlon journey starts here.
        </div>
      </footer>
    </div>
  );
}
