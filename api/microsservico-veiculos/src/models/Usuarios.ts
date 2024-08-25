import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";

interface IUsuario {
    id:number;
    nome:string;
    email:string;
    senha:string;
}
@Entity('Usuario')
export class Usuario implements IUsuario{
    @PrimaryGeneratedColumn('increment')
    id:number;
    @Column()
    nome: string;
    @Column()
    email: string;
    @Column()
    senha: string;
}