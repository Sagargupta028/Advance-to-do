
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { deleteTask, toggleTaskComplete, updateTaskPriority, TaskPriority, Task } from '../../store/taskSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PriorityBadge from '../ui/PriorityBadge';
import { Trash2, MoreVertical, Check, CloudSun, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const dispatch = useAppDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleToggleComplete = () => {
    dispatch(toggleTaskComplete(task.id));
  };

  const handleChangePriority = (priority: TaskPriority) => {
    dispatch(updateTaskPriority({ id: task.id, priority }));
  };

  const formattedDate = new Date(task.createdAt).toLocaleDateString(undefined, { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card 
      className={cn(
        "glass-card overflow-hidden transition-all duration-300 ease-in-out mb-3 animate-slide-up",
        task.completed && "opacity-70"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox 
            checked={task.completed} 
            onCheckedChange={handleToggleComplete}
            className="mt-1"
          />
          
          <div className="flex-grow">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <h3 
                  className={cn(
                    "font-medium text-todo-dark transition-all duration-300",
                    task.completed && "line-through text-gray-500"
                  )}
                >
                  {task.title}
                </h3>
                <div className="flex items-center flex-wrap gap-2 text-xs text-muted-foreground">
                  <PriorityBadge priority={task.priority} size="sm" />
                  {task.isOutdoor && (
                    <span className="flex items-center text-blue-500">
                      <CloudSun className="h-3 w-3 mr-1" />
                      Outdoor
                    </span>
                  )}
                  <span>{formattedDate}</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem onClick={() => handleChangePriority('low')}>
                      <div className="flex items-center w-full">
                        <PriorityBadge priority="low" size="sm" />
                        <Check className={cn("ml-auto h-4 w-4", task.priority === 'low' ? "opacity-100" : "opacity-0")} />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleChangePriority('medium')}>
                      <div className="flex items-center w-full">
                        <PriorityBadge priority="medium" size="sm" />
                        <Check className={cn("ml-auto h-4 w-4", task.priority === 'medium' ? "opacity-100" : "opacity-0")} />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleChangePriority('high')}>
                      <div className="flex items-center w-full">
                        <PriorityBadge priority="high" size="sm" />
                        <Check className={cn("ml-auto h-4 w-4", task.priority === 'high' ? "opacity-100" : "opacity-0")} />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-xs"
                    >
                      {isExpanded ? "Hide details" : "Show details"}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={handleDelete} 
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {isExpanded && (
              <div className="mt-3 space-y-3 animate-fade-in">
                {task.quote && (
                  <div className="text-sm text-muted-foreground italic border-l-2 border-todo-blue pl-3">
                    {task.quote}
                  </div>
                )}
                
                {task.isOutdoor && (
                  <>
                    {task.weather ? (
                      <div className="flex items-center text-sm p-2 bg-blue-50 rounded-md">
                        <img 
                          src={`https://openweathermap.org/img/wn/${task.weather.icon}.png`} 
                          alt={task.weather.condition}
                          className="w-10 h-10"
                        />
                        <div className="ml-2">
                          <div className="font-medium">{task.weather.city} Weather</div>
                          <div className="text-muted-foreground">
                            {task.weather.temp}°C, {task.weather.condition}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Alert variant="destructive" className="bg-red-50">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Weather data unavailable. Please check your connection.
                        </AlertDescription>
                      </Alert>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
