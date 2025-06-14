import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Mensaje {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  nombre: string;

  @Column({ type: "varchar", length: 20 })
  telefono: string;

  @Column({ type: "text" })
  mensaje: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "hora_mensaje",
    index: true,
  })
  horaMensaje: Date;
}