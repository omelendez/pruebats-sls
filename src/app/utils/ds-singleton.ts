import { AppDataSource } from "@/data-source.cli";

export async function getDataSource() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}
export async function closeDataSource() {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
}