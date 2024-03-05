
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    println!("fn:greet: {}", name);
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn say_the_date() -> String {
    let var_teste = "Func para retornar a data";
    println!("fn:say_the_date: {}",var_teste);
    format!("{}", var_teste)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, say_the_date])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
