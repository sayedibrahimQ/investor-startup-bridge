
import { Link } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, PieChart, TrendingUp } from "lucide-react";

export default function InvestorDashboard() {
  return (
    <DashboardLayout title="Investor Dashboard">
      <div className="grid gap-6">
        {/* Startup Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>AI-Recommended Startups</CardTitle>
            <CardDescription>
              Startups that match your investment preferences and criteria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  id: 1,
                  name: "GreenTech Solutions", 
                  industry: "CleanTech", 
                  score: 92,
                  description: "Carbon capture technology with patented process that reduces costs by 40%.",
                  raised: "$1.2M",
                  seeking: "$3M"
                },
                { 
                  id: 2,
                  name: "FinanceFlow", 
                  industry: "FinTech", 
                  score: 86,
                  description: "AI-powered financial planning platform for small businesses with 10K users.",
                  raised: "$750K",
                  seeking: "$2M"
                },
                { 
                  id: 3,
                  name: "HealthPulse", 
                  industry: "HealthTech", 
                  score: 81,
                  description: "Remote patient monitoring system used by 15 hospitals with FDA clearance.",
                  raised: "$2.1M",
                  seeking: "$5M"
                },
              ].map((startup) => (
                <div key={startup.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border">
                  <div className="mb-4 sm:mb-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{startup.name}</h3>
                      <span className="bg-accent/10 text-accent px-2 py-0.5 rounded-full text-xs">
                        {startup.score}% Match
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{startup.industry}</p>
                    <p className="text-sm mt-1">{startup.description}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-xs text-muted-foreground">Raised: {startup.raised}</span>
                      <span className="text-xs text-muted-foreground">Seeking: {startup.seeking}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Save
                    </Button>
                    <Link to={`/investor/startup/${startup.id}`}>
                      <Button size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
              
              <div className="text-center mt-6">
                <Link to="/investor/explore-startups">
                  <Button variant="outline">
                    Explore All Startups
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-accent text-accent-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Market Analysis
              </CardTitle>
              <CardDescription className="text-accent-foreground/80">
                Explore industry trends and startup performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/investor/analysis">
                <Button variant="secondary" className="w-full">
                  View Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Portfolio Overview
              </CardTitle>
              <CardDescription>
                Track your investment distribution and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Portfolio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Saved Startups
              </CardTitle>
              <CardDescription>
                Review your bookmarked investment opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/investor/saved">
                <Button variant="outline" className="w-full">
                  View Saved Startups
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        {/* Market Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Market Trends & Insights</CardTitle>
            <CardDescription>
              AI-generated insights based on recent startup activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Growing interest in AI-powered healthcare solutions",
                  description: "Startups focusing on AI diagnostics and personalized medicine have seen a 40% increase in funding in Q2 2023."
                },
                {
                  title: "Sustainable energy storage solutions gaining traction",
                  description: "Battery technology startups focused on alternatives to lithium-ion have attracted substantial investment from strategic partners."
                },
                {
                  title: "B2B SaaS platforms show strong resilience",
                  description: "Despite market fluctuations, enterprise software solutions continue to demonstrate stable growth and retention metrics."
                },
              ].map((trend, index) => (
                <div key={index} className="p-4 rounded-lg border border-border">
                  <h3 className="font-medium mb-1">{trend.title}</h3>
                  <p className="text-sm text-muted-foreground">{trend.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
