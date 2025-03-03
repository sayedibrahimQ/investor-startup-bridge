
import { useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Calendar, 
  DollarSign, 
  Globe, 
  Mail, 
  MessageSquare, 
  Briefcase,
  Users,
  BarChart,
  Bookmark,
  CheckCircle
} from "lucide-react";

// Mock data for demo purposes - in a real app this would be fetched from API
const investorData = {
  "1": {
    id: "1",
    name: "Sequoia Capital",
    logo: "https://via.placeholder.com/150",
    type: "Venture Capital",
    description: "Sequoia Capital is one of the world's most influential venture capital firms, known for early investments in companies like Apple, Google, Airbnb, and Stripe. With a multi-stage approach to investing, Sequoia partners with founders from idea to IPO and beyond, helping them build legendary companies.",
    matchScore: 87,
    minInvestment: "$500K",
    maxInvestment: "$5M",
    averageCheckSize: "$2M",
    preferredStages: ["Seed", "Series A"],
    preferredIndustries: ["SaaS", "Fintech", "AI/ML"],
    portfolio: 120,
    location: "California, USA",
    website: "https://sequoiacap.com",
    contact: "investment@sequoiacap.com",
    investmentThesis: "We focus on backing ambitious founders building generational companies across multiple stages, sectors, and geographies. We look for businesses with strong network effects, innovative technology, and large, growing markets.",
    investmentCriteria: [
      "Strong founding team with domain expertise",
      "Product with clear differentiation and defensibility",
      "Large addressable market ($1B+ TAM)",
      "Clear path to building a sustainable business model",
      "Evidence of product-market fit or compelling vision"
    ],
    dueDiligenceProcess: [
      "Initial screening and first meeting",
      "Follow-up meetings with broader team",
      "Market and competitive analysis",
      "Customer references and interviews",
      "Technical assessment (if applicable)",
      "Financial and legal review"
    ],
    team: [
      { name: "Sarah Johnson", role: "Managing Partner", focus: "Enterprise SaaS, AI/ML" },
      { name: "Michael Chen", role: "Partner", focus: "Fintech, Blockchain" },
      { name: "David Smith", role: "Principal", focus: "Healthcare, Climate Tech" }
    ],
    recentInvestments: [
      { name: "TechFlow", industry: "DevOps", stage: "Series A", amount: "$4M" },
      { name: "FinanceAI", industry: "Fintech", stage: "Seed", amount: "$2M" },
      { name: "CloudSecure", industry: "Cybersecurity", stage: "Series A", amount: "$5M" }
    ],
    successStories: [
      { name: "DataSphere", description: "Enterprise data analytics platform acquired for $500M", outcome: "Acquisition" },
      { name: "PaymentWave", description: "Leading B2B payments company with successful IPO", outcome: "IPO" },
      { name: "CloudStack", description: "Infrastructure automation with 10x return for investors", outcome: "Acquisition" }
    ]
  },
  "2": {
    id: "2",
    name: "Andreessen Horowitz",
    logo: "https://via.placeholder.com/150",
    type: "Venture Capital",
    description: "Andreessen Horowitz (a16z) is a venture capital firm focused on backing bold entrepreneurs building the future through technology. Founded in 2009, the firm has expanded its focus from early-stage consumer and enterprise technology companies to include bio, crypto, fintech, gaming, and more.",
    matchScore: 82,
    minInvestment: "$1M",
    maxInvestment: "$10M",
    averageCheckSize: "$5M",
    preferredStages: ["Series A", "Series B"],
    preferredIndustries: ["Fintech", "Crypto", "Enterprise"],
    portfolio: 180,
    location: "California, USA",
    website: "https://a16z.com",
    contact: "deals@a16z.com",
    investmentThesis: "We invest in entrepreneurs who are building the future through technology, with a focus on areas with strong network effects, transformative potential, and defensible innovation. We provide not just capital, but a complete support system for founders.",
    investmentCriteria: [
      "Visionary founders with unique insights",
      "Technology-driven disruption of large markets",
      "Network effects or strong defensibility",
      "Potential for category leadership",
      "Path to sustainable unit economics"
    ],
    dueDiligenceProcess: [
      "Founder interviews and team assessment",
      "Product deep dive and technical review",
      "Market analysis and TAM validation",
      "Customer and stakeholder interviews",
      "Business model and financial review",
      "Competitive landscape analysis"
    ],
    team: [
      { name: "Alex Johnson", role: "General Partner", focus: "Enterprise Software, AI" },
      { name: "Melinda Zhao", role: "Partner", focus: "Fintech, Marketplaces" },
      { name: "Robert Williams", role: "Operating Partner", focus: "Growth, Go-to-Market" }
    ],
    recentInvestments: [
      { name: "CryptoVault", industry: "Blockchain", stage: "Series B", amount: "$8M" },
      { name: "EnterpriseFlow", industry: "Enterprise SaaS", stage: "Series A", amount: "$6M" },
      { name: "PaymentLink", industry: "Fintech", stage: "Series B", amount: "$7M" }
    ],
    successStories: [
      { name: "DataEngine", description: "Data processing platform with 5,000+ enterprise customers", outcome: "IPO" },
      { name: "CodeFusion", description: "Developer tools company acquired by major tech firm", outcome: "Acquisition" },
      { name: "SecureNet", description: "Cybersecurity platform with rapid growth to $100M ARR", outcome: "Ongoing" }
    ]
  },
  "3": {
    id: "3",
    name: "YCombinator",
    logo: "https://via.placeholder.com/150",
    type: "Accelerator",
    description: "Y Combinator is the world's most successful startup accelerator, having funded over 2,000 companies including Airbnb, Dropbox, Stripe, and DoorDash. YC provides seed funding, mentorship, and access to a powerful network, culminating in Demo Day where startups present to selected investors.",
    matchScore: 91,
    minInvestment: "$125K",
    maxInvestment: "$500K",
    averageCheckSize: "$125K",
    preferredStages: ["Pre-seed", "Seed"],
    preferredIndustries: ["SaaS", "AI/ML", "Consumer"],
    portfolio: 2000,
    location: "California, USA",
    website: "https://ycombinator.com",
    contact: "apply@ycombinator.com",
    investmentThesis: "We fund founders at the earliest stages, often before they have a complete product. We look for strong technical teams with ideas that could grow into massive companies, and we're willing to invest in high-risk, high-reward concepts across all industries.",
    investmentCriteria: [
      "Outstanding founding team with technical strength",
      "Novel approach to solving important problems",
      "Potential for rapid growth and scaling",
      "Evidence of determination and resourcefulness",
      "Early signs of user enthusiasm or product adoption"
    ],
    dueDiligenceProcess: [
      "Application review and screening",
      "Interview with YC partners",
      "Technical assessment and product review",
      "Founder background check",
      "Market opportunity validation"
    ],
    team: [
      { name: "Jessica Lee", role: "Group Partner", focus: "B2B SaaS, Developer Tools" },
      { name: "Mark Rodriguez", role: "Group Partner", focus: "AI, Deep Tech" },
      { name: "Emily Wong", role: "Group Partner", focus: "Consumer, Marketplaces" }
    ],
    recentInvestments: [
      { name: "AIAssist", industry: "AI/ML", stage: "Seed", amount: "$150K" },
      { name: "DevTools", industry: "Developer Tools", stage: "Seed", amount: "$125K" },
      { name: "ConsumerApp", industry: "Consumer Tech", stage: "Seed", amount: "$150K" }
    ],
    successStories: [
      { name: "CloudStorage", description: "File storage and sharing platform with 500M+ users", outcome: "IPO" },
      { name: "PaymentProcessor", description: "Payments infrastructure company valued at $100B+", outcome: "IPO" },
      { name: "HomeRental", description: "Global marketplace for short-term accommodations", outcome: "IPO" }
    ]
  }
};

export default function InvestorDetails() {
  const { id } = useParams<{ id: string }>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // In a real app, fetch the investor data from the API
  const investor = id ? investorData[id as keyof typeof investorData] : null;
  
  if (!investor) {
    return (
      <DashboardLayout title="Investor Not Found">
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-xl font-semibold">Investor not found</h2>
          <p className="text-muted-foreground mt-2">The investor you're looking for doesn't exist or you don't have access.</p>
          <Button className="mt-4" variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, save this to the backend
  };
  
  const handleRequestMeeting = () => {
    // In a real app, implement meeting request functionality
    console.log("Meeting requested with", investor.name);
  };
  
  const handleContactInvestor = () => {
    // In a real app, implement contact or messaging functionality
    console.log("Contacting investor", investor.name);
  };

  return (
    <DashboardLayout title="Investor Details">
      <div className="space-y-6">
        {/* Header with key information */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
              <div className="flex gap-5 items-center">
                <Avatar className="h-16 w-16 md:h-24 md:w-24">
                  <AvatarImage src={investor.logo} />
                  <AvatarFallback className="text-xl">{investor.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl md:text-3xl font-bold">{investor.name}</h1>
                    <Badge variant="outline" className="text-sm">{investor.type}</Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      <span>{investor.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{investor.portfolio} companies</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>Avg. {investor.averageCheckSize}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:ml-auto flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleToggleBookmark}
                  className={isBookmarked ? "text-accent" : ""}
                >
                  <Bookmark className="h-5 w-5" />
                </Button>
                <Button variant="outline" onClick={handleContactInvestor}>
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </Button>
                <Button onClick={handleRequestMeeting}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Request Meeting
                </Button>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="md:w-2/3">
                  <h3 className="text-lg font-medium mb-2">Match Score</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-full max-w-md bg-accent/20 rounded-full h-3">
                      <div 
                        className="bg-accent h-3 rounded-full" 
                        style={{width: `${investor.matchScore}%`}}
                      ></div>
                    </div>
                    <span className="text-lg font-bold text-accent">{investor.matchScore}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Based on your startup profile and this investor's preferences.
                  </p>
                </div>
                
                <div className="md:w-1/3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Check Size:</span>
                    <p className="font-medium">{investor.minInvestment} - {investor.maxInvestment}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Stages:</span>
                    <p className="font-medium">{investor.preferredStages.join(", ")}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs for different sections */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 md:grid-cols-5 lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="investment">Investment Focus</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="success">Success Stories</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About {investor.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">{investor.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h3 className="font-medium mb-3">Industries of Interest</h3>
                    <div className="flex flex-wrap gap-2">
                      {investor.preferredIndustries.map((industry, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Investment Stages</h3>
                    <div className="flex flex-wrap gap-2">
                      {investor.preferredStages.map((stage, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {stage}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                  <a 
                    href={investor.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 border rounded-md hover:bg-accent/5 transition-colors"
                  >
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Visit Website</span>
                  </a>
                  
                  <a 
                    href={`mailto:${investor.contact}`}
                    className="flex items-center gap-2 p-3 border rounded-md hover:bg-accent/5 transition-colors"
                  >
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Send Email</span>
                  </a>
                  
                  <button 
                    className="flex items-center gap-2 p-3 border rounded-md hover:bg-accent/5 transition-colors text-left"
                    onClick={handleRequestMeeting}
                  >
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Schedule Meeting</span>
                  </button>
                  
                  <button 
                    className="flex items-center gap-2 p-3 border rounded-md hover:bg-accent/5 transition-colors text-left"
                    onClick={handleContactInvestor}
                  >
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Start Conversation</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Investment Focus Tab */}
          <TabsContent value="investment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Philosophy</CardTitle>
                <CardDescription>What this investor looks for in potential investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Investment Thesis</h3>
                    <p className="text-muted-foreground">{investor.investmentThesis}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Key Investment Criteria</h3>
                    <ul className="space-y-2">
                      {investor.investmentCriteria.map((criteria, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Due Diligence Process</h3>
                    <ol className="space-y-2 list-decimal pl-5">
                      {investor.dueDiligenceProcess.map((step, index) => (
                        <li key={index} className="pl-1">{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Team</CardTitle>
                <CardDescription>Key team members you might work with</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {investor.team.map((member, index) => (
                    <div key={index} className="border rounded-lg p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar>
                          <AvatarFallback className="bg-accent/10 text-accent">{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-accent">{member.role}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <span className="text-sm">Focus: {member.focus}</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-2">
                          <Mail className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Investments</CardTitle>
                <CardDescription>Companies recently backed by this investor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investor.recentInvestments.map((investment, index) => (
                    <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{investment.name}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-muted-foreground">{investment.industry}</span>
                          <Badge variant="outline" className="text-xs">{investment.stage}</Badge>
                        </div>
                      </div>
                      <div className="mt-3 md:mt-0 flex items-center gap-2">
                        <span className="text-sm font-medium">{investment.amount}</span>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline">
                    View Full Portfolio
                    <BarChart className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Success Stories Tab */}
          <TabsContent value="success" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Success Stories</CardTitle>
                <CardDescription>Notable portfolio companies and exits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {investor.successStories.map((story, index) => (
                    <div key={index} className="border rounded-lg p-5 space-y-3">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{story.name}</h3>
                        <Badge variant={
                          story.outcome === "IPO" ? "default" :
                          story.outcome === "Acquisition" ? "outline" : "secondary"
                        }>{story.outcome}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{story.description}</p>
                      <Button variant="outline" size="sm" className="w-full">
                        Learn More
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
