
import { useState, useEffect } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Trash2, 
  ArrowUpDown, 
  BarChart, 
  Layers, 
  ExternalLink, 
  Info, 
  Clock
} from "lucide-react";
import { toast } from "sonner";

// Mock data - In a real app, this would come from the API
const mockSavedStartups = [
  {
    id: "1",
    name: "TechCo",
    logo: "https://via.placeholder.com/150",
    description: "AI-powered business optimization platform",
    industry: "AI/ML",
    stage: "Seed",
    funding: "$1.2M",
    aiScore: 87,
    matchScore: 92,
    location: "San Francisco, CA",
    foundedYear: 2021,
    traction: "45K MRR, +12% MoM",
    tags: ["B2B", "Enterprise", "AI"],
    noteCount: 3,
    lastViewed: "2 days ago"
  },
  {
    id: "2",
    name: "HealthApp",
    logo: "https://via.placeholder.com/150",
    description: "Personalized health monitoring and diagnostics",
    industry: "Healthtech",
    stage: "Series A",
    funding: "$5.5M",
    aiScore: 81,
    matchScore: 75,
    location: "Boston, MA",
    foundedYear: 2020,
    traction: "220K MAU, +8% MoM",
    tags: ["B2C", "Health", "Mobile"],
    noteCount: 1,
    lastViewed: "5 days ago"
  },
  {
    id: "3",
    name: "FinanceAI",
    logo: "https://via.placeholder.com/150",
    description: "Automated financial advisor and planning",
    industry: "Fintech",
    stage: "Seed",
    funding: "$950K",
    aiScore: 79,
    matchScore: 88,
    location: "New York, NY",
    foundedYear: 2022,
    traction: "28K MAU, +15% MoM",
    tags: ["B2C", "Finance", "AI"],
    noteCount: 2,
    lastViewed: "1 day ago"
  },
  {
    id: "4",
    name: "EdTech Solutions",
    logo: "https://via.placeholder.com/150",
    description: "Learning management system for remote education",
    industry: "Edtech",
    stage: "Series B",
    funding: "$12M",
    aiScore: 85,
    matchScore: 69,
    location: "Austin, TX",
    foundedYear: 2019,
    traction: "$850K MRR, +7% MoM",
    tags: ["B2B", "Education", "SaaS"],
    noteCount: 0,
    lastViewed: "1 week ago"
  }
];

const industries = ["All Industries", "SaaS", "Fintech", "Healthtech", "AI/ML", "Edtech"];
const stages = ["All Stages", "Pre-seed", "Seed", "Series A", "Series B", "Series C+"];
const aiScores = ["All Scores", "90+", "80-89", "70-79", "Below 70"];

const SavedStartups = () => {
  const [savedStartups, setSavedStartups] = useState(mockSavedStartups);
  const [filteredStartups, setFilteredStartups] = useState(mockSavedStartups);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedStage, setSelectedStage] = useState("All Stages");
  const [selectedScore, setSelectedScore] = useState("All Scores");
  const [sortBy, setSortBy] = useState("match");
  const [selectedView, setSelectedView] = useState("grid");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // In a real app, we would fetch the data from the backend
    // const fetchSavedStartups = async () => {
    //   try {
    //     setIsLoading(true);
    //     const response = await axios.get('/api/investor/saved-startups');
    //     setSavedStartups(response.data);
    //     setFilteredStartups(response.data);
    //   } catch (error) {
    //     console.error('Error fetching saved startups:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // 
    // fetchSavedStartups();
  }, []);

  useEffect(() => {
    let result = [...savedStartups];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        startup => 
          startup.name.toLowerCase().includes(query) || 
          startup.description.toLowerCase().includes(query) ||
          startup.industry.toLowerCase().includes(query)
      );
    }
    
    // Apply industry filter
    if (selectedIndustry !== "All Industries") {
      result = result.filter(startup => startup.industry === selectedIndustry);
    }
    
    // Apply stage filter
    if (selectedStage !== "All Stages") {
      result = result.filter(startup => startup.stage === selectedStage);
    }
    
    // Apply AI score filter
    if (selectedScore !== "All Scores") {
      if (selectedScore === "90+") {
        result = result.filter(startup => startup.aiScore >= 90);
      } else if (selectedScore === "80-89") {
        result = result.filter(startup => startup.aiScore >= 80 && startup.aiScore < 90);
      } else if (selectedScore === "70-79") {
        result = result.filter(startup => startup.aiScore >= 70 && startup.aiScore < 80);
      } else if (selectedScore === "Below 70") {
        result = result.filter(startup => startup.aiScore < 70);
      }
    }
    
    // Apply sorting
    if (sortBy === "match") {
      result.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === "aiScore") {
      result.sort((a, b) => b.aiScore - a.aiScore);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "recent") {
      // In a real app, this would sort by actual timestamp
      const getLastViewedDays = (str: string) => {
        const match = str.match(/(\d+)/);
        return match ? parseInt(match[1]) : 99;
      };
      result.sort((a, b) => getLastViewedDays(a.lastViewed) - getLastViewedDays(b.lastViewed));
    }
    
    setFilteredStartups(result);
  }, [savedStartups, searchQuery, selectedIndustry, selectedStage, selectedScore, sortBy]);

  const removeStartup = (id: string) => {
    // In a real app, we would call the API to remove the startup
    // try {
    //   await axios.delete(`/api/investor/saved-startups/${id}`);
    //   setSavedStartups(prev => prev.filter(s => s.id !== id));
    //   toast.success("Startup removed from saved list");
    // } catch (error) {
    //   console.error('Error removing startup:', error);
    //   toast.error("Failed to remove startup");
    // }
    
    // Simulate API call
    setSavedStartups(prev => prev.filter(s => s.id !== id));
    toast.success("Startup removed from saved list");
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <DashboardLayout title="Saved Startups">
      {isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-accent border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search by name, description, or industry" 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap md:flex-nowrap gap-2">
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedStage} onValueChange={setSelectedStage}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map(stage => (
                      <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedScore} onValueChange={setSelectedScore}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="AI Score" />
                  </SelectTrigger>
                  <SelectContent>
                    {aiScores.map(score => (
                      <SelectItem key={score} value={score}>{score}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredStartups.length} of {savedStartups.length} saved startups
              </p>
              
              <div className="flex items-center gap-4">
                <Tabs value={selectedView} onValueChange={setSelectedView} className="mr-2">
                  <TabsList className="grid w-[160px] grid-cols-2">
                    <TabsTrigger value="grid">Grid</TabsTrigger>
                    <TabsTrigger value="list">List</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="match">Match Score</SelectItem>
                      <SelectItem value="aiScore">AI Score</SelectItem>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                      <SelectItem value="recent">Recently Viewed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Startups List/Grid */}
          {filteredStartups.length === 0 ? (
            <div className="h-60 flex flex-col items-center justify-center text-center p-8 border border-dashed rounded-lg">
              <Filter className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No matching startups</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <>
              {/* Grid View */}
              {selectedView === "grid" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStartups.map((startup) => (
                    <Card key={startup.id} className="overflow-hidden flex flex-col">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={startup.logo} alt={startup.name} />
                              <AvatarFallback>{startup.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{startup.name}</CardTitle>
                              <CardDescription>{startup.industry}</CardDescription>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeStartup(startup.id)}
                          >
                            <Trash2 className="h-5 w-5 text-muted-foreground hover:text-red-500" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4 flex-grow">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-sm font-medium">AI Score</span>
                            <span className={`ml-2 text-lg font-bold ${getScoreColor(startup.aiScore)}`}>
                              {startup.aiScore}
                            </span>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Match</span>
                            <span className={`ml-2 text-lg font-bold ${getScoreColor(startup.matchScore)}`}>
                              {startup.matchScore}%
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {startup.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-1.5">
                            <Badge variant="outline">{startup.stage}</Badge>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-muted-foreground">Founded:</span>
                            <span>{startup.foundedYear}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-muted-foreground">Funding:</span>
                            <span>{startup.funding}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{startup.lastViewed}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {startup.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <div className="px-6 pb-6 pt-2 mt-auto">
                        <Button variant="default" className="w-full">
                          View Details
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
              
              {/* List View */}
              {selectedView === "list" && (
                <div className="space-y-4">
                  {filteredStartups.map((startup) => (
                    <Card key={startup.id} className="overflow-hidden">
                      <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={startup.logo} alt={startup.name} />
                          <AvatarFallback>{startup.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-grow space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold">{startup.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {startup.description}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeStartup(startup.id)}
                              className="hidden sm:flex"
                            >
                              <Trash2 className="h-5 w-5 text-muted-foreground hover:text-red-500" />
                            </Button>
                          </div>
                          
                          <div className="flex flex-wrap gap-3 pt-1">
                            <Badge variant="outline">{startup.industry}</Badge>
                            <Badge variant="outline">{startup.stage}</Badge>
                            <Badge variant="outline">{startup.funding}</Badge>
                            <Badge variant="outline">{startup.location}</Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 pt-1">
                            <div>
                              <span className="text-sm text-muted-foreground">AI Score: </span>
                              <span className={`text-sm font-semibold ${getScoreColor(startup.aiScore)}`}>
                                {startup.aiScore}
                              </span>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Match: </span>
                              <span className={`text-sm font-semibold ${getScoreColor(startup.matchScore)}`}>
                                {startup.matchScore}%
                              </span>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Traction: </span>
                              <span className="text-sm">{startup.traction}</span>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Last viewed: </span>
                              <span className="text-sm">{startup.lastViewed}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-2">
                          <Button variant="default" size="sm" className="w-full">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            <Info className="h-4 w-4 mr-1" />
                            Notes {startup.noteCount > 0 && `(${startup.noteCount})`}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeStartup(startup.id)}
                            className="sm:hidden"
                          >
                            <Trash2 className="h-5 w-5 text-muted-foreground hover:text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default SavedStartups;
