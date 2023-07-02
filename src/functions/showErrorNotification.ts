import { showNotification } from "@mantine/notifications";

export const showErrorNotification = (e: Error) =>
  showNotification({ color: "red", message: e.toString() });
