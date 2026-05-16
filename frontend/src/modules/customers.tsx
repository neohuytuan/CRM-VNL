import { useMemo, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { appRoutes } from '../app/routes.ts'
import { useCRM } from '../app/CRMContext.tsx'
import { Icon } from '../components/Icon.tsx'
import { DetailLayout, InfoGrid, PageHeader, SectionHeader } from '../components/page.tsx'
import { Badge, Button, Card, EmptyState, LinkButton, StatCard } from '../components/ui.tsx'
import type { Customer } from '../domain/types.ts'
import { formatDate, formatDateTime, initials } from '../lib/format.ts'
import { customerTypeLabels } from '../lib/labels.ts'
import {
  CustomerTypeBadge,
  OwnerName,
  RecordLink,
  useEntityPrefill,
} from './shared.tsx'

export function CustomersPage() {
  const { state } = useCRM()

  return (
    <>
      <PageHeader
        eyebrow="Customer CRM"
        title="Danh sách khách hàng"
        description="Danh sách được nâng lên thành một màn quản trị thực thụ: có lối vào chi tiết, các luồng thao tác tiếp theo và các đường dẫn dữ liệu rõ ràng."
        breadcrumbs={[
          { label: 'Tổng quan', to: appRoutes.dashboard },
          { label: 'Khách hàng' },
        ]}
        actions={
          <>
            <LinkButton to={appRoutes.importPreview} variant="secondary" icon={<Icon name="upload" />}>
              Import CSV
            </LinkButton>
            <LinkButton to={appRoutes.exportCenter} variant="secondary" icon={<Icon name="download" />}>
              Export center
            </LinkButton>
            <LinkButton to={appRoutes.customerNew} variant="primary" icon={<Icon name="plus" />}>
              Thêm khách hàng
            </LinkButton>
          </>
        }
      />

      <div className="stat-grid space-bottom">
        <StatCard
          title="Tổng hồ sơ khách hàng"
          value={String(state.customers.length)}
          icon={<Icon name="customers" />}
          trend={<Badge tone="success">Đang tăng</Badge>}
          to={appRoutes.customers}
        />
        <StatCard
          title="Khách VIP"
          value={String(state.customers.filter((customer) => customer.customerType === 'VIP').length)}
          icon={<Icon name="user" />}
          trend={<Badge tone="vip">Ưu tiên chăm sóc</Badge>}
          to={appRoutes.customers}
        />
        <StatCard
          title="Khách quay lại"
          value={String(state.customers.filter((customer) => customer.tags.includes('Mua lại')).length)}
          icon={<Icon name="check" />}
          trend={<Badge tone="success">Tín hiệu tốt</Badge>}
          to={appRoutes.activity}
        />
        <StatCard
          title="Kênh giới thiệu"
          value={String(state.customers.filter((customer) => customer.channel === 'Giới thiệu').length)}
          icon={<Icon name="activity" />}
          trend={<Badge tone="progress">Nên khai thác</Badge>}
          to={appRoutes.reportCenter}
        />
      </div>

      <Card className="card-pad">
        <SectionHeader
          title="Danh sách hồ sơ"
          description="Mỗi hồ sơ đều có trang chi tiết riêng để khách dễ bấm, dễ theo dõi và không bị rối trong drawer."
        />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Kênh</th>
                <th>Phân khúc</th>
                <th>Sản phẩm quan tâm</th>
                <th>Phụ trách</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {state.customers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <RecordLink
                      to={appRoutes.customerDetail(customer.id)}
                      title={customer.fullName}
                      subtitle={`${customer.company} · ${customer.phone}`}
                    />
                  </td>
                  <td>{customer.channel}</td>
                  <td><CustomerTypeBadge customerType={customer.customerType} /></td>
                  <td>{customer.interestedProducts.join(', ')}</td>
                  <td><OwnerName ownerId={customer.ownerId} /></td>
                  <td>
                    <div className="row-actions">
                      <LinkButton to={appRoutes.customerDetail(customer.id)} variant="ghost">Chi tiết</LinkButton>
                      <LinkButton to={`${appRoutes.opportunityNew}?customerId=${customer.id}`} variant="secondary">
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

export function CustomerCreatePage() {
  const { state, createCustomer } = useCRM()
  const { lead } = useEntityPrefill()
  const navigate = useNavigate()

  function handleCreateCustomer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const customerId = createCustomer({
      fullName: String(form.get('fullName')),
      phone: String(form.get('phone')),
      email: String(form.get('email')),
      address: String(form.get('address')),
      birthday: String(form.get('birthday')),
      job: String(form.get('job')),
      company: String(form.get('company')),
      channel: String(form.get('channel')),
      customerType: String(form.get('customerType')) as Customer['customerType'],
      interestedProducts: [String(form.get('product'))],
      ownerId: state.currentUserId,
      teamId: state.users.find((user) => user.id === state.currentUserId)?.teamId ?? 'team-hcm',
      tags: ['Khách mới'],
      purchasedProducts: [],
    })
    navigate(appRoutes.customerDetail(customerId))
  }

  return (
    <>
      <PageHeader
        eyebrow="Create Flow"
        title="Tạo khách hàng mới"
        description="Trang tạo hồ sơ giúp demo mượt hơn nhiều so với drawer, đồng thời là nền tốt để nối API và validation sau này."
        breadcrumbs={[
          { label: 'Khách hàng', to: appRoutes.customers },
          { label: 'Tạo khách hàng' },
        ]}
        actions={<LinkButton to={appRoutes.customers} variant="secondary">Quay lại danh sách</LinkButton>}
      />

      {lead ? (
        <Card className="card-pad space-bottom">
          <SectionHeader title="Đang chuyển từ lead" description="Thông tin từ lead được dùng để rút ngắn thao tác nhập liệu." />
          <div className="info-grid">
            <div className="info-pair">
              <span className="info-label">Lead nguồn</span>
              <div className="info-value">{lead.fullName}</div>
            </div>
            <div className="info-pair">
              <span className="info-label">Sản phẩm quan tâm</span>
              <div className="info-value">{lead.interestedProduct}</div>
            </div>
          </div>
        </Card>
      ) : null}

      <Card className="card-pad">
        <form className="form-grid" onSubmit={handleCreateCustomer}>
          <div className="field">
            <label>Họ và tên</label>
            <input name="fullName" defaultValue={lead?.fullName ?? ''} required />
          </div>
          <div className="field">
            <label>Công ty</label>
            <input name="company" defaultValue={lead?.company ?? ''} required />
          </div>
          <div className="field">
            <label>Số điện thoại</label>
            <input name="phone" defaultValue={lead?.phone ?? ''} required />
          </div>
          <div className="field">
            <label>Email</label>
            <input name="email" type="email" defaultValue={lead?.email ?? ''} required />
          </div>
          <div className="field">
            <label>Địa chỉ</label>
            <input name="address" defaultValue="TP.HCM" required />
          </div>
          <div className="field">
            <label>Ngày sinh</label>
            <input name="birthday" type="date" required />
          </div>
          <div className="field">
            <label>Nghề nghiệp</label>
            <input name="job" defaultValue="Quản lý mua hàng" required />
          </div>
          <div className="field">
            <label>Kênh tiếp cận</label>
            <select name="channel" defaultValue={lead?.source ?? state.catalogs.channels[0]}>
              {state.catalogs.channels.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Phân khúc</label>
            <select name="customerType" defaultValue="Khach le">
              {state.catalogs.customerTypes.map((item) => (
                <option key={item} value={item}>
                  {customerTypeLabels[item]}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Sản phẩm quan tâm</label>
            <select name="product" defaultValue={lead?.interestedProduct ?? state.catalogs.products[0]}>
              {state.catalogs.products.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="page-actions" style={{ gridColumn: '1 / -1' }}>
            <LinkButton to={appRoutes.customers} variant="ghost">Huỷ</LinkButton>
            <Button variant="primary" type="submit">Lưu và mở hồ sơ</Button>
          </div>
        </form>
      </Card>
    </>
  )
}

export function CustomerDetailPage() {
  const { state, addCustomerNote, updateCustomer } = useCRM()
  const { customerId = '' } = useParams()
  const [noteValue, setNoteValue] = useState('')
  const [editing, setEditing] = useState(false)
  const customer = state.customers.find((item) => item.id === customerId) ?? null
  const customerActivities = useMemo(
    () => state.activities.filter((activity) => activity.customerId === customerId),
    [customerId, state.activities],
  )

  function handleUpdateCustomer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!customer) return
    const form = new FormData(event.currentTarget)
    updateCustomer(customer.id, {
      fullName: String(form.get('fullName')),
      phone: String(form.get('phone')),
      email: String(form.get('email')),
      company: String(form.get('company')),
      address: String(form.get('address')),
      customerType: String(form.get('customerType')) as Customer['customerType'],
    })
    setEditing(false)
  }

  if (!customer) {
    return (
      <EmptyState
        title="Không tìm thấy khách hàng"
        message="Bản ghi có thể đã bị xoá khỏi dữ liệu demo hoặc đường dẫn không còn hợp lệ."
        action={<LinkButton to={appRoutes.customers} variant="primary">Quay lại danh sách khách hàng</LinkButton>}
      />
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Customer Detail"
        title={customer.fullName}
        description="Trang hồ sơ được nâng cấp thành điểm đến chính cho mọi thao tác chăm sóc, bán hàng và điều phối nội bộ."
        breadcrumbs={[
          { label: 'Khách hàng', to: appRoutes.customers },
          { label: customer.fullName },
        ]}
        actions={
          <>
            <LinkButton to={`${appRoutes.taskNew}?customerId=${customer.id}`} variant="secondary" icon={<Icon name="calendar" />}>
              Tạo công việc
            </LinkButton>
            <LinkButton to={`${appRoutes.opportunityNew}?customerId=${customer.id}`} variant="primary" icon={<Icon name="pipeline" />}>
              Tạo cơ hội
            </LinkButton>
          </>
        }
      />

      <DetailLayout
        main={
          <>
            <Card className="card-pad space-bottom">
              <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                  <div className="avatar" style={{ width: 72, height: 72, fontSize: '1.4rem' }}>
                    {initials(customer.fullName)}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '2rem' }}>{customer.fullName}</h2>
                    <CustomerTypeBadge customerType={customer.customerType} />
                  </div>
                </div>
                <Button variant={editing ? 'ghost' : 'secondary'} onClick={() => setEditing((value) => !value)}>
                  {editing ? 'Đóng chỉnh sửa' : 'Chỉnh sửa hồ sơ'}
                </Button>
              </div>
              <InfoGrid
                items={[
                  { label: 'Công ty', value: customer.company },
                  { label: 'Số điện thoại', value: customer.phone },
                  { label: 'Email', value: customer.email },
                  { label: 'Địa chỉ', value: customer.address },
                  { label: 'Ngày sinh', value: formatDate(customer.birthday) },
                  { label: 'Nghề nghiệp', value: customer.job },
                ]}
              />
            </Card>

            {editing ? (
              <Card className="card-pad space-bottom">
                <SectionHeader title="Chỉnh sửa nhanh hồ sơ" />
                <form className="form-grid" onSubmit={handleUpdateCustomer}>
                  <div className="field">
                    <label>Họ và tên</label>
                    <input name="fullName" defaultValue={customer.fullName} required />
                  </div>
                  <div className="field">
                    <label>Công ty</label>
                    <input name="company" defaultValue={customer.company} required />
                  </div>
                  <div className="field">
                    <label>Số điện thoại</label>
                    <input name="phone" defaultValue={customer.phone} required />
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input name="email" defaultValue={customer.email} required />
                  </div>
                  <div className="field">
                    <label>Địa chỉ</label>
                    <input name="address" defaultValue={customer.address} required />
                  </div>
                  <div className="field">
                    <label>Phân khúc</label>
                    <select name="customerType" defaultValue={customer.customerType}>
                      {state.catalogs.customerTypes.map((item) => (
                        <option key={item} value={item}>
                          {customerTypeLabels[item]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="page-actions" style={{ gridColumn: '1 / -1' }}>
                    <Button variant="ghost" onClick={() => setEditing(false)}>Huỷ</Button>
                    <Button variant="primary" type="submit">Lưu thay đổi</Button>
                  </div>
                </form>
              </Card>
            ) : null}

            <Card className="card-pad space-bottom">
              <SectionHeader title="Lịch sử chăm sóc" description="Giữ trải nghiệm ghi chú rất rõ ràng để khách nhìn là hiểu hệ thống dùng như thế nào hằng ngày." />
              <div className="field">
                <textarea
                  value={noteValue}
                  onChange={(event) => setNoteValue(event.target.value)}
                  placeholder="Ghi nhanh lịch sử tư vấn, kết quả gọi điện, nhu cầu mới..."
                />
              </div>
              <div className="page-actions space-top">
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (!noteValue.trim()) return
                    addCustomerNote(customer.id, 'Ghi chú chăm sóc', noteValue)
                    setNoteValue('')
                  }}
                >
                  Lưu ghi chú
                </Button>
              </div>
              <div className="stack-list space-top">
                {customerActivities.length ? (
                  customerActivities.map((activity) => (
                    <div key={activity.id} className="mini-note">
                      <strong>{activity.title}</strong>
                      <div className="muted">{formatDateTime(activity.createdAt)}</div>
                      <div>{activity.description}</div>
                    </div>
                  ))
                ) : (
                  <EmptyState title="Chưa có hoạt động" message="Bạn hãy tạo ghi chú chăm sóc đầu tiên cho hồ sơ này." />
                )}
              </div>
            </Card>

            <Card className="card-pad">
              <SectionHeader title="Sản phẩm đã mua và quan tâm" />
              <div className="row-actions">
                {customer.purchasedProducts.concat(customer.interestedProducts).map((item) => (
                  <Badge key={`${customer.id}-${item}`} tone="new">
                    {item}
                  </Badge>
                ))}
              </div>
            </Card>
          </>
        }
        side={
          <>
            <Card className="card-pad space-bottom sticky-card">
              <SectionHeader title="Thông tin vận hành" />
              <div className="stack-list">
                <CustomerTypeBadge customerType={customer.customerType} />
                <div className="muted">Phụ trách: <OwnerName ownerId={customer.ownerId} /></div>
                <div className="muted">Lần tương tác gần nhất: {formatDateTime(customer.lastInteraction)}</div>
                <div className="muted">Kênh nguồn: {customer.channel}</div>
              </div>
            </Card>

            <Card className="card-pad space-bottom">
              <SectionHeader title="Lối đi tiếp theo" />
              <div className="stack-list">
                <LinkButton to={`${appRoutes.opportunityNew}?customerId=${customer.id}`} variant="secondary">
                  Tạo cơ hội từ hồ sơ này
                </LinkButton>
                <LinkButton to={`${appRoutes.taskNew}?customerId=${customer.id}`} variant="secondary">
                  Tạo công việc follow-up
                </LinkButton>
                <LinkButton to={appRoutes.customers} variant="ghost">
                  Quay lại danh sách
                </LinkButton>
              </div>
            </Card>

            <Card className="card-pad">
              <SectionHeader title="Tag khách hàng" />
              <div className="row-actions">
                {customer.tags.map((tag) => (
                  <Badge key={tag} tone="new">{tag}</Badge>
                ))}
              </div>
            </Card>
          </>
        }
      />
    </>
  )
}
