
import React, { useState } from 'react';
import { getTasksWithCategories, sampleCategories, sampleTasks } from '@/data/sampleTasks';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import CalendarView from '@/components/CalendarView';
import { Task, TaskWithCategory } from '@/types/task';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, ListTodo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [tasks, setTasks] = useState<TaskWithCategory[]>(getTasksWithCategories());
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  const { toast } = useToast();

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed } : task
      )
    );

    toast({
      title: completed ? "Task completed!" : "Task marked incomplete",
      description: `Task has been ${completed ? "completed" : "marked as incomplete"}.`,
      duration: 3000,
    });
  };

  const handleTaskClick = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setCurrentTask(task);
      setTaskFormOpen(true);
    }
  };

  const handleAddTask = () => {
    setCurrentTask(undefined);
    setTaskFormOpen(true);
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (taskData.id) {
      // Update existing task
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskData.id
            ? { 
                ...task, 
                ...taskData, 
                category: task.category,
                reminder: taskData.reminder || false,
                reminderEmail: taskData.reminderEmail || null,
                reminderTime: taskData.reminderTime || null
              }
            : task
        )
      );
      
      // Show reminder toast if enabled
      if (taskData.reminder && taskData.reminderEmail) {
        toast({
          title: "Reminder set",
          description: `Email reminder has been set for this task.`,
          duration: 3000,
        });
      }
      
      toast({
        title: "Task updated",
        description: "Your task has been successfully updated.",
        duration: 3000,
      });
    } else {
      // Create new task
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskData.title || "",
        description: taskData.description || "",
        completed: false,
        dueDate: taskData.dueDate || null,
        priority: taskData.priority || "medium",
        categoryId: taskData.categoryId || sampleCategories[0].id,
        createdAt: new Date(),
        reminder: taskData.reminder || false,
        reminderEmail: taskData.reminderEmail || null,
        reminderTime: taskData.reminderTime || null
      };
      
      const category = sampleCategories.find(c => c.id === newTask.categoryId);
      const newTaskWithCategory: TaskWithCategory = {
        ...newTask,
        category: category!,
      };
      
      setTasks(prevTasks => [...prevTasks, newTaskWithCategory]);
      
      // Show reminder toast if enabled
      if (newTask.reminder && newTask.reminderEmail) {
        toast({
          title: "Reminder set",
          description: `Email reminder has been set for "${newTask.title}".`,
          duration: 3000,
        });
      }
      
      toast({
        title: "Task created",
        description: "Your new task has been successfully created.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4">
        <Tabs defaultValue="list">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="list" className="flex items-center">
                <ListTodo className="h-4 w-4 mr-2" />
                List View
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-2" />
                Calendar View
              </TabsTrigger>
            </TabsList>
            
            <Button 
              onClick={handleAddTask}
              className="bg-primary hover:bg-primary/90"
            >
              Add Task
            </Button>
          </div>
          
          <TabsContent value="list" className="mt-6">
            <TaskList 
              tasks={tasks}
              categories={sampleCategories}
              onAddTask={handleAddTask}
              onCompleteTask={handleTaskComplete}
              onTaskClick={handleTaskClick}
            />
          </TabsContent>
          
          <TabsContent value="calendar" className="mt-6">
            <CalendarView 
              tasks={tasks}
              onTaskClick={handleTaskClick}
            />
          </TabsContent>
        </Tabs>
      </main>
      
      <TaskForm
        task={currentTask}
        categories={sampleCategories}
        open={taskFormOpen}
        onClose={() => setTaskFormOpen(false)}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default Index;
