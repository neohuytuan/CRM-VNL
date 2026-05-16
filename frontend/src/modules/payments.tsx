import { useMemo, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { appRoutes } from '../app/routes.ts'
import { useCRM } from '../app/CRMContext.tsx'
import { Icon } from '../components/Icon.tsx'
import { DetailLayout, InfoGrid, PageHeader, SectionHeader } from '../components/page.tsx'
import { Badge, Button, Card, EmptyState, LinkButton, StatCard } from '../components/ui.tsx'
import type { PaymentStatus } from '../domain/types.ts'
import { formatCurrency, formatDate } from '../lib/format.ts'
import { paymentMethodLabels, paymentMethodValues, paymentStatusLabels, paymentStatusValues } from '../lib/labels.ts'
import { CustomerName, PaymentStatusBadge, RecordLink, useEntityPrefill } from './shared.tsx'

const ALL_FILTER = 'Tat ca' as const

export function PaymentsPage() {
  const { state, updatePayment } = useCRM()
  const [statusFilter, setStatusFilter] = useState<typeof ALL_FILTER | PaymentStatus>(ALL_FILTER)

  const filteredPayments = useMemo(() => {
    return state.payments.filter(
      (payment) => statusFilter === ALL_FILTER || payment.status === statusFilter,
    )
  }, [state.payments, statusFilter])

  const kpi = useMemo(
    () => ({
      unpaid: state.payments
        .filter((payment) => payment.status === 'Chua thanh toan')
        .reduce((sum, payment) => sum + payment.amount, 0),
      partial: state.payments
        .filter((payment) => payment.status === 'Thanh toan mot phan')
        .reduce((sum, payment) => sum + payment.amount, 0),
      paid: state.payments
        .filter((payment) => payment.status === 'Da thanh toan')
        .reduce((sum, payment) => sum + payment.amount, 0),
    }),
    [state.payments],
  )

  return (
    <>
      <PageHeader
        eyebrow="Revenue Operations"
        title="Thanh toán"
        description="Màn payment được tổ chức thành một module riêng, có list, detail và create flow để khách nhìn thấy trọn vòng đời doanh thu."
        breadcrumbs={[
          { label: 'Tổng quan', to: appRoutes.dashboard },
          { label: 'Thanh toán' },
        ]}
        actions={
          <>
            <LinkButton to={appRoutes.reportCenter} variant="secondary" icon={<Icon name="download" />}>
              Mở report center
            </LinkButton>
            <LinkButton to={appRoutes.paymentNew} variant="primary" icon={<Icon name="plus" />}>
              Ghi nhận thanh toán
            </LinkButton>
          </>
        }
      />

      <div className="stat-grid space-bottom">
        <StatCard
          title="Tổng chưa thanh toán"
          value={formatCurrency(kpi.unpaid)}
          icon={<Icon name="warning" />}
          trend={<Badge tone="danger">Cần theo dõi</Badge>}
          to={appRoutes.payments}
        />
        <StatCard
          title="Đã thu"
          value={formatCurrency(kpi.paid)}
          icon={<Icon name="money" />}
          trend={<Badge tone="success">+12.8%</Badge>}
          to={appRoutes.reportCenter}
        />
        <StatCard
          title="Thanh toán một phần"
          value={formatCurrency(kpi.partial)}
          icon={<Icon name="payments" />}
          trend={<Badge tone="progress">Đang xử lý</Badge>}
          to={appRoutes.payments}
        />
        <StatCard
          title="Số giao dịch"
          value={String(state.payments.length)}
          icon={<Icon name="activity" />}
          trend={<Badge tone="success">Ổn định</Badge>}
          to={appRoutes.activity}
        />
      </div>

      <Card className="card-pad space-bottom">
        <SectionHeader title="Bộ lọc giao dịch" />
        <div className="filter-row">
          <Button variant={statusFilter === ALL_FILTER ? 'primary' : 'secondary'} onClick={() => setStatusFilter(ALL_FILTER)}>
            Tất cả
          </Button>
          {paymentStatusValues.map((status) => (
            <Button key={status} variant={statusFilter === status ? 'primary' : 'secondary'} onClick={() => setStatusFilter(status)}>
              {paymentStatusLabels[status]}
            </Button>
          ))}
        </div>
      </Card>

      <Card className="card-pad">
        <SectionHeader title="Danh sách giao dịch" description="Mỗi giao dịch đều có màn chi tiết để khách đi tiếp từ tổng quan sang từng khoản thu cụ thể." />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Giao dịch</th>
                <th>Khách hàng</th>
                <th>Số tiền</th>
                <th>Phương thức</th>
                <th>Trạng thái</th>
                <th>Ngày thanh toán</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => {
                const opportunity = state.opportunities.find((item) => item.id === payment.opportunityId)
                return (
                  <tr key={payment.id}>
                    <td>
                      <RecordLink
                        to={appRoutes.paymentDetail(payment.id)}
                        title={opportunity?.name ?? 'Giao dịch mới'}
                        subtitle={payment.note}
                      />
                    </td>
                    <td><CustomerName customerId={payment.customerId} /></td>
                    <td><strong>{formatCurrency(payment.amount)}</strong></td>
                    <td>{paymentMethodLabels[payment.paymentMethod]}</td>
                    <td><PaymentStatusBadge status={payment.status} /></td>
                    <td>{formatDate(payment.paymentDate)}</td>
                    <td>
                      <div className="row-actions">
                        <LinkButton to={appRoutes.paymentDetail(payment.id)} variant="ghost">Chi tiết</LinkButton>
                        <Button
                          variant="secondary"
                          onClick={() =>
                            updatePayment(payment.id, {
                              status:
                                payment.status === 'Chua thanh toan'
                                  ? 'Thanh toan mot phan'
                                  : payment.status === 'Thanh toan mot phan'
                                    ? 'Da thanh toan'
                                    : 'Chua thanh toan',
                              paymentDate: new Date().toISOString().slice(0, 10),
                            })
                          }
                        >
                          Chuyển trạng thái
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}

export function PaymentCreatePage() {
  const { state, createPayment } = useCRM()
  const { customer, opportunity } = useEntityPrefill()
  const navigate = useNavigate()

  function handleCreatePayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const paymentId = createPayment({
      opportunityId: String(form.get('opportunityId')),
      customerId: String(form.get('customerId')),
      amount: Number(form.get('amount')),
      paymentMethod: String(form.get('paymentMethod')) as (typeof state.payments)[number]['paymentMethod'],
      status: String(form.get('status')) as PaymentStatus,
      paymentDate: String(form.get('paymentDate')) || undefined,
      note: String(form.get('note')),
    })
    navigate(appRoutes.paymentDetail(paymentId))
  }

  return (
    <>
      <PageHeader
        eyebrow="Create Flow"
        title="Ghi nhận thanh toán"
        description="Flow thanh toán riêng giúp khách thấy hệ thống đã tính đến giai đoạn chốt giao dịch, không dừng ở việc chăm sóc hoặc giao việc."
        breadcrumbs={[
          { label: 'Thanh toán', to: appRoutes.payments },
          { label: 'Ghi nhận thanh toán' },
        ]}
        actions={<LinkButton to={appRoutes.payments} variant="secondary">Quay lại thanh toán</LinkButton>}
      />

      {customer || opportunity ? (
        <Card className="card-pad space-bottom">
          <SectionHeader title="Nguồn khởi tạo" description="Form này có thể được gọi từ cơ hội hoặc từ hồ sơ khách hàng." />
          <InfoGrid
            items={[
              { label: 'Khách hàng', value: customer?.fullName ?? 'Không có' },
              { label: 'Cơ hội', value: opportunity?.name ?? 'Không có' },
            ]}
          />
        </Card>
      ) : null}

      <Card className="card-pad">
        <form className="form-grid" onSubmit={handleCreatePayment}>
          <div className="field">
            <label>Cơ hội</label>
            <select name="opportunityId" defaultValue={opportunity?.id ?? ''} required>
              <option value="" disabled>Chọn cơ hội</option>
              {state.opportunities.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Khách hàng</label>
            <select name="customerId" defaultValue={customer?.id ?? opportunity?.customerId ?? ''} required>
              <option value="" disabled>Chọn khách hàng</option>
              {state.customers.map((item) => (
                <option key={item.id} value={item.id}>{item.fullName}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Số tiền</label>
            <input name="amount" type="number" defaultValue={String(opportunity?.value ?? 25000000)} />
          </div>
          <div className="field">
            <label>Phương thức</label>
            <select name="paymentMethod" defaultValue="Chuyen khoan">
              {paymentMethodValues.map((item) => (
                <option key={item} value={item}>{paymentMethodLabels[item]}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Trạng thái</label>
            <select name="status" defaultValue="Chua thanh toan">
              {paymentStatusValues.map((item) => (
                <option key={item} value={item}>{paymentStatusLabels[item]}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Ngày thanh toán</label>
            <input name="paymentDate" type="date" />
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label>Ghi chú</label>
            <textarea name="note" defaultValue={opportunity?.note ?? 'Ghi nhận từ prototype static.'} />
          </div>
          <div className="page-actions" style={{ gridColumn: '1 / -1' }}>
            <LinkButton to={appRoutes.payments} variant="ghost">Huỷ</LinkButton>
            <Button variant="primary" type="submit">Lưu và mở chi tiết</Button>
          </div>
        </form>
      </Card>
    </>
  )
}

export function PaymentDetailPage() {
  const { state, updatePayment } = useCRM()
  const { paymentId = '' } = useParams()
  const payment = state.payments.find((item) => item.id === paymentId) ?? null
  const opportunity = payment
    ? state.opportunities.find((item) => item.id === payment.opportunityId) ?? null
    : null

  if (!payment) {
    return (
      <EmptyState
        title="Không tìm thấy giao dịch"
        message="Bản ghi có thể đã bị xoá khỏi dữ liệu demo hoặc đường dẫn không còn hợp lệ."
        action={<LinkButton to={appRoutes.payments} variant="primary">Quay lại thanh toán</LinkButton>}
      />
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Payment Detail"
        title={opportunity?.name ?? 'Giao dịch thanh toán'}
        description="Trang chi tiết giao dịch giúp khách thấy việc quản lý thu tiền, trạng thái và liên kết với cơ hội đã được nghĩ đến đầy đủ."
        breadcrumbs={[
          { label: 'Thanh toán', to: appRoutes.payments },
          { label: opportunity?.name ?? 'Chi tiết giao dịch' },
        ]}
        actions={
          opportunity ? (
            <LinkButton to={appRoutes.opportunityDetail(opportunity.id)} variant="secondary" icon={<Icon name="pipeline" />}>
              Mở cơ hội liên quan
            </LinkButton>
          ) : null
        }
      />

      <DetailLayout
        main={
          <>
            <Card className="card-pad space-bottom">
              <SectionHeader title="Thông tin giao dịch" />
              <InfoGrid
                items={[
                  { label: 'Khách hàng', value: <CustomerName customerId={payment.customerId} /> },
                  { label: 'Số tiền', value: formatCurrency(payment.amount) },
                  { label: 'Phương thức', value: paymentMethodLabels[payment.paymentMethod] },
                  { label: 'Ngày thanh toán', value: formatDate(payment.paymentDate) },
                  { label: 'Ghi chú', value: payment.note },
                ]}
              />
            </Card>

            <Card className="card-pad">
              <SectionHeader title="Cập nhật nhanh trạng thái" />
              <div className="row-actions">
                <Button variant="secondary" onClick={() => updatePayment(payment.id, { status: 'Chua thanh toan' })}>
                  Chưa thanh toán
                </Button>
                <Button variant="secondary" onClick={() => updatePayment(payment.id, { status: 'Thanh toan mot phan', paymentDate: new Date().toISOString().slice(0, 10) })}>
                  Một phần
                </Button>
                <Button variant="primary" onClick={() => updatePayment(payment.id, { status: 'Da thanh toan', paymentDate: new Date().toISOString().slice(0, 10) })}>
                  Đã thanh toán
                </Button>
              </div>
            </Card>
          </>
        }
        side={
          <>
            <Card className="card-pad space-bottom sticky-card">
              <SectionHeader title="Trạng thái hiện tại" />
              <div className="stack-list">
                <PaymentStatusBadge status={payment.status} />
                <div className="muted">Tổng tiền: {formatCurrency(payment.amount)}</div>
              </div>
            </Card>

            <Card className="card-pad">
              <SectionHeader title="Điều hướng nhanh" />
              <div className="stack-list">
                <LinkButton to={appRoutes.payments} variant="secondary">Quay lại danh sách</LinkButton>
                <LinkButton to={appRoutes.reportCenter} variant="ghost">Xem report center</LinkButton>
              </div>
            </Card>
          </>
        }
      />
    </>
  )
}
