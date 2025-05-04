import { GraduationCap } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50">
      <div className="flex flex-col items-center">
        <GraduationCap className="h-16 w-16 text-primary-600 animate-pulse" />
        <h2 className="mt-4 text-xl font-semibold text-neutral-800">Loading...</h2>
        <div className="mt-6 w-32 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
          <div className="h-full bg-primary-600 rounded-full animate-[loading_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes loading {
          0% {
            width: 0%;
            margin-left: 0;
          }
          50% {
            width: 100%;
            margin-left: 0;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;