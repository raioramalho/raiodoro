import handleStop from "@/actions/handle.stop";
import { isRegistered, register } from "@tauri-apps/api/globalShortcut";

export default async function ShortK(setIsRunning: any, setTimer: any) {
    await isRegistered("Control+K");
    await register("Control+K", () => {
        handleStop(setIsRunning, setTimer);
    });
  }