import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import e, { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx    = host.switchToHttp();
    const res    = ctx.getResponse<Response>();
    const error  = exception as any;

    // status y mensaje default
    let status  = HttpStatus.BAD_REQUEST;
    let message = 'Error en la base de datos';
    

    // Envía la respuesta
    res.status(status).json({
        statusCode: status,
        message,
        error: HttpStatus[status].toString(),
        });
    }
}