import handlePause from "@/actions/handle.pause";
import { isRegistered, register } from "@tauri-apps/api/globalShortcut";

export async function ShortP(setIsRunning: any, setTimer:any, timer: string) {
    await isRegistered("CommandOrControl+P");
    await register("CommandOrControl+P", () => {
      handlePause(setIsRunning, setTimer, timer);
    });
  }