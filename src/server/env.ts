import process from 'node:process'
import 'dotenv/config'
import { z } from 'zod'

const schema = z.object({
	CI: z
		.string()
		.default('false')
		.transform((value) => value === 'true'),
	HOST: z.string().default('0.0.0.0'),
	HOST_NAMES_REDIRECT_FROM: z
		.string()
		.transform((text) => text.split(','))
		.default(''),
	NODE_ENV: z
		.enum(['development', 'test', 'production'])
		.default('development'),
	PORT: z.string().transform(Number).default('3000'),
	SITE_URL: z.string().default('http://localhost:3000'),
})

export const env = schema.parse(process.env)

export type Env = z.infer<typeof schema>
