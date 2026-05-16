/* eslint-disable react-refresh/only-export-components */
import { Link, useSearchParams } from 'react-router-dom'
import { useCRM } from '../app/CRMContext.tsx'
import { appRoutes } from '../app/routes.ts'
import { Badge } from '../components/ui.tsx'
import type { Activity, Customer, Lead, Opportunity, Payment, Task } from '../domain/types.ts'
import {
  activityTypeLabels,
  customerTypeLabels,
  leadStatusLabels,
  opportunityStageLabels,
  paymentMethodLabels,
  paymentStatusLabels,
  roleLabels,
  taskPriorityLabels,
  taskStatusLabels,
} from '../lib/labels.ts'

export function OwnerName({ ownerId }: { ownerId: string }) {
  const { state } = useCRM()
  return state.users.find((user) => user.id === ownerId)?.fullName ?? 'Chưa gán'
}

export function CustomerName({ customerId }: { customerId: string }) {
  const { state } = useCRM()
  return state.customers.find((customer) => customer.id === customerId)?.fullName ?? 'Khách chưa xác định'
}

export function CustomerTypeBadge({ customerType }: { customerType: Customer['customerType'] }) {
  return (
    <Badge tone={customerType === 'VIP' ? 'vip' : customerType === 'Dai ly' ? 'progress' : 'new'}>
      {customerTypeLabels[customerType]}
    </Badge>
  )
}

export function LeadStatusBadge({ status }: { status: Lead['status'] }) {
  return (
    <Badge
      tone={
        status === 'Da chot'
          ? 'success'
          : status === 'Dang tu van'
            ? 'progress'
            : status === 'Huy'
              ? 'danger'
              : 'new'
      }
    >
      {leadStatusLabels[status]}
    </Badge>
  )
}

export function OpportunityStageBadge({
  stage,
}: {
  stage: Opportunity['stage']
}) {
  return (
    <Badge
      tone={
        stage === 'Da chot'
          ? 'success'
          : stage === 'Cho chot'
            ? 'progress'
            : stage === 'Huy'
              ? 'danger'
              : 'new'
      }
    >
      {opportunityStageLabels[stage]}
    </Badge>
  )
}

export function TaskStatusBadge({ status }: { status: Task['status'] }) {
  return (
    <Badge
      tone={
        status === 'Da hoan thanh'
          ? 'success'
          : status === 'Dang thuc hien'
            ? 'progress'
            : status === 'Huy'
              ? 'danger'
              : 'new'
      }
    >
      {taskStatusLabels[status]}
    </Badge>
  )
}

export function TaskPriorityBadge({ priority }: { priority: Task['priority'] }) {
  return (
    <Badge tone={priority === 'Cao' ? 'danger' : priority === 'Trung binh' ? 'medium' : 'low'}>
      {taskPriorityLabels[priority]}
    </Badge>
  )
}

export function PaymentStatusBadge({ status }: { status: Payment['status'] }) {
  return (
    <Badge
      tone={
        status === 'Da thanh toan'
          ? 'paid'
          : status === 'Thanh toan mot phan'
            ? 'partial'
            : 'unpaid'
      }
    >
      {paymentStatusLabels[status]}
    </Badge>
  )
}

export function RecordLink({
  to,
  title,
  subtitle,
}: {
  to: string
  title: string
  subtitle?: string
}) {
  return (
    <Link className="record-link" to={to}>
      <strong>{title}</strong>
      {subtitle ? <div className="muted">{subtitle}</div> : null}
    </Link>
  )
}

export function getPaymentMethodLabel(method: Payment['paymentMethod']) {
  return paymentMethodLabels[method]
}

export function getUserRoleLabel(role: string) {
  return roleLabels[role as keyof typeof roleLabels]
}

export function getActivityRoute(activity: Activity) {
  if (activity.taskId) return appRoutes.taskDetail(activity.taskId)
  if (activity.opportunityId) return appRoutes.opportunityDetail(activity.opportunityId)
  if (activity.customerId) return appRoutes.customerDetail(activity.customerId)
  return appRoutes.activity
}

export function getActivityTypeLabel(type: Activity['type']) {
  return activityTypeLabels[type]
}

export function useEntityPrefill() {
  const { state } = useCRM()
  const [searchParams] = useSearchParams()
  const leadId = searchParams.get('leadId')
  const customerId = searchParams.get('customerId')
  const opportunityId = searchParams.get('opportunityId')
  const lead = leadId ? state.leads.find((item) => item.id === leadId) ?? null : null
  const customer = customerId ? state.customers.find((item) => item.id === customerId) ?? null : null
  const opportunity = opportunityId
    ? state.opportunities.find((item) => item.id === opportunityId) ?? null
    : null

  return { lead, customer, opportunity, leadId, customerId, opportunityId }
}
