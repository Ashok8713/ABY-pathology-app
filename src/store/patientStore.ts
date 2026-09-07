import { create } from 'zustand'

interface Patient {
  id: string
  name: string
  age: number
  gender: 'M' | 'F' | 'O'
  phone: string
  email: string
  address: string
  registrationDate: string
  referredBy?: string
}

interface PatientState {
  patients: Patient[]
  addPatient: (patient: Omit<Patient, 'id' | 'registrationDate'>) => void
  getPatient: (id: string) => Patient | undefined
  getAllPatients: () => Patient[]
  updatePatient: (id: string, updates: Partial<Patient>) => void
  deletePatient: (id: string) => void
}

export const usePatientStore = create<PatientState>((set, get) => ({
  patients: [],
  
  addPatient: (patient) => {
    const newPatient: Patient = {
      ...patient,
      id: `PAT-${Date.now()}`,
      registrationDate: new Date().toISOString(),
    }
    set((state) => ({
      patients: [...state.patients, newPatient],
    }))
  },
  
  getPatient: (id: string) => {
    return get().patients.find((p) => p.id === id)
  },
  
  getAllPatients: () => {
    return get().patients
  },
  
  updatePatient: (id: string, updates: Partial<Patient>) => {
    set((state) => ({
      patients: state.patients.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    }))
  },
  
  deletePatient: (id: string) => {
    set((state) => ({
      patients: state.patients.filter((p) => p.id !== id),
    }))
  },
}))
