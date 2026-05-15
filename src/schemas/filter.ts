export interface FilterTag {
  label: string;
  name?: string;
  url?: string;
  active?: boolean;
  count?: number;
  icon?: any;
}

export interface FilterGroup {
  label: string;
  tags?: FilterTag[];
  groups?: FilterGroup[];
  defaultOpen?: boolean;
}
