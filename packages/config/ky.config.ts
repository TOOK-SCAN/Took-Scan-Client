import ky from 'ky'
import { devConsole } from '../utils/devConsole'

const createApiClient = (headers: Record<string, string>) => {
  return ky.create({
    prefixUrl: `${process.env.NEXT_PUBLIC_PREFIX_URL}/api/v1`,
    timeout: 3000,
    headers,
    hooks: {
      beforeRequest: [
        (req) => {
          devConsole.log('[Request Config]:', {
            url: req.url,
            method: req.method,
            headers: req.headers,
            body: req.body,
          })
        },
      ],
      afterResponse: [
        async (_req, _options, res) => {
          const responseData = await res
            .clone()
            .json()
            .catch(() => null)

          if (!res.ok) {
            devConsole.error('[Response Error]:', {
              status: res.status,
              statusText: res.statusText,
              body: responseData,
            })
            return {
              success: false,
              data: responseData,
              error: {
                code: res.status,
                message: res.statusText,
              },
            }
          }

          devConsole.log('[Response Data]:', responseData)
          return responseData
        },
      ],
    },
    throwHttpErrors: false,
  })
}

const httpInstance = createApiClient({ 'Content-Type': 'application/json' })

const uploadInstance = createApiClient({
  'Content-Type': 'multipart/form-data',
})

export { httpInstance, uploadInstance }
