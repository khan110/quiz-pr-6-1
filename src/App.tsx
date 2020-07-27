import React, { useState } from 'react';
import { QuestionState, fetchQuestions, Difficulty} from './Api';
import { QuestionCard } from './components/QuestionCard';


const TOTAL_QUESTIONS = 10;

type AnswerObject = {
   question: String;
   answer: String;
   correct: boolean;
   correctAnswer: String;
}
function App() {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUseranswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameover] = useState(true); 

  console.log(questions);

  const startQuiz = async() => {
    setLoading(true);
    setGameover(false);
  const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
  setQuestions(newQuestions); setScore(0); setUseranswer([]);setNumber(0);setLoading(false);  
  };

  const nextQues = async() => {}; 

  const  checkAnswer = (e:React.MouseEvent<HTMLButtonElement>) => {};
  return (
    <div>
     <h1>Quiz</h1>

     {gameOver || userAnswers.length === TOTAL_QUESTIONS ?
     (<button className="start" onClick={startQuiz}>Begin Quiz</button>) : null }
     
     {!gameOver ? 
     (<p className='score'>Score :{score}</p>) : null }



     {loading ? (<p>Loading</p>) : null}


     {!loading && !gameOver ?
     (<QuestionCard questionNum={number + 1}
      totalQuestions={TOTAL_QUESTIONS}
      question={questions[number].question}
      answers={questions[number].answers}
      userAnswer={userAnswers ? userAnswers[number] : undefined }
      callback={checkAnswer}/>) : null }

      {!gameOver && !loading && userAnswers.length === number +1 && number !== TOTAL_QUESTIONS - 1 ?
     (<button className="Next" onClick={nextQues}>Next</button>) : null}
    </div>
  );
}

export default App;
