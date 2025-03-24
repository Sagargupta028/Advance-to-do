
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { clearAllTasks, Task, TaskPriority } from '../../store/taskSlice';
import TaskItem from './TaskItem';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

const TaskList = () => {
  const { tasks } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState<string>("all");
  
  if (tasks.length === 0) {
    return (
      <Alert className="bg-todo-light/50 border border-todo-blue/10 animate-fade-in">
        <AlertDescription className="text-center py-8">
          <p className="text-lg font-medium mb-2">No tasks yet</p>
          <p className="text-muted-foreground">Add your first task to get started</p>
        </AlertDescription>
      </Alert>
    );
  }

  // Filter tasks based on selected tab
  const getFilteredTasks = (): Task[] => {
    switch (tab) {
      case 'completed':
        return [...tasks].filter(task => task.completed);
      case 'active':
        return [...tasks].filter(task => !task.completed);
      case 'high':
        return [...tasks].filter(task => task.priority === 'high');
      case 'medium':
        return [...tasks].filter(task => task.priority === 'medium');
      case 'low':
        return [...tasks].filter(task => task.priority === 'low');
      default:
        return [...tasks];
    }
  };

  const filteredTasks = getFilteredTasks();
  const completedCount = tasks.filter(task => task.completed).length;
  const activeCount = tasks.length - completedCount;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Your Tasks</h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-destructive hover:text-destructive button-animation"
            >
              <Trash2 className="h-4 w-4 mr-1" /> Clear All
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="glass-card">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all your tasks. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => dispatch(clearAllTasks())}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Tabs defaultValue="all" value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-4">
          <TabsTrigger value="all">
            All ({tasks.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Active ({activeCount})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedCount})
          </TabsTrigger>
          <TabsTrigger value="high" className="hidden lg:flex">
            High
          </TabsTrigger>
          <TabsTrigger value="medium" className="hidden lg:flex">
            Medium
          </TabsTrigger>
          <TabsTrigger value="low" className="hidden lg:flex">
            Low
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={tab} className="mt-0">
          {filteredTasks.length === 0 ? (
            <Alert className="bg-todo-light/50 border border-todo-blue/10">
              <AlertDescription className="text-center py-6">
                No tasks in this category
              </AlertDescription>
            </Alert>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskList;
