'use client'

import React, { useState, useEffect } from 'react';
import { Question } from '../../types/question';
import {updateQuiz} from "../../backend";
import {router} from "next/client";
import {useRouter} from "next/navigation";

const PersonalityTest: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
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
        // adds up scores and pushes them into db after quiz is over
        let values = []
        for (let index = 0; index < questions.length; index++){
          if (answers[index] == "Completely disagree")
            values[index] = 1;
          if (answers[index] == "Somewhat disagree")
            values[index] = 2;
          if (answers[index] == "I don't know")
            values[index] = 3;
          if (answers[index] == "Somewhat agree")
            values[index] = 4;
          if (answers[index] == "Completely agree")
            values[index] = 5;
        }
        let E = 20;
        let A = 14;
        let C = 14;
        let N = 38;
        let O = 8;
        for (let index = 0; index < questions.length; index++){
          if (questions[index].score == "+"){
            if (questions[index].type == "E")
              E += values[index];
            if (questions[index].type == "A")
              A += values[index];
            if (questions[index].type == "C")
              C += values[index];
            if (questions[index].type == "N")
              N += values[index];
            if (questions[index].type == "O")
              O += values[index];
          }
          else{
            if (questions[index].type == "E")
              E -= values[index];
            if (questions[index].type == "A")
              A -= values[index];
            if (questions[index].type == "C")
              C -= values[index];
            if (questions[index].type == "N")
              N -= values[index];
            if (questions[index].type == "O")
              O -= values[index];
          }
        }
        updateQuiz(E, A, C, N, O);
        console.log(E, A, C, N, O);
        alert('Quiz Completed!');
        router.push('/profile');
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