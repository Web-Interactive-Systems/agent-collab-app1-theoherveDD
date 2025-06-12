import { usePath, useRoutes } from "raviger";
import { useEffect } from "react";
import LayoutTheme from "./LayoutTheme";
import Home from "@/pages/Home";

const routes = {
  "/": () => <Home />,
};

export function Router() {
  const currentPath = usePath();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  const routeResult = useRoutes(routes);

  return <LayoutTheme>{routeResult}</LayoutTheme>;
}