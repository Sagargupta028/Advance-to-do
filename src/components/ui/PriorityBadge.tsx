
import { cn } from '@/lib/utils';
import { TaskPriority } from '../../store/taskSlice';

interface PriorityBadgeProps {
  priority: TaskPriority;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const PriorityBadge = ({ priority, className, size = 'md' }: PriorityBadgeProps) => {
  const priorityColors = {
    low: 'bg-todo-low text-white',
    medium: 'bg-todo-medium text-white',
    high: 'bg-todo-high text-white',
  };

  const priorityLabels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  };

  const sizeClasses = {
    sm: 'text-xs py-0.5 px-2',
    md: 'text-xs py-1 px-2.5',
    lg: 'text-sm py-1 px-3',
  };

  return (
    <span
      className={cn(
        'rounded-full font-medium inline-flex items-center justify-center',
        priorityColors[priority],
        sizeClasses[size],
        className
      )}
    >
      {priorityLabels[priority]}
    </span>
  );
};

export default PriorityBadge;
