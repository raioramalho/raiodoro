import { core } from "@tauri-apps/api";

export async function Backend_log(log:any) {
    await tauri.invoke("console_log", { log: `${log}`});
}