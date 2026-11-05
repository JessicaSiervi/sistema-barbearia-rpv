import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service.js';
import { ClientesController } from './clientes.controller.js';
import { EmpresasModule } from '../empresas/empresas.module.js';

@Module({
  controllers: [ClientesController],
  providers: [ClientesService],
  imports: [EmpresasModule]
})
export class ClientesModule { }
