import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter
    implements ExceptionFilter<PrismaClientKnownRequestError>
{
    catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        switch (exception.code) {
            case 'P2002':
                // Unique constraint failed
                status = HttpStatus.CONFLICT;
                message = `Unique constraint failed on field(s): ${exception.meta?.target}`;
                break;

            case 'P2003':
                // Foreign key constraint failed
                status = HttpStatus.BAD_REQUEST;
                message = `Foreign key constraint failed on field(s): ${exception.meta?.field_name}`;
                break;

            case 'P2025':
                // Record not found
                status = HttpStatus.NOT_FOUND;
                message = `Record not found: ${exception.meta?.cause || 'The requested resource does not exist.'}`;
                break;

            case 'P2000':
                // Value too long for column
                status = HttpStatus.BAD_REQUEST;
                message = `Value too long for column: ${exception.meta?.column_name}`;
                break;

            case 'P2001':
                // Record does not exist
                status = HttpStatus.NOT_FOUND;
                message = `Record does not exist: ${exception.meta?.modelName || ''}`;
                break;

            default:
                message = exception.message;
                break;
        }

        response.status(status).json({
            statusCode: status,
            message,
            error: 'PrismaClientKnownRequestError',
        });
    }
}
