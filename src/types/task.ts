
export type Priority = 'low' | 'medium' | 'high';

export type Category = {
  id: string;
  name: string;
  color: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date | null;
  priority: Priority;
  categoryId: string;
  createdAt: Date;
};

export type TaskWithCategory = Task & {
  category: Category;
};
