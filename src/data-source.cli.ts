import "reflect-metadata";
import { DataSource } from "typeorm";
import { Mensaje } from "@/app/dbentities/mensaje"; // Alias correcto según tsconfig.json
import { PlanetaVuelo } from "@/app/dbentities/planetavuelo";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "mensajes_db",
  synchronize: false,
  logging: true,
  logger: "advanced-console",
  charset: "utf8mb4",
  migrations: [process.env.IS_EXPRESS === 'true' ? 'src/app/migrations/*.ts' : 'dist/app/migrations/*.js'],
  migrationsTableName: "typeorm_migrations",
  entities: [Mensaje, PlanetaVuelo],
});