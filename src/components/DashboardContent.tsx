import { useState } from 'react'
import FastMode from './FastMode'
import './DashboardContent.css'

interface DashboardContentProps {
  activeMenu: string
}

function DashboardContent({ activeMenu }: DashboardContentProps) {
  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardOverview />
      case 'fast-mode':
        return <FastMode />
      default:
        return <div className="content-placeholder">{activeMenu}</div>
    }
  }

  return <div className="dashboard-content">{renderContent()}</div>
}

function DashboardOverview() {
  return (
    <div>
      <h2>📊 Dashboard Overview</h2>
      <div className="cards-grid">
        <div className="card">
          <div className="card-number">1</div>
          <p>Patients Open</p>
          <button>Open</button>
        </div>
        <div className="card">
          <div className="card-number">1</div>
          <p>Samples Open</p>
          <button>Open</button>
        </div>
        <div className="card">
          <div className="card-number">0</div>
          <p>Results Pending</p>
          <button>Track</button>
        </div>
        <div className="card">
          <div className="card-number">0</div>
          <p>Reports Pending</p>
          <button>Open</button>
        </div>
        <div className="card">
          <div className="card-number">0</div>
          <p>Bills Due/Pending</p>
          <button>Open</button>
        </div>
        <div className="card">
          <div className="card-number">0</div>
          <p>Doctors</p>
          <button>Open</button>
        </div>
        <div className="card">
          <div className="card-number">0</div>
          <p>Inventory Items</p>
          <button>Open</button>
        </div>
        <div className="card">
          <div className="card-number">3</div>
          <p>Pending Notifications</p>
          <button>Open</button>
        </div>
      </div>
    </div>
  )
}

export default DashboardContent
