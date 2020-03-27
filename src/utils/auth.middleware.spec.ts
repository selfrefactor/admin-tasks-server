import {AuthMiddleware} from './auth.middleware'

describe('AuthMiddleware', () => {
  it('protect only POST request', () => {
    const middleware = new AuthMiddleware()
    const req: any = {
      method: 'GET',
    }
    const res: any = jest.fn()
    const next = jest.fn()
    middleware.use(req, res, next)
    expect(next).toHaveBeenCalled()
  })

  it('POST without correct body', () => {
    const middleware = new AuthMiddleware()
    const req: any = {
      method: 'POST',
      body: {},
    }
    const res: any = jest.fn()
    const next = jest.fn()
    expect(() => middleware.use(req, res, next)).toThrow('Forbidden')
  })

  it('happy', () => {
    const middleware = new AuthMiddleware()
    const req: any = {
      method: 'POST',
      body: {
        password: process.env.API_ACCESS_TOKEN,
      },
    }
    const res: any = jest.fn()
    const next = jest.fn()
    middleware.use(req, res, next)
    expect(next).toHaveBeenCalled()
  })
})
