const TerminalOverlay = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg p-3 overflow-hidden font-mono shadow-lg">
        {/* Status bar */}
        <div className="flex items-center justify-between mb-2 border-b border-zinc-800 pb-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <p className="text-xs text-red-500 font-bold">MUSCLE AI ACTIVE</p>
          </div>
          <p className="text-xs text-zinc-400">ID:POWER.78412</p>
        </div>

        <p className="text-sm text-zinc-200 mb-2 tracking-tight font-bold">
          <span className="text-red-500">/</span> WORKOUT ANALYSIS COMPLETE
        </p>

        <div className="space-y-1.5 text-xs text-zinc-400">
          <div className="flex items-center group hover:bg-zinc-800/50 p-1 rounded transition-colors">
            <div className="text-red-500 mr-2 font-bold">01</div>
            <span className="group-hover:text-zinc-200 transition-colors">30 min strength training (upper body)</span>
          </div>
          <div className="flex items-center group hover:bg-zinc-800/50 p-1 rounded transition-colors">
            <div className="text-red-500 mr-2 font-bold">02</div>
            <span className="group-hover:text-zinc-200 transition-colors">20 min cardio (moderate intensity)</span>
          </div>
          <div className="flex items-center group hover:bg-zinc-800/50 p-1 rounded transition-colors">
            <div className="text-red-500 mr-2 font-bold">03</div>
            <span className="group-hover:text-zinc-200 transition-colors">10 min flexibility (recovery)</span>
          </div>
        </div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600 opacity-80"></div>
      </div>
    </div>
  );
};

export default TerminalOverlay;