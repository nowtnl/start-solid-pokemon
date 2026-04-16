import { TanStackDevtools } from "@tanstack/solid-devtools";
import { SolidQueryDevtoolsPanel } from "@tanstack/solid-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/solid-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/solid-router-devtools";
import { Suspense } from "solid-js";
import { HydrationScript } from "solid-js/web";
import Header from "../components/Header";
import styleCss from "../styles.css?url";

export const Route = createRootRouteWithContext()({
	head: () => ({
		links: [{ rel: "stylesheet", href: styleCss }],
	}),
	shellComponent: RootComponent,
});

function RootComponent() {
	const plugins = () => [
		{
			name: "Router",
			render: <TanStackRouterDevtoolsPanel />,
		},
		{
			name: "Query",
			render: <SolidQueryDevtoolsPanel />,
		},
	];
	return (
		<html lang="en">
			<head>
				<HydrationScript />
			</head>
			<body>
				<HeadContent />
				<Suspense>
					<Header />
					<Outlet />
					<TanStackDevtools
						config={{ position: "bottom-right" }}
						plugins={plugins()}
					/>
				</Suspense>
				<Scripts />
			</body>
		</html>
	);
}
