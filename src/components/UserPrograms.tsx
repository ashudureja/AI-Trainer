"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronRight,
  Dumbbell,
  Sparkles,
  Users,
  Clock,
  AppleIcon,
  ShieldIcon,
  Target,
  Flame
} from "lucide-react";
import { USER_PROGRAMS } from "@/constants";

const UserPrograms = () => {
  return (
    <div className="w-full pb-24 pt-16 relative bg-zinc-950">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-red-700/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        {/* HEADER- PROGRAM GALLERY */}
        <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden mb-16 shadow-lg shadow-red-900/5">
          {/* HEADER BAR */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-zinc-950/70">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-sm text-red-500 font-medium">Program Gallery</span>
            </div>
            <div className="text-sm text-zinc-400 font-mono">FEATURED PLANS</div>
          </div>

          {/* HEADER CONTENT */}
          <div className="p-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-zinc-100">AI-Generated </span>
              <span className="text-red-500">Programs</span>
            </h2>

            <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10">
              Explore personalized fitness plans our AI assistant has created for other users to achieve their ultimate physique
            </p>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-8 mt-10 max-w-3xl mx-auto">
              <div className="flex flex-col items-center p-6 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                <Flame className="h-8 w-8 text-red-500 mb-3" />
                <p className="text-3xl text-red-500 font-bold">500+</p>
                <p className="text-sm text-zinc-400 uppercase tracking-wide mt-1 font-mono">
                  PROGRAMS
                </p>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                <Clock className="h-8 w-8 text-red-500 mb-3" />
                <p className="text-3xl text-red-500 font-bold">3min</p>
                <p className="text-sm text-zinc-400 uppercase tracking-wide mt-1 font-mono">
                  CREATION TIME
                </p>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                <Target className="h-8 w-8 text-red-500 mb-3" />
                <p className="text-3xl text-red-500 font-bold">100%</p>
                <p className="text-sm text-zinc-400 uppercase tracking-wide mt-1 font-mono">
                  PERSONALIZED
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Program cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {USER_PROGRAMS.map((program) => (
            <Card
              key={program.id}
              className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 hover:border-red-500/50 transition-all duration-300 overflow-hidden shadow-lg shadow-zinc-950/50 hover:shadow-red-900/10 hover:-translate-y-1"
            >
              {/* Card header with user info */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-950/70">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-sm text-red-500 font-mono">USER.{program.id}</span>
                </div>
                <div className="text-sm text-zinc-400 font-mono">
                  {program.fitness_level.toUpperCase()}
                </div>
              </div>

              <CardHeader className="pt-6 px-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden border border-zinc-700 shadow-md shadow-red-900/10">
                    <img
                      src={program.profilePic}
                      alt={`${program.first_name}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-zinc-100">
                      {program.first_name}
                      <span className="text-red-500">.exe</span>
                    </CardTitle>
                    <div className="text-sm text-zinc-400 flex items-center gap-2 mt-1">
                      <Users className="h-4 w-4 text-zinc-500" />
                      {program.age}y • {program.workout_days}d/week
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <div className="px-3 py-1 bg-red-500/10 rounded border border-red-500/20 text-sm text-red-400 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    {program.fitness_goal}
                  </div>
                  <div className="text-sm text-zinc-500 flex items-center gap-2 font-mono">
                    <Clock className="h-4 w-4" />
                    v3.5
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-5">
                {/* Program details */}
                <div className="space-y-5 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-red-500/10 text-red-500 mt-0.5">
                      <Dumbbell className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-zinc-100">
                          {program.workout_plan.title}
                        </h3>
                      </div>
                      <p className="text-sm text-zinc-400 mt-1">
                        {program.equipment_access}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-red-700/10 text-red-400 mt-0.5">
                      <AppleIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-zinc-100">{program.diet_plan.title}</h3>
                      </div>
                      <p className="text-sm text-zinc-400 mt-1">
                        System optimized nutrition
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-red-500/10 text-red-500 mt-0.5">
                      <ShieldIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-zinc-100">AI Safety Protocols</h3>
                      </div>
                      <p className="text-sm text-zinc-400 mt-1">
                        Protection systems enabled
                      </p>
                    </div>
                  </div>
                </div>

                {/* Program description */}
                <div className="mt-5 pt-5 border-t border-zinc-800">
                  <div className="text-sm text-zinc-400 font-mono bg-zinc-950/50 p-3 rounded-md">
                    <span className="text-red-500">&gt; </span>
                    {program.workout_plan.description.substring(0, 120)}...
                  </div>
                </div>
              </CardContent>

              <CardFooter className="px-5 py-4 border-t border-zinc-800 bg-zinc-950/30">
                <Link href={`/programs/${program.id}`} className="w-full">
                  <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold transition-all duration-300">
                    View Program Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* CTA section */}
        <div className="mt-16 text-center bg-zinc-900/50 border border-zinc-800 rounded-lg p-10 shadow-lg shadow-red-900/5">
          <h3 className="text-2xl font-bold mb-6">Ready to <span className="text-red-500">Transform</span> Your Fitness?</h3>
          <Link href="/generate-program">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-bold shadow-lg shadow-red-900/30"
            >
              Generate Your Program
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-zinc-400 mt-6">
            Join <span className="text-red-500 font-bold">500+</span> users with AI-customized fitness programs
          </p>
          
          {/* Additional social proof */}
          <div className="flex justify-center mt-8">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="w-10 h-10 rounded-full border-2 border-zinc-800 overflow-hidden bg-zinc-800">
                  <img 
                    src={`/avatar-${index}.jpg`} 
                    alt="User" 
                    className="w-full h-full object-cover"
                    // onError={(e) => {
                    //   e.target.onerror = null; 
                    //   e.target.src = '/api/placeholder/40/40';
                    // }}
                  />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-zinc-800 bg-red-500/80 flex items-center justify-center text-xs font-bold text-white">
                +495
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPrograms;