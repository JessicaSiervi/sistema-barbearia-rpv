import { Module } from '@nestjs/common';
import { ProfissionaisService } from './profissionais.service.js';
import { ProfissionaisController } from './profissionais.controller.js';

@Module({
  controllers: [ProfissionaisController],
  providers: [ProfissionaisService],
  imports: [EmpresaModule]
})
export class ProfissionaisModule {}
