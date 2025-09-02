import { AssessmentResponse, AssessmentResult, WiscarScores } from '@/types/assessment';
import { assessmentQuestions } from '@/data/questions';

export const calculateAssessmentResult = (responses: AssessmentResponse[]): AssessmentResult => {
  // Calculate Psychometric Fit Score
  const psychometricResponses = responses.filter(r => 
    assessmentQuestions.find(q => q.id === r.questionId)?.category === 'psychometric'
  );
  
  const psychometricFitScore = calculateCategoryScore(psychometricResponses, 'psychometric');

  // Calculate Technical Readiness Score
  const technicalResponses = responses.filter(r => 
    assessmentQuestions.find(q => q.id === r.questionId)?.category === 'technical'
  );
  
  const technicalReadinessScore = calculateTechnicalScore(technicalResponses);

  // Calculate WISCAR Scores
  const wiscarResponses = responses.filter(r => 
    assessmentQuestions.find(q => q.id === r.questionId)?.category === 'wiscar'
  );
  
  const wiscarScores = calculateWiscarScores(wiscarResponses);

  // Calculate overall confidence score
  const confidenceScore = Math.round(
    (psychometricFitScore * 0.3 + technicalReadinessScore * 0.3 + getWiscarAverage(wiscarScores) * 0.4)
  );

  // Determine recommendation
  const recommendation = getRecommendation(psychometricFitScore, technicalReadinessScore, wiscarScores);

  // Generate personalized suggestions
  const suggestedNextSteps = generateNextSteps(psychometricFitScore, technicalReadinessScore, wiscarScores);
  
  // Career matches based on scores
  const careerMatches = getCareerMatches(psychometricFitScore, technicalReadinessScore);

  // Learning path
  const learningPath = getLearningPath(technicalReadinessScore, wiscarScores);

  return {
    userId: 'anonymous',
    psychometricFitScore,
    technicalReadinessScore,
    wiscarScores,
    recommendation,
    confidenceScore,
    suggestedNextSteps,
    careerMatches,
    learningPath,
    personalityType: getPersonalityType(psychometricResponses),
    skillGaps: getSkillGaps(technicalResponses, wiscarResponses)
  };
};

const calculateCategoryScore = (responses: AssessmentResponse[], category: string): number => {
  const relevantQuestions = assessmentQuestions.filter(q => q.category === category);
  let totalScore = 0;
  let totalWeight = 0;

  relevantQuestions.forEach(question => {
    const response = responses.find(r => r.questionId === question.id);
    if (response) {
      const normalizedScore = normalizeScore(response.answer, question.type);
      totalScore += normalizedScore * question.weight;
      totalWeight += question.weight;
    }
  });

  return totalWeight > 0 ? Math.round((totalScore / totalWeight) * 100) : 0;
};

const calculateTechnicalScore = (responses: AssessmentResponse[]): number => {
  const technicalQuestions = assessmentQuestions.filter(q => q.category === 'technical');
  let correctAnswers = 0;
  let totalQuestions = 0;

  technicalQuestions.forEach(question => {
    const response = responses.find(r => r.questionId === question.id);
    if (response) {
      totalQuestions++;
      if (isCorrectAnswer(question.id, response.answer as string)) {
        correctAnswers++;
      }
    }
  });

  return totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
};

const calculateWiscarScores = (responses: AssessmentResponse[]): WiscarScores => {
  const categories = ['will', 'interest', 'skill', 'cognitive', 'ability', 'realWorld'];
  const scores: any = {};

  categories.forEach(category => {
    const categoryResponses = responses.filter(r => {
      const question = assessmentQuestions.find(q => q.id === r.questionId);
      return question?.subcategory === category;
    });
    
    scores[category] = calculateCategoryScore(categoryResponses, 'wiscar');
  });

  return scores as WiscarScores;
};

const normalizeScore = (answer: string | number, questionType: string): number => {
  if (questionType === 'likert') {
    return (Number(answer) - 1) / 4; // Convert 1-5 to 0-1
  }
  if (questionType === 'yes-no') {
    return answer === 'yes' ? 1 : 0;
  }
  return 0.5; // Default for multiple choice (handled separately)
};

const isCorrectAnswer = (questionId: string, answer: string): boolean => {
  const correctAnswers: Record<string, string> = {
    'tech_1': 'General Data Protection Regulation',
    'tech_2': '5%',
    'tech_3': 'Anti-Money Laundering',
    'tech_4': 'To verify customer identity and assess risk',
    'tech_5': 'Probability vs Impact',
    'tech_6': 'Financial reporting accuracy'
  };
  
  return correctAnswers[questionId] === answer;
};

const getWiscarAverage = (wiscarScores: WiscarScores): number => {
  const scores = Object.values(wiscarScores);
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
};

const getRecommendation = (psychometric: number, technical: number, wiscar: WiscarScores): 'Yes' | 'No' | 'Maybe' => {
  const overall = (psychometric + technical + getWiscarAverage(wiscar)) / 3;
  
  if (overall >= 75 && psychometric >= 70 && technical >= 60) return 'Yes';
  if (overall >= 55) return 'Maybe';
  return 'No';
};

const generateNextSteps = (psychometric: number, technical: number, wiscar: WiscarScores): string[] => {
  const steps: string[] = [];
  
  if (technical < 70) {
    steps.push('Study fundamental compliance regulations (GDPR, AML, SOX)');
    steps.push('Practice numerical reasoning and risk calculations');
  }
  
  if (wiscar.skill < 70) {
    steps.push('Develop proficiency in Excel and data analysis tools');
    steps.push('Practice writing formal reports and documentation');
  }
  
  if (psychometric >= 70 && technical >= 70) {
    steps.push('Consider pursuing CRCM or CAMS certification');
    steps.push('Look for entry-level compliance analyst positions');
  }
  
  if (wiscar.interest < 60) {
    steps.push('Shadow a compliance professional to better understand the role');
    steps.push('Explore related fields like business analysis or legal tech');
  }

  return steps;
};

const getCareerMatches = (psychometric: number, technical: number): string[] => {
  const matches: string[] = [];
  
  if (psychometric >= 70 && technical >= 70) {
    matches.push('Risk Compliance Specialist', 'Regulatory Affairs Officer', 'Internal Auditor');
  } else if (psychometric >= 60) {
    matches.push('Compliance Analyst', 'Business Process Analyst', 'Corporate Policy Writer');
  } else {
    matches.push('Business Analyst', 'Data Analyst', 'Operations Specialist');
  }
  
  return matches;
};

const getLearningPath = (technical: number, wiscar: WiscarScores) => {
  return {
    beginner: [
      'Introduction to Risk & Compliance',
      'Business Ethics Fundamentals',
      'Regulatory Framework Overview'
    ],
    intermediate: [
      'GRC Tools & Software',
      'Compliance Documentation',
      'Risk Assessment Methodologies'
    ],
    jobReady: [
      'CRCM Certification Program',
      'Advanced Risk Analytics',
      'Compliance Audit Practices'
    ]
  };
};

const getPersonalityType = (responses: AssessmentResponse[]): string => {
  const detailOriented = responses.find(r => r.questionId === 'psych_4');
  const structured = responses.find(r => r.questionId === 'psych_3');
  
  if (detailOriented && Number(detailOriented.answer) >= 4 && structured && Number(structured.answer) >= 4) {
    return 'Analytical-Conscientious';
  }
  return 'General';
};

const getSkillGaps = (technicalResponses: AssessmentResponse[], wiscarResponses: AssessmentResponse[]): string[] => {
  const gaps: string[] = [];
  
  const numericalSkill = technicalResponses.find(r => r.questionId === 'tech_2');
  if (numericalSkill && !isCorrectAnswer('tech_2', numericalSkill.answer as string)) {
    gaps.push('Numerical reasoning');
  }
  
  const regulatoryKnowledge = technicalResponses.filter(r => 
    ['tech_1', 'tech_3', 'tech_4'].includes(r.questionId)
  );
  const correctRegulatory = regulatoryKnowledge.filter(r => 
    isCorrectAnswer(r.questionId, r.answer as string)
  );
  
  if (correctRegulatory.length < regulatoryKnowledge.length * 0.7) {
    gaps.push('Regulatory knowledge');
  }
  
  return gaps;
};