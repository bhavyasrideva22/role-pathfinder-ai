export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple-choice' | 'yes-no';
  options?: string[];
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory: string;
  weight: number;
}

export interface AssessmentResponse {
  questionId: string;
  answer: string | number;
  timestamp: Date;
}

export interface WiscarScores {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

export interface AssessmentResult {
  userId: string;
  psychometricFitScore: number;
  technicalReadinessScore: number;
  wiscarScores: WiscarScores;
  recommendation: 'Yes' | 'No' | 'Maybe';
  confidenceScore: number;
  suggestedNextSteps: string[];
  careerMatches: string[];
  learningPath: {
    beginner: string[];
    intermediate: string[];
    jobReady: string[];
  };
  personalityType?: string;
  skillGaps?: string[];
}