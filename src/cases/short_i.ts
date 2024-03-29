import handleStart from "@/actions/handle.start";
import { isRegistered, register } from "@tauri-apps/api/globalShortcut";

export async function ShortI(setIsRunning: any) {
    await isRegistered("Shift+I");
    await register("Shift+I", () => {
      handleStart(setIsRunning);
    });
  }