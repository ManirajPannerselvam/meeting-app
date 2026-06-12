export async function log(
  level: string,
  module: string,
  message: string
) {
  const entry =
    `[${new Date().toISOString()}] ` +
    `[${level}] ` +
    `[${module}] ` +
    `${message}`;

  console.log(entry);

  try {
    const logs = JSON.parse(
      localStorage.getItem("__app_logs") || "[]"
    );

    logs.push(entry);

    localStorage.setItem(
      "__app_logs",
      JSON.stringify(logs)
    );
  } catch (error) {
    console.error("Logger Error:", error);
  }
}