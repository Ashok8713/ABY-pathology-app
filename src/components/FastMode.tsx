import { useState } from 'react'
import { usePatientStore } from '../store/patientStore'
import ReportGenerator from './ReportGenerator'
import './FastMode.css'

interface FastModeStep {
  id: string
  name: string
  icon: string
  status: 'pending' | 'active' | 'completed'
}

function FastMode() {
  const [steps, setSteps] = useState<FastModeStep[]>([
    { id: '1', name: 'Patient Feed', icon: '👤', status: 'active' },
    { id: '2', name: 'Sample Selection', icon: '🧪', status: 'pending' },
    { id: '3', name: 'Test Panel', icon: '📋', status: 'pending' },
    { id: '4', name: 'Value Entry', icon: '✏️', status: 'pending' },
    { id: '5', name: 'Report Generate', icon: '📄', status: 'pending' },
    { id: '6', name: 'Bill Generate', icon: '💰', status: 'pending' },
  ])

  const [currentStep, setCurrentStep] = useState(0)
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    phone: '',
  })
  const [testResults, setTestResults] = useState<Record<string, string>>({})
  const [showReport, setShowReport] = useState(false)

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      const newSteps = [...steps]
      newSteps[currentStep].status = 'completed'
      newSteps[currentStep + 1].status = 'active'
      setSteps(newSteps)
      setCurrentStep(currentStep + 1)
    }
  }

  const handleCompleteAll = () => {
    setShowReport(true)
  }

  return (
    <div className="fast-mode-container">
      <div className="fast-mode-header">
        <h2>⚡ FAST MODE - ONE-STEP WORKFLOW</h2>
        <p>Patient Feed → Sample → Test → Report → Bill</p>
      </div>

      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      <div className="steps-container">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`step-box ${step.status}`}
            onClick={() => index <= currentStep && setCurrentStep(index)}
          >
            <div className="step-icon">{step.icon}</div>
            <div className="step-name">{step.name}</div>
            {step.status === 'completed' && <div className="checkmark">✓</div>}
          </div>
        ))}
      </div>

      <div className="step-content">
        {currentStep === 0 && (
          <div className="form-section">
            <h3>👤 Patient Information</h3>
            <div className="form-group">
              <label>Patient Name</label>
              <input
                type="text"
                value={patientData.name}
                onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                placeholder="Enter patient name"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  value={patientData.age}
                  onChange={(e) => setPatientData({ ...patientData, age: e.target.value })}
                  placeholder="Years"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={patientData.phone}
                  onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                  placeholder="+91..."
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="form-section">
            <h3>🧪 Sample Selection</h3>
            <div className="sample-grid">
              {['Blood', 'Urine', 'Stool', 'Sputum'].map((sample) => (
                <button key={sample} className="sample-btn">
                  {sample}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="form-section">
            <h3>📋 Test Panel Selection</h3>
            <div className="test-grid">
              {[
                'CBC',
                'Thyroid Profile',
                'Liver Function',
                'Kidney Function',
                'Lipid Profile',
                'Blood Sugar',
              ].map((test) => (
                <button key={test} className="test-btn">
                  {test}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="form-section">
            <h3>✏️ Test Values Entry</h3>
            <div className="values-grid">
              {['WBC', 'RBC', 'Hemoglobin', 'Platelets', 'TSH', 'T3'].map((test) => (
                <div key={test} className="form-group">
                  <label>{test}</label>
                  <input
                    type="number"
                    value={testResults[test] || ''}
                    onChange={(e) =>
                      setTestResults({ ...testResults, [test]: e.target.value })
                    }
                    placeholder="Value"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="form-section">
            <h3>📄 Report Preview</h3>
            <div className="report-preview">
              <p>✓ All data collected successfully</p>
              <p>✓ Ready to generate professional report</p>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="form-section">
            <h3>💰 Billing Summary</h3>
            <div className="billing-info">
              <div className="bill-row">
                <span>Tests</span>
                <span>₹500</span>
              </div>
              <div className="bill-row">
                <span>Processing</span>
                <span>₹50</span>
              </div>
              <div className="bill-total">
                <span>Total</span>
                <span>₹550</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="button-group">
        {currentStep > 0 && (
          <button className="btn btn-secondary" onClick={() => setCurrentStep(currentStep - 1)}>
            ← Back
          </button>
        )}
        {currentStep < steps.length - 1 && (
          <button className="btn btn-primary" onClick={handleNextStep}>
            Next →
          </button>
        )}
        {currentStep === steps.length - 1 && (
          <button className="btn btn-success" onClick={handleCompleteAll}>
            ✓ Complete & Generate Report
          </button>
        )}
      </div>

      {showReport && (
        <ReportGenerator
          patientData={patientData}
          testResults={testResults}
          onClose={() => setShowReport(false)}
        />
      )}
    </div>
  )
}

export default FastMode
