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
    tauri::Builder
        ::default()
        .invoke_handler(tauri::generate_handler![console_log, exit_app])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
