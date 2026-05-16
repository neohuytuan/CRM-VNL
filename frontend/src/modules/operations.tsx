import { useMemo, useState } from 'react'
import { appRoutes } from '../app/routes.ts'
import { useCRM } from '../app/CRMContext.tsx'
import { Icon } from '../components/Icon.tsx'
import { ActionGrid, PageHeader, PageSection, SectionHeader } from '../components/page.tsx'
import { Badge, Button, Card, LinkButton, StatCard } from '../components/ui.tsx'
import { formatCompactCurrency, formatCurrency } from '../lib/format.ts'

export function QuickWorkflowPage() {
  return (
    <>
      <PageHeader
        eyebrow="Quick Start"
        title="Tạo nhanh workflow cho buổi demo"
        description="Trang này gom các lối đi quan trọng nhất để bạn hoặc khách có thể bắt đầu ngay từ đúng điểm cần xem."
        breadcrumbs={[
          { label: 'Tổng quan', to: appRoutes.dashboard },
          { label: 'Workflow nhanh' },
        ]}
        actions={
          <LinkButton to={appRoutes.dashboard} variant="secondary" icon={<Icon name="dashboard" />}>
            Quay lại tổng quan
          </LinkButton>
        }
      />

      <ActionGrid
        items={[
          {
            title: 'Bắt đầu từ lead mới',
            description: 'Đi theo hành trình chuẩn từ đầu phễu: lead, cơ hội, công việc, thanh toán.',
            to: appRoutes.leadNew,
            actionLabel: 'Tạo lead',
          },
          {
            title: 'Bắt đầu từ khách hàng có sẵn',
            description: 'Phù hợp khi khách cần xem cách hệ thống quản lý hồ sơ và lịch sử chăm sóc.',
            to: appRoutes.customers,
            actionLabel: 'Mở khách hàng',
          },
          {
            title: 'Bắt đầu từ cơ hội bán hàng',
            description: 'Dành cho buổi demo thiên về pipeline, dự báo doanh số và chốt giao dịch.',
            to: appRoutes.opportunityNew,
            actionLabel: 'Tạo cơ hội',
          },
          {
            title: 'Bắt đầu từ dữ liệu hàng loạt',
            description: 'Mở import preview để trình bày kịch bản nhập CSV có kiểm tra trước khi xác nhận.',
            to: appRoutes.importPreview,
            actionLabel: 'Xem import',
          },
        ]}
      />

      <PageSection>
        <Card className="card-pad">
          <SectionHeader
            title="Khuyến nghị trình tự demo"
            description="Nếu bạn cần một flow gọn, đây là trình tự vừa dễ hiểu vừa thể hiện được độ hoàn thiện của sản phẩm."
          />
          <div className="timeline-list">
            <div className="timeline-item">
              <div className="timeline-icon"><Icon name="leads" /></div>
              <div>
                <strong>1. Tạo lead hoặc import danh sách</strong>
                <div className="muted">Cho khách thấy hệ thống bắt đầu từ dữ liệu đầu vào rất tự nhiên.</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon"><Icon name="pipeline" /></div>
              <div>
                <strong>2. Chuyển thành cơ hội và theo dõi pipeline</strong>
                <div className="muted">Từ lead đi sang cơ hội để kể câu chuyện bán hàng rõ nhất.</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon"><Icon name="tasks" /></div>
              <div>
                <strong>3. Giao việc và cập nhật tiến độ</strong>
                <div className="muted">Thể hiện khả năng vận hành nội bộ và bám sát cam kết với khách.</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon"><Icon name="payments" /></div>
              <div>
                <strong>4. Ghi nhận thanh toán và xuất báo cáo</strong>
                <div className="muted">Kết thúc bằng thanh toán và report để khách thấy giá trị quản trị tổng thể.</div>
              </div>
            </div>
          </div>
        </Card>
      </PageSection>
    </>
  )
}

export function ImportPreviewPage() {
  const [step, setStep] = useState<'preview' | 'mapping' | 'confirm'>('preview')
  const previewRows = [
    ['Nguyễn Phúc An', '0908 111 222', 'Website', 'Set quà cao cấp'],
    ['Trần Hoài Nam', '0911 333 444', 'Facebook', 'Yến chưng'],
    ['Lý Mỹ Linh', '0903 777 888', 'Giới thiệu', 'Tổ yến nguyên chất'],
  ]

  return (
    <>
      <PageHeader
        eyebrow="Data Operations"
        title="Import CSV preview"
        description="Trang tĩnh mô phỏng quy trình nhập dữ liệu có kiểm tra trước, giúp khách thấy được trải nghiệm quản trị chuyên nghiệp."
        breadcrumbs={[
          { label: 'Tổng quan', to: appRoutes.dashboard },
          { label: 'Import preview' },
        ]}
        actions={
          <LinkButton to={appRoutes.leads} variant="secondary" icon={<Icon name="leads" />}>
            Mở danh sách lead
          </LinkButton>
        }
      />

      <Card className="card-pad space-bottom">
        <SectionHeader title="Các bước import" />
        <div className="row-actions">
          <Button variant={step === 'preview' ? 'primary' : 'secondary'} onClick={() => setStep('preview')}>
            1. Xem dữ liệu
          </Button>
          <Button variant={step === 'mapping' ? 'primary' : 'secondary'} onClick={() => setStep('mapping')}>
            2. Map cột
          </Button>
          <Button variant={step === 'confirm' ? 'primary' : 'secondary'} onClick={() => setStep('confirm')}>
            3. Xác nhận
          </Button>
        </div>
      </Card>

      {step === 'preview' ? (
        <Card className="card-pad space-bottom">
          <SectionHeader
            title="Preview dữ liệu mẫu"
            description="Khách sẽ thấy ngay rằng trước khi nhập, dữ liệu đã được soi trước để tránh sai lệch."
            actions={
              <Button variant="primary" onClick={() => setStep('mapping')}>
                Tiếp tục map cột
              </Button>
            }
          />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Họ tên</th>
                  <th>Số điện thoại</th>
                  <th>Nguồn</th>
                  <th>Sản phẩm quan tâm</th>
                </tr>
              </thead>
              <tbody>
                {previewRows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}

      {step === 'mapping' ? (
        <Card className="card-pad space-bottom">
          <SectionHeader
            title="Mapping trường dữ liệu"
            description="Mọi cột đều được map sang đúng field CRM để giảm lỗi khi triển khai backend thật."
            actions={
              <Button variant="primary" onClick={() => setStep('confirm')}>
                Đi đến xác nhận
              </Button>
            }
          />
          <div className="info-grid">
            {[
              ['Cột A', 'Họ và tên'],
              ['Cột B', 'Số điện thoại'],
              ['Cột C', 'Nguồn lead'],
              ['Cột D', 'Sản phẩm quan tâm'],
            ].map(([source, target]) => (
              <div key={source} className="info-pair">
                <span className="info-label">{source}</span>
                <div className="info-value">{target}</div>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {step === 'confirm' ? (
        <Card className="card-pad space-bottom">
          <SectionHeader title="Xác nhận nhập dữ liệu" />
          <div className="action-grid">
            <Card className="card-pad action-card">
              <h3>03 bản ghi hợp lệ</h3>
              <p className="muted">Sẵn sàng đưa vào danh sách lead hoặc khách hàng khi nối backend.</p>
              <LinkButton to={appRoutes.leads} variant="primary">Mở danh sách lead</LinkButton>
            </Card>
            <Card className="card-pad action-card">
              <h3>01 quy tắc mapping đã lưu</h3>
              <p className="muted">Có thể tái sử dụng cho các đợt import tương lai để tiết kiệm thời gian.</p>
              <LinkButton to={appRoutes.exportCenter} variant="secondary">Đi tới export center</LinkButton>
            </Card>
          </div>
        </Card>
      ) : null}
    </>
  )
}

export function ExportCenterPage() {
  const [selectedPack, setSelectedPack] = useState<'customers' | 'pipeline' | 'finance'>('customers')

  return (
    <>
      <PageHeader
        eyebrow="Data Operations"
        title="Export center"
        description="Tập trung toàn bộ điểm xuất dữ liệu vào một nơi để trải nghiệm chuyên nghiệp hơn và dễ kể câu chuyện quản trị."
        breadcrumbs={[
          { label: 'Tổng quan', to: appRoutes.dashboard },
          { label: 'Export center' },
        ]}
        actions={
          <LinkButton to={appRoutes.reportCenter} variant="primary" icon={<Icon name="download" />}>
            Sang report center
          </LinkButton>
        }
      />

      <div className="row-actions space-bottom">
        <Button variant={selectedPack === 'customers' ? 'primary' : 'secondary'} onClick={() => setSelectedPack('customers')}>
          Gói khách hàng
        </Button>
        <Button variant={selectedPack === 'pipeline' ? 'primary' : 'secondary'} onClick={() => setSelectedPack('pipeline')}>
          Gói pipeline
        </Button>
        <Button variant={selectedPack === 'finance' ? 'primary' : 'secondary'} onClick={() => setSelectedPack('finance')}>
          Gói tài chính
        </Button>
      </div>

      <div className="action-grid">
        <Card className="card-pad action-card">
          <h3>
            {selectedPack === 'customers'
              ? 'Danh sách khách hàng và lead'
              : selectedPack === 'pipeline'
                ? 'Cơ hội và công việc'
                : 'Thanh toán và doanh thu'}
          </h3>
          <p className="muted">
            {selectedPack === 'customers'
              ? 'Phù hợp cho CRM handoff, đối chiếu dữ liệu hoặc import sang công cụ khác.'
              : selectedPack === 'pipeline'
                ? 'Phù hợp cho họp điều hành, giao việc và dự báo doanh số.'
                : 'Phù hợp cho kế toán, quản trị dòng tiền và báo cáo vận hành.'}
          </p>
          <div className="row-actions">
            <LinkButton to={appRoutes.reportCenter} variant="secondary">Xem báo cáo liên quan</LinkButton>
            <LinkButton
              to={
                selectedPack === 'customers'
                  ? appRoutes.customers
                  : selectedPack === 'pipeline'
                    ? appRoutes.pipeline
                    : appRoutes.payments
              }
              variant="primary"
            >
              Mở dữ liệu nguồn
            </LinkButton>
          </div>
        </Card>
        <Card className="card-pad action-card">
          <h3>Tình trạng file mẫu</h3>
          <p className="muted">Bản static hiển thị trung tâm thao tác trước, sau này có thể thay nút bằng API export thật mà không phải làm lại UI.</p>
          <Badge tone="success">Sẵn sàng nối backend</Badge>
        </Card>
      </div>
    </>
  )
}

export function ReportCenterPage() {
  const { state } = useCRM()
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('month')

  const stats = useMemo(() => {
    const paid = state.payments
      .filter((payment) => payment.status === 'Da thanh toan')
      .reduce((sum, payment) => sum + payment.amount, 0)
    const partial = state.payments
      .filter((payment) => payment.status === 'Thanh toan mot phan')
      .reduce((sum, payment) => sum + payment.amount, 0)
    const opportunity = state.opportunities.reduce((sum, item) => sum + item.value, 0)
    return { paid, partial, opportunity }
  }, [state.opportunities, state.payments])

  return (
    <>
      <PageHeader
        eyebrow="Reporting"
        title="Report center"
        description="Màn hình tĩnh đóng vai trò trung tâm báo cáo để khách thấy rõ bức tranh quản trị sau khi vận hành CRM."
        breadcrumbs={[
          { label: 'Tổng quan', to: appRoutes.dashboard },
          { label: 'Report center' },
        ]}
        actions={
          <LinkButton to={appRoutes.exportCenter} variant="secondary" icon={<Icon name="download" />}>
            Mở export center
          </LinkButton>
        }
      />

      <div className="row-actions space-bottom">
        <Button variant={period === 'month' ? 'primary' : 'secondary'} onClick={() => setPeriod('month')}>
          Tháng này
        </Button>
        <Button variant={period === 'quarter' ? 'primary' : 'secondary'} onClick={() => setPeriod('quarter')}>
          Quý này
        </Button>
        <Button variant={period === 'year' ? 'primary' : 'secondary'} onClick={() => setPeriod('year')}>
          Năm nay
        </Button>
      </div>

      <div className="stat-grid space-bottom">
        <StatCard
          title={`Doanh thu đã thu (${period === 'month' ? 'tháng' : period === 'quarter' ? 'quý' : 'năm'})`}
          value={formatCurrency(stats.paid)}
          icon={<Icon name="money" />}
          trend={<Badge tone="success">On track</Badge>}
          to={appRoutes.payments}
        />
        <StatCard
          title="Thanh toán chờ hoàn tất"
          value={formatCurrency(stats.partial)}
          icon={<Icon name="payments" />}
          trend={<Badge tone="progress">Theo dõi sát</Badge>}
          to={appRoutes.payments}
        />
        <StatCard
          title="Giá trị cơ hội"
          value={formatCompactCurrency(stats.opportunity)}
          icon={<Icon name="pipeline" />}
          trend={<Badge tone="success">Tăng trưởng</Badge>}
          to={appRoutes.pipeline}
        />
        <StatCard
          title="Hiệu suất chăm sóc"
          value="92%"
          icon={<Icon name="check" />}
          trend={<Badge tone="success">Tốt</Badge>}
          to={appRoutes.activity}
        />
      </div>

      <ActionGrid
        items={[
          {
            title: 'Xem danh sách thanh toán',
            description: 'Đi sâu vào từng giao dịch để trình bày tình trạng thu tiền và cập nhật công nợ.',
            to: appRoutes.payments,
            actionLabel: 'Mở thanh toán',
          },
          {
            title: 'Xem pipeline bán hàng',
            description: 'Cho khách thấy report luôn có đường dẫn quay về nơi phát sinh dữ liệu.',
            to: appRoutes.pipeline,
            actionLabel: 'Mở pipeline',
          },
          {
            title: 'Kiểm tra hoạt động đội ngũ',
            description: 'Mở activity log để nối report với hành vi vận hành hàng ngày.',
            to: appRoutes.activity,
            actionLabel: 'Mở activity log',
          },
          {
            title: 'Xuất bộ dữ liệu',
            description: 'Đi sang export center để trình bày khả năng chốt vòng đời dữ liệu.',
            to: appRoutes.exportCenter,
            actionLabel: 'Sang export center',
          },
        ]}
      />
    </>
  )
}
