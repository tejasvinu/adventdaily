'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm fixed w-full z-50 top-0 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              AdventDaily
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="/training" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 rounded-md">
                Training Plans
              </Link>
              <Link href="/progress" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 rounded-md">
                Progress
              </Link>
              <Link href="/community" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 rounded-md">
                Community
              </Link>
              <Link href="/resources" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 rounded-md">
                Resources
              </Link>
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 rounded-md">
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/register" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 rounded-md">
                    Register
                  </Link>
                  <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)} // Ensure isMenuOpen is defined
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900">
            <Link href="/training" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 block px-3 py-2 rounded-md">
              Training Plans
            </Link>
            <Link href="/progress" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 block px-3 py-2 rounded-md">
              Progress
            </Link>
            <Link href="/community" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 block px-3 py-2 rounded-md">
              Community
            </Link>
            <Link href="/resources" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 block px-3 py-2 rounded-md">
              Resources
            </Link>
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 block px-3 py-2 rounded-md">
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 block px-3 py-2 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/register" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 block px-3 py-2 rounded-md">
                  Register
                </Link>
                <Link href="/login" className="bg-blue-600 text-white block px-3 py-2 rounded-md hover:bg-blue-700">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
