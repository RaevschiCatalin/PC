'use client'

import React, { useState, useEffect } from 'react';
import { Question } from '../../types/question';

const PersonalityTest: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch questions from the API route
    fetch('/api/questions')
      .then(response => response.json())
      .then(data => {
        setQuestions(data.questions);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const options = [
    "Completely disagree",
    "Somewhat disagree",
    "I don't know",
    "Somewhat agree",
    "Completely agree"
  ];

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const answers = JSON.parse(localStorage.getItem('answers') || '[]');
      answers[questionIndex] = selectedAnswer;
      localStorage.setItem('answers', JSON.stringify(answers));
      setSelectedAnswer(null);
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
      } else {
        alert('Quiz Completed!');
      }
    } else {
      alert('Please select an answer before proceeding.');
    }
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-row items-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 mb-4"></div>
            <h2 className="text-center text-2xl font-semibold">Loading...</h2>
            <p className="text-center text-lg">Please wait while we load the questions.</p>
          </div>
        </div>
     );
  }

  return (
    <div className="font-sans text-black p-5 max-w-4xl mx-auto mt-10">
      <h2 className="text-center text-4xl mb-10 font-bold">Personality Test</h2>
      {questions.length > 0 && (
        <>
          <p className="mb-5 text-center text-xl md:text-2xl lg:text-3xl">{questions[questionIndex].question}</p>
          <form className="flex justify-center items-center mb-10 space-x-4">
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={handleOptionChange}
                  className="hover:bg-black"
                />
                <label htmlFor={`option-${index}`} className="text-lg md:text-xl lg:text-2xl">{option}</label>
              </div>
            ))}
          </form>
          <button
            onClick={handleNextQuestion}
            className="block mx-auto px-6 py-3 outline_btn text-white text-lg md:text-xl rounded-lg cursor-pointer hover:bg-black transition duration-300 ease-in-out"
          >
            Next Question
          </button>
        </>
      )}
    </div>
  );
}

export default PersonalityTest;
