
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Plus, Bookmark, X } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data - would be fetched from API in production
const MOCK_STARTUPS = [
  {
    id: 1,
    name: "GreenTech Solutions",
    industry: "CleanTech",
    description: "Carbon capture technology with patented process that reduces costs by 40%.",
    logo: "G",
    fundingStage: "Seed",
    fundingGoal: "$3M",
    fundingRaised: "$1.2M",
    location: "San Francisco, CA",
    foundedYear: 2020,
    team: 12,
    aiScore: 92,
    tags: ["Sustainability", "CleanTech", "B2B"],
  },
  {
    id: 2,
    name: "FinanceFlow",
    industry: "FinTech",
    description: "AI-powered financial planning platform for small businesses with 10K users.",
    logo: "F",
    fundingStage: "Pre-seed",
    fundingGoal: "$2M",
    fundingRaised: "$750K",
    location: "New York, NY",
    foundedYear: 2021,
    team: 8,
    aiScore: 86,
    tags: ["AI", "Finance", "SaaS"],
  },
  {
    id: 3,
    name: "HealthPulse",
    industry: "HealthTech",
    description: "Remote patient monitoring system used by 15 hospitals with FDA clearance.",
    logo: "H",
    fundingStage: "Series A",
    fundingGoal: "$5M",
    fundingRaised: "$2.1M",
    location: "Boston, MA",
    foundedYear: 2019,
    team: 24,
    aiScore: 81,
    tags: ["Healthcare", "IoT", "B2B"],
  },
  {
    id: 4,
    name: "EduSpark",
    industry: "EdTech",
    description: "Personalized learning platform with adaptive AI curriculum for K-12 students.",
    logo: "E",
    fundingStage: "Seed",
    fundingGoal: "$1.5M",
    fundingRaised: "$800K",
    location: "Austin, TX",
    foundedYear: 2020,
    team: 10,
    aiScore: 78,
    tags: ["Education", "AI", "B2C"],
  },
  {
    id: 5,
    name: "LogisticsAI",
    industry: "Supply Chain",
    description: "AI-optimized logistics platform reducing shipping costs by 22% for e-commerce.",
    logo: "L",
    fundingStage: "Series A",
    fundingGoal: "$8M",
    fundingRaised: "$3.5M",
    location: "Chicago, IL",
    foundedYear: 2018,
    team: 35,
    aiScore: 89,
    tags: ["Logistics", "AI", "E-commerce"],
  },
  {
    id: 6,
    name: "CyberShield",
    industry: "Cybersecurity",
    description: "Zero-trust security framework with ML-powered threat detection for enterprises.",
    logo: "C",
    fundingStage: "Seed",
    fundingGoal: "$4M",
    fundingRaised: "$1.8M",
    location: "Seattle, WA",
    foundedYear: 2021,
    team: 15,
    aiScore: 84,
    tags: ["Security", "Enterprise", "ML"],
  },
  {
    id: 7,
    name: "AgroTech",
    industry: "AgTech",
    description: "Precision agriculture using drones and computer vision to increase crop yields.",
    logo: "A",
    fundingStage: "Pre-seed",
    fundingGoal: "$1M",
    fundingRaised: "$350K",
    location: "Des Moines, IA",
    foundedYear: 2022,
    team: 6,
    aiScore: 75,
    tags: ["Agriculture", "Drones", "Computer Vision"],
  },
  {
    id: 8,
    name: "RetailAI",
    industry: "Retail",
    description: "Customer behavior analytics platform using computer vision for brick-and-mortar.",
    logo: "R",
    fundingStage: "Seed",
    fundingGoal: "$2.5M",
    fundingRaised: "$1.1M",
    location: "Los Angeles, CA",
    foundedYear: 2020,
    team: 11,
    aiScore: 82,
    tags: ["Retail", "Analytics", "Computer Vision"],
  },
];

const INDUSTRIES = [
  "All Industries",
  "FinTech",
  "HealthTech",
  "EdTech",
  "CleanTech",
  "AgTech",
  "Cybersecurity",
  "Retail",
  "Supply Chain",
];

const FUNDING_STAGES = [
  "All Stages",
  "Pre-seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C+",
];

const SORT_OPTIONS = [
  { value: "aiScore", label: "AI Score: High to Low" },
  { value: "fundingRaised", label: "Funding Raised: High to Low" },
  { value: "recent", label: "Most Recent" },
  { value: "team", label: "Team Size: High to Low" },
];

export default function ExploreStartups() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedStage, setSelectedStage] = useState("All Stages");
  const [sortBy, setSortBy] = useState("aiScore");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [savedStartups, setSavedStartups] = useState<number[]>([]);

  // Get all unique tags from startups
  const allTags = Array.from(
    new Set(MOCK_STARTUPS.flatMap((startup) => startup.tags))
  ).sort();

  // Filter startups based on search query, industry, and funding stage
  const filteredStartups = MOCK_STARTUPS.filter((startup) => {
    const matchesSearch =
      searchQuery === "" ||
      startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry =
      selectedIndustry === "All Industries" ||
      startup.industry === selectedIndustry;

    const matchesStage =
      selectedStage === "All Stages" || startup.fundingStage === selectedStage;

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => startup.tags.includes(tag));

    return matchesSearch && matchesIndustry && matchesStage && matchesTags;
  });

  // Sort startups based on selected sort option
  const sortedStartups = [...filteredStartups].sort((a, b) => {
    if (sortBy === "aiScore") {
      return b.aiScore - a.aiScore;
    } else if (sortBy === "fundingRaised") {
      return (
        parseFloat(b.fundingRaised.replace(/[^0-9.-]+/g, "")) -
        parseFloat(a.fundingRaised.replace(/[^0-9.-]+/g, ""))
      );
    } else if (sortBy === "recent") {
      return b.foundedYear - a.foundedYear;
    } else if (sortBy === "team") {
      return b.team - a.team;
    }
    return 0;
  });

  const toggleSaveStartup = (id: number) => {
    setSavedStartups((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <DashboardLayout title="Explore Startups">
      <div className="space-y-6">
        {/* Search and filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search startups by name or description..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator className="my-2" />

              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>

                <Select
                  value={selectedIndustry}
                  onValueChange={setSelectedIndustry}
                >
                  <SelectTrigger className="h-8 text-xs border-dashed">
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedStage}
                  onValueChange={setSelectedStage}
                >
                  <SelectTrigger className="h-8 text-xs border-dashed">
                    <SelectValue placeholder="Funding Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {FUNDING_STAGES.map((stage) => (
                      <SelectItem key={stage} value={stage}>
                        {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tags selection */}
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedTags.length > 0 && (
                  <div className="flex items-center gap-1 mr-2">
                    <span className="text-xs text-muted-foreground">Tags:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs"
                      onClick={() => setSelectedTags([])}
                    >
                      Clear all
                    </Button>
                  </div>
                )}
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                    {selectedTags.includes(tag) && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* View toggle */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{sortedStartups.length}</span>{" "}
            startups
          </p>
          <Tabs value={viewMode} onValueChange={setViewMode}>
            <TabsList className="grid w-[160px] grid-cols-2">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Startups display */}
        <Tabs value={viewMode} className="w-full">
          {/* Grid View */}
          <TabsContent value="grid" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedStartups.map((startup) => (
                <Card key={startup.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-md bg-accent text-accent-foreground flex items-center justify-center font-semibold">
                          {startup.logo}
                        </div>
                        <div>
                          <CardTitle className="text-lg font-semibold">
                            {startup.name}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground">
                            {startup.industry} • {startup.location}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleSaveStartup(startup.id)}
                      >
                        <Bookmark
                          className={`h-5 w-5 ${
                            savedStartups.includes(startup.id)
                              ? "fill-accent text-accent"
                              : "text-muted-foreground"
                          }`}
                        />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-sm line-clamp-3 mb-4">
                      {startup.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {startup.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">AI Match Score</p>
                        <p className="font-medium flex items-center">
                          <span
                            className={`inline-block h-2 w-2 rounded-full mr-1.5 ${
                              startup.aiScore >= 90
                                ? "bg-green-500"
                                : startup.aiScore >= 80
                                ? "bg-amber-500"
                                : "bg-orange-500"
                            }`}
                          ></span>
                          {startup.aiScore}%
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Funding Stage</p>
                        <p className="font-medium">{startup.fundingStage}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Raised</p>
                        <p className="font-medium">{startup.fundingRaised}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Team Size</p>
                        <p className="font-medium">{startup.team} people</p>
                      </div>
                    </div>
                  </CardContent>
                  <div className="px-6 pb-4">
                    <Link to={`/investor/startup/${startup.id}`}>
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* List View */}
          <TabsContent value="list" className="mt-0">
            <div className="space-y-4">
              {sortedStartups.map((startup) => (
                <Card key={startup.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-md bg-accent text-accent-foreground flex items-center justify-center font-semibold">
                        {startup.logo}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {startup.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {startup.industry} • {startup.location} • Founded {startup.foundedYear}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleSaveStartup(startup.id)}
                          >
                            <Bookmark
                              className={`h-5 w-5 ${
                                savedStartups.includes(startup.id)
                                  ? "fill-accent text-accent"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </Button>
                        </div>
                        <p className="text-sm mb-3">{startup.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {startup.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                          <div className="flex items-center">
                            <span className="text-muted-foreground mr-1">AI Score:</span>
                            <span className="font-medium flex items-center">
                              <span
                                className={`inline-block h-2 w-2 rounded-full mr-1 ${
                                  startup.aiScore >= 90
                                    ? "bg-green-500"
                                    : startup.aiScore >= 80
                                    ? "bg-amber-500"
                                    : "bg-orange-500"
                                }`}
                              ></span>
                              {startup.aiScore}%
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground mr-1">Stage:</span>
                            <span className="font-medium">{startup.fundingStage}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground mr-1">Raised:</span>
                            <span className="font-medium">{startup.fundingRaised}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground mr-1">Goal:</span>
                            <span className="font-medium">{startup.fundingGoal}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground mr-1">Team:</span>
                            <span className="font-medium">{startup.team} people</span>
                          </div>
                        </div>
                      </div>
                      <div className="sm:w-24 self-center flex sm:flex-col gap-2">
                        <Link to={`/investor/startup/${startup.id}`}>
                          <Button className="flex-1 sm:w-full">View</Button>
                        </Link>
                        <Button variant="outline" className="flex-1 sm:w-full">Contact</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
