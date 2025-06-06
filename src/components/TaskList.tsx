
import React, { useState } from 'react';
import { Category, TaskWithCategory } from '@/types/task';
import TaskItem from './TaskItem';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TaskListProps {
  tasks: TaskWithCategory[];
  categories: Category[];
  onAddTask: () => void;
  onCompleteTask: (taskId: string, completed: boolean) => void;
  onTaskClick: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  categories, 
  onAddTask, 
  onCompleteTask, 
  onTaskClick 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);

  const filteredTasks = tasks.filter(task => {
    if (!showCompleted && task.completed) return false;
    if (selectedCategory && task.categoryId !== selectedCategory) return false;
    return true;
  });

  // Calculate count of tasks per category
  const getCategoryTaskCount = (categoryId: string) => {
    return tasks.filter(task => 
      task.categoryId === categoryId && 
      (showCompleted || !task.completed)
    ).length;
  };

  // Get count of all tasks (for All button)
  const getAllTasksCount = () => {
    return tasks.filter(task => showCompleted || !task.completed).length;
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Tasks</h2>
        <Button onClick={onAddTask} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="flex flex-wrap items-center space-x-2 mb-4">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          className="mb-2 relative"
          onClick={() => setSelectedCategory(null)}
        >
          All
          <Badge className="ml-2 bg-gray-200 text-gray-800 hover:bg-gray-200">
            {getAllTasksCount()}
          </Badge>
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className="mb-2 relative"
            style={{ 
              backgroundColor: selectedCategory === category.id ? category.color : undefined,
              borderColor: selectedCategory !== category.id ? category.color : undefined,
              color: selectedCategory !== category.id ? category.color : "white"
            }}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
            <Badge 
              className="ml-2 text-xs" 
              style={{
                backgroundColor: selectedCategory === category.id ? 'rgba(255, 255, 255, 0.2)' : category.color,
                color: selectedCategory === category.id ? 'white' : 'white'
              }}
            >
              {getCategoryTaskCount(category.id)}
            </Badge>
          </Button>
        ))}
        <div className="flex-grow"></div>
        <Button
          variant="outline"
          className="mb-2"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          {showCompleted ? "Hide Completed" : "Show Completed"}
        </Button>
      </div>

      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onComplete={onCompleteTask}
              onClick={onTaskClick}
            />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No tasks found</p>
            {selectedCategory && (
              <p className="text-sm mt-2">
                Try selecting a different category or creating a new task
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
