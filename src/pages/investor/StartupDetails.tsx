
import { useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Calendar, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Globe, 
  Mail, 
  MessageSquare, 
  Users, 
  Award,
  Building, 
  Bookmark,
  AlertTriangle,
  TrendingUp
} from "lucide-react";

// Mock data for demo purposes - in a real app this would be fetched from API
const startupData = {
  "1": {
    id: 1,
    name: "GreenTech Solutions",
    logo: "https://via.placeholder.com/150",
    tagline: "Carbon capture technology with patented process that reduces costs by 40%.",
    description: "GreenTech Solutions is developing a revolutionary carbon capture technology that leverages a patented chemical process to reduce the cost of carbon sequestration by up to 40%. Our technology can be retrofitted to existing industrial facilities, providing an immediate path to reducing carbon emissions without requiring completely new infrastructure.",
    industry: "CleanTech",
    location: "San Francisco, CA",
    founded: "2020",
    stage: "Seed",
    employeeCount: 12,
    website: "https://greentechsolutions.example.com",
    contact: "contact@greentechsolutions.example.com",
    readinessScore: 92,
    funding: {
      raised: "$1.2M",
      seeking: "$3M",
      valuation: "$12M",
      equity: "15%",
      previousRounds: [
        { round: "Pre-seed", amount: "$500K", date: "Jun 2021", investors: ["Climate Ventures", "Green Angel Network"] },
        { round: "Seed (ongoing)", amount: "$700K", date: "Apr 2023", investors: ["EcoInvest Capital", "Sustainable Future Fund"] }
      ]
    },
    team: [
      { name: "Sarah Johnson", role: "CEO & Co-founder", bio: "Former researcher at MIT with 10+ years experience in environmental engineering." },
      { name: "David Chen", role: "CTO & Co-founder", bio: "PhD in Chemical Engineering with 5 patents in carbon capture technology." },
      { name: "Maria Rodriguez", role: "COO", bio: "15+ years in operations for climate tech companies, previously at Tesla Energy." }
    ],
    metrics: {
      traction: "Pilot programs with 3 major industrial manufacturers",
      customers: "2 paid pilots, 5 LOIs signed",
      revenue: "$150K ARR",
      growthRate: "40% month-over-month",
      carbonReduction: "Estimated 500 tons of CO2 captured monthly in current pilots"
    },
    strengths: [
      "Patented technology with 40% cost reduction",
      "Strong technical team with domain expertise",
      "Successful pilot deployments with validated results"
    ],
    challenges: [
      "Scaling manufacturing capacity",
      "Regulatory hurdles in certain markets",
      "Longer sales cycles with industrial clients"
    ],
    documents: [
      { name: "Pitch Deck", type: "pdf", updated: "May 15, 2023" },
      { name: "Financial Projections", type: "xlsx", updated: "Jun 2, 2023" },
      { name: "Technical White Paper", type: "pdf", updated: "Apr 10, 2023" }
    ],
    updates: [
      { date: "Jul 5, 2023", title: "Completed second pilot installation", content: "Successfully deployed our technology at a cement manufacturing facility in Portland." },
      { date: "Jun 22, 2023", title: "Patent approved in EU market", content: "Our core technology received patent approval in the European Union." },
      { date: "May 10, 2023", title: "New partnership announced", content: "Strategic partnership with ClimateAction Technologies to integrate our solutions." }
    ]
  },
  "2": {
    id: 2,
    name: "FinanceFlow",
    logo: "https://via.placeholder.com/150",
    tagline: "AI-powered financial planning platform for small businesses with 10K users.",
    description: "FinanceFlow is an AI-driven financial planning and forecasting platform designed specifically for small businesses. Our solution combines accounting data with market intelligence to provide accurate cash flow projections, helping small businesses make better financial decisions and avoid cash flow problems before they occur.",
    industry: "FinTech",
    location: "New York, NY",
    founded: "2021",
    stage: "Series A",
    employeeCount: 28,
    website: "https://financeflow.example.com",
    contact: "info@financeflow.example.com",
    readinessScore: 86,
    funding: {
      raised: "$750K",
      seeking: "$2M",
      valuation: "$8M",
      equity: "20%",
      previousRounds: [
        { round: "Pre-seed", amount: "$250K", date: "Dec 2021", investors: ["TechStars", "Angel Investors"] },
        { round: "Seed", amount: "$500K", date: "Nov 2022", investors: ["FinTech Ventures", "Innovation Capital"] }
      ]
    },
    team: [
      { name: "Michael Brown", role: "CEO & Founder", bio: "Former fintech product leader with experience at Square and Stripe." },
      { name: "Jessica Wang", role: "CTO", bio: "Machine learning specialist with background in quantitative finance." },
      { name: "Robert Smith", role: "Head of Sales", bio: "Built sales teams at three B2B SaaS startups with successful exits." }
    ],
    metrics: {
      traction: "10,000+ registered SMB users",
      customers: "2,200 paying subscribers",
      revenue: "$650K ARR",
      growthRate: "25% month-over-month",
      retentionRate: "92% monthly retention"
    },
    strengths: [
      "Proprietary ML algorithms for cash flow prediction",
      "Strong product-market fit with high retention",
      "Capital efficient growth with positive unit economics"
    ],
    challenges: [
      "Increasing CAC in competitive market",
      "Building enterprise features for upmarket expansion",
      "Integration complexity with legacy accounting systems"
    ],
    documents: [
      { name: "Investor Presentation", type: "pdf", updated: "Jun 10, 2023" },
      { name: "Market Analysis Report", type: "pdf", updated: "May 20, 2023" },
      { name: "Product Roadmap", type: "pdf", updated: "Jun 5, 2023" }
    ],
    updates: [
      { date: "Jul 1, 2023", title: "Launched premium subscription tier", content: "New enterprise features with advanced forecasting capabilities." },
      { date: "Jun 15, 2023", title: "Reached 10,000 user milestone", content: "Celebrated 10K user mark with 25% MoM growth rate." },
      { date: "May 28, 2023", title: "New partnership with QuickBooks", content: "Announced deep integration with QuickBooks for seamless data sync." }
    ]
  },
  "3": {
    id: 3,
    name: "HealthPulse",
    logo: "https://via.placeholder.com/150",
    tagline: "Remote patient monitoring system used by 15 hospitals with FDA clearance.",
    description: "HealthPulse has developed a comprehensive remote patient monitoring platform that enables healthcare providers to track patient vitals and health metrics outside of traditional clinical settings. Our FDA-cleared system combines wearable devices with powerful analytics to detect deterioration early, reducing readmission rates and improving patient outcomes.",
    industry: "HealthTech",
    location: "Boston, MA",
    founded: "2019",
    stage: "Series B",
    employeeCount: 45,
    website: "https://healthpulse.example.com",
    contact: "partnerships@healthpulse.example.com",
    readinessScore: 81,
    funding: {
      raised: "$2.1M",
      seeking: "$5M",
      valuation: "$25M",
      equity: "15%",
      previousRounds: [
        { round: "Seed", amount: "$800K", date: "Mar 2020", investors: ["Health Ventures", "Medical Angels"] },
        { round: "Series A", amount: "$1.3M", date: "Feb 2022", investors: ["Healthtech Capital", "Innovation Partners"] }
      ]
    },
    team: [
      { name: "Dr. James Wilson", role: "CEO & Co-founder", bio: "Cardiologist with 15 years of clinical experience and previous healthtech startup." },
      { name: "Emily Chen", role: "CTO & Co-founder", bio: "Previously led engineering at a medical devices company with successful exit." },
      { name: "Dr. Lisa Thompson", role: "Chief Medical Officer", bio: "Board-certified in internal medicine with focus on digital health integration." }
    ],
    metrics: {
      traction: "Deployed in 15 hospitals and 30 clinics",
      customers: "45 healthcare institutions as paying customers",
      revenue: "$1.2M ARR",
      growthRate: "20% quarter-over-quarter",
      patientImpact: "Monitoring 12,000+ patients monthly"
    },
    strengths: [
      "FDA clearance and HIPAA compliance",
      "Clinically validated with peer-reviewed studies",
      "Strong network effect in healthcare markets"
    ],
    challenges: [
      "Long sales cycles in healthcare industry",
      "Integration with legacy EHR systems",
      "Navigating reimbursement landscapes"
    ],
    documents: [
      { name: "Clinical Validation Study", type: "pdf", updated: "Jun 1, 2023" },
      { name: "Financial Projections", type: "xlsx", updated: "May 15, 2023" },
      { name: "Product Development Roadmap", type: "pdf", updated: "Jun 10, 2023" }
    ],
    updates: [
      { date: "Jul 10, 2023", title: "New algorithm received FDA clearance", content: "Our predictive analytics module for cardiac patients received FDA clearance." },
      { date: "Jun 20, 2023", title: "Partnership with major health system", content: "Signed contract with a 10-hospital health system in the Midwest." },
      { date: "May 5, 2023", title: "Published research in JAMA", content: "Our clinical outcomes study was published in the Journal of the American Medical Association." }
    ]
  }
};

export default function StartupDetails() {
  const { id } = useParams<{ id: string }>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // In a real app, fetch the startup data from the API
  const startup = id ? startupData[id as keyof typeof startupData] : null;
  
  if (!startup) {
    return (
      <DashboardLayout title="Startup Not Found">
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-xl font-semibold">Startup not found</h2>
          <p className="text-muted-foreground mt-2">The startup you're looking for doesn't exist or you don't have access.</p>
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
    console.log("Meeting requested with", startup.name);
  };
  
  const handleContactStartup = () => {
    // In a real app, implement contact or messaging functionality
    console.log("Contacting startup", startup.name);
  };

  return (
    <DashboardLayout title="Startup Details">
      <div className="space-y-6">
        {/* Header with key information */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
              <div className="flex gap-5 items-center">
                <Avatar className="h-16 w-16 md:h-24 md:w-24">
                  <AvatarImage src={startup.logo} />
                  <AvatarFallback className="text-xl">{startup.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl md:text-3xl font-bold">{startup.name}</h1>
                    <Badge variant="outline" className="text-sm">{startup.industry}</Badge>
                  </div>
                  <p className="text-muted-foreground mt-1">{startup.tagline}</p>
                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      <span>{startup.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      <span>Founded {startup.founded}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{startup.employeeCount} employees</span>
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
                <Button variant="outline" onClick={handleContactStartup}>
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
                    <div className="w-full max-w-md">
                      <Progress value={startup.readinessScore} className="h-3" />
                    </div>
                    <span className="text-lg font-bold text-accent">{startup.readinessScore}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Based on your investment criteria and the startup's business readiness.
                  </p>
                </div>
                
                <div className="md:w-1/3 flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Funding Stage:</span>
                    <span className="text-sm font-medium">{startup.stage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Raised:</span>
                    <span className="text-sm font-medium">{startup.funding.raised}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Seeking:</span>
                    <span className="text-sm font-medium">{startup.funding.seeking}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Valuation:</span>
                    <span className="text-sm font-medium">{startup.funding.valuation}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs for different sections */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 md:grid-cols-6 lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="funding">Funding</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">{startup.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mt-8">
                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {startup.strengths.map((strength, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="text-green-500">•</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      Challenges
                    </h3>
                    <ul className="space-y-2">
                      {startup.challenges.map((challenge, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="text-amber-500">•</span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                  <a 
                    href={startup.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 border rounded-md hover:bg-accent/5 transition-colors"
                  >
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Visit Website</span>
                  </a>
                  
                  <a 
                    href={`mailto:${startup.contact}`}
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
                    onClick={handleContactStartup}
                  >
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Start Conversation</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Leadership Team</CardTitle>
                <CardDescription>Key team members and their backgrounds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {startup.team.map((member, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-4 pb-5 border-b last:border-0 last:pb-0">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-medium">{member.name}</h3>
                        <p className="text-sm text-accent mb-2">{member.role}</p>
                        <p className="text-muted-foreground">{member.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Metrics Tab */}
          <TabsContent value="metrics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
                <CardDescription>Performance indicators and traction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-medium">Traction</h3>
                      </div>
                      <p>{startup.metrics.traction}</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Building className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-medium">Customers</h3>
                      </div>
                      <p>{startup.metrics.customers}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-medium">Revenue</h3>
                      </div>
                      <p>{startup.metrics.revenue}</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-medium">Growth Rate</h3>
                      </div>
                      <p>{startup.metrics.growthRate}</p>
                    </div>
                  </div>
                  
                  {/* Additional metric specific to each startup */}
                  <div className="p-4 border rounded-lg md:col-span-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="h-5 w-5 text-muted-foreground" />
                      <h3 className="font-medium">
                        {startup.id === 1 
                          ? "Carbon Reduction Impact" 
                          : startup.id === 2 
                            ? "Customer Retention" 
                            : "Patient Impact"}
                      </h3>
                    </div>
                    <p>
                      {startup.id === 1 
                        ? startup.metrics.carbonReduction 
                        : startup.id === 2 
                          ? startup.metrics.retentionRate 
                          : startup.metrics.patientImpact}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Funding Tab */}
          <TabsContent value="funding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Funding History & Details</CardTitle>
                <CardDescription>Current fundraising and previous rounds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-4 mb-8">
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-sm text-muted-foreground">Total Raised</h3>
                    <p className="text-xl font-bold">{startup.funding.raised}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-sm text-muted-foreground">Current Round</h3>
                    <p className="text-xl font-bold">{startup.funding.seeking}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-sm text-muted-foreground">Valuation</h3>
                    <p className="text-xl font-bold">{startup.funding.valuation}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-sm text-muted-foreground">Equity Offered</h3>
                    <p className="text-xl font-bold">{startup.funding.equity}</p>
                  </div>
                </div>
                
                <h3 className="font-medium mb-4">Previous Funding Rounds</h3>
                <div className="space-y-4">
                  {startup.funding.previousRounds.map((round, index) => (
                    <div key={index} className="flex flex-col md:flex-row md:items-center gap-4 p-4 border rounded-lg">
                      <div className="md:w-1/4">
                        <h4 className="font-medium">{round.round}</h4>
                        <span className="text-sm text-muted-foreground">{round.date}</span>
                      </div>
                      <div className="md:w-1/4">
                        <span className="text-sm text-muted-foreground">Amount</span>
                        <p className="font-medium">{round.amount}</p>
                      </div>
                      <div className="md:w-2/4">
                        <span className="text-sm text-muted-foreground">Investors</span>
                        <p>{round.investors.join(", ")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Financial projections, pitch decks, and other materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {startup.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-accent/10 rounded flex items-center justify-center">
                          {doc.type === 'pdf' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                              <polyline points="14 2 14 8 20 8"/>
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                              <polyline points="14 2 14 8 20 8"/>
                              <path d="M8 13h2"/>
                              <path d="M8 17h2"/>
                              <path d="M14 13h2"/>
                              <path d="M14 17h2"/>
                            </svg>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{doc.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {doc.type.toUpperCase()} • Last updated: {doc.updated}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Updates Tab */}
          <TabsContent value="updates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
                <CardDescription>Latest news and developments from the startup</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {startup.updates.map((update, index) => (
                    <div key={index} className="relative pl-6 pb-6 border-l border-border last:border-0 last:pb-0">
                      <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-background border-2 border-accent"></div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {update.date}
                          </span>
                        </div>
                        <h3 className="font-medium">{update.title}</h3>
                        <p className="text-muted-foreground">{update.content}</p>
                      </div>
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
