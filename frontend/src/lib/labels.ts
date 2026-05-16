import type {
  ActivityType,
  CustomerType,
  LeadStatus,
  OpportunityStage,
  PaymentMethod,
  PaymentStatus,
  TaskPriority,
  TaskStatus,
  UserRole,
} from '../domain/types.ts'

export const roleLabels: Record<UserRole, string> = {
  Admin: 'Admin',
  'Truong nhom': 'Trưởng nhóm',
  'Nhan vien Sales': 'Nhân viên Sales',
}

export const customerTypeLabels: Record<CustomerType, string> = {
  'Khach le': 'Khách lẻ',
  'Dai ly': 'Đại lý',
  VIP: 'VIP',
}

export const leadStatusLabels: Record<LeadStatus, string> = {
  Moi: 'Mới',
  'Dang tu van': 'Đang tư vấn',
  'Da chot': 'Đã chốt',
  Huy: 'Huỷ',
}

export const opportunityStageLabels: Record<OpportunityStage, string> = {
  Moi: 'Mới',
  'Dang lam viec': 'Đang làm việc',
  'Cho chot': 'Chờ chốt',
  'Da chot': 'Đã chốt',
  Huy: 'Huỷ',
}

export const taskStatusLabels: Record<TaskStatus, string> = {
  'Can lam': 'Cần làm',
  'Dang thuc hien': 'Đang thực hiện',
  'Da hoan thanh': 'Đã hoàn thành',
  Huy: 'Huỷ',
}

export const taskPriorityLabels: Record<TaskPriority, string> = {
  Thap: 'Thấp',
  'Trung binh': 'Trung bình',
  Cao: 'Cao',
}

export const paymentStatusLabels: Record<PaymentStatus, string> = {
  'Chua thanh toan': 'Chưa thanh toán',
  'Thanh toan mot phan': 'Thanh toán một phần',
  'Da thanh toan': 'Đã thanh toán',
}

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  'Tien mat': 'Tiền mặt',
  'Chuyen khoan': 'Chuyển khoản',
  'Vi dien tu': 'Ví điện tử',
  Khac: 'Khác',
}

export const activityTypeLabels: Record<ActivityType, string> = {
  call: 'Cuộc gọi',
  email: 'Email',
  meeting: 'Cuộc họp',
  note: 'Ghi chú',
  payment: 'Thanh toán',
  task: 'Công việc',
  opportunity: 'Cơ hội',
}

export const leadStatusValues: LeadStatus[] = ['Moi', 'Dang tu van', 'Da chot', 'Huy']
export const opportunityStageValues: OpportunityStage[] = [
  'Moi',
  'Dang lam viec',
  'Cho chot',
  'Da chot',
  'Huy',
]
export const taskStatusValues: TaskStatus[] = [
  'Can lam',
  'Dang thuc hien',
  'Da hoan thanh',
  'Huy',
]
export const taskPriorityValues: TaskPriority[] = ['Cao', 'Trung binh', 'Thap']
export const paymentStatusValues: PaymentStatus[] = [
  'Chua thanh toan',
  'Thanh toan mot phan',
  'Da thanh toan',
]
export const paymentMethodValues: PaymentMethod[] = [
  'Tien mat',
  'Chuyen khoan',
  'Vi dien tu',
  'Khac',
]
