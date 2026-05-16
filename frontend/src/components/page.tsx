import type { PropsWithChildren, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Card, LinkButton } from './ui.tsx'

export interface BreadcrumbItem {
  label: string
  to?: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="breadcrumb-item">
          {item.to ? (
            <Link className="breadcrumb-link" to={item.to}>
              {item.label}
            </Link>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
          {index < items.length - 1 ? <span className="breadcrumb-separator">/</span> : null}
        </span>
      ))}
    </div>
  )
}

export function PageHeader({
  title,
  description,
  actions,
  breadcrumbs,
  eyebrow,
}: {
  title: string
  description: string
  actions?: ReactNode
  breadcrumbs?: BreadcrumbItem[]
  eyebrow?: string
}) {
  return (
    <div className="page-shell-header">
      {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      <div className="page-header">
        <div className="page-header-main">
          {eyebrow ? <div className="page-eyebrow">{eyebrow}</div> : null}
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        {actions ? <div className="page-actions">{actions}</div> : null}
      </div>
    </div>
  )
}

export function SectionHeader({
  title,
  description,
  actions,
}: {
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <div className="section-header">
      <div>
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      {actions ? <div className="row-actions">{actions}</div> : null}
    </div>
  )
}

export function DetailLayout({
  main,
  side,
}: {
  main: ReactNode
  side: ReactNode
}) {
  return (
    <div className="detail-layout">
      <div className="detail-main">{main}</div>
      <div className="detail-side">{side}</div>
    </div>
  )
}

export function InfoGrid({
  items,
}: {
  items: Array<{ label: string; value: ReactNode }>
}) {
  return (
    <div className="info-grid">
      {items.map((item) => (
        <div key={item.label} className="info-pair">
          <span className="info-label">{item.label}</span>
          <div className="info-value">{item.value}</div>
        </div>
      ))}
    </div>
  )
}

export function ActionGrid({
  items,
}: {
  items: Array<{
    title: string
    description: string
    to: string
    actionLabel: string
  }>
}) {
  return (
    <div className="action-grid">
      {items.map((item) => (
        <Card key={item.title} className="card-pad action-card">
          <h3>{item.title}</h3>
          <p className="muted">{item.description}</p>
          <LinkButton to={item.to} variant="secondary">
            {item.actionLabel}
          </LinkButton>
        </Card>
      ))}
    </div>
  )
}

export function PageSection({ children }: PropsWithChildren) {
  return <div className="page-section">{children}</div>
}
