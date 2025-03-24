
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addTaskWithQuote, TaskPriority } from '../../store/taskSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import PriorityBadge from '../ui/PriorityBadge';
import { Plus, CloudSun } from 'lucide-react';

const TaskInput = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [isOutdoor, setIsOutdoor] = useState(false);
  const [city, setCity] = useState('London');
  const [showCityInput, setShowCityInput] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.tasks);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTaskWithQuote({ 
        title: title.trim(), 
        priority,
        isOutdoor,
        city: isOutdoor ? city : undefined
      }));
      setTitle('');
      setIsOutdoor(false);
      setShowCityInput(false);
    }
  };

  const handleOutdoorChange = (checked: boolean) => {
    setIsOutdoor(checked);
    setShowCityInput(checked);
  };

  return (
    <Card className="glass-card animate-fade-in">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col md:flex-row gap-3">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-grow input-field"
              disabled={isLoading}
              required
            />
            <Select
              value={priority}
              onValueChange={(value) => setPriority(value as TaskPriority)}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full md:w-[140px] input-field h-11">
                <SelectValue>
                  <div className="flex items-center space-x-2">
                    <PriorityBadge priority={priority} size="sm" />
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <div className="flex items-center space-x-2">
                    <PriorityBadge priority="low" size="sm" />
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center space-x-2">
                    <PriorityBadge priority="medium" size="sm" />
                  </div>
                </SelectItem>
                <SelectItem value="high">
                  <div className="flex items-center space-x-2">
                    <PriorityBadge priority="high" size="sm" />
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Button 
              type="submit" 
              disabled={isLoading || !title.trim()}
              className="bg-todo-blue hover:bg-blue-600 button-animation h-11"
            >
              {isLoading ? 'Adding...' : <Plus className="mr-1" />}
              {isLoading ? '' : 'Add Task'}
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="outdoor" 
              checked={isOutdoor}
              onCheckedChange={(checked) => handleOutdoorChange(!!checked)}
            />
            <label
              htmlFor="outdoor"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
            >
              <CloudSun className="h-4 w-4 mr-1 text-blue-500" />
              Outdoor activity (adds weather info)
            </label>
          </div>
          
          {showCityInput && (
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city for weather (e.g., London)"
              className="w-full md:w-1/2 input-field"
              disabled={isLoading}
            />
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskInput;
