const CornerElements = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-red-500/20 transition-colors"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-red-500/20 transition-colors"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-red-500/20 transition-colors"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-red-500/20 transition-colors"></div>
    </>
  );
};
export default CornerElements;