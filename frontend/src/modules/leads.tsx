import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { appRoutes } from '../app/routes.ts'
import { useCRM } from '../app/CRMContext.tsx'
import { Icon } from '../components/Icon.tsx'
import { DetailLayout, InfoGrid, PageHeader, SectionHeader } from '../components/page.tsx'
import { Badge, Button, Card, EmptyState, LinkButton, StatCard } from '../components/ui.tsx'
import type { Lead } from '../domain/types.ts'
import { formatCompactCurrency, formatCurrency, formatDateTime } from '../lib/format.ts'
import { leadStatusLabels, leadStatusValues } from '../lib/labels.ts'
import { LeadStatusBadge, OwnerName } from './shared.tsx'

const ALL_FILTER = 'Tat ca' as const

export function LeadsPage() {
  const { state } = useCRM()
  const [statusFilter, setStatusFilter] = useState<typeof ALL_FILTER | Lead['status']>(ALL_FILTER)

  const leads = useMemo(() => {
    return state.leads.filter((lead) => statusFilter === ALL_FILTER || lead.status === statusFilter)
  }, [state.leads, statusFilter])

  return (
    <>
      <PageHeader
        eyebrow="Lead Management"
        title="Khách tiềm năng"
        description="Danh sách đầu phễu được thiết kế lại theo chuẩn demo sản phẩm: lọc nhanh, xem chi tiết rõ ràng và đi tiếp sang workflow kế tiếp."
        breadcrumbs={[{ label: 'Tổng quan', to: appRoutes.dashboard }, { label: 'Khách tiềm năng' }]}
        actions={
          <>
            <LinkButton to={appRoutes.importPreview} variant="secondary" icon={<Icon name="upload" />}>
              Import dữ liệu
            </LinkButton>
            <LinkButton to={appRoutes.leadNew} variant="primary" icon={<Icon name="plus" />}>
              Tạo lead mới
            </LinkButton>
          </>
        }
      />

      <div className="stat-grid space-bottom">
        <StatCard
          title="Tổng lead"
          value={String(state.leads.length)}
          icon={<Icon name="leads" />}
          trend={<Badge tone="success">+12%</Badge>}
          to={appRoutes.leads}
        />
        <StatCard
          title="Đang tư vấn"
          value={String(state.leads.filter((lead) => lead.status === 'Dang tu van').length)}
          icon={<Icon name="phone" />}
          trend={<Badge tone="progress">Đang xử lý</Badge>}
          to={appRoutes.leads}
        />
        <StatCard
          title="Tỷ lệ chuyển đổi"
          value="18.5%"
          icon={<Icon name="check" />}
          trend={<Badge tone="success">Tốt</Badge>}
          to={appRoutes.workflow}
        />
        <StatCard
          title="Giá trị tiềm năng"
          value={formatCompactCurrency(state.leads.reduce((sum, lead) => sum + lead.expectedValue, 0))}
          icon={<Icon name="money" />}
          trend={<Badge tone="success">Đáng chú ý</Badge>}
          to={appRoutes.reportCenter}
        />
      </div>

      <Card className="card-pad space-bottom">
        <SectionHeader
          title="Bộ lọc trạng thái"
          description="Mục tiêu là cho khách thấy list page có thể dùng ngay chứ không chỉ là bảng trưng bày."
        />
        <div className="filter-row">
          <Button
            variant={statusFilter === ALL_FILTER ? 'primary' : 'secondary'}
            onClick={() => setStatusFilter(ALL_FILTER)}
            icon={<Icon name="filter" />}
          >
            Tất cả
          </Button>
          {leadStatusValues.map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'primary' : 'secondary'}
              onClick={() => setStatusFilter(status)}
            >
              {leadStatusLabels[status]}
            </Button>
          ))}
        </div>
      </Card>

      <Card className="card-pad">
        <SectionHeader
          title="Danh sách lead"
          description={`Hiển thị ${leads.length} lead theo bộ lọc hiện tại.`}
        />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Khách tiềm năng</th>
                <th>Nguồn</th>
                <th>Trạng thái</th>
                <th>Phụ trách</th>
                <th>Giá trị dự kiến</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <Link className="record-link" to={appRoutes.leadDetail(lead.id)}>
                      <strong>{lead.fullName}</strong>
                      <div className="muted">{lead.company}</div>
                      <div className="muted">{lead.phone}</div>
                    </Link>
                  </td>
                  <td>{lead.source}</td>
                  <td><LeadStatusBadge status={lead.status} /></td>
                  <td><OwnerName ownerId={lead.ownerId} /></td>
                  <td>{formatCurrency(lead.expectedValue)}</td>
                  <td>
                    <div className="row-actions">
                      <LinkButton to={appRoutes.leadDetail(lead.id)} variant="ghost">Chi tiết</LinkButton>
                      <LinkButton to={`${appRoutes.opportunityNew}?leadId=${lead.id}`} variant="secondary">
                        Tạo cơ hội
                      </LinkButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}

export function LeadCreatePage() {
  const { state, createLead } = useCRM()
  const navigate = useNavigate()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const leadId = createLead({
      fullName: String(form.get('fullName')),
      phone: String(form.get('phone')),
      email: String(form.get('email')),
      source: String(form.get('source')),
      status: 'Moi',
      interestedProduct: String(form.get('interestedProduct')),
      expectedValue: Number(form.get('expectedValue') || 0),
      ownerId: state.currentUserId,
      company: String(form.get('company')),
      note: String(form.get('note')),
    })
    navigate(appRoutes.leadDetail(leadId))
  }

  return (
    <>
      <PageHeader
        eyebrow="Create Flow"
        title="Tạo lead mới"
        description="Thay vì chỉ mở modal, màn tạo mới riêng giúp khách cảm nhận sản phẩm có luồng làm việc thật và chỉn chu hơn."
        breadcrumbs={[
          { label: 'Khách tiềm năng', to: appRoutes.leads },
          { label: 'Tạo lead mới' },
        ]}
        actions={<LinkButton to={appRoutes.leads} variant="secondary">Quay lại danh sách</LinkButton>}
      />

      <Card className="card-pad">
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="field">
            <label>Họ và tên</label>
            <input name="fullName" required />
          </div>
          <div className="field">
            <label>Công ty</label>
            <input name="company" required />
          </div>
          <div className="field">
            <label>Số điện thoại</label>
            <input name="phone" required />
          </div>
          <div className="field">
            <label>Email</label>
            <input name="email" type="email" required />
          </div>
          <div className="field">
            <label>Nguồn lead</label>
            <select name="source" defaultValue="Website">
              {state.catalogs.sources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Sản phẩm quan tâm</label>
            <select name="interestedProduct" defaultValue={state.catalogs.products[0]}>
              {state.catalogs.products.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Giá trị dự kiến (VND)</label>
            <input name="expectedValue" type="number" min="0" defaultValue="15000000" />
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label>Ghi chú</label>
            <textarea name="note" defaultValue="Khách hàng mới, cần gọi trong 24h." />
          </div>
          <div className="page-actions" style={{ gridColumn: '1 / -1' }}>
            <LinkButton to={appRoutes.leads} variant="ghost">Huỷ</LinkButton>
            <Button variant="primary" type="submit" icon={<Icon name="plus" />}>
              Lưu và mở chi tiết
            </Button>
          </div>
        </form>
      </Card>
    </>
  )
}

export function LeadDetailPage() {
  const { state } = useCRM()
  const { leadId = '' } = useParams()
  const lead = state.leads.find((item) => item.id === leadId) ?? null

  if (!lead) {
    return (
      <EmptyState
        title="Không tìm thấy lead"
        message="Bản ghi có thể đã bị xoá khỏi dữ liệu demo hoặc đường dẫn không còn hợp lệ."
        action={<LinkButton to={appRoutes.leads} variant="primary">Quay lại danh sách lead</LinkButton>}
      />
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Lead Detail"
        title={lead.fullName}
        description="Màn chi tiết giúp buổi demo đi từ dữ liệu đầu vào sang các bước xử lý tiếp theo một cách tự nhiên."
        breadcrumbs={[
          { label: 'Khách tiềm năng', to: appRoutes.leads },
          { label: lead.fullName },
        ]}
        actions={
          <>
            <LinkButton to={`${appRoutes.customerNew}?leadId=${lead.id}`} variant="secondary" icon={<Icon name="customers" />}>
              Tạo khách hàng từ lead
            </LinkButton>
            <LinkButton to={`${appRoutes.opportunityNew}?leadId=${lead.id}`} variant="primary" icon={<Icon name="pipeline" />}>
              Tạo cơ hội
            </LinkButton>
          </>
        }
      />

      <DetailLayout
        main={
          <>
            <Card className="card-pad space-bottom">
              <SectionHeader title="Thông tin chính" />
              <InfoGrid
                items={[
                  { label: 'Công ty', value: lead.company },
                  { label: 'Số điện thoại', value: lead.phone },
                  { label: 'Email', value: lead.email },
                  { label: 'Nguồn lead', value: lead.source },
                  { label: 'Sản phẩm quan tâm', value: lead.interestedProduct },
                  { label: 'Giá trị dự kiến', value: formatCurrency(lead.expectedValue) },
                ]}
              />
            </Card>

            <Card className="card-pad space-bottom">
              <SectionHeader title="Ghi chú tư vấn" />
              <p>{lead.note}</p>
            </Card>

            <Card className="card-pad">
              <SectionHeader title="Luồng tiếp theo được khuyến nghị" />
              <div className="action-grid">
                <Card className="card-pad action-card">
                  <h3>Tạo cơ hội bán hàng</h3>
                  <p className="muted">Dùng khi bạn muốn chuyển lead sang giai đoạn cơ hội và bám pipeline.</p>
                  <LinkButton to={`${appRoutes.opportunityNew}?leadId=${lead.id}`} variant="secondary">Đi tới form cơ hội</LinkButton>
                </Card>
                <Card className="card-pad action-card">
                  <h3>Tạo công việc follow-up</h3>
                  <p className="muted">Dùng khi cần giao việc tiếp nối cho sales hoặc CSKH trước khi chốt.</p>
                  <LinkButton to={`${appRoutes.taskNew}?leadId=${lead.id}`} variant="secondary">Đi tới form công việc</LinkButton>
                </Card>
              </div>
            </Card>
          </>
        }
        side={
          <>
            <Card className="card-pad space-bottom sticky-card">
              <SectionHeader title="Trạng thái hiện tại" />
              <div className="stack-list">
                <LeadStatusBadge status={lead.status} />
                <div className="muted">Tạo lúc {formatDateTime(lead.createdAt)}</div>
                <div className="muted">Phụ trách: <OwnerName ownerId={lead.ownerId} /></div>
              </div>
            </Card>

            <Card className="card-pad">
              <SectionHeader title="Điều hướng nhanh" />
              <div className="stack-list">
                <LinkButton to={appRoutes.leads} variant="secondary">Quay lại danh sách</LinkButton>
                <LinkButton to={appRoutes.workflow} variant="ghost">Xem workflow nhanh</LinkButton>
              </div>
            </Card>
          </>
        }
      />
    </>
  )
}
