import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { appRoutes } from '../app/routes.ts'
import { useCRM } from '../app/CRMContext.tsx'
import { Icon } from '../components/Icon.tsx'
import { PageHeader } from '../components/page.tsx'
import { Button, Card, LinkButton } from '../components/ui.tsx'
import { formatDateTime } from '../lib/format.ts'
import { activityTypeLabels } from '../lib/labels.ts'
import { getActivityRoute } from './shared.tsx'

const ALL_FILTER = 'Tat ca' as const

export function ActivityPage() {
  const { state } = useCRM()
  const [typeFilter, setTypeFilter] = useState<typeof ALL_FILTER | string>(ALL_FILTER)
  const activityFilters = [ALL_FILTER, 'call', 'email', 'task', 'payment', 'note'] as const

  const filteredActivities = useMemo(() => {
    return state.activities.filter(
      (activity) => typeFilter === ALL_FILTER || activity.type === typeFilter,
    )
  }, [state.activities, typeFilter])

  return (
    <>
      <PageHeader
        eyebrow="Operations Trace"
        title="Nhật ký hoạt động"
        description="Màn activity được nâng lên thành nơi khách có thể lần theo mọi thao tác trong hệ thống, thay vì chỉ là một log tĩnh."
        breadcrumbs={[
          { label: 'Tổng quan', to: appRoutes.dashboard },
          { label: 'Nhật ký hoạt động' },
        ]}
        actions={<LinkButton to={appRoutes.reportCenter} variant="secondary">Mở report center</LinkButton>}
      />

      <Card className="card-pad space-bottom">
        <div className="tab-row">
          {activityFilters.map((item) => (
            <Button
              key={item}
              variant={typeFilter === item ? 'primary' : 'secondary'}
              onClick={() => setTypeFilter(item)}
            >
              {item === ALL_FILTER ? 'Tất cả' : activityTypeLabels[item]}
            </Button>
          ))}
        </div>
      </Card>

      <Card className="card-pad">
        <div className="stack-list">
          {filteredActivities.map((activity) => (
            <Link key={activity.id} className="activity-card-link" to={getActivityRoute(activity)}>
              <div className="activity-row">
                <div className="timeline-icon">
                  <Icon
                    name={
                      activity.type === 'payment'
                        ? 'money'
                        : activity.type === 'email'
                          ? 'mail'
                          : activity.type === 'call'
                            ? 'phone'
                            : 'note'
                    }
                  />
                </div>
                <div className="mini-note">
                  <strong>{activity.title}</strong>
                  <div className="muted">
                    {formatDateTime(activity.createdAt)} · {activityTypeLabels[activity.type]}
                  </div>
                  <p>{activity.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </>
  )
}
