export interface TableDataProps {
  data: FormDataProps;
  date: Date;
}

export interface DatabaseData {
  data: FormDataProps;
  date: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface FormDataProps {
  id?: string;
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
