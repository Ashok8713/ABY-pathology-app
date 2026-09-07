import { useEffect, useRef } from 'react'
import QRCode from 'qrcode.react'
import { useLabStore } from '../store/labStore'
import './ReportGenerator.css'

interface ReportGeneratorProps {
  patientData: { name: string; age: string; phone: string }
  testResults: Record<string, string>
  onClose: () => void
}

function ReportGenerator({ patientData, testResults, onClose }: ReportGeneratorProps) {
  const { settings } = useLabStore()
  const reportRef = useRef<HTMLDivElement>(null)
  const reportNumber = `REP-${Date.now()}`
  const reportDate = new Date().toLocaleDateString('en-IN')

  const handlePrint = () => {
    if (reportRef.current) {
      const printWindow = window.open('', '', 'height=800,width=1000')
      if (printWindow) {
        printWindow.document.write(reportRef.current.innerHTML)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  const handleDownloadPDF = () => {
    // PDF download functionality
    alert('PDF download functionality to be implemented with html2pdf')
  }

  return (
    <div className="report-modal">
      <div className="report-header">
        <h2>📄 Test Report</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="report-actions">
        <button className="action-btn" onClick={handlePrint}>🖨️ Print</button>
        <button className="action-btn" onClick={handleDownloadPDF}>⬇️ Download PDF</button>
      </div>

      <div className="report-container" ref={reportRef}>
        {/* Watermark */}
        <div className="watermark">ABY</div>

        {/* Header */}
        <div className="report-header-content">
          <div className="lab-info">
            <h1>{settings.name}</h1>
            <p className="tagline">{settings.tagline}</p>
            <p className="address">
              {settings.addressLine1}<br />
              {settings.addressLine2}
            </p>
            <p className="contact">
              📞 {settings.phone1} | ✉️ {settings.email}
            </p>
            <p className="reg-no">Reg. No: {settings.registrationNumber}</p>
          </div>
          <div className="qr-section">
            <QRCode value={reportNumber} size={80} />
            <p className="qr-label">{reportNumber}</p>
          </div>
        </div>

        <div className="report-divider" />

        {/* Patient Info */}
        <div className="patient-section">
          <h3>Patient Information</h3>
          <div className="patient-grid">
            <div><strong>Name:</strong> {patientData.name}</div>
            <div><strong>Age:</strong> {patientData.age} years</div>
            <div><strong>Phone:</strong> {patientData.phone}</div>
            <div><strong>Report Date:</strong> {reportDate}</div>
          </div>
        </div>

        {/* Test Results */}
        <div className="results-section">
          <h3>Test Results</h3>
          <table className="results-table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Value</th>
                <th>Unit</th>
                <th>Reference Range</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(testResults).map(([test, value]) => (
                <tr key={test}>
                  <td>{test}</td>
                  <td className="value-cell">{value || '-'}</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Signature Section */}
        <div className="signature-section">
          <div className="sig-line">
            <p>___________________</p>
            <p>Authorized Pathologist</p>
          </div>
          <div className="date-line">
            <p>Date: {reportDate}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="report-footer">
          <p>This report is valid only when accompanied by original prescription</p>
          <p>For queries, contact: {settings.email} | {settings.phone1}</p>
        </div>
      </div>
    </div>
  )
}

export default ReportGenerator
