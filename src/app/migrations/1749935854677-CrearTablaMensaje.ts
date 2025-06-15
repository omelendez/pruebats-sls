import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearTablaMensaje1749935854677 implements MigrationInterface {
    name = 'CrearTablaMensaje1749935854677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`mensaje\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`telefono\` varchar(20) NOT NULL, \`mensaje\` text NOT NULL, \`hora_mensaje\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`mensaje\``);
    }

}
