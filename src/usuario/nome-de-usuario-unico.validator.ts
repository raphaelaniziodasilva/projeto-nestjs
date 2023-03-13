/* eslint-disable prettier/prettier */
// aqui vamos fazer a validação do nomeDoUsuario unico, como se fosse um email

import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UsuarioSerice } from './usuario.service';

// vamos criar o IsnomeDoUsuarioUnicoConstraint e transformar em um provider
@Injectable()
// vá para o arquivo usuario.module.ts e adicione dentro do providers o objeto IsnomeDoUsuarioUnicoConstraint
// vá para o arquivo main.ts e defina o container de injeção de dependencia para o class-validator
@ValidatorConstraint()
export class IsnomeDoUsuarioUnicoConstraint implements ValidatorConstraintInterface {

    // fazendo a injeção de dependecia e injetando o usuarioService para pesquisar o nomeDoUsuario e verificar se existe 
    constructor(private usuarioService: UsuarioSerice) {}
    // para fazer a injeção de dependencia precisamos transformar IsnomeDoUsuarioUnicoConstraint em um provider usando o @Injectable()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validate(nomeDoUsuario: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        // pesquisando se o nomeDoUsuario ja existe
        const nomeDoUsuarioExiste = this.usuarioService.buscaPorNomeDeUsuario(nomeDoUsuario);
        // retornando falso vai acontece o erro de validação, e o erro vai ser disparado
        return !nomeDoUsuarioExiste
    }
}

// vamos criar um decorator IsnomeDoUsuarioUnico, o dacorator ja vem pre montado do class-validator: https://github.com/typestack/class-validator#custom-validation-decorators
export function IsnomeDoUsuarioUnico(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsnomeDoUsuarioUnicoConstraint, // usando o nome da classe que criamos la em cima
    });
  };
  /* vá para o arquivo usuario.entity.ts e faça a validação no elemento nomeDoUsuario
  @IsnomeDoUsuarioUnico({menssagem})
  nomeDoUsuario
  */
}
