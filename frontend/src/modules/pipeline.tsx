import { useMemo, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { appRoutes } from '../app/routes.ts'
import { useCRM } from '../app/CRMContext.tsx'
import { Icon } from '../components/Icon.tsx'
import { DetailLayout, InfoGrid, PageHeader, SectionHeader } from '../components/page.tsx'
import { Badge, Button, Card, EmptyState, LinkButton } from '../components/ui.tsx'
import type { OpportunityStage } from '../domain/types.ts'
import { formatCompactCurrency, formatCurrency, formatDate } from '../lib/format.ts'
import { opportunityStageLabels, opportunityStageValues } from '../lib/labels.ts'
import { CustomerName, OpportunityStageBadge, OwnerName, RecordLink, useEntityPrefill } from './shared.tsx'

const ALL_FILTER = 'Tat ca' as const

export function PipelinePage() {
  const { state, moveOpportunity } = useCRM()
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [activeDrop, setActiveDrop] = useState<OpportunityStage | null>(null)
  const [stageFilter, setStageFilter] = useState<typeof ALL_FILTER | OpportunityStage>(ALL_FILTER)
  const stages: OpportunityStage[] = ['Moi', 'Dang lam viec', 'Cho chot', 'Da chot', 'Huy']

  const opportunities = useMemo(() => {
    return state.opportunities.filter((item) => stageFilter === ALL_FILTER || item.stage === stageFilter)
  }, [stageFilter, state.opportunities])

  return (
    <>
      <PageHeader
        eyebrow="Sales Pipeline"
        title="Cơ hội bán hàng"
        description="Pipeline được tổ chức lại để vừa kéo-thả trực quan, vừa có đường đi rõ ràng sang từng màn chi tiết của cơ hội, task và payment."
        breadcrumbs={[
          { label: 'Tổng quan', to: appRoutes.dashboard },
          { label: 'Cơ hội bán hàng' },
        ]}
        actions={
          <>
            <LinkButton to={appRoutes.reportCenter} variant="secondary" icon={<Icon name="filter" />}>
              Xem báo cáo pipeline
            </LinkButton>
            <LinkButton to={appRoutes.opportunityNew} variant="primary" icon={<Icon name="plus" />}>
              Thêm cơ hội
            </LinkButton>
          </>
        }
      />

      <Card className="card-pad space-bottom">
        <SectionHeader title="Bộ lọc giai đoạn" description="Vẫn là trang tĩnh nhưng khách sẽ cảm nhận được đây là một pipeline có thể vận hành thật." />
        <div className="filter-row">
          <Button variant={stageFilter === ALL_FILTER ? 'primary' : 'secondary'} onClick={() => setStageFilter(ALL_FILTER)}>
            Tất cả
          </Button>
          {opportunityStageValues.map((stage) => (
            <Button key={stage} variant={stageFilter === stage ? 'primary' : 'secondary'} onClick={() => setStageFilter(stage)}>
              {opportunityStageLabels[stage]}
            </Button>
          ))}
        </div>
      </Card>

      <div className="kanban-board space-bottom">
        {stages.map((stage) => {
          const items = opportunities.filter((opportunity) => opportunity.stage === stage)
          const stageValue = items.reduce((sum, item) => sum + item.value, 0)
          return (
            <Card key={stage} className={`kanban-column${activeDrop === stage ? ' drop-active' : ''}`}>
              <div
                onDragOver={(event) => {
                  event.preventDefault()
                  setActiveDrop(stage)
                }}
                onDragLeave={() => setActiveDrop(null)}
                onDrop={() => {
                  if (draggingId) moveOpportunity(draggingId, stage)
                  setDraggingId(null)
                  setActiveDrop(null)
                }}
              >
                <div className="kanban-column-header">
                  <div>
                    <strong>{opportunityStageLabels[stage]}</strong>
                    <div className="muted">{formatCompactCurrency(stageValue)}</div>
                  </div>
                  <Badge tone={stage === 'Da chot' ? 'success' : stage === 'Huy' ? 'danger' : 'new'}>
                    {items.length}
                  </Badge>
                </div>
                <div className="kanban-list">
                  {items.map((item) => (
                    <article
                      key={item.id}
                      draggable
                      className={`kanban-item${draggingId === item.id ? ' dragging' : ''}`}
                      onDragStart={() => setDraggingId(item.id)}
                      onDragEnd={() => {
                        setDraggingId(null)
                        setActiveDrop(null)
                      }}
                    >
                      <RecordLink
                        to={appRoutes.opportunityDetail(item.id)}
                        title={item.name}
                        subtitle={item.product}
                      />
                      <div className="muted"><CustomerName customerId={item.customerId} /></div>
                      <p className="stat-value" style={{ fontSize: '1.7rem', marginTop: 12 }}>{formatCurrency(item.value)}</p>
                      <div className="muted">{formatDate(item.expectedCloseDate)}</div>
                      <div className="page-actions space-top">
                        <LinkButton to={appRoutes.opportunityDetail(item.id)} variant="ghost">Chi tiết</LinkButton>
                        <LinkButton to={`${appRoutes.paymentNew}?opportunityId=${item.id}&customerId=${item.customerId}`} variant="secondary">
                          Tạo thanh toán
                        </LinkButton>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </>
  )
}

export function OpportunityCreatePage() {
  const { state, createOpportunity } = useCRM()
  const { lead, customer } = useEntityPrefill()
  const navigate = useNavigate()

  function handleCreateOpportunity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const opportunityId = createOpportunity({
      customerId: String(form.get('customerId')),
      name: String(form.get('name')),
      product: String(form.get('product')),
      stage: String(form.get('stage')) as OpportunityStage,
      value: Number(form.get('value')),
      expectedCloseDate: String(form.get('expectedCloseDate')),
      ownerId: state.currentUserId,
      note: String(form.get('note')),
    })
    navigate(appRoutes.opportunityDetail(opportunityId))
  }

  return (
    <>
      <PageHeader
        eyebrow="Create Flow"
        title="Tạo cơ hội mới"
        description="Trang tạo cơ hội là điểm nối giữa lead hoặc hồ sơ khách hàng với pipeline vận hành thực tế."
        breadcrumbs={[
          { label: 'Cơ hội bán hàng', to: appRoutes.pipeline },
          { label: 'Tạo cơ hội mới' },
        ]}
        actions={<LinkButton to={appRoutes.pipeline} variant="secondary">Quay lại pipeline</LinkButton>}
      />

      {lead || customer ? (
        <Card className="card-pad space-bottom">
          <SectionHeader
            title="Thông tin được kéo sang"
            description="Form đã tự lấy dữ liệu từ màn trước để giảm thao tác và làm rõ luồng CRM."
          />
          <InfoGrid
            items={[
              { label: 'Từ lead', value: lead?.fullName ?? 'Không có' },
              { label: 'Từ khách hàng', value: customer?.fullName ?? 'Không có' },
              { label: 'Sản phẩm gợi ý', value: lead?.interestedProduct ?? customer?.interestedProducts[0] ?? 'Chưa có' },
            ]}
          />
        </Card>
      ) : null}

      <Card className="card-pad">
        <form className="form-grid" onSubmit={handleCreateOpportunity}>
          <div className="field">
            <label>Tên cơ hội</label>
            <input name="name" defaultValue={lead ? `Cơ hội từ lead ${lead.fullName}` : customer ? `Cơ hội mới - ${customer.fullName}` : ''} required />
          </div>
          <div className="field">
            <label>Khách hàng</label>
            <select name="customerId" defaultValue={customer?.id ?? ''} required>
              <option value="" disabled>Chọn khách hàng</option>
              {state.customers.map((item) => (
                <option key={item.id} value={item.id}>{item.fullName}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Sản phẩm</label>
            <select name="product" defaultValue={lead?.interestedProduct ?? customer?.interestedProducts[0] ?? state.catalogs.products[0]}>
              {state.catalogs.products.map((product) => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Giai đoạn</label>
            <select name="stage" defaultValue="Moi">
              {opportunityStageValues.map((stage) => (
                <option key={stage} value={stage}>{opportunityStageLabels[stage]}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Giá trị</label>
            <input name="value" type="number" defaultValue={String(lead?.expectedValue ?? 25000000)} />
          </div>
          <div className="field">
            <label>Ngày dự kiến chốt</label>
            <input name="expectedCloseDate" type="date" required />
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label>Ghi chú</label>
            <textarea name="note" defaultValue={lead?.note ?? 'Cơ hội mới được tạo từ prototype demo.'} />
          </div>
          <div className="page-actions" style={{ gridColumn: '1 / -1' }}>
            <LinkButton to={appRoutes.pipeline} variant="ghost">Huỷ</LinkButton>
            <Button variant="primary" type="submit">Lưu và mở chi tiết</Button>
          </div>
        </form>
      </Card>
    </>
  )
}

export function OpportunityDetailPage() {
  const { state, moveOpportunity } = useCRM()
  const { opportunityId = '' } = useParams()
  const opportunity = state.opportunities.find((item) => item.id === opportunityId) ?? null
  const relatedTasks = state.tasks.filter((task) => task.opportunityId === opportunityId)
  const relatedPayments = state.payments.filter((payment) => payment.opportunityId === opportunityId)

  if (!opportunity) {
    return (
      <EmptyState
        title="Không tìm thấy cơ hội"
        message="Bản ghi có thể đã bị xoá khỏi dữ liệu demo hoặc đường dẫn không còn hợp lệ."
        action={<LinkButton to={appRoutes.pipeline} variant="primary">Quay lại pipeline</LinkButton>}
      />
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Opportunity Detail"
        title={opportunity.name}
        description="Trang chi tiết cơ hội giúp khách nhìn thấy rõ việc quản lý stage, công việc liên quan và thanh toán phát sinh."
        breadcrumbs={[
          { label: 'Cơ hội bán hàng', to: appRoutes.pipeline },
          { label: opportunity.name },
        ]}
        actions={
          <>
            <LinkButton to={`${appRoutes.taskNew}?customerId=${opportunity.customerId}&opportunityId=${opportunity.id}`} variant="secondary" icon={<Icon name="tasks" />}>
              Tạo công việc
            </LinkButton>
            <LinkButton to={`${appRoutes.paymentNew}?customerId=${opportunity.customerId}&opportunityId=${opportunity.id}`} variant="primary" icon={<Icon name="payments" />}>
              Tạo thanh toán
            </LinkButton>
          </>
        }
      />

      <DetailLayout
        main={
          <>
            <Card className="card-pad space-bottom">
              <SectionHeader title="Thông tin cơ hội" />
              <InfoGrid
                items={[
                  { label: 'Khách hàng', value: <CustomerName customerId={opportunity.customerId} /> },
                  { label: 'Sản phẩm', value: opportunity.product },
                  { label: 'Giá trị', value: formatCurrency(opportunity.value) },
                  { label: 'Ngày dự kiến chốt', value: formatDate(opportunity.expectedCloseDate) },
                  { label: 'Người phụ trách', value: <OwnerName ownerId={opportunity.ownerId} /> },
                ]}
              />
            </Card>

            <Card className="card-pad space-bottom">
              <SectionHeader title="Ghi chú cơ hội" />
              <p>{opportunity.note}</p>
            </Card>

            <Card className="card-pad space-bottom">
              <SectionHeader title="Công việc liên quan" />
              <div className="stack-list">
                {relatedTasks.length ? relatedTasks.map((task) => (
                  <RecordLink key={task.id} to={appRoutes.taskDetail(task.id)} title={task.title} subtitle={formatDate(task.dueDate)} />
                )) : (
                  <EmptyState title="Chưa có công việc liên quan" message="Bạn có thể tạo công việc follow-up ngay từ cột bên phải." />
                )}
              </div>
            </Card>

            <Card className="card-pad">
              <SectionHeader title="Thanh toán liên quan" />
              <div className="stack-list">
                {relatedPayments.length ? relatedPayments.map((payment) => (
                  <RecordLink key={payment.id} to={appRoutes.paymentDetail(payment.id)} title={formatCurrency(payment.amount)} subtitle={formatDate(payment.paymentDate)} />
                )) : (
                  <EmptyState title="Chưa có thanh toán" message="Hãy tạo bản ghi thanh toán đầu tiên khi cơ hội đã sẵn sàng." />
                )}
              </div>
            </Card>
          </>
        }
        side={
          <>
            <Card className="card-pad space-bottom sticky-card">
              <SectionHeader title="Trạng thái cơ hội" />
              <div className="stack-list">
                <OpportunityStageBadge stage={opportunity.stage} />
                <div className="row-actions">
                  {opportunityStageValues.map((stage) => (
                    <Button
                      key={stage}
                      variant={opportunity.stage === stage ? 'primary' : 'secondary'}
                      onClick={() => moveOpportunity(opportunity.id, stage)}
                    >
                      {opportunityStageLabels[stage]}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="card-pad">
              <SectionHeader title="Điều hướng nhanh" />
              <div className="stack-list">
                <LinkButton to={appRoutes.pipeline} variant="secondary">Quay lại pipeline</LinkButton>
                <LinkButton to={appRoutes.reportCenter} variant="ghost">Xem báo cáo tổng hợp</LinkButton>
              </div>
            </Card>
          </>
        }
      />
    </>
  )
}
