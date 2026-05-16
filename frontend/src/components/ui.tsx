import { useEffect, type ButtonHTMLAttributes, type PropsWithChildren, type ReactNode } from 'react'
import { Link, type To } from 'react-router-dom'
import { Icon } from './Icon.tsx'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonProps = PropsWithChildren<{
  variant?: ButtonVariant
  icon?: ReactNode
}> &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick' | 'disabled'>

export function Button({
  children,
  variant = 'secondary',
  onClick,
  icon,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`button button-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {children}
    </button>
  )
}

export function LinkButton({
  children,
  variant = 'secondary',
  icon,
  to,
}: PropsWithChildren<{
  variant?: ButtonVariant
  icon?: ReactNode
  to: To
}>) {
  return (
    <Link className={`button button-${variant}`} to={to}>
      {icon}
      {children}
    </Link>
  )
}

export function Card({
  children,
  className = '',
}: PropsWithChildren<{ className?: string }>) {
  return <section className={`card ${className}`}>{children}</section>
}

export function Badge({
  children,
  tone = 'new',
}: PropsWithChildren<{
  tone?:
    | 'new'
    | 'progress'
    | 'success'
    | 'danger'
    | 'medium'
    | 'low'
    | 'vip'
    | 'partial'
    | 'paid'
    | 'unpaid'
}>) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  to,
}: {
  title: string
  value: string
  icon: ReactNode
  trend?: ReactNode
  to?: To
}) {
  const content = (
    <>
      <div className="stat-top">
        <div className="timeline-icon">{icon}</div>
        {trend}
      </div>
      <p className="stat-title">{title}</p>
      <p className="stat-value">{value}</p>
    </>
  )

  if (to) {
    return (
      <Link className="stat-link" to={to}>
        <Card className="stat-card card-interactive">{content}</Card>
      </Link>
    )
  }

  return <Card className="stat-card">{content}</Card>
}

export function Modal({
  title,
  open,
  onClose,
  children,
  actions,
}: PropsWithChildren<{
  title: string
  open: boolean
  onClose: () => void
  actions?: ReactNode
}>) {
  useEffect(() => {
    if (!open) return
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [onClose, open])

  if (!open) return null

  return (
    <>
      <button className="modal-backdrop" aria-label="Đóng" onClick={onClose} />
      <div className="modal">
        <div className="page-header" style={{ marginBottom: 18 }}>
          <div>
            <h2 style={{ fontSize: '2rem' }}>{title}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Đóng modal">
            <Icon name="close" />
          </button>
        </div>
        {children}
        {actions ? <div className="page-actions space-top">{actions}</div> : null}
      </div>
    </>
  )
}

export function Drawer({
  title,
  open,
  onClose,
  children,
}: PropsWithChildren<{
  title: string
  open: boolean
  onClose: () => void
}>) {
  if (!open) return null

  return (
    <>
      <button className="drawer-backdrop" aria-label="Đóng" onClick={onClose} />
      <aside className="drawer">
        <div className="page-header">
          <div>
            <h2 style={{ fontSize: '2.15rem' }}>{title}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Đóng chi tiết">
            <Icon name="close" />
          </button>
        </div>
        {children}
      </aside>
    </>
  )
}

export function EmptyState({
  title,
  message,
  action,
}: {
  title: string
  message: string
  action?: ReactNode
}) {
  return (
    <div className="empty-state">
      <div className="timeline-icon">
        <Icon name="note" />
      </div>
      <strong>{title}</strong>
      <span className="muted">{message}</span>
      {action}
    </div>
  )
}
