export type UserRole = 'Admin' | 'Truong nhom' | 'Nhan vien Sales'
export type CustomerType = 'Khach le' | 'Dai ly' | 'VIP'
export type LeadStatus = 'Moi' | 'Dang tu van' | 'Da chot' | 'Huy'
export type OpportunityStage =
  | 'Moi'
  | 'Dang lam viec'
  | 'Cho chot'
  | 'Da chot'
  | 'Huy'
export type TaskStatus = 'Can lam' | 'Dang thuc hien' | 'Da hoan thanh' | 'Huy'
export type TaskPriority = 'Thap' | 'Trung binh' | 'Cao'
export type PaymentStatus = 'Chua thanh toan' | 'Thanh toan mot phan' | 'Da thanh toan'
export type PaymentMethod = 'Tien mat' | 'Chuyen khoan' | 'Vi dien tu' | 'Khac'
export type ActivityType = 'call' | 'email' | 'meeting' | 'note' | 'payment' | 'task' | 'opportunity'

export interface UserProfile {
  id: string
  fullName: string
  email: string
  phone: string
  role: UserRole
  teamId: string
  title: string
}

export interface Team {
  id: string
  name: string
  description: string
}

export interface Lead {
  id: string
  fullName: string
  phone: string
  email: string
  source: string
  status: LeadStatus
  interestedProduct: string
  expectedValue: number
  ownerId: string
  createdAt: string
  company: string
  note: string
}

export interface Customer {
  id: string
  fullName: string
  phone: string
  email: string
  address: string
  birthday: string
  job: string
  company: string
  channel: string
  customerType: CustomerType
  interestedProducts: string[]
  ownerId: string
  teamId: string
  tags: string[]
  purchasedProducts: string[]
  lastInteraction: string
}

export interface Opportunity {
  id: string
  customerId: string
  name: string
  product: string
  stage: OpportunityStage
  value: number
  expectedCloseDate: string
  ownerId: string
  note: string
}

export interface Task {
  id: string
  title: string
  description: string
  customerId?: string
  opportunityId?: string
  dueDate: string
  status: TaskStatus
  priority: TaskPriority
  assignedTo: string
  createdBy: string
  progress: number
}

export interface Payment {
  id: string
  opportunityId: string
  customerId: string
  amount: number
  paymentMethod: PaymentMethod
  status: PaymentStatus
  paymentDate?: string
  note: string
}

export interface Activity {
  id: string
  type: ActivityType
  title: string
  description: string
  createdAt: string
  actorId: string
  customerId?: string
  opportunityId?: string
  taskId?: string
}

export interface Catalogs {
  customerTypes: CustomerType[]
  products: string[]
  channels: string[]
  sources: string[]
  tags: string[]
  teams: Team[]
}

export interface CRMState {
  currentUserId: string
  users: UserProfile[]
  leads: Lead[]
  customers: Customer[]
  opportunities: Opportunity[]
  tasks: Task[]
  payments: Payment[]
  activities: Activity[]
  catalogs: Catalogs
}
