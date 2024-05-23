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
    <div className="font-sans text-black flex flex-col items-center justify-center min-h-screen">
      {questions.length > 0 && (
        <>
          <p className="mb-8 text-purple-600 text-3xl md:text-4xl lg:text-5xl">{questions[questionIndex].question}</p>
          <form className="flex flex-wrap justify-center items-center mb-12 mt-4 space-x-6 md:space-x-4">
            <p className='lg:text-2xl md:text-xl'>Strongly disagree</p>
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
            <p className='lg:text-2xl  md:text-xl'>Strongly agree</p>
          </form>
          <button
            onClick={handleNextQuestion}
            className="block mx-auto px-7 py-4 outline_btn text-white text-xl md:text-2xl rounded-lg cursor-pointer hover:bg-black transition duration-300 ease-in-out z-50"
          >
            Next Question
          </button> 
        </>
      )}
    </div>
  );
}

export default PersonalityTest;
