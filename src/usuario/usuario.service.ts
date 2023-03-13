/* eslint-disable prettier/prettier */
// aqui ficara responsavel por fazer a manipulação da lista de array de usuarios simulando um banco de dados fake igual a um repositorio 

import { Injectable } from "@nestjs/common";
import { Usuario } from "./usuario.entity";

// @Injectable() está indicando para o nestjs que a classe UsuarioSerice passou a ser injetavel, volte para o arquivo usuario.controle.ts e injete o UsuarioSerice
@Injectable()
export class UsuarioSerice {
  // vá para o arquivo usuario.module.ts e atribua UsuarioSerice em @Module dentro da chave providers

  private usuarios: Array<Usuario> = []; // lista de usuarios do tipo Usuario

  // metodo para criar usuario
  // usuario e do tipo Usuario e definindo o tipo de retorno do metodo sendo Usuario
  public cria(usuario: Usuario): Usuario {
    this.usuarios.push(usuario);
    return usuario;
  }

  // metodo para buscar usuario pelo nome
  // definindo o tipo de retorno do metodo sendo Usuario
  public buscaPorNomeDeUsuario(nomeDoUsuario: string): Usuario {
    return this.usuarios.find(
      usuario => usuario.nomeDoUsuario == nomeDoUsuario
    );  
  }
}
