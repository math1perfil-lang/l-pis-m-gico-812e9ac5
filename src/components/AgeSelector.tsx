import { cn } from "@/lib/utils";

interface AgeSelectorProps {
  selectedAge: number | null;
  onAgeSelect: (age: number) => void;
}

const ageGroups = [
  { age: 6, label: "6 anos", emoji: "🧒" },
  { age: 7, label: "7 anos", emoji: "👦" },
  { age: 8, label: "8 anos", emoji: "👧" },
  { age: 9, label: "9 anos", emoji: "🧑" },
  { age: 10, label: "10 anos", emoji: "👱" },
  { age: 11, label: "11 anos", emoji: "🧑‍🦱" },
  { age: 12, label: "12 anos", emoji: "👩‍🦰" },
  { age: 13, label: "13 anos", emoji: "🧑‍🦳" },
  { age: 14, label: "14 anos", emoji: "👨‍🦱" },
  { age: 15, label: "15 anos", emoji: "🧑‍🎓" },
];

export const AgeSelector = ({ selectedAge, onAgeSelect }: AgeSelectorProps) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-bold text-foreground mb-4">Selecione a idade:</h3>
      <div className="grid grid-cols-5 gap-3 sm:grid-cols-10">
        {ageGroups.map(({ age, label, emoji }) => (
          <button
            key={age}
            onClick={() => onAgeSelect(age)}
            className={cn(
              "flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300",
              "hover:scale-105 hover:shadow-soft",
              selectedAge === age
                ? "gradient-primary text-primary-foreground shadow-glow"
                : "bg-card border-2 border-border hover:border-primary"
            )}
          >
            <span className="text-2xl mb-1">{emoji}</span>
            <span className="text-xs font-medium">{age}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
