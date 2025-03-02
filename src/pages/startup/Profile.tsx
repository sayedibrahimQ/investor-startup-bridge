
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const industries = [
  "SaaS", "Fintech", "Healthtech", "Edtech", "E-commerce", 
  "AI/ML", "Blockchain", "Cleantech", "Hardware", "Consumer", "Other"
];

const fundingStages = [
  "Pre-seed", "Seed", "Series A", "Series B", "Series C+", "Bootstrapped"
];

const StartupProfile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // In a real app, we would fetch this data from the backend
  const [profile, setProfile] = useState({
    name: "TechVenture",
    description: "AI-powered business optimization platform",
    industry: "AI/ML",
    foundedYear: "2022",
    teamSize: "5-10",
    fundingStage: "Seed",
    fundingAmount: "$750,000",
    website: "https://techventure.example.com",
    location: "San Francisco, CA",
    pitch: "TechVenture helps businesses optimize operations through AI-driven insights, reducing costs by up to 30% and increasing productivity by 25%."
  });

  const handleChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, we would send this data to the backend
      // await axios.put('/api/startup/profile', profile);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Profile update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="Startup Profile">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Company Name</label>
              <Input 
                id="name" 
                value={profile.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Your company name"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="website" className="text-sm font-medium">Website</label>
              <Input 
                id="website" 
                value={profile.website}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="https://example.com"
                type="url"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="industry" className="text-sm font-medium">Industry</label>
              <Select 
                value={profile.industry} 
                onValueChange={(value) => handleChange('industry', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="foundedYear" className="text-sm font-medium">Founded Year</label>
              <Input 
                id="foundedYear" 
                value={profile.foundedYear}
                onChange={(e) => handleChange('foundedYear', e.target.value)}
                placeholder="2023"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="teamSize" className="text-sm font-medium">Team Size</label>
              <Input 
                id="teamSize" 
                value={profile.teamSize}
                onChange={(e) => handleChange('teamSize', e.target.value)}
                placeholder="1-5"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">Location</label>
              <Input 
                id="location" 
                value={profile.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="City, Country"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="fundingStage" className="text-sm font-medium">Funding Stage</label>
              <Select 
                value={profile.fundingStage} 
                onValueChange={(value) => handleChange('fundingStage', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select funding stage" />
                </SelectTrigger>
                <SelectContent>
                  {fundingStages.map((stage) => (
                    <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="fundingAmount" className="text-sm font-medium">Funding Amount (if any)</label>
              <Input 
                id="fundingAmount" 
                value={profile.fundingAmount}
                onChange={(e) => handleChange('fundingAmount', e.target.value)}
                placeholder="$0"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Short Description</label>
            <Textarea 
              id="description" 
              value={profile.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Briefly describe your company (max 100 characters)"
              className="resize-none"
              maxLength={100}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="pitch" className="text-sm font-medium">Elevator Pitch</label>
            <Textarea 
              id="pitch" 
              value={profile.pitch}
              onChange={(e) => handleChange('pitch', e.target.value)}
              placeholder="Your elevator pitch (max 500 characters)"
              className="resize-none"
              rows={4}
              maxLength={500}
            />
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default StartupProfile;
