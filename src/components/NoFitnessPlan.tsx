import Link from "next/link";
import CornerElements from "./CornerElements";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";

const NoFitnessPlan = () => {
  return (
    <div className="relative bg-gradient-to-br from-zinc-800 to-zinc-800/50 border-2 border-zinc-700 rounded-xl p-10 text-center shadow-xl max-w-2xl mx-auto">
      <CornerElements />

      <h2 className="text-3xl font-bold mb-4 font-mono text-zinc-100">
        <span className="text-red-500">NO</span> FITNESS PLANS FOUND
      </h2>
      <p className="text-zinc-400 mb-8 max-w-md mx-auto text-lg">
        Create a personalized fitness and diet plan tailored to your specific goals
      </p>
      <Button
        size="lg"
        asChild
        className="relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-zinc-100 px-10 py-7 text-lg font-semibold rounded-lg transition-all"
      >
        <Link href="/generate-program">
          <span className="relative flex items-center gap-2">
            Create First Plan
            <ArrowRightIcon className="h-6 w-6 text-zinc-100 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </Button>
    </div>
  );
};
export default NoFitnessPlan;