import {path} from 'rambdax'
import {
  Injectable,
  NestMiddleware,
  HttpStatus,
  HttpException,
} from '@nestjs/common'
import {Request, Response} from 'express'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    if (req.method !== 'POST') return next()
    const password = path<string>('body.password', req)
    console.log(`password`, password)
    if (
      [
        process.env.API_ACCESS_TOKEN,
        process.env.GUEST_ACCESS_TOKEN,
      ].includes(password)
    ) {
      return next()
    }

    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
  }
}
