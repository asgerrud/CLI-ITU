import * as shell from "shelljs";
import { spawn } from "child_process";

// Credit: https://github.com/Kvalifik/Kvalifik-CLI/blob/development/src/utils/gh.ts
export const isInstalled = (): boolean => {
  const version = shell.exec("gh --version", { async: false, silent: true });
  if (!version.includes("gh version")) {
    console.error(
      "❌ Github CLI is not installed. Please install and try again"
    );
    console.info(
      "For instructions, see https://github.com/cli/cli#installation"
    );
    return false;
  }
  return true;
};
export const isAuthenticated = (): boolean => {
  const authStatus = shell.exec("gh auth status", {
    async: false,
    silent: true,
  });
  if (authStatus.code === 1) {
    console.info("❌ Not logged in to Github.");
    console.info(
      "Please follow the next steps to authenticate with Github, and then re-run the command to continue"
    );
    spawn("gh auth login", ["--web"], {
      stdio: "inherit",
      shell: true,
    });
    return false;
  }
  return true;
};
