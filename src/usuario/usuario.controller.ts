/* eslint-disable prettier/prettier */
import { Body, Controller, HttpStatus, NotFoundException, Post } from "@nestjs/common";
import { Get, Param } from "@nestjs/common/decorators";
import { Usuario } from "./usuario.entity";
import { UsuarioSerice } from "./usuario.service";

@Controller('/users')
export class UsuarioController {
    // crie um arquivo usuario.module.ts e atribua UsuarioController em @Module dentro da chave controllers

    // vamos injetar a injeção de dependencia, para isso vá para o arquivo usuario.service.ts e faça a injeção de dependencia do UsuarioSerice
    constructor(private usuarioService: UsuarioSerice) {}

    @Get('/:nomeDoUsuario')
    public buscaPorNomeDeUsuario(@Param('nomeDoUsuario') nomeDoUsuario: string) {
        // vá para o arquivo usuario.service.ts e crie o metodo criar buscaPorNomeDeUsuario
        const usuarioEncontrado = this.usuarioService.buscaPorNomeDeUsuario(nomeDoUsuario)
        if(!usuarioEncontrado) {
            throw new NotFoundException( {
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Uusário não encontrado'
            })
        }
        return usuarioEncontrado
    }

    @Post()
    // crie um arquivo usuario.entity.ts e tipe o usuario dizendo que e do tipo Usuario 
    // definindo o tipo de retorno do metodo cria sendo Usuario
    public cria(@Body() usuario: Usuario): Usuario {
        // vá para o arquivo usuario.service.ts e crie o metodo criar usuario
       const usuarioCriado = this.usuarioService.cria(usuario);
       return usuarioCriado;
    }

}