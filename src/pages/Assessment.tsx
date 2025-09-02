import { useState } from 'react';
import { AssessmentCard } from '@/components/AssessmentCard';
import { QuestionCard } from '@/components/QuestionCard';
import { ResultsPage } from '@/components/ResultsPage';
import { assessmentQuestions } from '@/data/questions';
import { calculateAssessmentResult } from '@/utils/assessmentLogic';
import { AssessmentResponse, AssessmentResult } from '@/types/assessment';

type AssessmentState = 'intro' | 'questions' | 'results';

export const Assessment = () => {
  const [state, setState] = useState<AssessmentState>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const handleStartAssessment = () => {
    setState('questions');
    setCurrentQuestionIndex(0);
    setResponses([]);
  };

  const handleAnswer = (answer: string | number) => {
    const currentQuestion = assessmentQuestions[currentQuestionIndex];
    const newResponse: AssessmentResponse = {
      questionId: currentQuestion.id,
      answer,
      timestamp: new Date()
    };

    const updatedResponses = [...responses];
    const existingIndex = updatedResponses.findIndex(r => r.questionId === currentQuestion.id);
    
    if (existingIndex >= 0) {
      updatedResponses[existingIndex] = newResponse;
    } else {
      updatedResponses.push(newResponse);
    }
    
    setResponses(updatedResponses);

    // Move to next question or show results
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    } else {
      // Calculate and show results
      setTimeout(() => {
        const assessmentResult = calculateAssessmentResult(updatedResponses);
        setResult(assessmentResult);
        setState('results');
      }, 300);
    }
  };

  const handleRestart = () => {
    setState('intro');
    setCurrentQuestionIndex(0);
    setResponses([]);
    setResult(null);
  };

  const getCurrentAnswer = () => {
    const currentQuestion = assessmentQuestions[currentQuestionIndex];
    const response = responses.find(r => r.questionId === currentQuestion.id);
    return response?.answer;
  };

  if (state === 'intro') {
    return <AssessmentCard onStartAssessment={handleStartAssessment} />;
  }

  if (state === 'questions') {
    return (
      <QuestionCard
        question={assessmentQuestions[currentQuestionIndex]}
        currentIndex={currentQuestionIndex}
        totalQuestions={assessmentQuestions.length}
        onAnswer={handleAnswer}
        selectedAnswer={getCurrentAnswer()}
      />
    );
  }

  if (state === 'results' && result) {
    return <ResultsPage result={result} onRestart={handleRestart} />;
  }

  return null;
};

export default Assessment;