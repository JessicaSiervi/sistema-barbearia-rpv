import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
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
  findAll(@EmpresaId() empresaId: number) {
    return this.clientesService.findAll(empresaId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @EmpresaId() empresaId: number) {
    return this.clientesService.findOne({ id, empresaId })
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @EmpresaId() empresaId: number,
    @Body() dto: UpdateClienteDto
  ) {
    return this.clientesService.update({ id, empresaId, clienteData: dto })
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @EmpresaId() empresaId: number,
  ) {
    return this.clientesService.remove({ id, empresaId })
  }
}
