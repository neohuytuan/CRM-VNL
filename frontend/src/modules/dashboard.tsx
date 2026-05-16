import { useMemo } from 'react'
import { appRoutes } from '../app/routes.ts'
import { Icon } from '../components/Icon.tsx'
import { ActionGrid, PageHeader, PageSection, SectionHeader } from '../components/page.tsx'
import { Badge, Card, LinkButton, StatCard } from '../components/ui.tsx'
import { formatCompactCurrency, formatCurrency, formatDateTime } from '../lib/format.ts'
import { useCRM } from '../app/CRMContext.tsx'
import { CustomerName, RecordLink, TaskStatusBadge } from './shared.tsx'

export function DashboardPage() {
  const { state } = useCRM()

  const stats = useMemo(() => {
    const paidRevenue = state.payments
      .filter((payment) => payment.status !== 'Chua thanh toan')
      .reduce((sum, payment) => sum + payment.amount, 0)
    const pipelineValue = state.opportunities
      .filter((item) => item.stage !== 'Huy')
      .reduce((sum, item) => sum + item.value, 0)
    const urgentTasks = state.tasks.filter((task) => task.priority === 'Cao').length
    const opportunitiesWaiting = state.opportunities.filter((item) => item.stage === 'Cho chot').length

    return { paidRevenue, pipelineValue, urgentTasks, opportunitiesWaiting }
  }, [state.opportunities, state.payments, state.tasks])

  const months = [
    { month: 'T1', revenue: 0.45, opportunities: 0.22 },
    { month: 'T2', revenue: 0.6, opportunities: 0.35 },
    { month: 'T3', revenue: 0.82, opportunities: 0.44 },
    { month: 'T4', revenue: 1.15, opportunities: 0.58 },
    { month: 'T5', revenue: 1.25, opportunities: 0.63 },
    { month: 'T6', revenue: 0.9, opportunities: 0.38 },
  ]

  return (
    <>
      <PageHeader
        eyebrow="Executive CRM"
        title="Tổng quan điều hành"
        description="Màn hình mở đầu được tối ưu để khách hiểu ngay hiệu quả kinh doanh, các việc sắp tới và các lối vào chính của hệ thống."
        actions={
          <>
            <LinkButton to={appRoutes.reportCenter} variant="secondary" icon={<Icon name="calendar" />}>
              Xem báo cáo tháng này
            </LinkButton>
            <LinkButton to={appRoutes.workflow} variant="primary" icon={<Icon name="plus" />}>
              Tạo nhanh workflow
            </LinkButton>
          </>
        }
      />

      <div className="stat-grid space-bottom">
        <StatCard
          title="Tổng khách hàng"
          value={new Intl.NumberFormat('vi-VN').format(state.customers.length)}
          icon={<Icon name="customers" />}
          trend={<Badge tone="success">+5%</Badge>}
          to={appRoutes.customers}
        />
        <StatCard
          title="Cơ hội đang mở"
          value={new Intl.NumberFormat('vi-VN').format(state.opportunities.length)}
          icon={<Icon name="pipeline" />}
          trend={<Badge tone="progress">{stats.opportunitiesWaiting} chờ chốt</Badge>}
          to={appRoutes.pipeline}
        />
        <StatCard
          title="Doanh số dự kiến"
          value={formatCurrency(stats.pipelineValue)}
          icon={<Icon name="money" />}
          trend={<Badge tone="success">Pipeline tốt</Badge>}
          to={appRoutes.reportCenter}
        />
        <StatCard
          title="Việc ưu tiên cao"
          value={String(stats.urgentTasks)}
          icon={<Icon name="warning" />}
          trend={<Badge tone="danger">Cần xử lý</Badge>}
          to={appRoutes.tasks}
        />
      </div>

      <div className="layout-split">
        <Card className="chart-card card-pad">
          <SectionHeader
            title="Biểu đồ doanh số và cơ hội"
            description="Phần này đóng vai trò neo trực quan cho khách, giúp họ thấy hệ thống không chỉ là nơi nhập liệu mà còn là nơi điều hành."
            actions={<LinkButton to={appRoutes.reportCenter} variant="ghost">Đi đến report center</LinkButton>}
          />
          <div className="chart">
            {months.map((item) => (
              <div key={item.month} className="bar-group">
                <div className="bar-stack">
                  <div className="bar bar-revenue" style={{ height: `${item.revenue * 180}px` }} />
                  <div className="bar bar-opportunity" style={{ height: `${item.opportunities * 180}px` }} />
                </div>
                <strong>{item.month}</strong>
              </div>
            ))}
          </div>
        </Card>

        <Card className="card-pad">
          <SectionHeader
            title="Nhắc việc sắp đến hạn"
            description="Mọi mục trong danh sách đều có thể bấm sang màn chi tiết công việc."
          />
          <div className="timeline-list">
            {state.tasks.slice(0, 4).map((task) => (
              <div className="timeline-item" key={task.id}>
                <div className="timeline-icon">
                  <Icon name={task.customerId ? 'phone' : 'note'} />
                </div>
                <div>
                  <RecordLink
                    to={appRoutes.taskDetail(task.id)}
                    title={task.title}
                    subtitle={task.customerId ? undefined : 'Công việc nội bộ'}
                  />
                  {task.customerId ? (
                    <div className="muted">
                      <CustomerName customerId={task.customerId} />
                    </div>
                  ) : null}
                  <div className="muted">{formatDateTime(task.dueDate)}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <PageSection>
        <SectionHeader
          title="Lối vào nhanh cho buổi demo"
          description="Khách có thể đi theo nhiều hướng nhưng vẫn thấy luồng sản phẩm rõ ràng."
        />
        <ActionGrid
          items={[
            {
              title: 'Tạo khách hàng tiềm năng',
              description: 'Dẫn sang form tạo lead đầy đủ, sau đó có thể mở ngay trang chi tiết của lead mới.',
              to: appRoutes.leadNew,
              actionLabel: 'Mở form lead',
            },
            {
              title: 'Tạo hồ sơ khách hàng',
              description: 'Phù hợp khi khách muốn xem quy trình CRM sau bước chuyển đổi đầu phễu.',
              to: appRoutes.customerNew,
              actionLabel: 'Mở hồ sơ mới',
            },
            {
              title: 'Import danh sách mẫu',
              description: 'Cho khách thấy tương lai có thể nhập dữ liệu hàng loạt mà vẫn kiểm tra trước khi đồng bộ.',
              to: appRoutes.importPreview,
              actionLabel: 'Xem import preview',
            },
            {
              title: 'Xuất báo cáo và biểu mẫu',
              description: 'Đi tới trung tâm xuất dữ liệu và report center để trình bày khả năng quản trị.',
              to: appRoutes.exportCenter,
              actionLabel: 'Mở export center',
            },
          ]}
        />
      </PageSection>

      <div className="metric-strip">
        <StatCard
          title="Doanh số đã ghi nhận"
          value={formatCurrency(stats.paidRevenue)}
          icon={<Icon name="payments" />}
          trend={<Badge tone="success">Đang tăng</Badge>}
          to={appRoutes.payments}
        />
        <StatCard
          title="Giá trị pipeline"
          value={formatCompactCurrency(stats.pipelineValue)}
          icon={<Icon name="pipeline" />}
          trend={<Badge tone="progress">Ổn định</Badge>}
          to={appRoutes.pipeline}
        />
        <StatCard
          title="Công việc hoàn thành"
          value={String(state.tasks.filter((task) => task.status === 'Da hoan thanh').length)}
          icon={<Icon name="check" />}
          trend={<TaskStatusBadge status="Da hoan thanh" />}
          to={appRoutes.tasks}
        />
      </div>
    </>
  )
}
