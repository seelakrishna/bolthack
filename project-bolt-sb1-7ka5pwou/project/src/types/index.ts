export interface Appliance {
  id: string;
  name: string;
  powerRating: number; // watts
  dailyUsage: number; // hours
  daysPerMonth: number; // days used in a month
  category: string;
}

export interface EnergyData {
  dailyConsumption: number; // Units (kWh)
  monthlyConsumption: number; // Units (kWh)
  dailyCost: number;
  monthlyCost: number;
}

export interface PredictionData {
  date: string;
  predicted: number;
  actual?: number;
}

export interface Recommendation {
  id: string;
  type: 'optimization' | 'warning' | 'info';
  title: string;
  description: string;
  potential_savings: number;
}