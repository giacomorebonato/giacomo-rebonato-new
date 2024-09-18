import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { DehydrateRouter } from '@tanstack/start'
import { Suspense, lazy } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import type { HelmetServerState } from 'react-helmet-async'
import { CustomMeta } from '#/server/use-custom-meta'
import type { RouterContext } from '#/types/router-context'

export const Route = createRootRouteWithContext<RouterContext>()({
	loader({ context }) {
		return { helmetContext: context.helmetContext }
	},
	component: RootComponent,
})

const LazyPwaReloadPrompt = lazy(() => {
	return import('#/browser/pwa-reload-prompt')
})

function RootComponent() {
	const loaderData = Route.useLoaderData<{
		helmetContext: { helmet: HelmetServerState }
	}>()

	return (
		<HelmetProvider context={loaderData.helmetContext}>
			<CustomMeta />
			<Outlet />
			<DehydrateRouter />
			<Suspense fallback={null}>
				<LazyPwaReloadPrompt />
			</Suspense>
		</HelmetProvider>
	)
}
