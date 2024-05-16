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
        <div className="flex items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-28 w-28 mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-black p-6 max-w-5xl mx-auto mt-12">
      <h2 className="text-center text-5xl mt-12 mb-14 font-bold">Personality Test</h2>
      {questions.length > 0 && (
        <>
          <p className="mb-8 text-center text-2xl md:text-3xl lg:text-4xl">{questions[questionIndex].question}</p>
          <form className="flex flex-wrap justify-center items-center mb-12 mt-4 space-x-8">
            <p className='text-2xl'>Strongly disagree</p>
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={handleOptionChange}
                  className="hover:bg-black h-8 w-8"
                />
              </div>
            ))}
            <p className='text-2xl'>Strongly Agree</p>
          </form>
          <button
            onClick={handleNextQuestion}
            className="block mx-auto px-7 py-4 outline_btn text-white text-xl md:text-2xl rounded-lg cursor-pointer hover:bg-black transition duration-300 ease-in-out"
          >
            Next Question
          </button> -
        </>
      )}
    </div>
  );
}

export default PersonalityTest;
