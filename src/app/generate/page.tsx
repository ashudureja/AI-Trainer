"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { vapi } from "@/lib/vapi";
import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DumbbellIcon, FlameIcon, ZapIcon } from "lucide-react";

const GenerateProgramPage = () => {
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [callEnded, setCallEnded] = useState(false);

  const { user } = useUser();
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Check authentication status
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/sign-in?redirect_url=/generate");
    }
  }, [isLoaded, isSignedIn, router]);

  // SOLUTION to get rid of "Meeting has ended" error
  useEffect(() => {
    const originalError = console.error;
    // override console.error to ignore "Meeting has ended" errors
    console.error = function (msg, ...args) {
      if (
        msg &&
        (msg.includes("Meeting has ended") ||
          (args[0] && args[0].toString().includes("Meeting has ended")))
      ) {
        console.log("Ignoring known error: Meeting has ended");
        return; // don't pass to original handler
      }

      // pass all other errors to the original handler
      return originalError.call(console, msg, ...args);
    };

    // restore original handler on unmount
    return () => {
      console.error = originalError;
    };
  }, []);

  // auto-scroll messages
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // navigate user to profile page after the call ends
  useEffect(() => {
    if (callEnded) {
      const redirectTimer = setTimeout(() => {
        router.push("/profile");
      }, 1500);

      return () => clearTimeout(redirectTimer);
    }
  }, [callEnded, router]);

  // setup event listeners for vapi
  useEffect(() => {
    const handleCallStart = () => {
      console.log("Call started");
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    };

    const handleCallEnd = () => {
      console.log("Call ended");
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);
    };

    const handleSpeechStart = () => {
      console.log("AI started Speaking");
      setIsSpeaking(true);
    };

    const handleSpeechEnd = () => {
      console.log("AI stopped Speaking");
      setIsSpeaking(false);
    };
    const handleMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { content: message.transcript, role: message.role };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const handleError = (error: any) => {
      console.log("Vapi Error", error);
      setConnecting(false);
      setCallActive(false);
    };

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
      .on("error", handleError);

    // cleanup event listeners on unmount
    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError);
    };
  }, []);

  const toggleCall = async () => {
    if (callActive) vapi.stop();
    else {
      try {
        setConnecting(true);
        setMessages([]);
        setCallEnded(false);

        const fullName = user?.firstName
          ? `${user.firstName} ${user.lastName || ""}`.trim()
          : "There";

        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
          variableValues: {
            full_name: fullName,
            user_id: user?.id,
          },
        });
      } catch (error) {
        console.log("Failed to start call", error);
        setConnecting(false);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-zinc-100 overflow-hidden pb-6 pt-24 bg-zinc-900">
      <div className="container mx-auto px-4 h-full max-w-5xl">
        {/* Enhanced Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold font-heading tracking-tight">
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Build Your
            </span>
            <span className="block mt-2 text-6xl font-extrabold text-zinc-100 drop-shadow-xl">
              Power Plan
            </span>
          </h1>
          <p className="text-zinc-300 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
            Work with our smart fitness tool to create a workout plan just for
            you — based on your
            <span className="text-red-400 font-medium"> body</span> and
            <span className="text-red-400 font-medium"> goals</span>.
          </p>
          <div className="flex justify-center gap-6 mt-6">
            {[
              { icon: DumbbellIcon, label: "Muscle Building Workouts" },
              { icon: FlameIcon, label: "Fat Loss & Shredding" },
              { icon: ZapIcon, label: "Strength & Power Training" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 group">
                <item.icon className="w-5 h-5 text-red-500 transition-transform group-hover:scale-125" />
                <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Video Call Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* AI Assistant Card */}
          <Card className="bg-zinc-800/90 backdrop-blur-lg border-2 border-zinc-700/50 rounded-2xl overflow-hidden relative shadow-2xl hover:border-red-500/30 transition-all duration-300 group">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/10 to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="aspect-video flex flex-col items-center justify-center p-8 relative">
              {/* Enhanced Voice Animation */}
              <div
                className={`absolute inset-0 ${isSpeaking ? "opacity-100" : "opacity-0"} transition-opacity`}
              >
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-32">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className={`mx-0.5 h-24 w-1.5 bg-gradient-to-b from-red-500 to-red-600 rounded-full ${
                        isSpeaking ? "animate-sound-wave" : ""
                      }`}
                      style={{
                        animationDelay: `${i * 0.05}s`,
                        height: isSpeaking
                          ? `${Math.random() * 60 + 30}%`
                          : "5%",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Enhanced AI Avatar */}
              <div className="relative size-44 mb-6">
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse-slow" />
                <div className="relative w-full h-full rounded-full bg-zinc-800 flex items-center justify-center border-2 border-zinc-700/50 overflow-hidden shadow-xl">
                  <img
                    src="/hero.jpeg"
                    alt="AI Assistant"
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 rounded-full border-[3px] border-red-500/30 animate-aura-pulse" />
              </div>

              {/* Status Badge */}
              <div className="px-4 py-1.5 bg-zinc-900/80 backdrop-blur-sm rounded-full border border-zinc-700/50 shadow-lg flex items-center gap-2">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${isSpeaking ? "bg-red-500 animate-pulse" : "bg-zinc-500"}`}
                />
                <span className="text-sm font-medium text-zinc-300">
                  {isSpeaking
                    ? "Analyzing Details"
                    : callActive
                      ? "Awaiting Input"
                      : "Trainer"}
                </span>
              </div>
            </div>
          </Card>

          {/* User Card */}
          <Card className="bg-zinc-800/90 backdrop-blur-lg border-2 border-zinc-700/50 rounded-2xl overflow-hidden relative shadow-2xl hover:border-red-500/30 transition-all duration-300 group">
            <div className="aspect-video flex flex-col items-center justify-center p-8 relative">
              <div className="relative size-44 mb-6">
                <div className="absolute inset-0 bg-red-500/10 rounded-full blur-xl animate-pulse-slow" />
                <div className="relative w-full h-full rounded-full bg-zinc-800 flex items-center justify-center border-2 border-zinc-700/50 overflow-hidden shadow-xl">
                  <img
                    src={user?.imageUrl || "/default-avatar.png"}
                    alt="User"
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {callActive && (
                  <div className="absolute inset-0 rounded-full border-[3px] border-green-500/30 animate-aura-pulse" />
                )}
              </div>

              {/* Connection Status */}
              <div className="px-4 py-1.5 bg-zinc-900/80 backdrop-blur-sm rounded-full border border-zinc-700/50 shadow-lg flex items-center gap-2">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${callActive ? "bg-green-500 animate-pulse" : "bg-zinc-500"}`}
                />
                <span className="text-sm font-medium text-zinc-300">
                  {callActive ? "Sync Active" : "You"}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Enhanced Message Container */}
        {messages.length > 0 && (
          <div
            ref={messageContainerRef}
            className="w-full bg-zinc-800/90 backdrop-blur-lg border-2 border-zinc-700/50 rounded-2xl p-6 mb-10 h-96 overflow-y-auto shadow-xl scroll-smooth transition-all duration-300"
          >
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl ${
                    msg.role === "assistant"
                      ? "bg-zinc-700/50 border-l-4 border-red-500/80"
                      : "bg-zinc-900/50 border-l-4 border-zinc-600/80"
                  } shadow-md animate-fadeInUp`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${msg.role === "assistant" ? "bg-red-500" : "bg-zinc-400"}`}
                    />
                    <span className="text-sm font-semibold text-zinc-300">
                      {msg.role === "assistant" ? "Strength AI" : "You"}
                    </span>
                  </div>
                  <p
                    className={`text-zinc-100 pl-5 ${msg.role === "assistant" ? "font-medium" : ""}`}
                  >
                    {msg.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Call Controls */}
        <div className="flex justify-center">
          <Button
            className={`relative overflow-hidden h-16 px-12 rounded-2xl text-lg font-bold transition-all duration-500 ${
              callActive
                ? "bg-red-600/90 hover:bg-red-700/90 shadow-red-glow"
                : callEnded
                  ? "bg-green-600/90 hover:bg-green-700/90 shadow-green-glow"
                  : "bg-red-600/90 hover:bg-red-700/90 shadow-red-glow"
            }`}
            onClick={toggleCall}
            disabled={connecting || callEnded}
          >
            {connecting && (
              <div className="absolute inset-0 bg-white/5 animate-pulse-slow" />
            )}

            <div className="relative z-10 flex items-center gap-3">
              {callActive ? (
                <>
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  <span>Terminate Session</span>
                </>
              ) : connecting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
                  <span>Initializing...</span>
                </>
              ) : callEnded ? (
                <>
                  <ZapIcon className="w-5 h-5 animate-bounce" />
                  <span>View Program</span>
                </>
              ) : (
                <>
                  <FlameIcon className="w-5 h-5 animate-pulse" />
                  <span>Start Session</span>
                </>
              )}
            </div>
          </Button>
        </div>

        {/* Enhanced Info Cards */}
        {/* {!callActive && !callEnded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              {
                icon: DumbbellIcon,
                title: "Personalized Workouts",
                content:
                  "Custom routines designed for your specific fitness level and goals",
              },
              {
                icon: FlameIcon,
                title: "Progressive Overload",
                content:
                  "Scientifically-backed training methods for continuous improvement",
              },
              {
                icon: ZapIcon,
                title: "Recovery Optimization",
                content:
                  "Strategic rest periods and techniques to maximize muscle growth",
              },
            ].map((card, index) => (
              <Card
                key={index}
                className="bg-zinc-800/50 backdrop-blur-sm border-2 border-zinc-700/50 p-6 rounded-xl hover:border-red-500/30 transition-all duration-300 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-gradient-to-br from-red-600/30 to-zinc-800/50 rounded-2xl">
                    <card.icon className="w-8 h-8 text-red-400 group-hover:text-red-300 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-200 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {card.content}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default GenerateProgramPage;
