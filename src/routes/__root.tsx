import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { DehydrateRouter } from '@tanstack/start'
import { Suspense, lazy, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import type { HelmetServerState } from 'react-helmet-async'
import type { RouterContext } from '#/types/router-context'

export const Route = createRootRouteWithContext<RouterContext>()({
	loader({ context }) {
		return { helmetContext: context.helmetContext }
	},
	component: RootComponent,
})

let LazyPwaReloadPrompt: React.FC = () => null

function RootComponent() {
	useEffect(() => {
		if (import.meta.env.PROD) {
			LazyPwaReloadPrompt = lazy(() => {
				return import('#/browser/pwa-reload-prompt').then((c) => ({
					default: c.PwaReloadPrompt,
				}))
			})
		}
	}, [])

	const loaderData = Route.useLoaderData<{
		helmetContext: { helmet: HelmetServerState }
	}>()

	return (
		<HelmetProvider context={loaderData.helmetContext}>
			<Outlet />
			<DehydrateRouter />
			<Suspense fallback={<div />}>
				<LazyPwaReloadPrompt />
			</Suspense>
		</HelmetProvider>
	)
}
