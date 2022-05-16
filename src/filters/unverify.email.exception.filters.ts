import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { UnVerifyEmaailException } from '../exceptions/unverify.email.exception';

@Catch(UnVerifyEmaailException)
export class UnVerifyEmailFilter implements ExceptionFilter {
  catch(exception: UnVerifyEmaailException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response.redirect(`${process.env.VERIFY_EMAIL}`);
  }
}
