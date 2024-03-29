import handleStop from "@/actions/handle.stop";
import { isRegistered, register } from "@tauri-apps/api/globalShortcut";

export default async function ShortK(setIsRunning: any, setTimer: any) {
    await isRegistered("CommandOrControl+K");
    await register("CommandOrControl+K", () => {
        handleStop(setIsRunning, setTimer);
    });
  }