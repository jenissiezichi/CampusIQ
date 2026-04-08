
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc =
    new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();


function StudyApp() {
    const navigate = useNavigate();
    const [pdfText, setPdfText] = useState('');
    const [numQuestions, setNumQuestions] = useState(5);
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    async function handlePdfUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = async function(event) {
            try {
                const typedArray = new Uint8Array(event.target.result);
                const pdf = await pdfjsLib.getDocument(typedArray).promise;
                let fullText = '';

                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    const pageText = content.items.map((item) => item.str).join(' ');
                    fullText += pageText + '\n';
                }

                setPdfText(fullText);
                console.log('PDF text:', fullText);
                alert('PDF Loaded Successfully');

            } catch (error) {
                console.error('PDF Error:', error);
                alert('PDF Error: ' + error.message);
            }
        };

        reader.readAsArrayBuffer(file);
    }

    async function generateQuiz() {
        if (!pdfText) {
            alert('Please upload a PDF first!');
            return;
        }

        const count = Math.min(20, Math.max(1, Number.parseInt(numQuestions, 10) || 5));

        const API_KEY = 'AIzaSyA966T0JV3yL0IffvQAbs8BaHkD4DPvxUo';
        if (!API_KEY) {
            alert('Missing Gemini API key. Add VITE_GEMINI_API_KEY to a .env file and restart the dev server.');
            return;
        }

        setLoading(true);

        const prompt = `You are a quiz generator.
Based on the text below, generate exactly ${count} multiple choice questions.

Rules:
- Each question must have 4 options labeled A, B, C, D
- Indicate the correct answer
- Return ONLY a JSON array (no extra text, no markdown)

Format:
[
  {
    "question": "What is ...?",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "answer": "A. ..."
  }
]

Text:
${pdfText.slice(0, 10000)}
`;

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                    }),
                },
            );

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Gemini request failed (${response.status}): ${errText}`);
            }

            const data = await response.json();
            const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!rawText) throw new Error('Empty response from Gemini');

            const cleaned = rawText
                .replaceAll('```json', '')
                .replaceAll('```', '')
                .trim();

            const jsonMatch = cleaned.match(/\[[\s\S]*]/);
            const jsonText = (jsonMatch ? jsonMatch[0] : cleaned).trim();
            const parsed = JSON.parse(jsonText);
            if (!Array.isArray(parsed)) throw new Error('Gemini response is not a JSON array');

            setQuestions(parsed);
            setAnswers({});
            setSubmitted(false);
            setScore(0);
        } catch (error) {
            alert('Something went wrong. Check your API key or try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-white text-gray-800">
            <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-300">
                <h1 onClick={() => navigate('/')} className="text-2xl font-bold text-blue-600 cursor-pointer">CampusIQ</h1>
                <p className='text-blue-600 font-bold'>Study App</p>
            </nav>
<div className="max-w-2xl mx-auto py-16 px-4">
    <h2 className="text-3xl font-bold text-gray-900">Study Smarter😉</h2>
    <p className="text-gray-500 mb-10">Upload Your Lecture Notes and Let AI generate Quiz Questions for you.</p>

    <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload PDF</label>
        <input
            type="file"
            accept=".pdf"
            onChange={handlePdfUpload}
            className="w-full border border-gray-300 rounded-lg py-2 my-2 px-4 text-sm hover:border-blue-600"
        />
    </div>

    <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Questions</label>
        <input
            type="number"
            min="1"
            max="20"
            value={numQuestions}
            onChange={(e) => {
                const next = Number.parseInt(e.target.value, 10);
                if (Number.isNaN(next)) {
                    setNumQuestions('');
                    return;
                }
                setNumQuestions(Math.min(20, Math.max(1, next)));
            }}
            className="w-full border border-gray-300 rounded-lg py-2 my-2 px-4 text-sm hover:border-blue-600"
        />
    </div>

    <button
        onClick={generateQuiz}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
    >
        {loading ? 'Generating...' : 'Generate Quiz'}
    </button>

    {questions.length > 0 && (
        <div className="mt-10">
            {questions.map((q, index) => (
                <div key={index} className="mb-6">
                    <p className="font-medium mb-2">{index + 1}. {q.question}</p>
                    {q.options.map((option) => (
                        <div key={option} className="mb-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={option}
                                    checked={answers[index] === option}
                                    onChange={() => setAnswers({ ...answers, [index]: option })}
                                    disabled={submitted}
                                />
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            ))}

            {!submitted && (
                <button
                    onClick={() => {
                        let correct = 0;
                        questions.forEach((q, index) => {
                            if (answers[index] === q.answer) correct++;
                        });
                        setScore(correct);
                        setSubmitted(true);
                    }}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700"
                >
                    Submit Quiz
                </button>
            )}

            {submitted && (
                <div className="mt-6 text-center">
                    <h3 className="text-2xl font-bold">Your Score: {score} / {questions.length}</h3>
                </div>
            )}
        </div>
    )}
</div>
</div>
);
}

export default StudyApp;