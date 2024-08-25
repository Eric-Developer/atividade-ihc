import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";

interface IVeiculos{
    id:number;
    marca:string;
    modelo:string;
    ano:number;
    consumo:string;
    preco:string;
}

@Entity('Veiculos')
export class Veiculos implements IVeiculos{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    marca: string;
    @Column()
    modelo: string;
    @Column()
    ano: number;
    @Column()
    consumo: string;
    @Column()
    preco: string;
}