import React from 'react'
import { Wrapper, ButtonWrapper } from '../components/questioncard.styles'

type props = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: any;
    questionNum: number;
    totalQuestions: number;
}

export const QuestionCard: React.FC<props> = ({question, answers, userAnswer,callback, questionNum, totalQuestions}) => {
    return (
        <Wrapper>
        
          <p> Question : {questionNum} / {totalQuestions} </p>
          <p dangerouslySetInnerHTML={{__html: question}} />
          <div>
              {answers.map(answer => (
                  <ButtonWrapper
                      correct = {userAnswer?.correctAnswer === answer}
                      userClicked = {userAnswer?.answer === answer} >

                      <button disabled={userAnswer} value={answer} onClick={callback}>
                          <span dangerouslySetInnerHTML={{__html: answer }}/>
                      </button>
                 </ButtonWrapper>     
              ))}
          </div>
          </Wrapper>
    )
}
