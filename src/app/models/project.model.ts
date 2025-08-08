export interface Project {
  _id?: string;
  name: string;
  description: string;
  status?: 'ongoing' | 'completed' | 'planned';
  startDate?: Date;
  endDate?: Date;
}
