import handlePause from "@/actions/handle.pause";
import { isRegistered, register } from "@tauri-apps/api/globalShortcut";

export async function ShortP(setIsRunning: any, setTimer:any, timer: string) {
    await isRegistered("Control+P");
    await register("Control+P", () => {
      handlePause(setIsRunning, setTimer, timer);
    });
  }