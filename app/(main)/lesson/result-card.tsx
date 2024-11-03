import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  variant: "points" | "hearts";
  value: number;
};

export const ResultCard = ({ variant, value }: Props) => {
  const imageSrc = variant === "points" ? "/points.svg" : "/heart.svg";

  return (
    <div
      className={cn(
        "rounded-2xl border-2 w-full",
        variant === "points" && "bg-orange-400 border-orange-400",
        variant === "hearts" && "bg-rose-500 border-rose-500"
      )}
    >
      <div
        className={cn(
          "p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
          variant === "points" && "bg-orange-400",
          variant === "hearts" && "bg-rose-500"
        )}
      >
        {variant === "hearts" ? "Hearts left" : "Total xp"}
      </div>
      <div
        className={cn(
          "rounded-2xl bg-white flex justify-center items-center p-6 font-bold text-lg",
          variant === "points" && "text-orange-400",
          variant === "hearts" && "text-rose-500"
        )}
      >
        <Image
          src={imageSrc}
          alt={variant}
          className="mr-2"
          width={30}
          height={30}
        />
        {value}
      </div>
    </div>
  );
};
