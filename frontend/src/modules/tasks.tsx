import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { appRoutes } from '../app/routes.ts'
import { useCRM } from '../app/CRMContext.tsx'
import { Icon } from '../components/Icon.tsx'
import { DetailLayout, InfoGrid, PageHeader, SectionHeader } from '../components/page.tsx'
import { Badge, Button, Card, EmptyState, LinkButton, StatCard } from '../components/ui.tsx'
import type { TaskPriority, TaskStatus } from '../domain/types.ts'
import { formatDateTime } from '../lib/format.ts'
import { taskPriorityLabels, taskPriorityValues, taskStatusLabels, taskStatusValues } from '../lib/labels.ts'
import { CustomerName, OwnerName, RecordLink, TaskPriorityBadge, TaskStatusBadge, useEntityPrefill } from './shared.tsx'

const ALL_FILTER = 'Tat ca' as const

export function TasksPage() {
  const { state, updateTask } = useCRM()
  const [view, setView] = useState<'board' | 'list'>('board')
  const [priorityFilter, setPriorityFilter] = useState<typeof ALL_FILTER | TaskPriority>(ALL_FILTER)
  const [statusFilter, setStatusFilter] = useState<typeof ALL_FILTER | TaskStatus>(ALL_FILTER)
  const boardColumns: TaskStatus[] = ['Can lam', 'Dang thuc hien', 'Da hoan thanh']

  const filteredTasks = useMemo(() => {
    return state.tasks.filter((task) => {
      const priorityMatch = priorityFilter === ALL_FILTER || task.priority === priorityFilter
      const statusMatch = statusFilter === ALL_FILTER || task.status === statusFilter
      return priorityMatch && statusMatch
    })
  }, [priorityFilter, state.tasks, statusFilter])

  return (
    <>
      <PageHeader
        eyebrow="Task Management"
        title="Công việc"
        description="Module task được chỉnh lại để khách cảm nhận được cả góc vận hành lẫn góc quản trị, thay vì chỉ là danh sách công việc đơn giản."
        breadcrumbs={[
          { label: 'Tổng quan', to: appRoutes.dashboard },
          { label: 'Công việc' },
        ]}
        actions={
          <>
            <Button variant={view === 'board' ? 'primary' : 'secondary'} icon={<Icon name="board" />} onClick={() => setView('board')}>
              Board
            </Button>
            <Button variant={view === 'list' ? 'primary' : 'secondary'} icon={<Icon name="list" />} onClick={() => setView('list')}>
              Danh sách
            </Button>
            <LinkButton to={appRoutes.taskNew} variant="primary" icon={<Icon name="plus" />}>
              Tạo công việc
            </LinkButton>
          </>
        }
      />

      <Card className="card-pad space-bottom">
        <SectionHeader title="Bộ lọc công việc" />
        <div className="filter-row">
          <Button variant={priorityFilter === ALL_FILTER ? 'primary' : 'secondary'} onClick={() => setPriorityFilter(ALL_FILTER)}>
            Tất cả ưu tiên
          </Button>
          {taskPriorityValues.map((priority) => (
            <Button key={priority} variant={priorityFilter === priority ? 'primary' : 'secondary'} onClick={() => setPriorityFilter(priority)}>
              {taskPriorityLabels[priority]}
            </Button>
          ))}
          <Button variant="ghost" onClick={() => setStatusFilter(statusFilter === ALL_FILTER ? 'Dang thuc hien' : ALL_FILTER)}>
            Trạng thái: {statusFilter === ALL_FILTER ? 'Tất cả' : taskStatusLabels[statusFilter]}
          </Button>
        </div>
      </Card>

      {view === 'board' ? (
        <div className="task-board space-bottom">
          {boardColumns.map((column) => (
            <Card key={column} className="task-column">
              <div className="task-column-header">
                <div><strong>{taskStatusLabels[column]}</strong></div>
                <Badge tone={column === 'Da hoan thanh' ? 'success' : column === 'Dang thuc hien' ? 'progress' : 'new'}>
                  {filteredTasks.filter((task) => task.status === column).length}
                </Badge>
              </div>
              <div className="task-list">
                {filteredTasks.filter((task) => task.status === column).map((task) => (
                  <article key={task.id} className={`task-item${task.status === 'Da hoan thanh' ? ' done' : ''}`}>
                    <TaskPriorityBadge priority={task.priority} />
                    <h3>
                      <Link className="record-link" to={appRoutes.taskDetail(task.id)}>{task.title}</Link>
                    </h3>
                    <p className="muted">{task.description}</p>
                    <div className="mini-note space-top">Tiến độ: {task.progress}%</div>
                    <div className="page-actions space-top">
                      <Button
                        variant="ghost"
                        onClick={() =>
                          updateTask(task.id, {
                            status:
                              task.status === 'Can lam'
                                ? 'Dang thuc hien'
                                : task.status === 'Dang thuc hien'
                                  ? 'Da hoan thanh'
                                  : 'Can lam',
                            progress:
                              task.status === 'Can lam'
                                ? 45
                                : task.status === 'Dang thuc hien'
                                  ? 100
                                  : 0,
                          })
                        }
                      >
                        Đổi trạng thái
                      </Button>
                      <LinkButton to={appRoutes.taskDetail(task.id)} variant="secondary">Chi tiết</LinkButton>
                    </div>
                  </article>
                ))}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="card-pad space-bottom">
          <SectionHeader title="Danh sách công việc" description="Mỗi dòng đều có đường dẫn sang màn chi tiết để khách đi sâu vào từng nhiệm vụ." />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Công việc</th>
                  <th>Khách hàng liên quan</th>
                  <th>Ưu tiên</th>
                  <th>Hạn chót</th>
                  <th>Người thực hiện</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.id}>
                    <td>
                      <RecordLink to={appRoutes.taskDetail(task.id)} title={task.title} subtitle={task.description} />
                    </td>
                    <td>{task.customerId ? <CustomerName customerId={task.customerId} /> : 'Nội bộ'}</td>
                    <td><TaskPriorityBadge priority={task.priority} /></td>
                    <td>{formatDateTime(task.dueDate)}</td>
                    <td><OwnerName ownerId={task.assignedTo} /></td>
                    <td><TaskStatusBadge status={task.status} /></td>
                    <td>
                      <div className="row-actions">
                        <LinkButton to={appRoutes.taskDetail(task.id)} variant="ghost">Chi tiết</LinkButton>
                        <Button
                          variant="secondary"
                          onClick={() =>
                            updateTask(task.id, {
                              status: task.status === 'Da hoan thanh' ? 'Can lam' : 'Da hoan thanh',
                              progress: task.status === 'Da hoan thanh' ? 0 : 100,
                            })
                          }
                        >
                          Đánh dấu xong
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <div className="metric-strip">
        <StatCard title="Hoàn thành tuần này" value="84%" icon={<Icon name="check" />} trend={<Badge tone="success">+12%</Badge>} to={appRoutes.reportCenter} />
        <StatCard title="Việc quá hạn" value="03" icon={<Icon name="warning" />} trend={<Badge tone="danger">Cần ưu tiên</Badge>} to={appRoutes.tasks} />
        <StatCard title="Hiệu suất team" value="Xuất sắc" icon={<Icon name="team" />} trend={<Badge tone="progress">Đúng tiến độ</Badge>} to={appRoutes.activity} />
      </div>
    </>
  )
}

export function TaskCreatePage() {
  const { state, createTask } = useCRM()
  const { lead, customer, opportunity } = useEntityPrefill()
  const navigate = useNavigate()

  function handleCreateTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const taskId = createTask({
      title: String(form.get('title')),
      description: String(form.get('description')),
      customerId: String(form.get('customerId')) || undefined,
      opportunityId: String(form.get('opportunityId')) || undefined,
      dueDate: String(form.get('dueDate')),
      status: String(form.get('status')) as TaskStatus,
      priority: String(form.get('priority')) as TaskPriority,
      assignedTo: state.currentUserId,
      createdBy: state.currentUserId,
      progress: Number(form.get('progress') || 0),
    })
    navigate(appRoutes.taskDetail(taskId))
  }

  return (
    <>
      <PageHeader
        eyebrow="Create Flow"
        title="Tạo công việc mới"
        description="Tất cả điểm tạo task trong app đều được gom về một flow rõ ràng, giúp khách thấy trải nghiệm thống nhất và dễ hiểu."
        breadcrumbs={[
          { label: 'Công việc', to: appRoutes.tasks },
          { label: 'Tạo công việc' },
        ]}
        actions={<LinkButton to={appRoutes.tasks} variant="secondary">Quay lại công việc</LinkButton>}
      />

      {lead || customer || opportunity ? (
        <Card className="card-pad space-bottom">
          <SectionHeader title="Ngữ cảnh khởi tạo" description="Form này đã tự kéo theo bối cảnh từ màn trước để tránh nhập lại dữ liệu." />
          <InfoGrid
            items={[
              { label: 'Lead', value: lead?.fullName ?? 'Không có' },
              { label: 'Khách hàng', value: customer?.fullName ?? 'Không có' },
              { label: 'Cơ hội', value: opportunity?.name ?? 'Không có' },
            ]}
          />
        </Card>
      ) : null}

      <Card className="card-pad">
        <form className="form-grid" onSubmit={handleCreateTask}>
          <div className="field">
            <label>Tiêu đề</label>
            <input name="title" defaultValue={lead ? `Follow-up lead ${lead.fullName}` : customer ? `Chăm sóc ${customer.fullName}` : opportunity ? `Theo dõi ${opportunity.name}` : ''} required />
          </div>
          <div className="field">
            <label>Khách hàng</label>
            <select name="customerId" defaultValue={customer?.id ?? opportunity?.customerId ?? ''}>
              <option value="">Nội bộ</option>
              {state.customers.map((item) => (
                <option key={item.id} value={item.id}>{item.fullName}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Cơ hội liên quan</label>
            <select name="opportunityId" defaultValue={opportunity?.id ?? ''}>
              <option value="">Không gắn</option>
              {state.opportunities.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Trạng thái</label>
            <select name="status" defaultValue="Can lam">
              {taskStatusValues.map((item) => (
                <option key={item} value={item}>{taskStatusLabels[item]}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Ưu tiên</label>
            <select name="priority" defaultValue="Trung binh">
              {taskPriorityValues.map((item) => (
                <option key={item} value={item}>{taskPriorityLabels[item]}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Hạn chót</label>
            <input name="dueDate" type="datetime-local" required />
          </div>
          <div className="field">
            <label>Tiến độ (%)</label>
            <input name="progress" type="number" min="0" max="100" defaultValue="0" />
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label>Mô tả</label>
            <textarea
              name="description"
              defaultValue={lead?.note ?? opportunity?.note ?? 'Công việc mới được tạo từ workflow CRM.'}
              required
            />
          </div>
          <div className="page-actions" style={{ gridColumn: '1 / -1' }}>
            <LinkButton to={appRoutes.tasks} variant="ghost">Huỷ</LinkButton>
            <Button variant="primary" type="submit">Lưu và mở chi tiết</Button>
          </div>
        </form>
      </Card>
    </>
  )
}

export function TaskDetailPage() {
  const { state, updateTask } = useCRM()
  const { taskId = '' } = useParams()
  const task = state.tasks.find((item) => item.id === taskId) ?? null

  if (!task) {
    return (
      <EmptyState
        title="Không tìm thấy công việc"
        message="Bản ghi có thể đã bị xoá khỏi dữ liệu demo hoặc đường dẫn không còn hợp lệ."
        action={<LinkButton to={appRoutes.tasks} variant="primary">Quay lại công việc</LinkButton>}
      />
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Task Detail"
        title={task.title}
        description="Màn chi tiết công việc là nơi khách thấy rõ cách giao việc, cập nhật tiến độ và nối task với khách hàng hoặc cơ hội."
        breadcrumbs={[
          { label: 'Công việc', to: appRoutes.tasks },
          { label: task.title },
        ]}
        actions={
          <>
            {task.customerId ? (
              <LinkButton to={appRoutes.customerDetail(task.customerId)} variant="secondary" icon={<Icon name="customers" />}>
                Mở khách hàng
              </LinkButton>
            ) : null}
            {task.opportunityId ? (
              <LinkButton to={appRoutes.opportunityDetail(task.opportunityId)} variant="primary" icon={<Icon name="pipeline" />}>
                Mở cơ hội
              </LinkButton>
            ) : null}
          </>
        }
      />

      <DetailLayout
        main={
          <>
            <Card className="card-pad space-bottom">
              <SectionHeader title="Tổng quan công việc" />
              <InfoGrid
                items={[
                  { label: 'Mô tả', value: task.description },
                  { label: 'Khách hàng', value: task.customerId ? <CustomerName customerId={task.customerId} /> : 'Nội bộ' },
                  { label: 'Hạn chót', value: formatDateTime(task.dueDate) },
                  { label: 'Người thực hiện', value: <OwnerName ownerId={task.assignedTo} /> },
                  { label: 'Người tạo', value: <OwnerName ownerId={task.createdBy} /> },
                  { label: 'Tiến độ', value: `${task.progress}%` },
                ]}
              />
            </Card>

            <Card className="card-pad">
              <SectionHeader title="Hành động nhanh" />
              <div className="row-actions">
                <Button
                  variant="secondary"
                  onClick={() => updateTask(task.id, { status: 'Can lam', progress: 0 })}
                >
                  Đặt về cần làm
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => updateTask(task.id, { status: 'Dang thuc hien', progress: 50 })}
                >
                  Đánh dấu đang làm
                </Button>
                <Button
                  variant="primary"
                  onClick={() => updateTask(task.id, { status: 'Da hoan thanh', progress: 100 })}
                >
                  Hoàn thành
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
                <TaskStatusBadge status={task.status} />
                <TaskPriorityBadge priority={task.priority} />
                <div className="muted">Tiến độ hiện tại: {task.progress}%</div>
              </div>
            </Card>

            <Card className="card-pad">
              <SectionHeader title="Điều hướng nhanh" />
              <div className="stack-list">
                <LinkButton to={appRoutes.tasks} variant="secondary">Quay lại danh sách</LinkButton>
                <LinkButton to={appRoutes.activity} variant="ghost">Xem activity log</LinkButton>
              </div>
            </Card>
          </>
        }
      />
    </>
  )
}
