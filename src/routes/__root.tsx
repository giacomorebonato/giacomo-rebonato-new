import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { DehydrateRouter } from '@tanstack/start'
import { HelmetProvider } from 'react-helmet-async'
import type { HelmetServerState } from 'react-helmet-async'
import type { RouterContext } from '#/types/router-context'

export const Route = createRootRouteWithContext<RouterContext>()({
	loader({ context }) {
		return { helmetContext: context.helmetContext }
	},
	component: RootComponent,
})

function RootComponent() {
	const loaderData = Route.useLoaderData<{
		helmetContext: { helmet: HelmetServerState }
	}>()

	return (
		<HelmetProvider context={loaderData.helmetContext}>
			<Outlet />
			<DehydrateRouter />
		</HelmetProvider>
	)
}
