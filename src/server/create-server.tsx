import { type FastifyServerOptions, fastify } from 'fastify'
import { env } from './env'

export async function createServer(
	options: FastifyServerOptions = {
		logger: true,
		maxParamLength: 5_000,
	},
) {
	const server = fastify(options)

	await server
		.register(import('./redirect-plugin'), {
			hostNamesRedirectFrom: env.HOST_NAMES_REDIRECT_FROM,
			hostNameRedirectTo: env.SITE_URL,
		})
		.register(import('./vite-plugin'), {
			nodeEnv: env.NODE_ENV,
		})
		.ready()

	return await server
}

export type FastRatServer = Awaited<ReturnType<typeof createServer>>
