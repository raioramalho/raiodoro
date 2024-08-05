import handleStart from "@/actions/handle.start";
import { isRegistered, register } from "@tauri-apps/plugin-global-shortcut";

export async function ShortI(setIsRunning: any) {
    await isRegistered("Shift+I");
    await register("Shift+I", () => {
      handleStart(setIsRunning);
    });
  }