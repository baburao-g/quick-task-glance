
import React from 'react';
import { format } from 'date-fns';
import { Calendar, CheckCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TaskWithCategory } from '@/types/task';
import { Checkbox } from '@/components/ui/checkbox';

interface TaskItemProps {
  task: TaskWithCategory;
  onComplete: (taskId: string, completed: boolean) => void;
  onClick: (taskId: string) => void;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete, onClick }) => {
  const handleCheckboxChange = (checked: boolean) => {
    onComplete(task.id, checked);
  };

  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow-sm p-4 border-l-4 transition-all cursor-pointer hover:shadow-md",
        task.completed ? "opacity-60 border-gray-300" : `border-l-4`,
        !task.completed && `border-[${task.category.color}]`
      )}
      style={{ borderLeftColor: task.completed ? undefined : task.category.color }}
      onClick={() => onClick(task.id)}
    >
      <div className="flex items-start gap-3">
        <div className="pt-0.5" onClick={(e) => e.stopPropagation()}>
          <Checkbox 
            checked={task.completed} 
            onCheckedChange={handleCheckboxChange}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "font-medium text-gray-900 mb-1",
            task.completed && "line-through text-gray-500"
          )}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {task.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span 
              className={cn(
                "text-xs px-2 py-1 rounded-full",
                priorityColors[task.priority]
              )}
            >
              {task.priority}
            </span>
            <span 
              className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
              style={{ backgroundColor: `${task.category.color}20`, color: task.category.color }}
            >
              {task.category.name}
            </span>
            {task.dueDate && (
              <span className="text-xs flex items-center gap-1 text-gray-600">
                <Calendar className="h-3 w-3" />
                {format(task.dueDate, 'MMM d, yyyy')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
