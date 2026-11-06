import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { EmpresasService } from '../empresas/empresas.service.js';

@Injectable()
export class ClientesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly empresas: EmpresasService
  ) { }

  async create(empresaId: number, dto: CreateClienteDto) {
    await this.empresas.validarEmpresaAtiva(empresaId);
    await this.validaTelefoneDisponivel(empresaId, dto.telefone);

    return this.prisma.cliente.create({
      data: { ...dto, empresaId }
    })

  }

  async findAll(empresaId: number) {
    await this.empresas.validarEmpresaAtiva(empresaId);

    return this.prisma.cliente.findMany({
      where: { empresaId }
    });
  }

  async findOne(data: { id: number, empresaId: number }) {
    const { id, empresaId } = data

    await this.empresas.validarEmpresaAtiva(empresaId);

    const cliente = await this.validaCliente(empresaId, id)

    return cliente
  }

  async update(data: { id: number, clienteData: UpdateClienteDto, empresaId: number }) {
    const { clienteData, empresaId, id } = data
    await this.empresas.validarEmpresaAtiva(empresaId);

    await this.validaCliente(empresaId, id)

    return this.prisma.cliente.update({
      data: clienteData,
      where: {
        id,
        empresaId
      }
    })


  }

  async remove(data: { id: number, empresaId: number }) {
    const { id, empresaId } = data

    await this.empresas.validarEmpresaAtiva(empresaId);
    await this.validaCliente(empresaId, id)

    return this.prisma.cliente.delete({
      where: {
        empresaId,
        id
      }
    })

  }

  private async validaCliente(
    empresaId: number,
    id: number
  ) {
    const cliente = await this.prisma.cliente.findFirst({
      where: {
        id,
        empresaId
      }
    })

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado')
    }

    return cliente
  }

  private async validaTelefoneDisponivel(
    empresaId: number,
    telefone: string,
    ignorarId?: number
  ) {
    const existe = await this.prisma.cliente.findUnique({
      where: { empresaId_telefone: { empresaId, telefone } }
    })

    if (existe && existe.id !== ignorarId) {
      throw new ConflictException('Telefone já cadastrado nesta empresa')
    }
  }
}
