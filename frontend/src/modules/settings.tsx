import { useMemo, type FormEvent } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { appRoutes } from '../app/routes.ts'
import { useCRM } from '../app/CRMContext.tsx'
import { Icon } from '../components/Icon.tsx'
import { PageHeader } from '../components/page.tsx'
import { Badge, Button, Card, LinkButton } from '../components/ui.tsx'
import { initials } from '../lib/format.ts'
import { roleLabels } from '../lib/labels.ts'

const roleValues = ['Admin', 'Truong nhom', 'Nhan vien Sales'] as const

export function SettingsPage() {
  const { currentUser, resetDemo, state, updateCurrentUser } = useCRM()
  const location = useLocation()

  const currentSection = useMemo(() => {
    if (location.pathname === appRoutes.settingsPermissions) return 'permissions'
    if (location.pathname === appRoutes.settingsTeams) return 'teams'
    if (location.pathname === appRoutes.settingsTags) return 'tags'
    return 'profile'
  }, [location.pathname])

  function handleUpdateProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    updateCurrentUser({
      fullName: String(form.get('fullName')),
      email: String(form.get('email')),
      phone: String(form.get('phone')),
      role: String(form.get('role')) as typeof currentUser.role,
      teamId: String(form.get('teamId')),
    })
  }

  if (location.pathname === appRoutes.settings) {
    return <Navigate to={appRoutes.settingsProfile} replace />
  }

  return (
    <>
      <PageHeader
        eyebrow="Workspace Settings"
        title="Cài đặt hệ thống"
        description="Trang cài đặt đã được chuyển sang sub-route rõ ràng để mọi mục đều có URL riêng, dễ demo và dễ mở rộng."
        breadcrumbs={[
          { label: 'Tổng quan', to: appRoutes.dashboard },
          { label: 'Cài đặt hệ thống' },
        ]}
        actions={
          <Button variant="secondary" onClick={resetDemo}>
            Reset dữ liệu demo
          </Button>
        }
      />

      <div className="tabs">
        <div className="settings-nav">
          <LinkButton to={appRoutes.settingsProfile} variant={currentSection === 'profile' ? 'primary' : 'secondary'} icon={<Icon name="user" />}>
            Hồ sơ cá nhân
          </LinkButton>
          <LinkButton to={appRoutes.settingsPermissions} variant={currentSection === 'permissions' ? 'primary' : 'secondary'} icon={<Icon name="check" />}>
            Phân quyền
          </LinkButton>
          <LinkButton to={appRoutes.settingsTeams} variant={currentSection === 'teams' ? 'primary' : 'secondary'} icon={<Icon name="team" />}>
            Nhóm kinh doanh
          </LinkButton>
          <LinkButton to={appRoutes.settingsTags} variant={currentSection === 'tags' ? 'primary' : 'secondary'} icon={<Icon name="note" />}>
            Danh mục nhãn
          </LinkButton>
        </div>

        <div className="stack-list">
          {currentSection === 'profile' ? (
            <Card className="card-pad">
              <form className="stack-list" onSubmit={handleUpdateProfile}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                  <div className="avatar" style={{ width: 96, height: 96, fontSize: '1.6rem' }}>{initials(currentUser.fullName)}</div>
                  <div>
                    <h3>Ảnh đại diện</h3>
                    <p className="muted">Prototype đang dùng avatar text để giữ trải nghiệm nhẹ, nhưng flow cấu hình người dùng vẫn rất rõ ràng.</p>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="field"><label>Họ và tên</label><input name="fullName" defaultValue={currentUser.fullName} /></div>
                  <div className="field"><label>Số điện thoại</label><input name="phone" defaultValue={currentUser.phone} /></div>
                  <div className="field"><label>Email liên hệ</label><input name="email" defaultValue={currentUser.email} /></div>
                  <div className="field">
                    <label>Vai trò hệ thống</label>
                    <select name="role" defaultValue={currentUser.role}>
                      {roleValues.map((role) => (
                        <option key={role} value={role}>{roleLabels[role]}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field" style={{ gridColumn: '1 / -1' }}>
                    <label>Nhóm kinh doanh</label>
                    <select name="teamId" defaultValue={currentUser.teamId}>
                      {state.catalogs.teams.map((team) => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="page-actions">
                  <Button variant="secondary" type="reset">Huỷ thay đổi</Button>
                  <Button variant="primary" type="submit">Lưu thay đổi</Button>
                </div>
              </form>
            </Card>
          ) : null}

          {currentSection === 'permissions' ? (
            <Card className="card-pad">
              <div className="stack-list">
                {state.users.map((user) => (
                  <div key={user.id} className="mini-note">
                    <strong>{user.fullName}</strong>
                    <div className="muted">{user.email}</div>
                    <div className="row-actions space-top">
                      <Badge tone={user.role === 'Admin' ? 'vip' : user.role === 'Truong nhom' ? 'progress' : 'new'}>
                        {roleLabels[user.role]}
                      </Badge>
                      <Badge tone="new">{state.catalogs.teams.find((team) => team.id === user.teamId)?.name}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ) : null}

          {currentSection === 'teams' ? (
            <Card className="card-pad">
              <div className="grid-two">
                {state.catalogs.teams.map((team) => (
                  <div key={team.id} className="mini-note">
                    <strong>{team.name}</strong>
                    <p className="muted">{team.description}</p>
                    <div className="muted space-top">
                      {state.users.filter((user) => user.teamId === team.id).length} thành viên
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ) : null}

          {currentSection === 'tags' ? (
            <Card className="card-pad">
              <div className="row-actions">
                {state.catalogs.tags.map((tag) => (
                  <Badge key={tag} tone="new">{tag}</Badge>
                ))}
              </div>
            </Card>
          ) : null}
        </div>
      </div>
    </>
  )
}
