#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Window;

#[tauri::command]
fn console_log(log: &str) {
    println!("fn:console_log: {:?}", log);
}

#[tauri::command]
fn exit_app(window: Window) -> String {
    println!("fn:exit_app");
    window.close().expect("Failed to close the window");
    "Obrigado por usar nosso app!".to_string()
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_notification::init())
        .invoke_handler(tauri::generate_handler![console_log, exit_app])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
