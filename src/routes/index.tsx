import { createFileRoute } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async'
import WhoAmI from '#/blog/who-am-i.mdx'

export const Route = createFileRoute('/')({
	component: IndexComponent,
})

function MyLink(props: React.HtmlHTMLAttributes<HTMLAnchorElement>) {
	return <a className='link link-primary' {...props} />
}
function MyP(props: React.HTMLAttributes<HTMLParagraphElement>) {
	return <p className='p-0 m-0' {...props} />
}

function IndexComponent() {
	return (
		<div className='flex flex-col md:flex-row'>
			<Helmet>
				<title>Giacomo Rebonato</title>
				<meta
					name='description'
					content='Get started with React and Fastify server-side rendering (SSR). Our starter kit simplifies development and provides a robust foundation for your projects.'
				/>
				<meta
					name='keywords'
					content='Giacomo Rebonato, React, Node, TypeScript, Fastify, web development'
				/>
				<meta property='og:title' content='Giacomo Rebonato' />
				<meta
					property='og:description'
					content='A starter kit for building web application and SSR ready when SEO matters.'
				/>
				<meta property='og:type' content='website' />
			</Helmet>

			<main className='prose mx-auto py-8 px-4 md:px-0 text-lg w-full'>
				<WhoAmI
					components={{
						a: MyLink,
						p: MyP,
					}}
				/>
			</main>
		</div>
	)
}
