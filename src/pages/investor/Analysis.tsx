
import { useState, useEffect } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart as BarChartIcon, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  LineChart as LineChartIcon, 
  Layers, 
  BrainCircuit,
  Check,
  AlertTriangle,
  Users
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";

// Mock data - In a real app, this would come from the API
const mockIndustryData = [
  { name: "SaaS", value: 35 },
  { name: "Fintech", value: 25 },
  { name: "AI/ML", value: 20 },
  { name: "Healthtech", value: 10 },
  { name: "Other", value: 10 }
];

const mockFundingStageData = [
  { name: "Pre-seed", value: 10 },
  { name: "Seed", value: 35 },
  { name: "Series A", value: 30 },
  { name: "Series B", value: 15 },
  { name: "Series C+", value: 10 }
];

const mockPerformanceData = [
  { name: "Jan", revenue: 100, users: 400 },
  { name: "Feb", revenue: 200, users: 800 },
  { name: "Mar", revenue: 300, users: 1200 },
  { name: "Apr", revenue: 400, users: 2000 },
  { name: "May", revenue: 500, users: 2400 },
  { name: "Jun", revenue: 600, users: 3000 }
];

const mockStartupScoreData = [
  { name: "Team", score: 80 },
  { name: "Market", score: 65 },
  { name: "Product", score: 90 },
  { name: "Business Model", score: 70 },
  { name: "Traction", score: 60 }
];

const mockMarketTrends = [
  {
    id: 1,
    title: "AI/ML Investment Growth",
    description: "Venture capital investments in AI/ML startups have increased by 35% in the past year.",
    trend: "up",
    category: "Funding",
    source: "CB Insights"
  },
  {
    id: 2,
    title: "Remote Work Technologies",
    description: "Remote work tools and platforms continue to see strong growth with 28% YoY increase.",
    trend: "up",
    category: "Market",
    source: "Pitchbook"
  },
  {
    id: 3,
    title: "Average SaaS Valuation",
    description: "SaaS company valuations have decreased by 15% from their 2021 peak.",
    trend: "down",
    category: "Valuation",
    source: "Crunchbase"
  },
  {
    id: 4,
    title: "Fintech Funding Slowdown",
    description: "Fintech startup funding has slowed by 22% compared to the same period last year.",
    trend: "down",
    category: "Funding",
    source: "CB Insights"
  },
  {
    id: 5,
    title: "Health Tech Innovation",
    description: "Health tech startups focused on AI diagnostics are attracting 40% more investment.",
    trend: "up",
    category: "Industry",
    source: "Rock Health"
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const InvestmentAnalysis = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStartup, setSelectedStartup] = useState("All Startups");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [activeTab, setActiveTab] = useState("market");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // In a real app, we would fetch the data from the backend
    // const fetchAnalysisData = async () => {
    //   try {
    //     setIsLoading(true);
    //     const response = await axios.get('/api/investor/analysis');
    //     // Set state with the data
    //   } catch (error) {
    //     console.error('Error fetching analysis data:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // 
    // fetchAnalysisData();
  }, []);

  // Simplified mock data - in a real app, all of this would come from the API
  const mockStartups = ["All Startups", "TechCo", "HealthApp", "FinanceAI", "EdTech Solutions"];
  const mockIndustries = ["All Industries", "SaaS", "Fintech", "Healthtech", "AI/ML", "Edtech"];

  return (
    <DashboardLayout title="Investment Analysis">
      {isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-accent border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="space-y-6">
          <Tabs defaultValue="market" onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <TabsList>
                <TabsTrigger value="market">Market Trends</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio Analysis</TabsTrigger>
                <TabsTrigger value="startup">Startup Analysis</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2 mt-3 sm:mt-0">
                {activeTab === "portfolio" && (
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockIndustries.map(industry => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                
                {activeTab === "startup" && (
                  <Select value={selectedStartup} onValueChange={setSelectedStartup}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Select Startup" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockStartups.map(startup => (
                        <SelectItem key={startup} value={startup}>{startup}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
            
            {/* Market Trends Tab */}
            <TabsContent value="market">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChartIcon className="h-5 w-5 text-accent" />
                        Industry Distribution
                      </CardTitle>
                      <CardDescription>
                        Breakdown of investment activity by industry
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={mockIndustryData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {mockIndustryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChartIcon className="h-5 w-5 text-accent" />
                        Funding Stage Distribution
                      </CardTitle>
                      <CardDescription>
                        Breakdown of investments by funding stage
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={mockFundingStageData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" name="Percentage" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-accent" />
                      Current Market Trends
                    </CardTitle>
                    <CardDescription>
                      AI-powered insights based on recent investment activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mockMarketTrends.map((trend) => (
                        <Card key={trend.id} className="overflow-hidden">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <Badge variant="outline">{trend.category}</Badge>
                              <Badge 
                                variant={trend.trend === "up" ? "default" : "destructive"}
                                className={trend.trend === "up" ? "bg-green-500" : ""}
                              >
                                {trend.trend === "up" ? "↑ Up" : "↓ Down"}
                              </Badge>
                            </div>
                            <CardTitle className="text-base">{trend.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              {trend.description}
                            </p>
                            <div className="text-xs text-muted-foreground mt-2 flex justify-between">
                              <span>Source: {trend.source}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Portfolio Analysis Tab */}
            <TabsContent value="portfolio">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">Portfolio Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Average ROI</span>
                            <span className="text-sm font-medium text-green-500">+22.5%</span>
                          </div>
                          <Progress value={22.5} className="bg-gray-200 h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Successful Exits</span>
                            <span className="text-sm font-medium">3 of 12</span>
                          </div>
                          <Progress value={25} className="bg-gray-200 h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Follow-on Funding</span>
                            <span className="text-sm font-medium">8 of 12</span>
                          </div>
                          <Progress value={66.7} className="bg-gray-200 h-2" />
                        </div>
                        
                        <div className="pt-2">
                          <div className="flex justify-between text-sm">
                            <span>Total Invested:</span>
                            <span className="font-medium">$2.5M</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Current Value:</span>
                            <span className="font-medium">$3.8M</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Number of Startups:</span>
                            <span className="font-medium">12</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="md:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <LineChartIcon className="h-5 w-5 text-accent" />
                        Portfolio Performance
                      </CardTitle>
                      <CardDescription>
                        Revenue and user growth across portfolio
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={mockPerformanceData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Legend />
                            <Line 
                              yAxisId="left"
                              type="monotone" 
                              dataKey="revenue" 
                              stroke="#8884d8" 
                              activeDot={{ r: 8 }} 
                              name="Revenue (normalized)"
                            />
                            <Line 
                              yAxisId="right"
                              type="monotone" 
                              dataKey="users" 
                              stroke="#82ca9d" 
                              name="Users (normalized)"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BrainCircuit className="h-5 w-5 text-accent" />
                      AI Investment Recommendations
                    </CardTitle>
                    <CardDescription>
                      Based on your portfolio performance and market trends
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                        <h3 className="font-medium text-green-800 dark:text-green-300 mb-1">Diversification Opportunity</h3>
                        <p className="text-sm text-green-700 dark:text-green-300/80">
                          Your portfolio is heavily weighted towards SaaS (55%). Consider allocating 15-20% 
                          to emerging Healthtech startups to diversify risk and capture growth in this sector.
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Follow-on Investment</h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300/80">
                          TechCo and FinanceAI are showing strong metrics and are likely to seek Series A 
                          funding in the next 3-6 months. Consider reserving capital for follow-on rounds.
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
                        <h3 className="font-medium text-purple-800 dark:text-purple-300 mb-1">Exit Opportunity</h3>
                        <p className="text-sm text-purple-700 dark:text-purple-300/80">
                          EdTech Solutions has received acquisition interest from 2 strategic buyers. 
                          Current valuation suggests a potential 3.2x return on your initial investment.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Startup Analysis Tab */}
            <TabsContent value="startup">
              {selectedStartup === "All Startups" ? (
                <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-lg">
                  <Layers className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Select a Startup to Analyze</h3>
                  <p className="text-sm text-muted-foreground mt-1 text-center max-w-md">
                    Choose a specific startup from the dropdown above to view detailed 
                    analysis and AI-generated investment recommendations.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">
                          {selectedStartup}
                        </CardTitle>
                        <CardDescription>
                          AI/ML SaaS Platform • Seed Stage
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">AI Assessment Score</span>
                            <span className="text-sm font-medium text-green-500">87/100</span>
                          </div>
                          <Progress value={87} className="bg-gray-200 h-2" />
                        </div>
                        
                        <div className="pt-2 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Founded:</span>
                            <span className="font-medium">2021</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Team Size:</span>
                            <span className="font-medium">12</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Funding to Date:</span>
                            <span className="font-medium">$1.2M</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Monthly Revenue:</span>
                            <span className="font-medium">$45K</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>MRR Growth:</span>
                            <span className="font-medium text-green-500">+12%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Burn Rate:</span>
                            <span className="font-medium">$80K/month</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Runway:</span>
                            <span className="font-medium">8 months</span>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <Button variant="outline" className="w-full">
                            View Full Profile
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="md:col-span-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl flex items-center gap-2">
                          <BarChartIcon className="h-5 w-5 text-accent" />
                          Assessment Breakdown
                        </CardTitle>
                        <CardDescription>
                          Analysis of key performance areas
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={mockStartupScoreData}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis domain={[0, 100]} />
                              <Tooltip />
                              <Bar dataKey="score" name="Score" fill="#8884d8">
                                {mockStartupScoreData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BrainCircuit className="h-5 w-5 text-accent" />
                        AI Investment Analysis
                      </CardTitle>
                      <CardDescription>
                        Comprehensive assessment of investment potential
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <h3 className="font-medium flex items-center gap-2">
                            <span className="flex h-6 w-6 rounded-full bg-green-100 text-green-600 items-center justify-center">
                              <Check className="h-4 w-4" />
                            </span>
                            Strengths
                          </h3>
                          <ul className="space-y-2 pl-8 list-disc text-sm">
                            <li>Strong founding team with prior exits and domain expertise</li>
                            <li>Product shows strong product-market fit with 92% customer retention</li>
                            <li>Addressing a growing market estimated at $8.5B by 2026</li>
                            <li>Technology includes proprietary algorithms with patent pending</li>
                            <li>Sales efficiency metrics are above industry benchmarks</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-3">
                          <h3 className="font-medium flex items-center gap-2">
                            <span className="flex h-6 w-6 rounded-full bg-red-100 text-red-600 items-center justify-center">
                              <AlertTriangle className="h-4 w-4" />
                            </span>
                            Risks
                          </h3>
                          <ul className="space-y-2 pl-8 list-disc text-sm">
                            <li>Burn rate has increased 35% in last quarter due to team expansion</li>
                            <li>Competitive landscape is intensifying with two funded competitors</li>
                            <li>Enterprise sales cycle remains long (avg. 95 days) impacting growth</li>
                            <li>Current pricing strategy may limit upmarket expansion</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 border rounded-lg bg-accent/10">
                          <h3 className="font-medium mb-2">Investment Recommendation</h3>
                          <p className="text-sm mb-3">
                            <Badge className="mr-2">Recommended</Badge>
                            <Badge variant="outline">High Growth Potential</Badge>
                          </p>
                          <p className="text-sm">
                            This startup shows strong fundamentals with experienced leadership, proven 
                            product-market fit, and impressive growth metrics. The market opportunity is 
                            substantial, and their technological advantage creates barriers to entry.
                          </p>
                          <p className="text-sm mt-2">
                            Consider a $500K-750K investment at the current valuation with specific 
                            milestones focused on enterprise customer acquisition and reducing CAC. 
                            Current valuation ($12M cap) is reasonable given the metrics and comparable deals.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </DashboardLayout>
  );
};

export default InvestmentAnalysis;
