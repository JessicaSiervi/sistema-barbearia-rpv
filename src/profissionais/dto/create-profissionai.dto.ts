import { IsString, IsNotEmpty} from "class-validator"
export class CreateProfissionaiDto {
    @IsString()
    @IsNotEmpty()
    nome: string
}
