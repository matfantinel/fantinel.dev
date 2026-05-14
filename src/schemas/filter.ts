export interface FilterTag {
  name: string;
  url: string;
  active?: boolean;
  count: number;
}

export interface FilterGroup {
  label: string;
  tags?: FilterTag[];
  groups?: FilterGroup[];
}
