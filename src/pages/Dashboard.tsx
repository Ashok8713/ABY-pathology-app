import { useState } from 'react'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import DashboardContent from '../components/DashboardContent'
import FavoriteBar from '../components/FavoriteBar'
import Settings from '../components/Settings'
import './Dashboard.css'

function Dashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div className="dashboard">
      <Topbar onSettingsClick={() => setShowSettings(true)} />
      <div className="dashboard-container">
        <Sidebar activeMenu={activeMenu} onMenuSelect={setActiveMenu} />
        <main className="main-content">
          <DashboardContent activeMenu={activeMenu} />
        </main>
      </div>
      <FavoriteBar onFastModeClick={() => setActiveMenu('fast-mode')} />
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  )
}

export default Dashboard
