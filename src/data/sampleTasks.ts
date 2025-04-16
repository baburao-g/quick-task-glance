
import { Category, Task, TaskWithCategory } from "../types/task";

export const sampleCategories: Category[] = [
  { id: "work", name: "Work", color: "#9b87f5" },
  { id: "personal", name: "Personal", color: "#F97316" },
  { id: "shopping", name: "Shopping", color: "#0EA5E9" },
  { id: "health", name: "Health", color: "#22C55E" },
];

export const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Draft and submit the Q2 project proposal to the management team.",
    completed: false,
    dueDate: new Date(2025, 3, 20),
    priority: "high",
    categoryId: "work",
    createdAt: new Date(2025, 3, 15),
    reminder: false,
    reminderEmail: null,
    reminderTime: null
  },
  {
    id: "2",
    title: "Buy groceries",
    description: "Pick up fruits, vegetables, and snacks for the week.",
    completed: true,
    dueDate: new Date(2025, 3, 17),
    priority: "medium",
    categoryId: "shopping",
    createdAt: new Date(2025, 3, 16),
    reminder: false,
    reminderEmail: null,
    reminderTime: null
  },
  {
    id: "3", 
    title: "Schedule dentist appointment",
    description: "Call Dr. Smith's office for annual checkup.",
    completed: false,
    dueDate: new Date(2025, 3, 25),
    priority: "low",
    categoryId: "health",
    createdAt: new Date(2025, 3, 14),
    reminder: false,
    reminderEmail: null,
    reminderTime: null
  },
  {
    id: "4",
    title: "Prepare for presentation",
    description: "Create slides and practice for the quarterly review.",
    completed: false,
    dueDate: new Date(2025, 3, 19),
    priority: "high",
    categoryId: "work",
    createdAt: new Date(2025, 3, 15),
    reminder: false,
    reminderEmail: null,
    reminderTime: null
  },
  {
    id: "5",
    title: "Call mom",
    description: "Check in and catch up with mom.",
    completed: false,
    dueDate: new Date(2025, 3, 18),
    priority: "medium",
    categoryId: "personal",
    createdAt: new Date(2025, 3, 17),
    reminder: false,
    reminderEmail: null,
    reminderTime: null
  },
  {
    id: "6",
    title: "Go for a run",
    description: "30-minute jog in the park.",
    completed: false,
    dueDate: new Date(2025, 3, 17),
    priority: "low",
    categoryId: "health",
    createdAt: new Date(2025, 3, 16),
    reminder: false,
    reminderEmail: null,
    reminderTime: null
  },
  {
    id: "7",
    title: "Review expense reports",
    description: "Go through the team's expense reports and approve or reject them.",
    completed: false,
    dueDate: new Date(2025, 3, 22),
    priority: "medium",
    categoryId: "work",
    createdAt: new Date(2025, 3, 15),
    reminder: false,
    reminderEmail: null,
    reminderTime: null
  },
  {
    id: "8",
    title: "Order new headphones",
    description: "Research and purchase noise-cancelling headphones.",
    completed: false,
    dueDate: new Date(2025, 3, 24),
    priority: "low",
    categoryId: "shopping",
    createdAt: new Date(2025, 3, 18),
    reminder: false,
    reminderEmail: null,
    reminderTime: null
  },
];

export const getTasksWithCategories = (): TaskWithCategory[] => {
  return sampleTasks.map(task => {
    const category = sampleCategories.find(c => c.id === task.categoryId);
    return {
      ...task,
      category: category!
    };
  });
};
