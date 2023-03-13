/* eslint-disable prettier/prettier */
// fazendo o lançamento de erro 500 da aplicação indicando aonde foi o erro e quando

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost, AbstractHttpAdapter } from "@nestjs/core";

@Catch()
export class FiltroDeEcecaoHttp implements ExceptionFilter {
    private httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        this.httpAdapter = adapterHost.httpAdapter;
    }
    catch(exception: Error, host: ArgumentsHost) {
        const contexto = host.switchToHttp();
        const requisicao = contexto.getRequest();
        const response = contexto.getResponse();

        const {status, body} = exception instanceof HttpException 
        ? {
            status: exception.getStatus(),
            body: exception.getResponse()
        }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                timestamp: new Date().toISOString(),
                message: exception.message,
                path: requisicao.path
            }
        };

        this.httpAdapter.reply(response, body, status)
    }
    // vá para o arquivo app.module.ts em providers e declare o nosso filtro de erro
}