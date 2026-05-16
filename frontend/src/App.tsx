import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './app/AppShell.tsx'
import { appRoutes } from './app/routes.ts'
import { ActivityPage } from './modules/activity.tsx'
import { CustomerCreatePage, CustomerDetailPage, CustomersPage } from './modules/customers.tsx'
import { DashboardPage } from './modules/dashboard.tsx'
import { LeadCreatePage, LeadDetailPage, LeadsPage } from './modules/leads.tsx'
import {
  ExportCenterPage,
  ImportPreviewPage,
  QuickWorkflowPage,
  ReportCenterPage,
} from './modules/operations.tsx'
import {
  OpportunityCreatePage,
  OpportunityDetailPage,
  PipelinePage,
} from './modules/pipeline.tsx'
import { PaymentCreatePage, PaymentDetailPage, PaymentsPage } from './modules/payments.tsx'
import { SettingsPage } from './modules/settings.tsx'
import { TaskCreatePage, TaskDetailPage, TasksPage } from './modules/tasks.tsx'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to={appRoutes.dashboard} replace />} />
          <Route path={appRoutes.dashboard} element={<DashboardPage />} />
          <Route path={appRoutes.workflow} element={<QuickWorkflowPage />} />

          <Route path={appRoutes.leads} element={<LeadsPage />} />
          <Route path={appRoutes.leadNew} element={<LeadCreatePage />} />
          <Route path="/leads/:leadId" element={<LeadDetailPage />} />

          <Route path={appRoutes.customers} element={<CustomersPage />} />
          <Route path={appRoutes.customerNew} element={<CustomerCreatePage />} />
          <Route path="/customers/:customerId" element={<CustomerDetailPage />} />

          <Route path={appRoutes.pipeline} element={<PipelinePage />} />
          <Route path={appRoutes.opportunityNew} element={<OpportunityCreatePage />} />
          <Route path="/opportunities/:opportunityId" element={<OpportunityDetailPage />} />

          <Route path={appRoutes.tasks} element={<TasksPage />} />
          <Route path={appRoutes.taskNew} element={<TaskCreatePage />} />
          <Route path="/tasks/:taskId" element={<TaskDetailPage />} />

          <Route path={appRoutes.payments} element={<PaymentsPage />} />
          <Route path={appRoutes.paymentNew} element={<PaymentCreatePage />} />
          <Route path="/payments/:paymentId" element={<PaymentDetailPage />} />

          <Route path={appRoutes.activity} element={<ActivityPage />} />

          <Route path={appRoutes.settings} element={<SettingsPage />} />
          <Route path={appRoutes.settingsProfile} element={<SettingsPage />} />
          <Route path={appRoutes.settingsPermissions} element={<SettingsPage />} />
          <Route path={appRoutes.settingsTeams} element={<SettingsPage />} />
          <Route path={appRoutes.settingsTags} element={<SettingsPage />} />

          <Route path={appRoutes.importPreview} element={<ImportPreviewPage />} />
          <Route path={appRoutes.exportCenter} element={<ExportCenterPage />} />
          <Route path={appRoutes.reportCenter} element={<ReportCenterPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
