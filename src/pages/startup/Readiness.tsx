
import { useState, useEffect } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, ArrowDown, Check, AlertTriangle, Flag, LineChart, BarChart, PieChart } from "lucide-react";

// Mock data - In a real app, this would come from the API
const mockReadinessData = {
  overallScore: 68,
  categories: [
    {
      name: "Team",
      score: 75,
      strengths: ["Experienced founders", "Complementary skill sets"],
      weaknesses: ["No technical co-founder", "Limited industry experience"],
      recommendations: ["Consider adding technical expertise to the founding team", "Establish an advisory board with industry veterans"]
    },
    {
      name: "Market",
      score: 82,
      strengths: ["Large addressable market", "Growing demand"],
      weaknesses: ["Competitive landscape"],
      recommendations: ["Further define your unique value proposition", "Conduct in-depth competitive analysis"]
    },
    {
      name: "Product",
      score: 60,
      strengths: ["Strong product-market fit", "Positive early user feedback"],
      weaknesses: ["Early stage of development", "Limited traction metrics"],
      recommendations: ["Focus on core features that demonstrate value", "Implement analytics to track key usage metrics"]
    },
    {
      name: "Business Model",
      score: 55,
      strengths: ["Clear revenue streams"],
      weaknesses: ["Unproven unit economics", "Customer acquisition costs not validated"],
      recommendations: ["Test pricing strategies", "Develop a clear customer acquisition strategy with measurable ROI"]
    },
  ]
};

const StartupReadiness = () => {
  const [readinessData, setReadinessData] = useState(mockReadinessData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // In a real app, we would fetch the data from the backend
    // const fetchReadinessData = async () => {
    //   try {
    //     setIsLoading(true);
    //     const response = await axios.get('/api/startup/readiness');
    //     setReadinessData(response.data);
    //   } catch (error) {
    //     console.error('Error fetching readiness data:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // 
    // fetchReadinessData();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <DashboardLayout title="Investment Readiness">
      {isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-accent border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Overall Investment Readiness</span>
                <span className={`text-3xl font-bold ${getScoreColor(readinessData.overallScore)}`}>
                  {readinessData.overallScore}/100
                </span>
              </CardTitle>
              <CardDescription>
                Your overall investment readiness score based on team, market, product, and business model analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={readinessData.overallScore} className={getProgressColor(readinessData.overallScore)} />
              
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {readinessData.categories.map((category) => (
                  <Card key={category.name} className="overflow-hidden">
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">{category.name}</CardTitle>
                      <span className={`text-xl font-semibold ${getScoreColor(category.score)}`}>
                        {category.score}/100
                      </span>
                    </CardHeader>
                    <Progress value={category.score} className={getProgressColor(category.score)} />
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="areas">
            <TabsList className="mb-4">
              <TabsTrigger value="areas">Areas of Analysis</TabsTrigger>
              <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="areas">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {readinessData.categories.map((category) => (
                  <Card key={category.name}>
                    <CardHeader>
                      <CardTitle className="text-xl">{category.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-semibold ${getScoreColor(category.score)}`}>
                          {category.score}/100
                        </span>
                        <Progress 
                          value={category.score} 
                          className={`w-32 ${getProgressColor(category.score)}`}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <ArrowUp className="text-green-500 h-4 w-4" />
                          Strengths
                        </h4>
                        <ul className="space-y-1 pl-6 list-disc">
                          {category.strengths.map((item, i) => (
                            <li key={i} className="text-sm">{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <ArrowDown className="text-red-500 h-4 w-4" />
                          Areas to Improve
                        </h4>
                        <ul className="space-y-1 pl-6 list-disc">
                          {category.weaknesses.map((item, i) => (
                            <li key={i} className="text-sm">{item}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recommendations">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Generated Recommendations</CardTitle>
                  <CardDescription>
                    Based on your profile and readiness assessment, we recommend the following actions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {readinessData.categories.map((category) => (
                      <div key={category.name} className="space-y-3">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                          {category.name === "Team" && <Users className="h-5 w-5 text-blue-500" />}
                          {category.name === "Market" && <LineChart className="h-5 w-5 text-purple-500" />}
                          {category.name === "Product" && <BarChart className="h-5 w-5 text-orange-500" />}
                          {category.name === "Business Model" && <PieChart className="h-5 w-5 text-green-500" />}
                          {category.name}
                          <Badge variant="outline" className={`ml-2 ${getScoreColor(category.score)}`}>
                            {category.score}/100
                          </Badge>
                        </h3>
                        <ul className="space-y-2">
                          {category.recommendations.map((rec, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="mt-1 text-accent">
                                <Flag className="h-4 w-4" />
                              </div>
                              <span className="text-sm">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </DashboardLayout>
  );
};

export default StartupReadiness;
