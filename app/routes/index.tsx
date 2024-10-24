import { createFileRoute } from "@tanstack/react-router";
import { createServerFn, json } from "@tanstack/start";
import { useEffect } from "react";

const getTodos = createServerFn("GET", async () => {
  return json({ task: "Play football (from server fn)" });
});

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    // this also doesn't work
    // const todos = await getTodos();

    const todos = { task: "fake football" };
    return { todos };
  },
});

function Home() {
  const { user } = Route.useRouteContext();
  const { todos } = Route.useLoaderData();

  useEffect(() => {
    console.log("User from root beforeLoad: ", user);
    console.log("Todos from loader: ", todos);
  }, [user, todos]);

  return <div>Hello, world! Check console logs for route context data</div>;
}
