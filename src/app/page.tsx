"use client"
import { motion } from "framer-motion";
import TerminalOverlay from "@/components/TerminalOverlay";
import { Button } from "@/components/ui/button";
import UserPrograms from "@/components/UserPrograms";
import { ArrowRightIcon, Dumbbell, Target, Users } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleStartJourney = () => {
    if (isSignedIn) {
      router.push("/generate");
    } else {
      router.push("/sign-in?redirect_url=/generate");
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-zinc-100 overflow-hidden">
      {/* Hero Section */}
      <section className="relative z-10 py-16 md:py-24 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
            {/* LEFT SIDE CONTENT */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-8 relative"
            >
              {/* Red accent bar */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -left-4 top-0 w-2 h-24 bg-gradient-to-b from-red-500 to-red-700"
              />

              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
              >
                <motion.div variants={headingVariants}>
                  <div className="flex items-center">
                    <div className="w-8 h-1 bg-red-500 mr-4" />
                    <span className="text-zinc-100">FORGE</span>
                  </div>
                </motion.div>
                <motion.div variants={headingVariants} className="mt-2">
                  <span className="text-red-500">YOUR POWER</span>
                </motion.div>
                <motion.div variants={headingVariants} className="pt-2">
                  <span className="text-zinc-100">WITH AI</span>
                </motion.div>
                <motion.div variants={headingVariants} className="pt-2">
                  <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">TECHNOLOGY</span>
                </motion.div>
              </motion.h1>

              {/* Animated separator */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="h-1 w-full bg-gradient-to-r from-red-500 via-red-700 to-red-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-xl text-zinc-300"
              >
                Unlock your full potential with our AI-powered fitness coach. 
                Get personalized diet plans and workout routines designed specifically 
                for your body and goals.
              </motion.p>

              {/* STATS */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="grid grid-cols-3 gap-4 py-6 font-mono bg-zinc-800/50 rounded-lg px-6 backdrop-blur border border-zinc-700/50"
              >
                <div className="flex flex-col items-center text-center">
                  <Users className="text-red-500 mb-2 size-6" />
                  <div className="text-2xl text-red-500 font-bold">500+</div>
                  <div className="text-xs uppercase tracking-wider text-zinc-400">ACTIVE USERS</div>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <Target className="text-red-500 mb-2 size-6" />
                  <div className="text-2xl text-red-500 font-bold">3min</div>
                  <div className="text-xs uppercase tracking-wider text-zinc-400">GENERATION</div>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <Dumbbell className="text-red-500 mb-2 size-6" />
                  <div className="text-2xl text-red-500 font-bold">100%</div>
                  <div className="text-xs uppercase tracking-wider text-zinc-400">PERSONALIZED</div>
                </div>
              </motion.div>

              {/* BUTTONS */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <Button
                  size="lg"
                  onClick={handleStartJourney}
                  className="overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-6 text-lg font-bold rounded-md shadow-lg shadow-red-900/30 transition-all duration-300 hover:scale-105 flex items-center font-mono"
                >
                  START YOUR JOURNEY
                  <ArrowRightIcon className="ml-2 size-5" />
                </Button>
                
                <Button
                  variant="outline"
                  disabled
                  size="lg"
                  asChild
                  className="border-red-500 text-red-500 hover:bg-red-500/10 px-8 py-6 text-lg font-bold"
                >
                  <div  className="flex items-center font-mono">
                    LEARN MORE
                  </div>
                </Button>
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE CONTENT */}
            <motion.div 
              className="lg:col-span-6 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Dynamic frame with animated corners */}
              <div className="absolute -inset-4 pointer-events-none">
                <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-red-500 animate-pulse" />
                <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-red-500 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-red-500 animate-pulse" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-red-500 animate-pulse" />
              </div>

              {/* IMAGE CONTAINER */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative aspect-square max-w-lg mx-auto"
              >
                <div className="relative overflow-hidden rounded-lg bg-zinc-950 border border-zinc-800">
                  {/* Gradient overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-tl from-red-900/40 to-zinc-900/60 mix-blend-overlay z-10"></div>
                  
                  <img
                    src="/hero.jpeg"
                    alt="AI Fitness Coach"
                    className="size-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-700"
                  />

                  {/* Data visualization overlays */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-zinc-950 to-transparent">
                    <div className="flex justify-between items-center">
                      <div className="text-xs font-mono text-red-500">SYSTEM READY</div>
                      <div className="text-xs font-mono text-zinc-400">AI COACHING ACTIVE</div>
                    </div>
                  </div>
                </div>

                {/* TERMINAL OVERLAY */}
                <TerminalOverlay />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <motion.section 
        className="relative z-10 py-16 bg-zinc-950"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-red-500">AI-POWERED</span> FITNESS SOLUTIONS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-red-500 transition-colors duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                <Dumbbell className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Custom Workouts</h3>
              <p className="text-zinc-400">Personalized exercise routines based on your fitness level, goals and equipment.</p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-red-500 transition-colors duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                <Target className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Nutrition Plans</h3>
              <p className="text-zinc-400">AI-generated meal plans and diet recommendations to fuel your fitness journey.</p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-red-500 transition-colors duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                <Users className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
              <p className="text-zinc-400">Track your progress and get AI insights to optimize your fitness routine.</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* User Programs */}
      <motion.div 
        className="bg-zinc-900/50 backdrop-blur"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <UserPrograms />
      </motion.div>
      
      {/* Footer */}
      <motion.div 
        className="bg-zinc-900 text-white px-7 p-3 rounded-lg flex flex-col md:flex-row justify-between items-center w-[90vw] mx-auto text-center md:text-left"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">Ashu Dureja</h2>
          <p className="text-sm font-bold">ashudurej0@gmail.com</p>
        </div>
        <motion.div className="flex space-x-4">
          <motion.a 
            href="https://github.com/ashudureja?tab=overview&from=2025-06-01&to=2025-06-30" 
            className=" cursor-pointer rounded-full p-2 sm:p-2.5 hover:text-gray-300 transform transition-colors duration-[0.4s] ease-out"
            whileHover={{ scale: 1.1 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={16} className="sm:w-[18px] sm:h-[18px]" />
          </motion.a>
          <motion.a 
            href="https://www.linkedin.com/in/ashutosh-dureja-919072209/" 
            className=" cursor-pointer rounded-full p-2 sm:p-2.5  transform transition-colors duration-[0.4s] ease-out"
            whileHover={{ scale: 1.1 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={16} className="sm:w-[18px] sm:h-[18px]" />
          </motion.a>
          <motion.a 
            href="https://www.instagram.com/ashudureja_/" 
            className="rounded-full cursor-pointer  p-2 sm:p-2.5  transform transition-colors duration-[0.4s] ease-out"
            whileHover={{ scale: 1.1 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={16} className="sm:w-[18px] sm:h-[18px]" />
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;