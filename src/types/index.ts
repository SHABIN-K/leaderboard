export interface TableDataType {
  user_name: string;
  avatar_url: string;
  user_url: string;
  total_points: number;
  full_name: string;
  college: string;
  rank: number;
}

export interface FormDataProps {
  date: Date;
  name: string;
  department: string;
  team: string;
  item: string;
  prize: string;
}

export interface TeamProps {
  name: string;
  logo: string;
  link: string;
  total_points: number;
}

export interface LoaderProps {
  isLoading: boolean;
  setIsLoading: boolean;
}
