import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Body, createServerFn, Head, Html, json, Meta, Scripts } from "@tanstack/start";

const getUser = createServerFn("GET", async () => {
  return json({ name: "John Doe from server fn" });
});

export const Route = createRootRoute({
  beforeLoad: async () => {
    // server fn doesn't work
    const user = await getUser();

    // but if we return an object directly, it works

    // const user = { name: "Fake John Doe" };

    // or

    // const user = await new Promise((resolve) =>
    //   setTimeout(() => resolve({ name: "Fake John Doe" }), 500)
    // );

    return { user };
  },
  component: RootComponent,
  meta: () => [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      title: "TanStarter",
    },
  ],
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        {children}
        <ScrollRestoration />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </Body>
    </Html>
  );
}
