#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

mod commands;

use tauri::Manager;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      commands::validate_path,
      commands::backup_database,
      commands::export_database,
      commands::import_database,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
