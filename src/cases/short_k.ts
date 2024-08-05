import handleStop from "@/actions/handle.stop";
import { isRegistered, register } from "@tauri-apps/plugin-global-shortcut";

export default async function ShortK(setIsRunning: any, setTimer: any) {
    await isRegistered("Shift+K");
    await register("Shift+K", () => {
        handleStop(setIsRunning, setTimer);
    });
  }