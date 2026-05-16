import type { CSSProperties } from 'react'

interface IconProps {
  name:
    | 'dashboard'
    | 'leads'
    | 'customers'
    | 'tasks'
    | 'pipeline'
    | 'payments'
    | 'activity'
    | 'settings'
    | 'logout'
    | 'search'
    | 'bell'
    | 'help'
    | 'user'
    | 'plus'
    | 'calendar'
    | 'money'
    | 'check'
    | 'warning'
    | 'download'
    | 'upload'
    | 'edit'
    | 'filter'
    | 'board'
    | 'list'
    | 'phone'
    | 'mail'
    | 'note'
    | 'team'
    | 'close'
  size?: number
  style?: CSSProperties
}

const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function Icon({ name, size = 20, style }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={style}
    >
      {renderPath(name)}
    </svg>
  )
}

function renderPath(name: IconProps['name']) {
  switch (name) {
    case 'dashboard':
      return <path {...common} d="M4 4h7v7H4zM13 4h7v11h-7zM4 13h7v7H4zM13 17h7v3h-7z" />
    case 'leads':
      return (
        <>
          <path {...common} d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
          <path {...common} d="M2 20a6 6 0 0 1 12 0" />
          <path {...common} d="M16 7h6M19 4v6" />
        </>
      )
    case 'customers':
      return (
        <>
          <path {...common} d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
          <path {...common} d="M2 21a7 7 0 0 1 14 0" />
          <path {...common} d="M17 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path {...common} d="M17 14c2.6 0 4.7 1.6 5 4" />
        </>
      )
    case 'tasks':
      return (
        <>
          <rect {...common} x="4" y="3.5" width="16" height="18" rx="2.5" />
          <path {...common} d="M9 3.5v4M15 3.5v4M8 12l2.2 2.2L16 8.5" />
        </>
      )
    case 'pipeline':
      return (
        <>
          <rect {...common} x="3" y="4" width="5" height="16" rx="1.5" />
          <rect {...common} x="10" y="8" width="5" height="12" rx="1.5" />
          <rect {...common} x="17" y="12" width="4" height="8" rx="1.5" />
        </>
      )
    case 'payments':
      return (
        <>
          <rect {...common} x="3" y="6" width="18" height="12" rx="2.5" />
          <path {...common} d="M7 12h10M8 9h.01M8 15h.01" />
        </>
      )
    case 'activity':
      return (
        <>
          <path {...common} d="M12 6v6l4 2" />
          <path {...common} d="M4 12a8 8 0 1 0 2.3-5.7" />
          <path {...common} d="M4 4v4h4" />
        </>
      )
    case 'settings':
      return (
        <>
          <path
            {...common}
            d="m12 3 1.7 2.1 2.7.4.5 2.7 2.1 1.7-1 2.5 1 2.5-2.1 1.7-.5 2.7-2.7.4L12 21l-1.7-2.1-2.7-.4-.5-2.7L5 14.1l1-2.5-1-2.5 2.1-1.7.5-2.7 2.7-.4L12 3Z"
          />
          <circle {...common} cx="12" cy="12" r="3.2" />
        </>
      )
    case 'logout':
      return (
        <>
          <path {...common} d="M10 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" />
          <path {...common} d="M21 12H9M17 8l4 4-4 4" />
        </>
      )
    case 'search':
      return (
        <>
          <circle {...common} cx="11" cy="11" r="7" />
          <path {...common} d="m20 20-3.5-3.5" />
        </>
      )
    case 'bell':
      return (
        <>
          <path {...common} d="M6 8a6 6 0 1 1 12 0v5l2 3H4l2-3Z" />
          <path {...common} d="M10 19a2 2 0 0 0 4 0" />
        </>
      )
    case 'help':
      return (
        <>
          <circle {...common} cx="12" cy="12" r="9" />
          <path {...common} d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-.9.8-1.7 1.3-1.7 2.7" />
          <path {...common} d="M12 17h.01" />
        </>
      )
    case 'user':
      return (
        <>
          <circle {...common} cx="12" cy="8" r="4" />
          <path {...common} d="M4 20a8 8 0 0 1 16 0" />
        </>
      )
    case 'plus':
      return <path {...common} d="M12 5v14M5 12h14" />
    case 'calendar':
      return (
        <>
          <rect {...common} x="3" y="5" width="18" height="16" rx="2.5" />
          <path {...common} d="M8 3v4M16 3v4M3 10h18" />
        </>
      )
    case 'money':
      return (
        <>
          <circle {...common} cx="12" cy="12" r="8" />
          <path {...common} d="M12 7v10M15 9.5c0-1.1-1.3-2-3-2s-3 .9-3 2 1 1.6 3 2 3 .9 3 2-1.3 2-3 2-3-.9-3-2" />
        </>
      )
    case 'check':
      return <path {...common} d="M5 12.5 9.5 17 19 7.5" />
    case 'warning':
      return (
        <>
          <path {...common} d="M12 3 2.8 19h18.4L12 3Z" />
          <path {...common} d="M12 9v4M12 17h.01" />
        </>
      )
    case 'download':
      return <path {...common} d="M12 4v10M8 10l4 4 4-4M4 20h16" />
    case 'upload':
      return <path {...common} d="M12 20V10M8 14l4-4 4 4M4 4h16" />
    case 'edit':
      return (
        <>
          <path {...common} d="m4 20 4.5-1 9.3-9.3a2.1 2.1 0 0 0-3-3L5.5 16 4 20Z" />
          <path {...common} d="m13.5 6.5 4 4" />
        </>
      )
    case 'filter':
      return <path {...common} d="M4 6h16M7 12h10M10 18h4" />
    case 'board':
      return <path {...common} d="M4 5h6v6H4zM14 5h6v4h-6zM14 11h6v8h-6zM4 13h6v6H4z" />
    case 'list':
      return (
        <>
          <path {...common} d="M8 6h12M8 12h12M8 18h12" />
          <circle {...common} cx="4.5" cy="6" r=".5" />
          <circle {...common} cx="4.5" cy="12" r=".5" />
          <circle {...common} cx="4.5" cy="18" r=".5" />
        </>
      )
    case 'phone':
      return <path {...common} d="M7 4h3l2 5-2 1.5a14 14 0 0 0 3.5 3.5L15 12l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 5 6a2 2 0 0 1 2-2Z" />
    case 'mail':
      return (
        <>
          <rect {...common} x="3" y="5" width="18" height="14" rx="2.5" />
          <path {...common} d="m4 7 8 6 8-6" />
        </>
      )
    case 'note':
      return (
        <>
          <path {...common} d="M6 3h9l3 3v15H6z" />
          <path {...common} d="M15 3v4h4M9 12h6M9 16h4" />
        </>
      )
    case 'team':
      return (
        <>
          <circle {...common} cx="8" cy="8.5" r="3" />
          <circle {...common} cx="16.5" cy="9.5" r="2.5" />
          <path {...common} d="M3 20a5.5 5.5 0 0 1 11 0M14 20a4 4 0 0 1 7 0" />
        </>
      )
    case 'close':
      return <path {...common} d="m6 6 12 12M18 6 6 18" />
    default:
      return null
  }
}
