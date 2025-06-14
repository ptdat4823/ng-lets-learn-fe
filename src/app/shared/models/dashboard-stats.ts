import { Rank } from "@shared/components/ranking/rank-logo/rank-logo.component";

export interface DashboardStat {
  label: string;
  value: string | number;
  increasement?: string | number;
  note?: string;
  rank?: Rank;
}