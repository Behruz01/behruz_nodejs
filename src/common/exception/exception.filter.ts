import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { ConfigService } from 'src/config/config.service';
import { CustomError } from '../errors/custom-error';
import { Language } from '../interfaces/multi-language.interface';

@Catch(Error)
export class ExceptionFilter extends BaseExceptionFilter {
  constructor(
    protected readonly configService: ConfigService,
    protected readonly httpAdapterHost: HttpAdapterHost,
  ) {
    super(httpAdapterHost.httpAdapter);
  }

  public override async catch(
    exception: Error,
    host: ArgumentsHost,
  ): Promise<void> {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const headers = request.headers;
    const language: Language = this.getLanguage(headers['x-accept-language']);

    if (exception instanceof CustomError) {
      const responseBody = {
        error_code: exception.code,
        message: exception.getMessage[language],
        data: exception.data,
        created_at: exception.createdAtISOString,
      };

      response.status(exception.statusCode).json(responseBody);
      return;
    }

    // Default error handling
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(request),
      message: exception.message || 'Internal server error',
    };

    httpAdapter.reply(response, responseBody, status);
  }

  private getLanguage(language: string): Language {
    const defaultLanguage: string = this.configService.defaultLanguage;

    return Object.values(Language).includes(language as Language)
      ? (language as Language)
      : (defaultLanguage as Language);
  }
}
