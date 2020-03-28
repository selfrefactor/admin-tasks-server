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

    if (path('body.password', req) === process.env.API_ACCESS_TOKEN) {
      return next()
    }

    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
  }
}
