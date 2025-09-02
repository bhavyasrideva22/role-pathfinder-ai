import { Question } from '@/types/assessment';

export const assessmentQuestions: Question[] = [
  // Psychometric Questions - Interest Scale (Holland Codes)
  {
    id: 'psych_1',
    text: 'I enjoy analyzing complex data to identify patterns and trends.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    weight: 0.8
  },
  {
    id: 'psych_2',
    text: 'I find satisfaction in ensuring rules and procedures are followed correctly.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    weight: 0.9
  },
  {
    id: 'psych_3',
    text: 'I prefer working with structured processes rather than ambiguous situations.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    weight: 0.7
  },
  {
    id: 'psych_4',
    text: 'I am naturally detail-oriented and rarely miss important information.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    weight: 0.9
  },
  {
    id: 'psych_5',
    text: 'I feel comfortable speaking up when I notice something is wrong or risky.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    weight: 0.8
  },
  {
    id: 'psych_6',
    text: 'I enjoy learning about laws, regulations, and industry standards.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    weight: 0.9
  },
  {
    id: 'psych_7',
    text: 'I can stay focused on repetitive tasks for extended periods.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'cognitive',
    weight: 0.7
  },
  {
    id: 'psych_8',
    text: 'I prefer to work independently rather than in large teams.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    weight: 0.5
  },

  // Technical & Aptitude Questions
  {
    id: 'tech_1',
    text: 'What does GDPR stand for?',
    type: 'multiple-choice',
    options: [
      'General Data Protection Regulation',
      'Global Data Privacy Requirements',
      'Government Data Protection Rules',
      'General Digital Privacy Regulation'
    ],
    category: 'technical',
    subcategory: 'regulatory',
    weight: 0.8
  },
  {
    id: 'tech_2',
    text: 'If a company has 1000 transactions and 50 are flagged for review, what is the flag rate percentage?',
    type: 'multiple-choice',
    options: ['5%', '10%', '2%', '50%'],
    category: 'technical',
    subcategory: 'numerical',
    weight: 0.7
  },
  {
    id: 'tech_3',
    text: 'AML in banking compliance refers to:',
    type: 'multiple-choice',
    options: [
      'Anti-Money Laundering',
      'Automated Monitoring Logs',
      'Asset Management Licensing',
      'Audit Management Laws'
    ],
    category: 'technical',
    subcategory: 'regulatory',
    weight: 0.9
  },
  {
    id: 'tech_4',
    text: 'What is the primary purpose of KYC (Know Your Customer) procedures?',
    type: 'multiple-choice',
    options: [
      'To verify customer identity and assess risk',
      'To increase sales opportunities',
      'To reduce customer service calls',
      'To improve marketing targeting'
    ],
    category: 'technical',
    subcategory: 'regulatory',
    weight: 0.8
  },
  {
    id: 'tech_5',
    text: 'A risk assessment matrix typically plots:',
    type: 'multiple-choice',
    options: [
      'Probability vs Impact',
      'Cost vs Benefit',
      'Time vs Resources',
      'Revenue vs Expenses'
    ],
    category: 'technical',
    subcategory: 'risk',
    weight: 0.8
  },
  {
    id: 'tech_6',
    text: 'SOX compliance is primarily concerned with:',
    type: 'multiple-choice',
    options: [
      'Financial reporting accuracy',
      'Data privacy protection',
      'Workplace safety standards',
      'Environmental regulations'
    ],
    category: 'technical',
    subcategory: 'regulatory',
    weight: 0.7
  },

  // WISCAR Framework Questions
  {
    id: 'wiscar_will_1',
    text: 'I am willing to study regulations and compliance frameworks for several hours each week.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will',
    weight: 0.9
  },
  {
    id: 'wiscar_will_2',
    text: 'I would persist in learning complex compliance topics even when they seem boring.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will',
    weight: 0.8
  },
  {
    id: 'wiscar_interest_1',
    text: 'I find business ethics and corporate responsibility topics genuinely interesting.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'interest',
    weight: 0.9
  },
  {
    id: 'wiscar_interest_2',
    text: 'I enjoy reading about financial crimes and how companies prevent them.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'interest',
    weight: 0.8
  },
  {
    id: 'wiscar_skill_1',
    text: 'I have experience with spreadsheet software (Excel, Google Sheets) for data analysis.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'skill',
    weight: 0.7
  },
  {
    id: 'wiscar_skill_2',
    text: 'I have written formal reports or documentation in academic or professional settings.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'skill',
    weight: 0.6
  },
  {
    id: 'wiscar_cognitive_1',
    text: 'I can easily identify logical inconsistencies in arguments or processes.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'cognitive',
    weight: 0.8
  },
  {
    id: 'wiscar_cognitive_2',
    text: 'I can mentally juggle multiple complex requirements simultaneously.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'cognitive',
    weight: 0.8
  },
  {
    id: 'wiscar_ability_1',
    text: 'I adapt quickly when regulations or procedures change.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'ability',
    weight: 0.8
  },
  {
    id: 'wiscar_ability_2',
    text: 'I learn new software tools easily and efficiently.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'ability',
    weight: 0.7
  },
  {
    id: 'wiscar_real_1',
    text: 'I would be comfortable working in a corporate environment with formal hierarchies.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'realWorld',
    weight: 0.7
  },
  {
    id: 'wiscar_real_2',
    text: 'I can handle the pressure of being responsible for ensuring company compliance.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'realWorld',
    weight: 0.9
  }
];

export const likertOptions = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' }
];