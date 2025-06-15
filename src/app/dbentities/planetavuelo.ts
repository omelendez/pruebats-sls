import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
  name: "planeta_vuelo" // Nombre de la tabla en la base de datos
})
export class PlanetaVuelo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 200 })
  name!: string;

  @Column({ type: "varchar", length: 200 })
  terrain!: string;

  @Column({ type: "varchar", length: 200 })
  climate!: string;

  @Column({ type: "varchar", length: 200 })
  population!: string;

  @Column({ type: "varchar", length: 200 })
  surface_water!: string;

  @Column({ type: "varchar", length: 200 })
  rotation_period!: string;

  @Column({ type: "varchar", length: 200 })
  orbital_period!: string;
  
  @Column({ type: "varchar", length: 200 })
  diameter!: string;

  @Column({ type: "varchar", length: 200 })
  gravity!: string;

  @Column("simple-json") // Guarda como JSON
  vuelos!: any[]; // O define un tipo para Flight[]
}