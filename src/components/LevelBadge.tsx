 import { Star, Trophy, Crown, Gem, Rocket } from "lucide-react";
 import { cn } from "@/lib/utils";
 
 interface LevelBadgeProps {
   level: number;
   size?: "sm" | "md" | "lg";
   showProgress?: boolean;
   xp?: number;
   xpToNextLevel?: number;
   className?: string;
 }
 
 const getLevelInfo = (level: number) => {
   if (level >= 50) return { icon: Crown, title: "Mestre", bgColor: "bg-amber-400" };
   if (level >= 30) return { icon: Gem, title: "Diamante", bgColor: "bg-purple-400" };
   if (level >= 20) return { icon: Trophy, title: "Ouro", bgColor: "bg-yellow-500" };
   if (level >= 10) return { icon: Rocket, title: "Prata", bgColor: "bg-teal-400" };
   return { icon: Star, title: "Bronze", bgColor: "bg-orange-400" };
 };
 
 export const LevelBadge = ({ 
   level, 
   size = "md", 
   showProgress = false,
   xp,
   xpToNextLevel,
   className 
 }: LevelBadgeProps) => {
   const { icon: Icon, title, bgColor } = getLevelInfo(level);
 
   const sizeClasses = {
     sm: "w-10 h-10 text-xs",
     md: "w-14 h-14 text-sm",
     lg: "w-16 h-16 text-base",
   };
 
   const iconSizes = {
     sm: "w-4 h-4",
     md: "w-5 h-5",
     lg: "w-6 h-6",
   };
 
   if (showProgress && xp !== undefined && xpToNextLevel !== undefined) {
     const progress = (xp / xpToNextLevel) * 100;
     
     return (
       <div className={cn("flex items-center gap-4 w-full", className)}>
         <div className="flex flex-col items-center">
           <div
             className={cn(
               "flex flex-col items-center justify-center rounded-full",
               bgColor,
               sizeClasses[size]
             )}
           >
             <Icon className={cn(iconSizes[size], "text-white")} />
             <span className="font-bold text-white text-xs">{level}</span>
           </div>
           <span className="text-xs font-medium text-muted-foreground mt-1">
             {title}
           </span>
         </div>
         <div className="flex-1">
           <p className="text-sm text-muted-foreground">Nível {level}</p>
           <p className="font-bold text-foreground text-lg">
             {xp}/{xpToNextLevel} XP
           </p>
           <div className="h-2 bg-muted rounded-full overflow-hidden mt-1">
             <div
               className="h-full bg-emerald-400 rounded-full transition-all duration-500"
               style={{ width: `${progress}%` }}
             />
           </div>
         </div>
       </div>
     );
   }
 
   return (
     <div className={cn("flex flex-col items-center", className)}>
       <div
         className={cn(
           "flex flex-col items-center justify-center rounded-full",
           bgColor,
           sizeClasses[size]
         )}
       >
         <Icon className={cn(iconSizes[size], "text-white")} />
         <span className="font-bold text-white text-xs">{level}</span>
       </div>
       <span className="text-xs font-medium text-muted-foreground mt-1">{title}</span>
     </div>
   );
 };