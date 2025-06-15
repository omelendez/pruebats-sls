import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearTablaPlanetaVuelo1749941588430 implements MigrationInterface {
    name = 'CrearTablaPlanetaVuelo1749941588430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`planeta_vuelo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(200) NOT NULL, \`terrain\` varchar(200) NOT NULL, \`climate\` varchar(200) NOT NULL, \`population\` varchar(200) NOT NULL, \`surface_water\` varchar(200) NOT NULL, \`rotation_period\` varchar(200) NOT NULL, \`orbital_period\` varchar(200) NOT NULL, \`diameter\` varchar(200) NOT NULL, \`gravity\` varchar(200) NOT NULL, \`vuelos\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`planeta_vuelo\``);
    }

}
