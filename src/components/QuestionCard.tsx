import React from 'react'

type props = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: any;
    questionNum: number;
    totalQuestions: number;
}

export const QuestionCard: React.FC<props> = ({question, answers, userAnswer, questionNum, totalQuestions}) => {
    return (
        <div>
          <p> Question : {questionNum} / {totalQuestions} </p>
          <p dangerouslySetInnerHTML={{__html: question}} />
          <div>
              {answers.map(answer => (
                  <div>
                      <button disabled={userAnswer} onClick={userAnswer}>
                          <span dangerouslySetInnerHTML={{__html: answer }}/>
                      </button>
                 </div>     
              ))}
          </div>
        </div>
    )
}