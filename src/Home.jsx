import React from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-800">

      <div className="fixed inset-0 -z-10 overflow-hidden">
  <div className="absolute w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-30 animate-pulse top-10 left-10"></div>
  <div className="absolute w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse bottom-10 right-10"></div>
</div>

      {/* NAVBAR */}
      <nav className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-8 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">CampusIQ</h1>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <button
            onClick={() => window.open('https://jenissi.me/Cgpa/index.html', '_blank')}
            className="w-full md:w-auto bg-blue-400 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition shadow-lg"
          >
            CGPA Calculator
          </button>

          <button
            onClick={() => navigate('/study')}
            className="w-full md:w-auto bg-blue-400 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition shadow-lg"
          >
            Study App
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          Your Smart Campus Companion
        </h2>

        <p className="text-base md:text-lg text-gray-500 mb-10 max-w-xl">
          Calculate Your CGPA and Supercharge your studies — All In One Place
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <button
            onClick={() => window.open('https://jenissi.me/Cgpa/index.html', '_blank')}
            className="w-full md:w-auto bg-blue-400 text-white px-4 py-3 rounded-full hover:bg-blue-600 transition shadow-lg"
          >
            CGPA Calculator
          </button>

          <button
            onClick={() => navigate('/study')}
            className="w-full md:w-auto bg-blue-400 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition shadow-lg"
          >
            Study App
          </button>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 py-12 md:py-16 px-4 md:px-16 bg-gray-50">

        {/* CGPA CARD */}
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300">
          <div className="text-4xl mb-4">🎓</div>

          <h3 className="text-xl font-bold mb-2">CGPA Calculator</h3>

          <p className="text-gray-600 mb-4">
            Easily calculate your cumulative GPA based on the Nigerian 5-point grading scale.
            Add courses, input grades, and get your results instantly.
          </p>

          <button
            onClick={() => window.open('https://jenissi.me/Cgpa/index.html', '_blank')}
            className="bg-blue-400 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition shadow-lg"
          >
            Open Calculator
          </button>
        </div>

        {/* STUDY APP CARD */}
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300">
          <div className="text-4xl mb-4">📚</div>

          <h3 className="text-xl font-bold mb-2">Study App</h3>

          <p className="text-gray-600 mb-4">
            Upload your lecture notes as a PDF and let AI generate quiz questions
            to test your understanding. Study smarter, not harder 😉
          </p>

          <button
            onClick={() => navigate('/study')}
            className="bg-blue-400 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition shadow-lg"
          >
            Start Studying ➡️
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <section className="bg-gray-600 flex flex-col items-center justify-center">
        <footer className="text-center p-6 md:p-10">
          <p className="text-gray-300 font-bold mb-2">
            Thank you for visiting! If you have any suggestions, corrections, or an awesome project
            you'd like me to be part of, please reach out.
          </p>

          <p className="text-white font-bold">
            CampusIQ · Copyright © 2026
          </p>
        </footer>
      </section>

    </div>
  );
}

export default Home;
