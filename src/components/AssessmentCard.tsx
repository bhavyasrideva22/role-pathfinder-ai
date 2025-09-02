import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Award, TrendingUp } from "lucide-react";

interface AssessmentCardProps {
  onStartAssessment: () => void;
}

export const AssessmentCard = ({ onStartAssessment }: AssessmentCardProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Career Assessment
          </Badge>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-6">
            Should You Become a Risk Compliance Specialist?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover if you have the right personality, skills, and interests for a successful career in risk management and regulatory compliance.
          </p>
        </div>

        {/* Main Assessment Card */}
        <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 backdrop-blur-sm shadow-[var(--shadow-medium)]">
          <CardHeader className="space-y-6">
            <div>
              <CardTitle className="text-2xl font-semibold">Comprehensive Career Assessment</CardTitle>
              <CardDescription className="text-base mt-2">
                A scientifically-designed evaluation using psychometric testing, technical aptitude, and the WISCAR framework
              </CardDescription>
            </div>
            
            {/* Assessment Features */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">25-30 Minutes</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive evaluation</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <h4 className="font-medium">Psychometrically Valid</h4>
                    <p className="text-sm text-muted-foreground">Based on proven psychological frameworks</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-info" />
                  </div>
                  <div>
                    <h4 className="font-medium">Personalized Results</h4>
                    <p className="text-sm text-muted-foreground">Tailored career guidance and recommendations</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <h4 className="font-medium">Learning Pathway</h4>
                    <p className="text-sm text-muted-foreground">Step-by-step skill development plan</p>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Assessment Sections */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <h5 className="font-medium mb-2">🧠 Psychometric</h5>
                <p className="text-sm text-muted-foreground">Personality fit, interests, and cognitive preferences</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <h5 className="font-medium mb-2">📊 Technical Aptitude</h5>
                <p className="text-sm text-muted-foreground">Regulatory knowledge and analytical skills</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <h5 className="font-medium mb-2">🎯 WISCAR Framework</h5>
                <p className="text-sm text-muted-foreground">Will, Interest, Skill, Cognitive, Ability, Real-world fit</p>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
              <h4 className="font-semibold mb-3 text-primary">What You'll Discover:</h4>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Your psychological fit for compliance work</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Technical readiness assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Personalized learning recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Alternative career suggestions</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center pt-4">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={onStartAssessment}
                className="text-lg font-semibold min-w-[240px]"
              >
                Start Assessment
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Info */}
        <div className="text-center mt-8 text-muted-foreground">
          <p className="text-sm">
            Free assessment • No registration required • Instant results
          </p>
        </div>
      </div>
    </div>
  );
};