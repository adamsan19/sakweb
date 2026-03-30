import { onRequest as __api___route___js_onRequest } from "/workspaces/sakweb/functions/api/[[route]].js"
import { onRequest as ____path___js_onRequest } from "/workspaces/sakweb/functions/[[path]].js"

export const routes = [
    {
      routePath: "/api/:route*",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api___route___js_onRequest],
    },
  {
      routePath: "/:path*",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [____path___js_onRequest],
    },
  ]