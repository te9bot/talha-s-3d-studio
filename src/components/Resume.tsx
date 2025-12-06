import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Resume = () => {
  const [activeTab, setActiveTab] = useState("experience");

  const skills = [
    { name: "Blender", level: 98 },
    { name: "Substance Painter", level: 95 },
    { name: "Adobe Illustrator", level: 90 },
    { name: "Adobe After Effects", level: 85 },
  ];

  return (
    <section id="resume" className="container mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Behind the Pixels</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">My Experience, Education & Awards</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-card/50">
          <TabsTrigger value="experience" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Experience
          </TabsTrigger>
          <TabsTrigger value="education" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Education
          </TabsTrigger>
        </TabsList>

        <TabsContent value="experience">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20">
              <CardHeader>
                <span className="text-primary font-medium">2025</span>
                <CardTitle className="text-2xl">2025 Qiskit Fall Fest Mentor</CardTitle>
                <CardDescription className="text-muted-foreground font-medium">IBM Quantum | Qiskit Community</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Recognized as an IBM Quantum mentor, guiding participants through quantum computing workshops and hackathons, fostering innovation in quantum education.</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20">
              <CardHeader>
                <span className="text-primary font-medium">2020 - Present</span>
                <CardTitle className="text-2xl">Volunteer & Project Lead</CardTitle>
                <CardDescription className="text-muted-foreground font-medium">Volunteer for Bangladesh | National Youth Leadership & Service Network</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Successfully led over 53 education and health programs, benefiting more than 500 children. Trained over 30 youth leaders and expanded national outreach through community-driven initiatives.</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20">
              <CardHeader>
                <span className="text-primary font-medium">2021 - 2023</span>
                <CardTitle className="text-2xl">In-Game Leader & Strategist</CardTitle>
                <CardDescription className="text-muted-foreground font-medium">TEX Esports | Bangladesh's Professional Competitive Esports Organization</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Led a 5-player team to achieve a top-6 finish in PMCO 2021 and the NBL PUBG Mobile Super League 2023, winning a prize of $30,000.</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20">
              <CardHeader>
                <span className="text-primary font-medium">2022 - 2024</span>
                <CardTitle className="text-2xl">Quantum Computing Researcher</CardTitle>
                <CardDescription className="text-muted-foreground font-medium">National Research Initiative</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Conducted more than 20 quantum error-correction experiments, refined existing algorithms, and advanced computational accuracy through structured national research projects.</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20">
              <CardHeader>
                <span className="text-primary font-medium">2023 - Present</span>
                <CardTitle className="text-2xl">Ops & Development Intern</CardTitle>
                <CardDescription className="text-muted-foreground font-medium">Amazon MEX3 Full Shipment Warehouse</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Supporting warehouse operations and development initiatives, optimizing workflows and implementing process improvements for efficient order fulfillment.</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20">
              <CardHeader>
                <span className="text-primary font-medium">2022 - 2024</span>
                <CardTitle className="text-2xl">Senior 3D Artist</CardTitle>
                <CardDescription className="text-muted-foreground font-medium">Digital Creations Ltd.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Led modeling and texturing for several high-profile projects, mentoring junior artists and optimizing production pipelines.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20">
              <CardHeader>
                <span className="text-primary font-medium">2020 - 2022</span>
                <CardTitle className="text-2xl">Junior 3D Modeler</CardTitle>
                <CardDescription className="text-muted-foreground font-medium">GameDev Studio</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Created and textured 3D assets, including props, environments, and characters for mobile and PC titles.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="education">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-border animate-float">
              <CardHeader>
                <span className="text-primary font-medium">2021 - 2024</span>
                <CardTitle className="text-2xl">Higher Secondary Certificate (HSC)</CardTitle>
                <CardDescription className="text-muted-foreground font-medium">Police Line School And College</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Achieved outstanding academic performance with a GPA of 4.83 out of 5.00, demonstrating excellence and dedication.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-border animate-float" style={{ animationDelay: "0.5s" }}>
              <CardHeader>
                <span className="text-primary font-medium">2016 - 2021</span>
                <CardTitle className="text-2xl">Secondary School Certificate (SSC)</CardTitle>
                <CardDescription className="text-muted-foreground font-medium">Bheramara Pilot Model High School</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Achieved perfect academic excellence with a GPA of 5.00 out of 5.00, showcasing exceptional commitment to learning.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Skills Section */}
      <div className="mt-24">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">The Tools and Techniques</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">My Skills</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-lg">{skill.name}</h4>
                <span className="text-primary font-medium">{skill.level}%</span>
              </div>
              <Progress value={skill.level} className="h-2.5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resume;