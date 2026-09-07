import { create } from 'zustand'
import { invoke } from '@tauri-apps/api/tauri'

interface DatabaseState {
  databasePath: string
  setDatabasePath: (path: string) => Promise<void>
  getDatabasePath: () => Promise<string>
  backupDatabase: () => Promise<void>
  exportData: (filePath: string) => Promise<void>
  importData: (filePath: string) => Promise<void>
}

export const useDatabaseStore = create<DatabaseState>((set, get) => ({
  databasePath: localStorage.getItem('dbPath') || 'C:\\ProgramData\\ABY\\data\\',
  
  setDatabasePath: async (path: string) => {
    try {
      await invoke('validate_path', { path })
      set({ databasePath: path })
      localStorage.setItem('dbPath', path)
    } catch (error) {
      console.error('Invalid database path:', error)
      throw error
    }
  },
  
  getDatabasePath: async () => {
    const path = get().databasePath
    return path
  },
  
  backupDatabase: async () => {
    try {
      const currentPath = get().databasePath
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      await invoke('backup_database', { 
        sourcePath: currentPath,
        backupName: `backup-${timestamp}.db`
      })
    } catch (error) {
      console.error('Backup failed:', error)
      throw error
    }
  },
  
  exportData: async (filePath: string) => {
    try {
      await invoke('export_database', { filePath })
    } catch (error) {
      console.error('Export failed:', error)
      throw error
    }
  },
  
  importData: async (filePath: string) => {
    try {
      await invoke('import_database', { filePath })
    } catch (error) {
      console.error('Import failed:', error)
      throw error
    }
  },
}))
