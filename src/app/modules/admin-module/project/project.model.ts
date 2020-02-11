export interface Project {
  project_id: string;
  project_name: string;
  client: string;
  initial_department_id: string;
  start_date: Date;
  status: string;
  current_department: string;
  currently_assigned_user: string;
}
