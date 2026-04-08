import React from 'react';
import './index.css';
import {useNavigate} from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white text-gray-800">
            <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-blue-600">CampusIQ</h1>
                <div className="flex gap-6">

                    <button onClick={() => window.open('/Cgpa/Cgpa.html', '_blank')} className="cursor-pointer bg-blue-400 text-white px-3 py-2 rounded-full
    hover:bg-blue-600 transition shadow-lg">CGPA Calculator
                    </button>

                    <button onClick={() => navigate('/study')} className="cursor-pointer bg-blue-400 text-white px-3 py-3 rounded-full
    hover:bg-blue-600 transition shadow-lg">StudyApp
                    </button>
                </div>
            </nav>


            <section className="flex items-center justify-between px-4 py-24 flex-col">
                <h2 className="text-5xl font-bold text-gray-900 mb-6">Your Smart Campus Companion </h2>
                <p className="text-lg text-gray-500 mb-10 max-w-xl">Calculate Your CGPA and Supercharge your
                    studies -- All In One Place</p>
                <div className="flex gap-4">
                    <button onClick={() => window.open('/Cgpa/Cgpa.html', '_blank')} className="cursor-pointer bg-blue-400 text-white px-4 py-3 rounded-full
    hover:bg-blue-600 transition shadow-lg">CGPA Calculator
                    </button>

                    <button onClick={() => navigate('/study')} className="cursor-pointer bg-blue-400 text-white px-6 py-3 rounded-full
    hover:bg-blue-600 transition shadow-lg">StudyApp
                    </button>

                </div>
            </section>
            <section className="grid grid-cols-2 gap-8 py-16 px-16 bg-gray-50">

                <div
                    className="bg-white rounded-xl o-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                    <div className="text-4xl mb-4">🎓</div>
                    <h3 className="text-xl font-bold mb-2">CGPA Calculator</h3>
                    <p className="text-gray-600 text-center mb-4">Easily Calculate your Cumulative GPA based on the
                        Nigerian 5-point grading scale.
                        Add Courses, input Grades, and get your results instantly</p>
                    <button className="cursor-pointer bg-blue-400 text-white px-6 py-3 rounded-full
    hover:bg-blue-600 transition shadow-lgcursor-pointer bg-blue-400 text-white px-6 py-3 rounded-full
    hover:bg-blue-600 transition shadow-lg mb-2">Open Calculator
                    </button>
                </div>

                <div
                    className="bg-white rounded-xl o-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                    <div className="text-4xl mb-4">📚</div>
                    <h3 className="text-xl font-bold mb-2">CGPA Calculator</h3>
                    <p className="text-gray-600 text-center mb-4">Upload your lecture notes as a pdf and let AI generate
                        a quiz
                        question to test your understanding. So study Smarter Not Harder😉</p>
                    <button className="cursor-pointer bg-blue-400 text-white px-6 py-3 rounded-full
    hover:bg-blue-600 transition shadow-lgcursor-pointer bg-blue-400 text-white px-6 py-3 rounded-full
    hover:bg-blue-600 transition shadow-lg mb-2">Start Studying ➡️
                    </button>
                </div>
            </section>

            <section id="contact2" className="fade-in bg-gray-600 flex flex-col items-center justify-center">
                <footer
                    className="footer footer-horizontal footer-center bg-main text-base-content rounded p-10 flex flex-col">

                    <aside>
                        <p className="text-gray-300 font-bold text-center">
                            Thank you for visiting! If you have any suggestions, corrections, or an awesome project
                            you'd like me to be part of, please reach out by clicking any icon below
                        </p>
                        <p className="text-white font-bold text-center">
                            CampusIQ · Copyright © <span id="footerYear">2026</span>
                        </p>
                    </aside>

                </footer>
            </section>

        </div>
    );
}

export default Home;