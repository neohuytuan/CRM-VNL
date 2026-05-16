/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import { seedState } from '../data/seed.ts'
import type {
  Activity,
  CRMState,
  Customer,
  Lead,
  Opportunity,
  Payment,
  Task,
  UserProfile,
} from '../domain/types.ts'
import { generateId } from '../lib/format.ts'
import {
  customerTypeLabels,
  opportunityStageLabels,
  paymentStatusLabels,
  taskStatusLabels,
} from '../lib/labels.ts'
import { useLocalStorageState } from './useLocalStorageState.ts'

type ToastTone = 'info' | 'success' | 'warning'

interface Toast {
  id: string
  title: string
  message: string
  tone: ToastTone
}

interface CRMContextValue {
  state: CRMState
  currentUser: UserProfile
  toasts: Toast[]
  notify: (title: string, message: string, tone?: ToastTone) => void
  dismissToast: (id: string) => void
  createLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => string
  createCustomer: (customer: Omit<Customer, 'id' | 'lastInteraction'>) => string
  updateCustomer: (customerId: string, changes: Partial<Customer>) => void
  addCustomerNote: (customerId: string, title: string, description: string) => void
  createOpportunity: (opportunity: Omit<Opportunity, 'id'>) => string
  moveOpportunity: (opportunityId: string, stage: Opportunity['stage']) => void
  createTask: (task: Omit<Task, 'id'>) => string
  updateTask: (taskId: string, changes: Partial<Task>) => void
  createPayment: (payment: Omit<Payment, 'id'>) => string
  updatePayment: (paymentId: string, changes: Partial<Payment>) => void
  updateCurrentUser: (changes: Partial<UserProfile>) => void
  resetDemo: () => void
}

const CRMContext = createContext<CRMContextValue | null>(null)

export function CRMProvider({ children }: PropsWithChildren) {
  const [state, setState] = useLocalStorageState<CRMState>('crm-vinhhung-demo-v3', seedState)
  const [toasts, setToasts] = useState<Toast[]>([])

  const currentUser = useMemo(() => {
    return state.users.find((user) => user.id === state.currentUserId) ?? state.users[0]
  }, [state.currentUserId, state.users])

  function notify(title: string, message: string, tone: ToastTone = 'info') {
    const id = generateId('toast')
    setToasts((current) => [...current.slice(-2), { id, title, message, tone }])
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 3200)
  }

  function dismissToast(id: string) {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }

  function appendActivity(activity: Omit<Activity, 'id' | 'createdAt' | 'actorId'>) {
    const nextActivity: Activity = {
      id: generateId('activity'),
      createdAt: new Date().toISOString(),
      actorId: currentUser.id,
      ...activity,
    }

    setState((current) => ({
      ...current,
      activities: [nextActivity, ...current.activities],
    }))
  }

  function createLead(lead: Omit<Lead, 'id' | 'createdAt'>) {
    const nextLead: Lead = {
      id: generateId('lead'),
      createdAt: new Date().toISOString(),
      ...lead,
    }

    setState((current) => ({
      ...current,
      leads: [nextLead, ...current.leads],
    }))

    appendActivity({
      type: 'opportunity',
      title: 'Đã tạo lead mới',
      description: `${lead.fullName} từ kênh ${lead.source}.`,
    })
    notify('Lead mới đã được tạo', `${lead.fullName} đã vào danh sách chăm sóc.`, 'success')
    return nextLead.id
  }

  function createCustomer(customer: Omit<Customer, 'id' | 'lastInteraction'>) {
    const nextCustomer: Customer = {
      id: generateId('customer'),
      lastInteraction: new Date().toISOString(),
      ...customer,
    }

    setState((current) => ({
      ...current,
      customers: [nextCustomer, ...current.customers],
    }))

    appendActivity({
      type: 'note',
      title: 'Đã tạo khách hàng mới',
      description: `${customer.fullName} - ${customerTypeLabels[customer.customerType]}.`,
      customerId: nextCustomer.id,
    })
    notify('Đã thêm khách hàng', `${customer.fullName} đã sẵn sàng cho quy trình CRM.`, 'success')
    return nextCustomer.id
  }

  function updateCustomer(customerId: string, changes: Partial<Customer>) {
    setState((current) => ({
      ...current,
      customers: current.customers.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              ...changes,
              lastInteraction: new Date().toISOString(),
            }
          : customer,
      ),
    }))

    notify('Đã cập nhật khách hàng', 'Thông tin hồ sơ đã được lưu lại.', 'success')
  }

  function addCustomerNote(customerId: string, title: string, description: string) {
    setState((current) => ({
      ...current,
      customers: current.customers.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              lastInteraction: new Date().toISOString(),
            }
          : customer,
      ),
    }))

    appendActivity({
      type: 'note',
      title,
      description,
      customerId,
    })

    notify('Đã thêm ghi chú', 'Lịch sử chăm sóc đã được cập nhật.', 'success')
  }

  function createOpportunity(opportunity: Omit<Opportunity, 'id'>) {
    const nextOpportunity: Opportunity = {
      id: generateId('opp'),
      ...opportunity,
    }

    setState((current) => ({
      ...current,
      opportunities: [nextOpportunity, ...current.opportunities],
    }))

    appendActivity({
      type: 'opportunity',
      title: 'Đã tạo cơ hội mới',
      description: `${opportunity.name} - ${opportunityStageLabels[opportunity.stage]}.`,
      customerId: opportunity.customerId,
      opportunityId: nextOpportunity.id,
    })
    notify('Đã tạo cơ hội', 'Cơ hội mới đã xuất hiện trong pipeline.', 'success')
    return nextOpportunity.id
  }

  function moveOpportunity(opportunityId: string, stage: Opportunity['stage']) {
    let movedOpportunity: Opportunity | undefined

    setState((current) => ({
      ...current,
      opportunities: current.opportunities.map((opportunity) => {
        if (opportunity.id !== opportunityId) return opportunity
        movedOpportunity = { ...opportunity, stage }
        return movedOpportunity
      }),
    }))

    if (movedOpportunity) {
      appendActivity({
        type: 'opportunity',
        title: 'Đã cập nhật giai đoạn cơ hội',
        description: `${movedOpportunity.name} chuyển sang ${opportunityStageLabels[stage]}.`,
        customerId: movedOpportunity.customerId,
        opportunityId: movedOpportunity.id,
      })
      notify('Đã cập nhật pipeline', `Cơ hội đã chuyển sang "${opportunityStageLabels[stage]}".`, 'success')
    }
  }

  function createTask(task: Omit<Task, 'id'>) {
    const nextTask: Task = { id: generateId('task'), ...task }

    setState((current) => ({
      ...current,
      tasks: [nextTask, ...current.tasks],
    }))

    appendActivity({
      type: 'task',
      title: 'Đã tạo công việc mới',
      description: task.title,
      customerId: task.customerId,
      opportunityId: task.opportunityId,
      taskId: nextTask.id,
    })
    notify('Đã tạo công việc', 'Nhiệm vụ mới đã vào lịch xử lý.', 'success')
    return nextTask.id
  }

  function updateTask(taskId: string, changes: Partial<Task>) {
    let nextTask: Task | undefined

    setState((current) => ({
      ...current,
      tasks: current.tasks.map((task) => {
        if (task.id !== taskId) return task
        nextTask = { ...task, ...changes }
        return nextTask
      }),
    }))

    if (nextTask) {
      appendActivity({
        type: 'task',
        title: 'Đã cập nhật công việc',
        description: `${nextTask.title} - ${taskStatusLabels[nextTask.status]}.`,
        customerId: nextTask.customerId,
        opportunityId: nextTask.opportunityId,
        taskId: nextTask.id,
      })
      notify('Đã cập nhật công việc', 'Trạng thái hoặc thông tin task đã được lưu.', 'success')
    }
  }

  function createPayment(payment: Omit<Payment, 'id'>) {
    const nextPayment: Payment = { id: generateId('payment'), ...payment }

    setState((current) => ({
      ...current,
      payments: [nextPayment, ...current.payments],
    }))

    appendActivity({
      type: 'payment',
      title: 'Đã ghi nhận thanh toán',
      description: `${paymentStatusLabels[payment.status]} - ${payment.amount.toLocaleString('vi-VN')} VND.`,
      customerId: payment.customerId,
      opportunityId: payment.opportunityId,
    })
    notify('Đã ghi nhận thanh toán', 'Bảng thống kê thanh toán đã được cập nhật.', 'success')
    return nextPayment.id
  }

  function updatePayment(paymentId: string, changes: Partial<Payment>) {
    let nextPayment: Payment | undefined

    setState((current) => ({
      ...current,
      payments: current.payments.map((payment) => {
        if (payment.id !== paymentId) return payment
        nextPayment = { ...payment, ...changes }
        return nextPayment
      }),
    }))

    if (nextPayment) {
      appendActivity({
        type: 'payment',
        title: 'Đã cập nhật thông tin thanh toán',
        description: `${paymentStatusLabels[nextPayment.status]} - ${nextPayment.amount.toLocaleString('vi-VN')} VND.`,
        customerId: nextPayment.customerId,
        opportunityId: nextPayment.opportunityId,
      })
      notify('Đã cập nhật thanh toán', 'Tình trạng thanh toán đã được cập nhật.', 'success')
    }
  }

  function updateCurrentUser(changes: Partial<UserProfile>) {
    setState((current) => ({
      ...current,
      users: current.users.map((user) =>
        user.id === current.currentUserId ? { ...user, ...changes } : user,
      ),
    }))

    notify('Đã lưu cài đặt', 'Thông tin hồ sơ và cấu hình đã được cập nhật.', 'success')
  }

  function resetDemo() {
    setState(seedState)
    notify('Đã đặt lại dữ liệu demo', 'Toàn bộ trạng thái đã quay về bản seed ban đầu.', 'warning')
  }

  const value: CRMContextValue = {
    state,
    currentUser,
    toasts,
    notify,
    dismissToast,
    createLead,
    createCustomer,
    updateCustomer,
    addCustomerNote,
    createOpportunity,
    moveOpportunity,
    createTask,
    updateTask,
    createPayment,
    updatePayment,
    updateCurrentUser,
    resetDemo,
  }

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>
}

export function useCRM() {
  const context = useContext(CRMContext)
  if (!context) {
    throw new Error('useCRM must be used inside CRMProvider')
  }

  return context
}
