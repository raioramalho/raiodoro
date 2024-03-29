import handleStart from "@/actions/handle.start";
import { isRegistered, register } from "@tauri-apps/api/globalShortcut";

export async function ShortI(setIsRunning: any) {
    await isRegistered("Control+I");
    await register("Control+I", () => {
      handleStart(setIsRunning);
    });
  }