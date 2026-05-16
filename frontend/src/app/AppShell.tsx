import { useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useCRM } from './CRMContext.tsx'
import { appRoutes } from './routes.ts'
import { initials, normalizeText } from '../lib/format.ts'
import { taskStatusLabels } from '../lib/labels.ts'
import { Icon } from '../components/Icon.tsx'
import { Button, Card, Modal } from '../components/ui.tsx'

const navItems = [
  { to: appRoutes.dashboard, label: 'Tổng quan', icon: 'dashboard' as const },
  { to: appRoutes.leads, label: 'Khách tiềm năng', icon: 'leads' as const },
  { to: appRoutes.customers, label: 'Khách hàng', icon: 'customers' as const },
  { to: appRoutes.pipeline, label: 'Cơ hội', icon: 'pipeline' as const },
  { to: appRoutes.tasks, label: 'Công việc', icon: 'tasks' as const },
  { to: appRoutes.payments, label: 'Thanh toán', icon: 'payments' as const },
  { to: appRoutes.activity, label: 'Nhật ký hoạt động', icon: 'activity' as const },
]

export function AppShell() {
  const { state, currentUser, notify, toasts, dismissToast } = useCRM()
  const navigate = useNavigate()
  const location = useLocation()
  const [query, setQuery] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const searchResults = useMemo(() => {
    const keyword = normalizeText(query.trim())
    if (!keyword) return []

    const matches = [
      ...state.customers.map((customer) => ({
        type: 'Khách hàng',
        title: customer.fullName,
        subtitle: customer.company,
        route: appRoutes.customerDetail(customer.id),
      })),
      ...state.leads.map((lead) => ({
        type: 'Khách tiềm năng',
        title: lead.fullName,
        subtitle: `${lead.source} - ${lead.interestedProduct}`,
        route: appRoutes.leadDetail(lead.id),
      })),
      ...state.opportunities.map((opportunity) => ({
        type: 'Cơ hội',
        title: opportunity.name,
        subtitle: opportunity.product,
        route: appRoutes.opportunityDetail(opportunity.id),
      })),
      ...state.tasks.map((task) => ({
        type: 'Công việc',
        title: task.title,
        subtitle: taskStatusLabels[task.status],
        route: appRoutes.taskDetail(task.id),
      })),
    ]

    return matches
      .filter((item) => normalizeText(`${item.title} ${item.subtitle} ${item.type}`).includes(keyword))
      .slice(0, 6)
  }, [query, state.customers, state.leads, state.opportunities, state.tasks])

  const upcomingNotifications = useMemo(() => state.tasks.slice(0, 4), [state.tasks])

  return (
    <>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-mark">
              <Icon name="payments" size={26} />
            </div>
            <div className="brand-copy">
              <h1>Yến Sào Vĩnh Hưng</h1>
              <p>Điều hành cao cấp</p>
            </div>
          </div>

          <nav className="nav-group">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="sidebar-footer nav-group">
            <NavLink
              to={appRoutes.settingsProfile}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
            >
              <Icon name="settings" />
              <span>Cài đặt</span>
            </NavLink>
            <button
              className="nav-item"
              onClick={() =>
                notify(
                  'Chế độ demo',
                  'Nút đăng xuất chỉ hiển thị thông báo trong bản static.',
                  'info',
                )
              }
            >
              <Icon name="logout" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </aside>

        <div className="content">
          <header className="topbar">
            <div className="search-wrap">
              <span className="search-icon">
                <Icon name="search" />
              </span>
              <input
                className="search-box"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Tìm kiếm khách hàng, cơ hội, công việc..."
              />
              {query && searchResults.length > 0 ? (
                <div className="search-results">
                  {searchResults.map((result, index) => (
                    <button
                      key={`${result.type}-${result.title}-${index}`}
                      className="search-result"
                      onClick={() => {
                        navigate(result.route)
                        setQuery('')
                      }}
                    >
                      <div>
                        <strong>{result.title}</strong>
                        <div className="muted">
                          {result.type} - {result.subtitle}
                        </div>
                      </div>
                      <span className="muted">Mở</span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="topbar-actions">
              <button
                className="icon-button"
                onClick={() => {
                  setShowNotifications((value) => !value)
                  setShowProfile(false)
                }}
              >
                <Icon name="bell" />
              </button>
              <button className="icon-button" onClick={() => setShowHelp(true)}>
                <Icon name="help" />
              </button>
              <button
                className="profile-chip"
                onClick={() => {
                  setShowProfile((value) => !value)
                  setShowNotifications(false)
                }}
              >
                <div>
                  <strong>{currentUser.fullName}</strong>
                  <div className="muted">{currentUser.title}</div>
                </div>
                <div className="avatar">{initials(currentUser.fullName)}</div>
              </button>
            </div>
          </header>

          {showNotifications ? (
            <div style={{ position: 'fixed', top: 92, right: 30, zIndex: 30, width: 360 }}>
              <Card className="card-pad">
                <div className="page-header" style={{ marginBottom: 12 }}>
                  <div>
                    <h2 style={{ fontSize: '1.6rem' }}>Nhắc việc sắp đến hạn</h2>
                  </div>
                </div>
                <div className="stack-list">
                  {upcomingNotifications.map((task) => (
                    <button
                      key={task.id}
                      className="search-result"
                      onClick={() => {
                        navigate(appRoutes.taskDetail(task.id))
                        setShowNotifications(false)
                      }}
                    >
                      <div>
                        <strong>{task.title}</strong>
                        <div className="muted">
                          {new Date(task.dueDate).toLocaleString('vi-VN')} -{' '}
                          {taskStatusLabels[task.status]}
                        </div>
                      </div>
                      <span className="muted">Mở</span>
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          ) : null}

          {showProfile ? (
            <div style={{ position: 'fixed', top: 92, right: 30, zIndex: 30, width: 320 }}>
              <Card className="card-pad">
                <div className="stack-list">
                  <div>
                    <strong>{currentUser.fullName}</strong>
                    <div className="muted">{currentUser.email}</div>
                  </div>
                  <Button
                    variant="secondary"
                      onClick={() => {
                      navigate(appRoutes.settingsProfile)
                      setShowProfile(false)
                    }}
                    icon={<Icon name="settings" />}
                  >
                    Mở cài đặt
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      notify(
                        'Chế độ demo',
                        'Khách đang xem bản trình diễn không cần đăng nhập.',
                        'info',
                      )
                    }
                    icon={<Icon name="user" />}
                  >
                    Xem thông tin demo
                  </Button>
                </div>
              </Card>
            </div>
          ) : null}

          <main className="main" key={location.pathname}>
            <Outlet />
          </main>
        </div>
      </div>

      <Modal
        open={showHelp}
        onClose={() => setShowHelp(false)}
        title="Hướng dẫn demo cho khách"
        actions={<Button onClick={() => setShowHelp(false)}>Đã hiểu</Button>}
      >
        <div className="stack-list">
          <Card className="card-pad">
            <strong>1. Tổng quan</strong>
            <p className="muted">Theo dõi KPI, biểu đồ doanh số và nhắc việc sắp đến hạn.</p>
          </Card>
          <Card className="card-pad">
            <strong>2. Khách tiềm năng và Danh sách</strong>
            <p className="muted">
              Mở bảng dữ liệu, tạo lead hoặc khách mới, click từng dòng để đi sang trang chi tiết.
            </p>
          </Card>
          <Card className="card-pad">
            <strong>3. Cơ hội, Công việc, Thanh toán</strong>
            <p className="muted">
              Kéo thả pipeline, đổi trạng thái task, cập nhật thanh toán và xem nhật ký hoạt động.
            </p>
          </Card>
        </div>
      </Modal>

      <div className="toast-stack">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            <div className="page-header" style={{ marginBottom: 10 }}>
              <div>
                <strong>{toast.title}</strong>
              </div>
              <button className="icon-button" onClick={() => dismissToast(toast.id)}>
                <Icon name="close" size={16} />
              </button>
            </div>
            <div className="muted">{toast.message}</div>
          </div>
        ))}
      </div>
    </>
  )
}
