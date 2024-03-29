import { Backend_log } from "@/cases/backend_log";
import { ask } from "@tauri-apps/api/dialog";

export default async function handleStop(setIsRunning: any, setTimer: any) {
  await ask("Deseja zerar o timer?", "Raio⚡️Doro")
    .then((res: boolean) => {
      if (res) {
        Backend_log("User selected stop timer.");
        setIsRunning(false);
        setTimer("00:00");
      }
      Backend_log("User selected don't stop timer.");
    })
    .catch((err) => {
      Backend_log(`${JSON.stringify(err)}`);
    });
}
