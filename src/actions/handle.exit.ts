import { tauri } from "@tauri-apps/api";
import { ask } from "@tauri-apps/api/dialog";

export default async function handleExit(Backend_log: any) {
  Backend_log("Send ask for the user.");
  await ask("Deseja mesmo fechar o pomodoro?", "Raio⚡️Doro")
    .then((res) => {
      res
        ? tauri.invoke("exit_app", {})
        : Backend_log("User selected don't close.");
    })
    .catch((err) => {
      Backend_log(`${JSON.stringify(err)}`);
    });
}
