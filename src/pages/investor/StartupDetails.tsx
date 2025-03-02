import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Building, 
  Users, 
  Calendar, 
  MapPin, 
  BarChart3, 
  Bookmark,
  FileText,
  MessageSquare,
  Globe,
  Mail,
  Phone,
  DollarSign,
  TrendingUp,
  Award
} from "lucide-react";

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
    longDescription: "GreenTech Solutions has developed a revolutionary carbon capture technology that can be integrated into existing industrial systems. Our patented process reduces carbon capture costs by up to 40% compared to traditional methods, making it accessible to mid-sized manufacturing companies. We've completed successful pilot programs with 3 manufacturing plants and have LOIs from 7 additional companies. Our technology has been validated by the Climate Technology Research Institute and we're on track to reduce carbon emissions by 50,000 tons in our first year of full operation.",
    founders: [
      { name: "Sarah Chen, PhD", role: "CEO", background: "10 years in climate technology research, MIT" },
      { name: "James Rodriguez", role: "CTO", background: "Former lead engineer at Tesla Energy" },
      { name: "Michael Park", role: "COO", background: "Operations executive with experience scaling cleantech startups" }
    ],
    financials: {
      burnRate: "$75K/month",
      runway: "16 months",
      revenueModel: "B2B SaaS + Hardware installation",
      projectedRevenue: "$2.4M in Year 1, $8.5M in Year 2"
    },
    traction: {
      customers: 3,
      pipeline: "$4.2M",
      growth: "300% QoQ",
      partnerships: ["ClimateForward Initiative", "Industrial Innovation Consortium"]
    },
    competitors: [
      { name: "CarbonCapture Inc", strengths: "Larger scale installations", weaknesses: "60% higher cost" },
      { name: "CleanAir Systems", strengths: "Government contracts", weaknesses: "Less efficient technology" }
    ],
    contactInfo: {
      email: "invest@greentechsolutions.com",
      phone: "+1 (415) 555-7890",
      website: "www.greentechsolutions.com"
    }
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
    longDescription: "FinanceFlow is an AI-powered financial planning platform designed for small businesses. Our platform helps businesses automate budgeting, forecasting, and financial analysis, saving them time and money. We have 10,000 active users and are growing rapidly. Our AI algorithms provide personalized financial insights and recommendations, helping businesses make better decisions.",
    founders: [
      { name: "Alice Johnson", role: "CEO", background: "Ex-Goldman Sachs, MBA from Harvard" },
      { name: "Bob Williams", role: "CTO", background: "AI expert, PhD from Stanford" },
      { name: "Carol Davis", role: "COO", background: "Operations leader, previously at Google" }
    ],
    financials: {
      burnRate: "$50K/month",
      runway: "12 months",
      revenueModel: "SaaS subscription",
      projectedRevenue: "$1.8M in Year 1, $6M in Year 2"
    },
    traction: {
      customers: 10000,
      pipeline: "$2.5M",
      growth: "200% QoQ",
      partnerships: ["Small Business Association", "TechStars Accelerator"]
    },
    competitors: [
      { name: "QuickBooks", strengths: "Established brand", weaknesses: "Lacks AI capabilities" },
      { name: "Xero", strengths: "User-friendly interface", weaknesses: "Limited forecasting features" }
    ],
    contactInfo: {
      email: "invest@financeflow.com",
      phone: "+1 (212) 555-1234",
      website: "www.financeflow.com"
    }
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
    longDescription: "HealthPulse is a remote patient monitoring system that enables hospitals to track patient health data in real-time. Our system is used by 15 hospitals and has FDA clearance. We use IoT devices to collect patient data and AI algorithms to identify potential health issues before they become critical. Our solution improves patient outcomes and reduces hospital costs.",
    founders: [
      { name: "David Lee", role: "CEO", background: "Medical doctor, MBA from Wharton" },
      { name: "Emily Chen", role: "CTO", background: "IoT expert, PhD from MIT" },
      { name: "Frank Garcia", role: "COO", background: "Healthcare operations, previously at Mayo Clinic" }
    ],
    financials: {
      burnRate: "$100K/month",
      runway: "18 months",
      revenueModel: "B2B SaaS + Hardware sales",
      projectedRevenue: "$3M in Year 1, $10M in Year 2"
    },
    traction: {
      customers: 15,
      pipeline: "$6M",
      growth: "150% QoQ",
      partnerships: ["Massachusetts General Hospital", "Cleveland Clinic"]
    },
    competitors: [
      { name: "Teladoc", strengths: "Large user base", weaknesses: "Less focus on remote monitoring" },
      { name: "Livongo", strengths: "Chronic disease management", weaknesses: "Limited device integration" }
    ],
    contactInfo: {
      email: "invest@healthpulse.com",
      phone: "+1 (617) 555-4567",
      website: "www.healthpulse.com"
    }
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
    longDescription: "EduSpark is a personalized learning platform that uses adaptive AI curriculum for K-12 students. Our platform adjusts to each student's learning pace and style, providing a customized educational experience. We have seen significant improvements in student test scores and engagement. Our platform is used by several schools in Texas and we are expanding nationwide.",
    founders: [
      { name: "Grace Taylor", role: "CEO", background: "Former teacher, EdTech entrepreneur" },
      { name: "Henry Martinez", role: "CTO", background: "AI and education expert, PhD from UT Austin" },
      { name: "Ivy Nguyen", role: "COO", background: "Education operations, previously at Pearson" }
    ],
    financials: {
      burnRate: "$40K/month",
      runway: "20 months",
      revenueModel: "B2C subscription",
      projectedRevenue: "$1.2M in Year 1, $4M in Year 2"
    },
    traction: {
      customers: 5000,
      pipeline: "$1M",
      growth: "100% QoQ",
      partnerships: ["Texas Education Agency", "Khan Academy"]
    },
    competitors: [
      { name: "Khan Academy", strengths: "Free content", weaknesses: "Not personalized" },
      { name: "Brainly", strengths: "Community-based learning", weaknesses: "Quality control issues" }
    ],
    contactInfo: {
      email: "invest@eduspark.com",
      phone: "+1 (512) 555-7890",
      website: "www.eduspark.com"
    }
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
    longDescription: "LogisticsAI is an AI-optimized logistics platform that reduces shipping costs by 22% for e-commerce businesses. Our platform uses machine learning to optimize shipping routes, predict demand, and automate warehouse operations. We have helped our clients save millions of dollars in shipping costs and improve their delivery times.",
    founders: [
      { name: "Jack Brown", role: "CEO", background: "Logistics expert, MBA from Kellogg" },
      { name: "Kelly White", role: "CTO", background: "AI and logistics expert, PhD from UIUC" },
      { name: "Larry Green", role: "COO", background: "Supply chain operations, previously at Amazon" }
    ],
    financials: {
      burnRate: "$150K/month",
      runway: "24 months",
      revenueModel: "B2B SaaS",
      projectedRevenue: "$5M in Year 1, $15M in Year 2"
    },
    traction: {
      customers: 50,
      pipeline: "$10M",
      growth: "80% QoQ",
      partnerships: ["Shopify", "UPS"]
    },
    competitors: [
      { name: "Flexport", strengths: "Global logistics network", weaknesses: "High costs" },
      { name: "project44", strengths: "Real-time visibility", weaknesses: "Limited AI capabilities" }
    ],
    contactInfo: {
      email: "invest@logisticsai.com",
      phone: "+1 (312) 555-5678",
      website: "www.logisticsai.com"
    }
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
    longDescription: "CyberShield offers a zero-trust security framework with ML-powered threat detection for enterprises. Our solution protects businesses from cyber attacks by continuously verifying every user and device. We use machine learning to identify and respond to threats in real-time. Our clients include Fortune 500 companies and government agencies.",
    founders: [
      { name: "Mandy Black", role: "CEO", background: "Cybersecurity expert, former NSA" },
      { name: "Nick Blue", role: "CTO", background: "ML and security expert, PhD from CMU" },
      { name: "Olivia Purple", role: "COO", background: "Enterprise sales, previously at Microsoft" }
    ],
    financials: {
      burnRate: "$80K/month",
      runway: "15 months",
      revenueModel: "B2B SaaS",
      projectedRevenue: "$2.5M in Year 1, $7M in Year 2"
    },
    traction: {
      customers: 20,
      pipeline: "$5M",
      growth: "70% QoQ",
      partnerships: ["Palo Alto Networks", "CrowdStrike"]
    },
    competitors: [
      { name: "CrowdStrike", strengths: "Endpoint protection", weaknesses: "High cost" },
      { name: "Okta", strengths: "Identity management", weaknesses: "Limited threat detection" }
    ],
    contactInfo: {
      email: "invest@cybershield.com",
      phone: "+1 (206) 555-9012",
      website: "www.cybershield.com"
    }
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
    longDescription: "AgroTech uses precision agriculture techniques with drones and computer vision to increase crop yields. Our drones collect data on crop health, soil conditions, and pest infestations. Our computer vision algorithms analyze this data to provide farmers with insights on how to optimize their farming practices. We have seen significant improvements in crop yields and reduced water usage.",
    founders: [
      { name: "Quinn Orange", role: "CEO", background: "Agriculture expert, farmer" },
      { name: "Randy Yellow", role: "CTO", background: "Computer vision expert, PhD from Iowa State" },
      { name: "Stacy Teal", role: "COO", background: "Agriculture operations" }
    ],
    financials: {
      burnRate: "$30K/month",
      runway: "10 months",
      revenueModel: "B2B SaaS + Drone services",
      projectedRevenue: "$800K in Year 1, $2.5M in Year 2"
    },
    traction: {
      customers: 10,
      pipeline: "$750K",
      growth: "60% QoQ",
      partnerships: ["John Deere", "Monsanto"]
    },
    competitors: [
      { name: "Granular", strengths: "Farm management software", weaknesses: "Lacks drone integration" },
      { name: "Climate FieldView", strengths: "Weather data", weaknesses: "Limited computer vision" }
    ],
    contactInfo: {
      email: "invest@agrotech.com",
      phone: "+1 (515) 555-3456",
      website: "www.agrotech.com"
    }
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
    longDescription: "RetailAI provides a customer behavior analytics platform using computer vision for brick-and-mortar stores. Our platform tracks customer movements, identifies popular products, and optimizes store layouts. We help retailers increase sales and improve customer satisfaction. Our clients include major retail chains and boutique stores.",
    founders: [
      { name: "Uma Violet", role: "CEO", background: "Retail expert, MBA from UCLA" },
      { name: "Victor Indigo", role: "CTO", background: "Computer vision expert, PhD from USC" },
      { name: "Wendy Silver", role: "COO", background: "Retail operations, previously at Target" }
    ],
    financials: {
      burnRate: "$60K/month",
      runway: "18 months",
      revenueModel: "B2B SaaS",
      projectedRevenue: "$2M in Year 1, $6M in Year 2"
    },
    traction: {
      customers: 15,
      pipeline: "$3M",
      growth: "90% QoQ",
      partnerships: ["Walmart", "Shopify"]
    },
    competitors: [
      { name: "Dor", strengths: "Foot traffic analytics", weaknesses: "Limited insights" },
      { name: "RetailNext", strengths: "Comprehensive analytics", weaknesses: "High cost" }
    ],
    contactInfo: {
      email: "invest@retailai.com",
      phone: "+1 (213) 555-6789",
      website: "www.retailai.com"
    }
  },
];

export default function StartupDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const startupId = parseInt(id || "1");
  
  // Find the startup details by ID
  const startup = MOCK_STARTUPS.find(s => s.id === startupId) || MOCK_STARTUPS[0];
  
  const [isSaved, setIsSaved] = useState(false);
  
  const toggleSave = () => {
    setIsSaved(!isSaved);
    // In a real app, this would call an API to save/unsave
  };
  
  return (
    <DashboardLayout title={startup.name}>
      <div className="space-y-6">
        {/* Back button */}
        <Button 
          variant="ghost" 
          className="mb-2 -ml-2" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Startups
        </Button>
        
        {/* Startup header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 h-24 w-24 rounded-md bg-accent text-accent-foreground flex items-center justify-center text-4xl font-semibold">
                {startup.logo}
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold">{startup.name}</h1>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Building className="mr-1 h-4 w-4" />
                        {startup.industry}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {startup.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        Founded {startup.foundedYear}
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4" />
                        {startup.team} team members
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={toggleSave}>
                      <Bookmark className={`mr-2 h-4 w-4 ${isSaved ? "fill-primary text-primary" : ""}`} />
                      {isSaved ? "Saved" : "Save"}
                    </Button>
                    <Button>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {startup.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* AI Match Score Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1 bg-accent/10">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                AI Match Score
              </CardTitle>
              <CardDescription>
                Based on your investment criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2 text-primary">
                  {startup.aiScore}%
                </div>
                <div className="text-sm text-muted-foreground">
                  This startup matches your investment preferences
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    <Award className="mr-2 h-4 w-4" />
                    View Match Analysis
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Funding Information */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Funding Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Current Round</h3>
                  <p className="text-2xl font-bold">{startup.fundingStage}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Raised So Far</h3>
                  <p className="text-2xl font-bold">{startup.fundingRaised}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Funding Goal</h3>
                  <p className="text-2xl font-bold">{startup.fundingGoal}</p>
                </div>
              </div>
              <Separator className="my-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Burn Rate</h3>
                  <p className="text-xl font-medium">{startup.financials.burnRate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Runway</h3>
                  <p className="text-xl font-medium">{startup.financials.runway}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Revenue Model</h3>
                  <p className="text-xl font-medium">{startup.financials.revenueModel}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Projected Revenue</h3>
                  <p className="text-xl font-medium">{startup.financials.projectedRevenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs for different sections */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 md:w-[500px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="traction">Traction</TabsTrigger>
            <TabsTrigger value="competition">Competition</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About {startup.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base">{startup.longDescription}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-muted-foreground" />
                    <a href={`mailto:${startup.contactInfo.email}`} className="text-primary hover:underline">
                      {startup.contactInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-muted-foreground" />
                    <a href={`tel:${startup.contactInfo.phone}`} className="text-primary hover:underline">
                      {startup.contactInfo.phone}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Globe className="mr-2 h-5 w-5 text-muted-foreground" />
                    <a href={`https://${startup.contactInfo.website}`} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      {startup.contactInfo.website}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="team" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Founding Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {startup.founders.map((founder, index) => (
                    <Card key={index} className="border bg-card text-card-foreground">
                      <CardContent className="p-6">
                        <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xl font-medium mb-4">
                          {founder.name.charAt(0)}
                        </div>
                        <h3 className="text-lg font-semibold">{founder.name}</h3>
                        <p className="text-sm text-primary mb-2">{founder.role}</p>
                        <p className="text-sm text-muted-foreground">{founder.background}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="traction" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Traction & Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Key Metrics</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Current Customers</span>
                          <span className="font-medium">{startup.traction.customers}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Sales Pipeline</span>
                          <span className="font-medium">{startup.traction.pipeline}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Growth Rate</span>
                          <span className="font-medium">{startup.traction.growth}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Strategic Partnerships</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {startup.traction.partnerships.map((partner, index) => (
                        <li key={index} className="text-sm">{partner}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="competition" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Competitive Landscape</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {startup.competitors.map((competitor, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <h3 className="text-lg font-medium mb-2">{competitor.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Strengths</h4>
                          <p className="text-sm">{competitor.strengths}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Weaknesses</h4>
                          <p className="text-sm">{competitor.weaknesses}</p>
                        </div>
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
