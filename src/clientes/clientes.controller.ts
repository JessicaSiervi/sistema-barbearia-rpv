import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientesService } from './clientes.service.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';
import { EmpresaId } from '../common/empresa-id.decorator.js';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) { }

  @Post()
  create(@EmpresaId() empresaId: number, @Body() dto: CreateClienteDto) {
    return this.clientesService.create(empresaId, dto)
  }

  @Get()
  findAll() {
  }

  @Get(':id')
  findOne() {
    ;
  }

  @Patch(':id')
  update() {
  }

  @Delete(':id')
  remove() {
  }
}
