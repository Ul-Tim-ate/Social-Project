import { HttpException, HttpStatus } from "@nestjs/common";

export class UnVerifyEmaailException extends HttpException {
  constructor() {
    super('UnVerifyEmaail', HttpStatus.FORBIDDEN);
  }
}
