export interface Game {
  id: number;
  user_id: number | null;
  name: string;
  created_at: Date;
  updated_at: Date;
  primary_color: string;
  secondary_color: string;
  tertiary_color: string;
  image: string;
}

export interface IDropdownMenuItems {
  id?: number;
  name: string;
  value?: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}