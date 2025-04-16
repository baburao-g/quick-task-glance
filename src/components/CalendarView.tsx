
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday, 
  addMonths, 
  subMonths 
} from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { TaskWithCategory } from '@/types/task';

interface CalendarViewProps {
  tasks: TaskWithCategory[];
  onTaskClick: (taskId: string) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ tasks, onTaskClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  
  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => 
      task.dueDate && isSameDay(task.dueDate, date)
    );
  };

  // Get today's date for comparison
  const today = new Date();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
        <div className="flex items-center">
          <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-px bg-gray-100">
        {dayNames.map((day) => (
          <div 
            key={day} 
            className="p-2 text-center text-sm font-medium text-gray-700 bg-gray-50"
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-px bg-gray-100">
        {daysInMonth.map((day, i) => {
          const dayTasks = getTasksForDate(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const dayIsToday = isToday(day);
          
          return (
            <div 
              key={i} 
              className={cn(
                "min-h-[100px] p-2 bg-white",
                !isCurrentMonth && "bg-gray-50 text-gray-400",
                dayIsToday && "bg-blue-50"
              )}
            >
              <div className={cn(
                "text-sm font-medium text-right mb-1",
                dayIsToday && "text-blue-600"
              )}>
                {format(day, 'd')}
              </div>
              
              <div className="space-y-1">
                {dayTasks.slice(0, 3).map((task) => (
                  <div 
                    key={task.id}
                    className={cn(
                      "px-2 py-1 text-xs rounded truncate cursor-pointer",
                      task.completed ? "line-through opacity-50" : "",
                      task.priority === 'high' ? "bg-orange-100 text-orange-800" :
                      task.priority === 'medium' ? "bg-blue-100 text-blue-800" :
                      "bg-green-100 text-green-800"
                    )}
                    onClick={() => onTaskClick(task.id)}
                  >
                    {task.title}
                  </div>
                ))}
                
                {dayTasks.length > 3 && (
                  <div className="text-xs text-gray-500 text-center">
                    +{dayTasks.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
