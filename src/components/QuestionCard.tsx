import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Question } from "@/types/assessment";
import { likertOptions } from "@/data/questions";

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (answer: string | number) => void;
  selectedAnswer?: string | number;
}

export const QuestionCard = ({ 
  question, 
  currentIndex, 
  totalQuestions, 
  onAnswer, 
  selectedAnswer 
}: QuestionCardProps) => {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'psychometric': return 'bg-primary/10 text-primary border-primary/20';
      case 'technical': return 'bg-success/10 text-success border-success/20';
      case 'wiscar': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryLabel = (category: string, subcategory: string) => {
    if (category === 'psychometric') {
      return `Psychometric • ${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}`;
    }
    if (category === 'technical') {
      return `Technical • ${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}`;
    }
    if (category === 'wiscar') {
      return `WISCAR • ${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}`;
    }
    return category;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <Badge variant="outline" className={getCategoryColor(question.category)}>
              {getCategoryLabel(question.category, question.subcategory)}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {totalQuestions}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 backdrop-blur-sm shadow-[var(--shadow-medium)]">
          <CardHeader>
            <h2 className="text-xl font-semibold leading-relaxed">
              {question.text}
            </h2>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {question.type === 'likert' && (
              <div className="space-y-3">
                {likertOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={selectedAnswer === option.value ? "default" : "assessment"}
                    className="w-full justify-start text-left h-auto py-4 px-6"
                    onClick={() => onAnswer(option.value)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                        selectedAnswer === option.value 
                          ? 'bg-primary border-primary' 
                          : 'border-muted-foreground/30'
                      }`}>
                        {selectedAnswer === option.value && (
                          <div className="w-2 h-2 bg-primary-foreground rounded-full m-auto mt-0.5" />
                        )}
                      </div>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </Button>
                ))}
              </div>
            )}

            {question.type === 'multiple-choice' && question.options && (
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === option ? "default" : "assessment"}
                    className="w-full justify-start text-left h-auto py-4 px-6"
                    onClick={() => onAnswer(option)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                        selectedAnswer === option 
                          ? 'bg-primary border-primary' 
                          : 'border-muted-foreground/30'
                      }`}>
                        {selectedAnswer === option && (
                          <div className="w-2 h-2 bg-primary-foreground rounded-full m-auto mt-0.5" />
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </Button>
                ))}
              </div>
            )}

            {question.type === 'yes-no' && (
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={selectedAnswer === 'yes' ? "default" : "assessment"}
                  className="h-16 text-lg font-medium"
                  onClick={() => onAnswer('yes')}
                >
                  Yes
                </Button>
                <Button
                  variant={selectedAnswer === 'no' ? "default" : "assessment"}
                  className="h-16 text-lg font-medium"
                  onClick={() => onAnswer('no')}
                >
                  No
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Helper Text */}
        <div className="text-center mt-6 text-muted-foreground">
          <p className="text-sm">
            Answer honestly for the most accurate assessment results
          </p>
        </div>
      </div>
    </div>
  );
};