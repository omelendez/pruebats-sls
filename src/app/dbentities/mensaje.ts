import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity()
export class Mensaje {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ length: 20 })
  telefono!: string;

  @Column("text")
  mensaje!: string;

  @Column({ 
    type: "timestamp", 
    default: () => "CURRENT_TIMESTAMP",
    name: "hora_mensaje"
  })
  horaMensaje!: Date;
}