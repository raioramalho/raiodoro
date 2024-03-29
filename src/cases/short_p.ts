import handlePause from "@/actions/handle.pause";
import { isRegistered, register } from "@tauri-apps/api/globalShortcut";

export async function ShortP(setIsRunning: any, setTimer:any, timer: string) {
    let current: string = timer;
    await isRegistered("Shift+P");
    await register("Shift+P", () => {
      handlePause(setIsRunning, setTimer, current);
    });
  }