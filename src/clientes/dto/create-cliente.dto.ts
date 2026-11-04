import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateClienteDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @Matches(/^\d{10,11}$/, {
        message: 'Telefone deve ter DDD + Número, só dígitos (10 ou 11)'
    })
    telefone: string;
}
