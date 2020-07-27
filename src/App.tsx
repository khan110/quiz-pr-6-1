import React, { useState } from 'react';
import { QuestionState, fetchQuestions, Difficulty} from './Api';
import { QuestionCard } from './components/QuestionCard';
import { GlobalStyle, Wrapper } from './App.styles';


// total number of Questions
const TOTAL_QUESTIONS = 10;

type AnswerObject = {
   question: String;
   answer: String;
   correct: boolean;
   correctAnswer: String;
}
function App() {
// use states
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUseranswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameover] = useState(true); 

  console.log(questions);

  //quiz

  const startQuiz = async() => {
    setLoading(true);
    setGameover(false);
  const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
  setQuestions(newQuestions); setScore(0); setUseranswer([]);setNumber(0);setLoading(false);  
  };


  //next button
  const nextQues = async() => {
    const nextQuestion = number + 1; if (nextQuestion === TOTAL_QUESTIONS)
    { setGameover(true);}
    else {setNumber(nextQuestion)}
  }; 




// check answer function
  const  checkAnswer = (e:React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value; 
      const correct  = questions[number].correct_answer === answer;
      if (correct) setScore(prev => prev + 1)
      const answerObject = {
        question: questions[number].question,answer,correct,correctAnswer: questions[number].correct_answer
      }
      setUseranswer(prev => [...prev, answerObject])
    }
  };



  return (
    <>
    <GlobalStyle/>
    <Wrapper>
     <h1>Quiz</h1>
     <img className="bgx" src={require('./components/BG-quiz-app.jpg')} alt="bg" />

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
    </Wrapper>
    </>
  );
}

export default App;
