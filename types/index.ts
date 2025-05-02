// Student profile types
export type StudentLevel = 'Iniciante' | 'Intermediário' | 'Avançado';

export interface Student {
  id: string;
  name: string;
  contact: string;
  goals: string;
  level: StudentLevel;
  group?: string;
  notes?: string;
  createdAt: number;
  updatedAt: number;
  // Payment related fields
  subscriptionStatus: SubscriptionStatus;
  lastPaymentDate?: number;
  nextPaymentDate?: number;
  monthlyFee: number;
}

// Payment types
export type SubscriptionStatus = 'active' | 'pending' | 'overdue' | 'cancelled';

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  paymentDate: number;
  dueDate: number;
  paymentMethod: string;
  description: string;
  transactionId?: string;
  createdAt: number;
  updatedAt: number;
}

// Training types
export type TrainingDay = 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado' | 'Domingo';

export type TrainingType = 'Normal' | 'Tiro' | 'Regenerativo' | 'Longo' | 'Competição';

export interface Training {
  id: string;
  day: TrainingDay;
  type: TrainingType;
  distance?: number;
  pace?: string;
  duration?: number;
  notes?: string;
}

export interface TrainingWeek {
  id: string;
  studentId: string;
  weekName: string;
  trainings: Training[];
  delivered: boolean;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}

// Theme type
export type ThemeMode = 'light' | 'dark' | 'system';