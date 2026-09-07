import { useState, useEffect } from 'react'
import { useLabStore } from '../store/labStore'
import { useDatabaseStore } from '../store/databaseStore'
import './Settings.css'

interface SettingsProps {
  onClose: () => void
}

function Settings({ onClose }: SettingsProps) {
  const { settings, updateSettings } = useLabStore()
  const { databasePath, setDatabasePath, backupDatabase } = useDatabaseStore()
  
  const [formData, setFormData] = useState(settings)
  const [dbPath, setDbPath] = useState(databasePath)
  const [activeTab, setActiveTab] = useState('general')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveLabSettings = () => {
    updateSettings(formData)
    setMessage('Lab settings saved successfully!')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleSaveDatabasePath = async () => {
    setIsLoading(true)
    try {
      await setDatabasePath(dbPath)
      setMessage('Database path updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage(`Error: ${error}`)
    }
    setIsLoading(false)
  }

  const handleBackupDatabase = async () => {
    setIsLoading(true)
    try {
      await backupDatabase()
      setMessage('Database backed up successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage(`Backup error: ${error}`)
    }
    setIsLoading(false)
  }

  const handleBrowsePath = () => {
    // This will be handled by Tauri dialog
    alert('Select folder from: D:\ or E:\ drive')
  }

  return (
    <div className="settings-container">
      <div className="settings-modal">
        <div className="settings-header">
          <h2>⚙️ Settings</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="settings-tabs">
          <button
            className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            Lab Settings
          </button>
          <button
            className={`tab-btn ${activeTab === 'database' ? 'active' : ''}`}
            onClick={() => setActiveTab('database')}
          >
            Database
          </button>
          <button
            className={`tab-btn ${activeTab === 'doctor' ? 'active' : ''}`}
            onClick={() => setActiveTab('doctor')}
          >
            Doctor Commission
          </button>
        </div>

        {message && <div className="success-message">{message}</div>}

        <div className="settings-content">
          {activeTab === 'general' && (
            <div className="tab-content">
              <h3>Lab Information</h3>
              
              <div className="form-group">
                <label>Lab Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter lab name"
                />
              </div>

              <div className="form-group">
                <label>Tagline</label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleInputChange}
                  placeholder="Enter tagline"
                />
              </div>

              <div className="form-group">
                <label>Address Line 1</label>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  placeholder="Street address"
                />
              </div>

              <div className="form-group">
                <label>Address Line 2</label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  placeholder="City, State, Zip"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone 1</label>
                  <input
                    type="tel"
                    name="phone1"
                    value={formData.phone1}
                    onChange={handleInputChange}
                    placeholder="+91..."
                  />
                </div>
                <div className="form-group">
                  <label>Phone 2</label>
                  <input
                    type="tel"
                    name="phone2"
                    value={formData.phone2}
                    onChange={handleInputChange}
                    placeholder="+91..."
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@example.com"
                />
              </div>

              <div className="form-group">
                <label>Lab Registration Number</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  placeholder="Registration number"
                />
              </div>

              <button className="save-btn" onClick={handleSaveLabSettings}>
                💾 Save Lab Settings
              </button>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="tab-content">
              <h3>Database Configuration</h3>
              
              <div className="info-box">
                <p>📁 Choose where to store your lab data (D: or E: drive recommended)</p>
              </div>

              <div className="form-group">
                <label>Database Location</label>
                <div className="path-input-group">
                  <input
                    type="text"
                    value={dbPath}
                    onChange={(e) => setDbPath(e.target.value)}
                    placeholder="e.g., D:\WeCarePathologyLab\data\\"
                  />
                  <button className="browse-btn" onClick={handleBrowsePath}>
                    📁 Browse
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Current Path</label>
                <div className="path-display">
                  {dbPath}
                </div>
              </div>

              <button 
                className="save-btn" 
                onClick={handleSaveDatabasePath}
                disabled={isLoading}
              >
                {isLoading ? '⏳ Updating...' : '💾 Save Database Path'}
              </button>

              <div style={{ marginTop: '30px' }}>
                <h4>Backup & Recovery</h4>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>
                  Regular backups protect your data. Backups are stored in the same directory.
                </p>
                <button 
                  className="backup-btn" 
                  onClick={handleBackupDatabase}
                  disabled={isLoading}
                >
                  {isLoading ? '⏳ Backing up...' : '🔄 Backup Now'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'doctor' && (
            <div className="tab-content">
              <h3>Doctor Commission Account Details</h3>
              
              <div className="form-group">
                <label>Commission Account Name</label>
                <input
                  type="text"
                  name="doctorCommissionAccount"
                  value={formData.doctorCommissionAccount}
                  onChange={handleInputChange}
                  placeholder="Account holder name"
                />
              </div>

              <div className="form-group">
                <label>Address Line 1</label>
                <input
                  type="text"
                  name="doctorCommissionAddressLine1"
                  value={formData.doctorCommissionAddressLine1}
                  onChange={handleInputChange}
                  placeholder="Street address"
                />
              </div>

              <div className="form-group">
                <label>Address Line 2</label>
                <input
                  type="text"
                  name="doctorCommissionAddressLine2"
                  value={formData.doctorCommissionAddressLine2}
                  onChange={handleInputChange}
                  placeholder="City, State, Zip"
                />
              </div>

              <button className="save-btn" onClick={handleSaveLabSettings}>
                💾 Save Commission Details
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
