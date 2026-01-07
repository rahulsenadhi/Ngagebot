interface UsageBarProps {
  current: number;
  max: number;
  label: string;
  warningThreshold?: number;
}

export default function UsageBar({ current, max, label, warningThreshold = 0.8 }: UsageBarProps) {
  const percentage = (current / max) * 100;
  const isWarning = percentage >= warningThreshold * 100;
  const isFull = current >= max;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">{label}</span>
        <span className={`text-sm font-semibold ${isFull ? 'text-red-400' : isWarning ? 'text-orange-400' : 'text-gray-300'}`}>
          {current} / {max}
        </span>
      </div>
      <div className="h-2 bg-dark-border rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            isFull ? 'bg-red-500' : isWarning ? 'bg-orange-500' : 'bg-primary-blue'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}
