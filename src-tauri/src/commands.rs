use std::fs;
use std::path::Path;
use chrono::Local;

#[tauri::command]
pub fn validate_path(path: String) -> Result<bool, String> {
    let path_obj = Path::new(&path);
    
    if !path_obj.exists() {
        return Err(format!("Path does not exist: {}", path));
    }
    
    if !path_obj.is_dir() {
        return Err(format!("Path is not a directory: {}", path));
    }
    
    Ok(true)
}

#[tauri::command]
pub fn backup_database(source_path: String, backup_name: String) -> Result<String, String> {
    let source = Path::new(&source_path);
    let backup_path = source.join(&backup_name);
    
    match fs::copy(&source.join("pathology.db"), &backup_path) {
        Ok(_) => {
            let timestamp = Local::now().format("%Y-%m-%d %H:%M:%S").to_string();
            Ok(format!("Backup created at: {} [{}]", backup_path.display(), timestamp))
        }
        Err(e) => Err(format!("Backup failed: {}", e))
    }
}

#[tauri::command]
pub fn export_database(file_path: String) -> Result<String, String> {
    // Export logic here
    Ok(format!("Database exported to: {}", file_path))
}

#[tauri::command]
pub fn import_database(file_path: String) -> Result<String, String> {
    // Import logic here
    Ok(format!("Database imported from: {}", file_path))
}
