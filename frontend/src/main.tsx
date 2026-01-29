import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider, App as AntApp } from 'antd'
import 'antd/dist/reset.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6C63FF', // Modern Deep Purple
          borderRadius: 8,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          colorBgContainer: '#ffffff',
        },
        components: {
          Button: {
            boxShadow: 'none',
            controlHeight: 40,
          },
          Card: {
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          },
          Input: {
            controlHeight: 40,
          },
          Select: {
            controlHeight: 40,
          }
        }
      }}
    >
      <AntApp>
        <App />
      </AntApp>
    </ConfigProvider>
  </StrictMode>,
)
