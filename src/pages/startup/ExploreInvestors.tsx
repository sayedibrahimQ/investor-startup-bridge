
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Globe, 
  Briefcase, 
  DollarSign, 
  BarChart, 
  Check, 
  BookmarkIcon,
  Users
} from "lucide-react";

// Mock data - In a real app, this would come from the API
const mockInvestors = [
  {
    id: "1",
    name: "Sequoia Capital",
    logo: "https://via.placeholder.com/150",
    type: "Venture Capital",
    matchScore: 87,
    minInvestment: "$500K",
    maxInvestment: "$5M",
    preferredStages: ["Seed", "Series A"],
    preferredIndustries: ["SaaS", "Fintech", "AI/ML"],
    portfolio: 120,
    location: "California, USA",
    averageCheckSize: "$2M",
    description: "One of the leading VC firms focused on technology startups with a strong track record."
  },
  {
    id: "2",
    name: "Andreessen Horowitz",
    logo: "https://via.placeholder.com/150",
    type: "Venture Capital",
    matchScore: 82,
    minInvestment: "$1M",
    maxInvestment: "$10M",
    preferredStages: ["Series A", "Series B"],
    preferredIndustries: ["Fintech", "Crypto", "Enterprise"],
    portfolio: 180,
    location: "California, USA",
    averageCheckSize: "$5M",
    description: "Major VC firm focusing on software, fintech, and crypto investments."
  },
  {
    id: "3",
    name: "YCombinator",
    logo: "https://via.placeholder.com/150",
    type: "Accelerator",
    matchScore: 91,
    minInvestment: "$125K",
    maxInvestment: "$500K",
    preferredStages: ["Pre-seed", "Seed"],
    preferredIndustries: ["SaaS", "AI/ML", "Consumer"],
    portfolio: 2000,
    location: "California, USA",
    averageCheckSize: "$125K",
    description: "Prestigious startup accelerator program providing early-stage funding and mentorship."
  },
  {
    id: "4",
    name: "Techstars",
    logo: "https://via.placeholder.com/150",
    type: "Accelerator",
    matchScore: 78,
    minInvestment: "$100K",
    maxInvestment: "$300K",
    preferredStages: ["Pre-seed", "Seed"],
    preferredIndustries: ["SaaS", "Healthtech", "Climate"],
    portfolio: 2500,
    location: "Colorado, USA",
    averageCheckSize: "$120K",
    description: "Global accelerator network operating in multiple cities worldwide."
  },
  {
    id: "5",
    name: "Accel",
    logo: "https://via.placeholder.com/150",
    type: "Venture Capital",
    matchScore: 75,
    minInvestment: "$2M",
    maxInvestment: "$15M",
    preferredStages: ["Series A", "Series B"],
    preferredIndustries: ["Enterprise", "SaaS", "Security"],
    portfolio: 150,
    location: "Global",
    averageCheckSize: "$8M",
    description: "Global VC firm with a history of backing successful enterprise software companies."
  },
  {
    id: "6",
    name: "500 Startups",
    logo: "https://via.placeholder.com/150",
    type: "Venture Capital",
    matchScore: 88,
    minInvestment: "$150K",
    maxInvestment: "$1M",
    preferredStages: ["Seed"],
    preferredIndustries: ["Consumer", "Fintech", "Health"],
    portfolio: 2300,
    location: "Global",
    averageCheckSize: "$200K",
    description: "Global early-stage venture fund and seed accelerator program."
  }
];

const investorTypes = ["All Types", "Venture Capital", "Angel Investor", "Accelerator", "Corporate VC"];
const investmentStages = ["All Stages", "Pre-seed", "Seed", "Series A", "Series B", "Series C+"];
const industries = ["All Industries", "SaaS", "Fintech", "Healthtech", "AI/ML", "Consumer", "Enterprise", "Climate", "Crypto"];

const ExploreInvestors = () => {
  const [investors, setInvestors] = useState(mockInvestors);
  const [filteredInvestors, setFilteredInvestors] = useState(mockInvestors);
  const [isLoading, setIsLoading] = useState(true);
  const [savedInvestors, setSavedInvestors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStage, setSelectedStage] = useState("All Stages");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [sortBy, setSortBy] = useState("match");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // In a real app, we would fetch the data from the backend
    // const fetchInvestors = async () => {
    //   try {
    //     setIsLoading(true);
    //     const response = await axios.get('/api/startup/investors');
    //     setInvestors(response.data);
    //     setFilteredInvestors(response.data);
    //   } catch (error) {
    //     console.error('Error fetching investors:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // 
    // fetchInvestors();
  }, []);

  useEffect(() => {
    let result = [...investors];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        investor => 
          investor.name.toLowerCase().includes(query) || 
          investor.description.toLowerCase().includes(query)
      );
    }
    
    // Apply type filter
    if (selectedType !== "All Types") {
      result = result.filter(investor => investor.type === selectedType);
    }
    
    // Apply stage filter
    if (selectedStage !== "All Stages") {
      result = result.filter(investor => 
        investor.preferredStages.includes(selectedStage)
      );
    }
    
    // Apply industry filter
    if (selectedIndustry !== "All Industries") {
      result = result.filter(investor => 
        investor.preferredIndustries.includes(selectedIndustry)
      );
    }
    
    // Apply sorting
    if (sortBy === "match") {
      result.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === "checkSize") {
      result.sort((a, b) => 
        parseInt(b.averageCheckSize.replace(/\D/g, '')) - 
        parseInt(a.averageCheckSize.replace(/\D/g, ''))
      );
    } else if (sortBy === "portfolio") {
      result.sort((a, b) => b.portfolio - a.portfolio);
    }
    
    setFilteredInvestors(result);
  }, [investors, searchQuery, selectedType, selectedStage, selectedIndustry, sortBy]);

  const toggleSaveInvestor = (id: string) => {
    setSavedInvestors(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
    
    // In a real app, we would send this data to the backend
    // try {
    //   if (savedInvestors.includes(id)) {
    //     await axios.delete(`/api/startup/saved-investors/${id}`);
    //   } else {
    //     await axios.post('/api/startup/saved-investors', { investorId: id });
    //   }
    // } catch (error) {
    //   console.error('Error saving/unsaving investor:', error);
    // }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <DashboardLayout title="Explore Investors">
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
                  placeholder="Search investors by name or description" 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap md:flex-nowrap gap-2">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Investor Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {investorTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedStage} onValueChange={setSelectedStage}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Investment Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {investmentStages.map(stage => (
                      <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Industry Focus" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredInvestors.length} of {investors.length} investors
              </p>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="match">Match Score</SelectItem>
                    <SelectItem value="checkSize">Check Size</SelectItem>
                    <SelectItem value="portfolio">Portfolio Size</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Investors List */}
          <div className="space-y-4">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Investors</TabsTrigger>
                <TabsTrigger value="saved">Saved ({savedInvestors.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                {filteredInvestors.length === 0 ? (
                  <div className="h-60 flex flex-col items-center justify-center text-center p-8 border border-dashed rounded-lg">
                    <Filter className="h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">No matching investors</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try adjusting your filters or search query
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredInvestors.map((investor) => (
                      <Card key={investor.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={investor.logo} alt={investor.name} />
                                <AvatarFallback>{investor.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-lg">{investor.name}</CardTitle>
                                <CardDescription>{investor.type}</CardDescription>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleSaveInvestor(investor.id)}
                              className={savedInvestors.includes(investor.id) ? "text-accent" : ""}
                            >
                              <BookmarkIcon className="h-5 w-5" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Match Score</span>
                            <span className={`text-lg font-bold ${getMatchScoreColor(investor.matchScore)}`}>
                              {investor.matchScore}%
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-1.5">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <span>{investor.averageCheckSize}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                              <span>{investor.portfolio} companies</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              <span>{investor.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <BarChart className="h-4 w-4 text-muted-foreground" />
                              <span>{investor.preferredStages.join(", ")}</span>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-1.5">Industry Focus</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {investor.preferredIndustries.map((industry) => (
                                <Badge key={industry} variant="outline" className="text-xs">
                                  {industry}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {investor.description}
                          </p>
                          
                          <Link to={`/startup/investor/${investor.id}`}>
                            <Button variant="outline" className="w-full">
                              View Details
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="saved" className="mt-6">
                {savedInvestors.length === 0 ? (
                  <div className="h-60 flex flex-col items-center justify-center text-center p-8 border border-dashed rounded-lg">
                    <BookmarkIcon className="h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">No saved investors</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      When you find investors you're interested in, save them for later
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredInvestors
                      .filter(investor => savedInvestors.includes(investor.id))
                      .map((investor) => (
                        <Card key={investor.id} className="overflow-hidden">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={investor.logo} alt={investor.name} />
                                  <AvatarFallback>{investor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-lg">{investor.name}</CardTitle>
                                  <CardDescription>{investor.type}</CardDescription>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleSaveInvestor(investor.id)}
                                className="text-accent"
                              >
                                <BookmarkIcon className="h-5 w-5" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">Match Score</span>
                              <span className={`text-lg font-bold ${getMatchScoreColor(investor.matchScore)}`}>
                                {investor.matchScore}%
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center gap-1.5">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <span>{investor.averageCheckSize}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                                <span>{investor.portfolio} companies</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                <span>{investor.location}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <BarChart className="h-4 w-4 text-muted-foreground" />
                                <span>{investor.preferredStages.join(", ")}</span>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium mb-1.5">Industry Focus</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {investor.preferredIndustries.map((industry) => (
                                  <Badge key={industry} variant="outline" className="text-xs">
                                    {industry}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {investor.description}
                            </p>
                            
                            <Link to={`/startup/investor/${investor.id}`}>
                              <Button variant="outline" className="w-full">
                                View Details
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ExploreInvestors;
