/* eslint-disable prettier/prettier */
// o modulo e um centralizador de informações correlacionaveis e precisa ter o decorator @Module

import { Module } from '@nestjs/common';
import { IsnomeDoUsuarioUnicoConstraint } from './nome-de-usuario-unico.validator';
import { UsuarioController } from './usuario.controller';
import { UsuarioSerice } from './usuario.service';

@Module({
  controllers: [UsuarioController],
  providers: [
    UsuarioSerice,
    IsnomeDoUsuarioUnicoConstraint
  ]
})
export class UsuarioModule {}

// vá para o arquivo app.module.ts e atribua UsuarioModule em @Module dentro da chave imports

