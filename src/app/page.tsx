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
            Build Better
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Daily Habits </span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Your personal journey to mindful daily growth
          </motion.p>

          <div className="flex gap-6 justify-center mb-16">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/register"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Start Your Journey
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/demo"
              className="bg-white text-blue-600 px-10 py-4 rounded-full font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all"
            >
              View Demo
            </motion.a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-20">
            {[
              {
                icon: "📝",
                title: "Daily Reflections",
                desc: "Capture your thoughts and progress with guided journaling"
              },
              {
                icon: "⚡",
                title: "Habit Tracking",
                desc: "Build and maintain positive daily routines"
              },
              {
                icon: "📊",
                title: "Progress Insights",
                desc: "Visualize your growth with detailed analytics"
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
            <h2 className="text-3xl font-bold mb-8">Smart Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Personalized Experience</h3>
                <ul className="text-left space-y-3">
                  <li>• Customizable habit templates</li>
                  <li>• Intelligent reminder system</li>
                  <li>• Mood and energy tracking</li>
                  <li>• Goal-setting assistance</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Powerful Analytics</h3>
                <ul className="text-left space-y-3">
                  <li>• Detailed progress reports</li>
                  <li>• Habit correlation insights</li>
                  <li>• Success streak tracking</li>
                  <li>• Personal trend analysis</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="text-left mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Your Growth Journey</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-semibold mb-2">Phase 1: Foundation</h3>
                <p className="text-gray-600 dark:text-gray-300">Set up your personal habits and reflection routine</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold mb-2">Phase 2: Development</h3>
                <p className="text-gray-600 dark:text-gray-300">Build consistency and track your progress</p>
              </div>
              <div className="border-l-4 border-blue-400 pl-4">
                <h3 className="font-semibold mb-2">Phase 3: Mastery</h3>
                <p className="text-gray-600 dark:text-gray-300">Analyze patterns and optimize your routines</p>
              </div>
              <div className="border-l-4 border-blue-300 pl-4">
                <h3 className="font-semibold mb-2">Phase 4: Integration</h3>
                <p className="text-gray-600 dark:text-gray-300">Transform habits into lasting lifestyle changes</p>
              </div>
            </div>
          </section>
        </motion.div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          © 2025 AdventDaily. Your daily growth companion.
        </div>
      </footer>
    </div>
  );
}
