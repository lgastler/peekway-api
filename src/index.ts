import { Hono } from "hono";
import { dwdWeather } from "./apis/dwd/route";

const app = new Hono();

app.get("/", (c) => c.text("peekway API"));

const api = new Hono();
api.get("/", (c) => c.redirect("/"));

api.route("/dwd", dwdWeather);
app.route("/api", api);
export default app;
