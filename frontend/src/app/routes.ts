export const appRoutes = {
  dashboard: '/dashboard',
  workflow: '/workflow/new',
  leads: '/leads',
  leadNew: '/leads/new',
  leadDetail: (leadId: string) => `/leads/${leadId}`,
  customers: '/customers',
  customerNew: '/customers/new',
  customerDetail: (customerId: string) => `/customers/${customerId}`,
  pipeline: '/pipeline',
  opportunityNew: '/opportunities/new',
  opportunityDetail: (opportunityId: string) => `/opportunities/${opportunityId}`,
  tasks: '/tasks',
  taskNew: '/tasks/new',
  taskDetail: (taskId: string) => `/tasks/${taskId}`,
  payments: '/payments',
  paymentNew: '/payments/new',
  paymentDetail: (paymentId: string) => `/payments/${paymentId}`,
  activity: '/activity',
  settings: '/settings',
  settingsProfile: '/settings/profile',
  settingsPermissions: '/settings/permissions',
  settingsTeams: '/settings/teams',
  settingsTags: '/settings/tags',
  importPreview: '/tools/import',
  exportCenter: '/tools/export',
  reportCenter: '/tools/reports',
} as const

export type SettingsRoute =
  | typeof appRoutes.settingsProfile
  | typeof appRoutes.settingsPermissions
  | typeof appRoutes.settingsTeams
  | typeof appRoutes.settingsTags
