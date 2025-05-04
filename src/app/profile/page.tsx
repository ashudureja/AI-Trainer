"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import NoFitnessPlan from "@/components/NoFitnessPlan";
import CornerElements from "@/components/CornerElements";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppleIcon, CalendarIcon, DumbbellIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProfilePage = () => {
  const { user } = useUser();
  const userId = user?.id as string;

  const allPlans = useQuery(api.plans.getUserPlans, { userId });
  const [selectedPlanId, setSelectedPlanId] = useState<null | string>(null);

  const activePlan = allPlans?.find((plan) => plan.isActive);

  const currentPlan = selectedPlanId
    ? allPlans?.find((plan) => plan._id === selectedPlanId)
    : activePlan;

    return (
      <section className="relative z-10 pt-12 pb-32 flex-grow min-h-screen bg-zinc-900">
        <ProfileHeader user={user} />
  
        {allPlans && allPlans?.length > 0 ? (
          <div className="space-y-8 max-w-5xl mx-auto px-4">
            {/* PLAN SELECTOR */}
            <div className="relative bg-gradient-to-br from-zinc-800/50 to-zinc-900/70 border-2 border-zinc-700 rounded-xl p-6 shadow-xl">
              <CornerElements />
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-zinc-100">
                  <span className="text-red-500">Your</span> Fitness Plans
                </h2>
                <div className="font-mono text-sm text-zinc-400">
                  TOTAL: {allPlans.length}
                </div>
              </div>
  
              <div className="flex flex-wrap gap-2">
                {allPlans.map((plan) => (
                  <Button
                    key={plan._id}
                    onClick={() => setSelectedPlanId(plan._id)}
                    className={`font-semibold transition-all ${
                      selectedPlanId === plan._id
                        ? "bg-red-500 hover:bg-red-600 text-zinc-100 border-red-600"
                        : "bg-zinc-800 hover:bg-zinc-700/80 text-zinc-300 border-zinc-700"
                    } border-2`}
                  >
                    {plan.name}
                    {plan.isActive && (
                      <span className="ml-2 bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">
                        ACTIVE
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            </div>
  
            {/* PLAN DETAILS */}
            {currentPlan && (
              <div className="relative bg-gradient-to-br from-zinc-800 to-zinc-800/50 border-2 border-zinc-700 rounded-xl p-6 shadow-xl">
                <CornerElements />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                  <h3 className="text-xl font-bold text-zinc-100">
                    PLAN: <span className="text-red-500">{currentPlan.name}</span>
                  </h3>
                </div>
  
                <Tabs defaultValue="workout" className="w-full">
                  <TabsList className="mb-6 w-full grid grid-cols-2 bg-zinc-800 border-2 border-zinc-700 gap-1 p-1">
                    <TabsTrigger
                      value="workout"
                      className="data-[state=active]:bg-red-500 data-[state=active]:text-zinc-100 text-zinc-300"
                    >
                      <DumbbellIcon className="mr-2 size-4" />
                      Workout Plan
                    </TabsTrigger>
                    <TabsTrigger
                      value="diet"
                      className="data-[state=active]:bg-red-500 data-[state=active]:text-zinc-100 text-zinc-300"
                    >
                      <AppleIcon className="mr-2 h-4 w-4" />
                      Diet Plan
                    </TabsTrigger>
                  </TabsList>
  
                  <TabsContent value="workout">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-4 p-3 bg-zinc-800 rounded-lg">
                        <CalendarIcon className="h-5 w-5 text-red-500" />
                        <span className="font-mono text-sm text-zinc-400">
                          SCHEDULE: {currentPlan.workoutPlan.schedule.join(", ")}
                        </span>
                      </div>
  
                      <Accordion type="multiple" className="space-y-4">
                        {currentPlan.workoutPlan.exercises.map((exerciseDay, index) => (
                          <AccordionItem
                            key={index}
                            value={exerciseDay.day}
                            className="border-2 border-zinc-700 rounded-lg overflow-hidden"
                          >
                            <AccordionTrigger className="px-4 py-3 hover:no-underline bg-zinc-800 hover:bg-zinc-700/50">
                              <div className="flex justify-between w-full items-center">
                                <span className="text-red-500 font-semibold">
                                  {exerciseDay.day}
                                </span>
                                <div className="text-xs text-zinc-400">
                                  {exerciseDay.routines.length} EXERCISES
                                </div>
                              </div>
                            </AccordionTrigger>
  
                            <AccordionContent className="pb-4 px-4 bg-zinc-800/30">
                              <div className="space-y-3 mt-2">
                                {exerciseDay.routines.map((routine, routineIndex) => (
                                  <div
                                    key={routineIndex}
                                    className="border-2 border-zinc-700 rounded-lg p-4 bg-zinc-800/50"
                                  >
                                    <div className="flex justify-between items-start mb-2">
                                      <h4 className="font-semibold text-zinc-100">
                                        {routine.name}
                                      </h4>
                                      <div className="flex items-center gap-2">
                                        <div className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs font-mono">
                                          {routine.sets} SETS
                                        </div>
                                        <div className="px-2 py-1 rounded bg-zinc-700 text-zinc-300 text-xs font-mono">
                                          {routine.reps} REPS
                                        </div>
                                      </div>
                                    </div>
                                    {routine.description && (
                                      <p className="text-sm text-zinc-400 mt-1">
                                        {routine.description}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </TabsContent>
  
                  <TabsContent value="diet">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg">
                        <span className="font-mono text-sm text-zinc-400">
                          DAILY CALORIE TARGET
                        </span>
                        <div className="font-mono text-2xl text-red-500">
                          {currentPlan.dietPlan.dailyCalories} KCAL
                        </div>
                      </div>
  
                      <div className="h-px w-full bg-zinc-700 my-4"></div>
  
                      <div className="space-y-4">
                        {currentPlan.dietPlan.meals.map((meal, index) => (
                          <div
                            key={index}
                            className="border-2 border-zinc-700 rounded-lg overflow-hidden p-4 bg-zinc-800/50"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-2 h-2 rounded-full bg-red-500"></div>
                              <h4 className="font-semibold text-red-500">
                                {meal.name}
                              </h4>
                            </div>
                            <ul className="space-y-2">
                              {meal.foods.map((food, foodIndex) => (
                                <li
                                  key={foodIndex}
                                  className="flex items-center gap-3 text-zinc-300"
                                >
                                  <span className="text-xs text-red-500 font-mono w-6">
                                    {String(foodIndex + 1).padStart(2, "0")}
                                  </span>
                                  {food}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        ) : (
          <NoFitnessPlan />
        )}
      </section>
    );
  };
  export default ProfilePage;