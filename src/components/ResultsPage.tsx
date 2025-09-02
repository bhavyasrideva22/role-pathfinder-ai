import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AssessmentResult } from "@/types/assessment";
import { 
  TrendingUp, 
  Brain, 
  Target, 
  BookOpen, 
  Users, 
  Award,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw
} from "lucide-react";

interface ResultsPageProps {
  result: AssessmentResult;
  onRestart: () => void;
}

export const ResultsPage = ({ result, onRestart }: ResultsPageProps) => {
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return 'bg-success text-white';
      case 'Maybe': return 'bg-warning text-white';
      case 'No': return 'bg-destructive text-white';
      default: return 'bg-muted';
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return <CheckCircle className="w-6 h-6" />;
      case 'Maybe': return <AlertCircle className="w-6 h-6" />;
      case 'No': return <XCircle className="w-6 h-6" />;
      default: return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="px-4 py-2">
            Assessment Complete
          </Badge>
          <h1 className="text-4xl font-bold">Your Results</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Based on your responses, here's your comprehensive career assessment for Risk Compliance Specialist
          </p>
        </div>

        {/* Main Recommendation */}
        <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 backdrop-blur-sm shadow-[var(--shadow-medium)]">
          <CardHeader className="text-center">
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mx-auto ${getRecommendationColor(result.recommendation)}`}>
              {getRecommendationIcon(result.recommendation)}
              <span className="text-xl font-bold">
                {result.recommendation === 'Yes' && 'Excellent Fit!'}
                {result.recommendation === 'Maybe' && 'Moderate Fit'}
                {result.recommendation === 'No' && 'Consider Alternatives'}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="text-3xl font-bold text-primary">{result.confidenceScore}%</span>
              <span className="text-muted-foreground">Confidence Score</span>
            </div>
          </CardHeader>
        </Card>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Psychometric & Technical Scores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Core Assessment Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Psychometric Fit</span>
                  <span className={`font-bold ${getScoreColor(result.psychometricFitScore)}`}>
                    {result.psychometricFitScore}%
                  </span>
                </div>
                <Progress value={result.psychometricFitScore} className="h-3" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Technical Readiness</span>
                  <span className={`font-bold ${getScoreColor(result.technicalReadinessScore)}`}>
                    {result.technicalReadinessScore}%
                  </span>
                </div>
                <Progress value={result.technicalReadinessScore} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* WISCAR Scores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-warning" />
                WISCAR Framework
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(result.wiscarScores).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium capitalize">
                      {key === 'realWorld' ? 'Real World' : key}
                    </span>
                    <span className={`font-bold text-sm ${getScoreColor(value)}`}>
                      {value}%
                    </span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Career Matches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-success" />
              Recommended Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.careerMatches.map((career, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <h4 className="font-medium">{career}</h4>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-info" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.suggestedNextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Path */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-warning" />
              Your Learning Pathway
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-success">Beginner Level</h4>
                <ul className="space-y-2">
                  {result.learningPath.beginner.map((item, index) => (
                    <li key={index} className="text-sm p-2 rounded bg-success/10 border border-success/20">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-warning">Intermediate Level</h4>
                <ul className="space-y-2">
                  {result.learningPath.intermediate.map((item, index) => (
                    <li key={index} className="text-sm p-2 rounded bg-warning/10 border border-warning/20">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-destructive">Job-Ready Level</h4>
                <ul className="space-y-2">
                  {result.learningPath.jobReady.map((item, index) => (
                    <li key={index} className="text-sm p-2 rounded bg-destructive/10 border border-destructive/20">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onRestart} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Take Assessment Again
          </Button>
          <Button variant="hero" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Download Results
          </Button>
        </div>
      </div>
    </div>
  );
};