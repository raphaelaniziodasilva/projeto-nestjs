/* eslint-disable prettier/prettier */
// vamos criar a entidade do usuario aonde vai ter todos os seus elementos e também vamos fazer as validações 

import { Expose, Exclude } from "class-transformer";
import { IsNotEmpty, IsString, IsEmail,  } from "class-validator";
import { IsnomeDoUsuarioUnico } from "./nome-de-usuario-unico.validator";

// instalar bliblioteca --> npm install class-validator class-transformer
export class Usuario {
  id: number;

  // transformação @Expose vai transformar as informações enviadas pelo postman em inglês atraves dos interceptadores e @Exclude que vai excluir a informação que agente quiser
  @Expose({
    name: 'username' // tem que ser igual no do postaman
  })
  @IsnomeDoUsuarioUnico({message: 'nomeDoUsuario precisa ser unico'})
  @IsNotEmpty({message: 'nomeDeUsuario é obrigatório.'})
  @IsString({message: 'nomeDeUsuario precisa ser uma string.'})
  nomeDoUsuario: string;
  
  @IsEmail({}, {message: 'email precisa ser um endereço de email válido.'})
  email: string;

  @Expose({
    name: 'passord' // tem que ser igual no do postaman
  })
  // não e interessante mostrar todas as informações para o usuario, assim que o usuario for cadastrado ele vai receber todas as informações menos a senha
  @Exclude({
    toPlainOnly: true

    // vá para o arquivo app.module.ts e dentro dos providers e utilize os interceptadores
  })
  @IsNotEmpty({message: 'senha é obrigatório.'})
  senha: string;

  @Expose({
    name: 'fullName' // tem que ser igual no do postaman
  })
  @IsNotEmpty({message: 'nomeCompleto é obrigatório.'})
  nomeCompleto: string;

  dataDeEntrada: Date;

  // pipes são classes que serão executadas para a validação de dados ou transformção de dados  antes desses dados cheguem ao controlador

  // com as validações feitas vamos executar os pipes va para o arquivo main.ts
}

// volte para o arquivo usuario.controller.ts e no metodo cria faça a atribuição do tipo do usuario para usuario: Usuario

// va para o arquivo usuario.service.ts é no metodo cria faça a atribuição do usuario recebido como parametro do tipo do usuario para usuario: Usuario