
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BarChart, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function StartupDashboard() {
  return (
    <DashboardLayout title="Startup Dashboard">
      <div className="grid gap-6">
        {/* Readiness Score Card */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle className="flex justify-between items-center">
              <span>Investment Readiness Score</span>
              <span className="text-2xl bg-accent/10 text-accent px-3 py-1 rounded-full">68/100</span>
            </CardTitle>
            <CardDescription>
              Your startup's current investment appeal based on AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Strong points</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 pl-7">
                  <li>Team composition</li>
                  <li>Market potential</li>
                  <li>Business model</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <span className="font-medium">Areas to improve</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 pl-7">
                  <li>Financial projections</li>
                  <li>Competitive analysis</li>
                  <li>Traction metrics</li>
                </ul>
              </div>
              
              <div className="flex items-end justify-end">
                <Link to="/startup/readiness">
                  <Button>
                    View detailed analysis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-accent text-accent-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Connect with Investors
              </CardTitle>
              <CardDescription className="text-accent-foreground/80">
                Find potential investors matched to your industry and stage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/startup/explore-investors">
                <Button variant="secondary" className="w-full">
                  Explore Investors
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Improve Your Score
              </CardTitle>
              <CardDescription>
                Follow AI-recommended actions to boost your investment readiness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/startup/readiness">
                <Button variant="outline" className="w-full">
                  View Recommendations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Complete Your Profile
              </CardTitle>
              <CardDescription>
                Update your business information to attract better matches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/startup/profile">
                <Button variant="outline" className="w-full">
                  Edit Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Investor Interest */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Investor Interest</CardTitle>
            <CardDescription>
              Investors who have viewed your profile in the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Acme Ventures", industry: "Technology, SaaS", date: "2 days ago" },
                { name: "Blue Horizon Capital", industry: "Fintech, B2B", date: "1 week ago" },
                { name: "Green Growth Fund", industry: "Sustainability", date: "2 weeks ago" },
              ].map((investor, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <h3 className="font-medium">{investor.name}</h3>
                    <p className="text-sm text-muted-foreground">{investor.industry}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{investor.date}</span>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
