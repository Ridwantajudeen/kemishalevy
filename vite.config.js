import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Dev middleware to handle /api routes locally
function apiDevMiddleware() {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api', async (req, res) => {
        try {
          // Import the handlers dynamically
          const { default: bookingsHandler } = await import('./api/bookings.js')
          const { default: adminBookingsHandler } = await import('./api/admin/bookings.js')
          
          // Admin endpoints
          if (req.url.includes('/admin/bookings')) {
            // Wrap response
            let statusCode = 200
            const wrappedRes = {
              statusCode,
              headers: {},
              setHeader(name, value) {
                this.headers[name] = value
                res.setHeader(name, value)
              },
              status(code) {
                this.statusCode = code
                res.statusCode = code
                return this
              },
              json(data) {
                this.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(data))
              },
              end(data) {
                res.end(data)
              },
            }

            // Parse body for methods that may send one
            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', async () => {
              try {
                req.body = body ? JSON.parse(body) : null
              } catch {
                req.body = null
              }
              await adminBookingsHandler(req, wrappedRes)
            })
            return
          }

          // Public bookings endpoint
          if (req.url.includes('/bookings') && req.method === 'POST') {
            // Wrap response to provide Express-like methods
            let statusCode = 200
            const wrappedRes = {
              statusCode,
              headers: {},
              setHeader(name, value) {
                this.headers[name] = value
                res.setHeader(name, value)
              },
              status(code) {
                this.statusCode = code
                res.statusCode = code
                return this
              },
              json(data) {
                this.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(data))
              },
              end(data) {
                res.end(data)
              },
            }

            // Parse body manually
            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', async () => {
              try {
                req.body = body ? JSON.parse(body) : null
              } catch {
                req.body = null
              }
              await bookingsHandler(req, wrappedRes)
            })
          } else {
            res.statusCode = 404
            res.end('Not found')
          }
        } catch (err) {
          console.error('[API DEV] Error:', err)
          res.statusCode = 500
          res.end(JSON.stringify({ error: err.message }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), apiDevMiddleware()],
})
