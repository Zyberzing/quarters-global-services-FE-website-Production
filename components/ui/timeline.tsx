import React, { ReactNode } from 'react';
import { Check, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TimelineStatus = 'completed' | 'active' | 'pending';

export interface TimelineStep {
  id: string;
  title: string;
  status: TimelineStatus;
  showInfo?: boolean;
  icon: ReactNode;
}

interface TimelineProps {
  steps: TimelineStep[];
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ steps, className }) => {
  // Calculate active progress %
  const activeIndex =
    steps.findIndex((s) => s.status === 'active') !== -1
      ? steps.findIndex((s) => s.status === 'active')
      : steps.filter((s) => s.status === 'completed').length - 1;

  const progressPercent = (activeIndex / (steps.length - 1)) * 100 || 0;

  return (
    <div className={cn('w-full py-5 px-8 rounded-xl bg-[#96C6FF4D]', className)}>
      <div className="relative overflow-x-auto">
        <div className="flex items-center min-w-max justify-between relative gap-30">
          {/* Background Line */}
          <div className="absolute top-6 left-0 right-0 border-b border-dashed border-primary z-0" />

          {/* ✅ Active Progress Line (moves with scroll) */}
          <div
            className="absolute top-6 left-0 h-0.5 bg-green-500 z-10 transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercent}%` }}
          />

          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                'flex flex-col items-center relative z-20 ',
                index === 0 && 'items-start',
                index === steps.length - 1 && 'items-end',
              )}
            >
              {/* Step Circle */}
              <div
                className={cn(
                  'w-12 h-12 rounded-lg border-4 flex items-center justify-center transition-all duration-300 bg-background text-primary',
                  {
                    'border-green-500': step.status === 'completed' || step.status === 'active',
                    'border-gray-300': step.status === 'pending',
                  },
                )}
              >
                {step.status === 'completed' ? (
                  <Check className="w-6 h-6 text-green-500" />
                ) : (
                  <>{step.icon}</>
                )}
              </div>

              {/* Step Label */}
              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm font-semibold text-primary whitespace-nowrap">
                  {step.title}
                </span>
                {step.showInfo && <Info className="w-4 h-4 text-timeline-pending" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;