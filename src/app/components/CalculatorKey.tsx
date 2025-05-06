import { cn } from "../lib/utils";

type KeyProps = {
  children: React.ReactNode;
  onKeyClick: () => void;
  className?: string;
};

const CalculatorKey = ({
  onKeyClick: onKeyClick,
  children,
  className,
}: KeyProps) => {
  return (
    <div
      className={cn(
        "w-full h-16 flex justify-center items-center rounded-md text-5xl font-bold bg-[#7895A8] shadow shadow-gray-500 hover:cursor-pointer hover:opacity-90 active:opacity-95 text-amber-50 transition-transform duration-100 active:scale-120",
        className
      )}
      onClick={onKeyClick}
    >
      {children}
    </div>
  );
};

export default CalculatorKey;
