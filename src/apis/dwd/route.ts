import { Hono } from "hono";
import { getWeeklyForcastDataPoints } from "./service";
import { type AggregateSet } from "../../types";

export const dwdWeather = new Hono();
dwdWeather.get("/", (c) => c.redirect("/"));
dwdWeather.get("/:stationId/aggregate-set", async (c) => {
  const stationId = c.req.param("stationId");

  const dataPoints = await getWeeklyForcastDataPoints(stationId);

  return c.json({
    id: stationId,
    title: `Weekly forcase for station ${stationId}`,
    dataPoints,
  } satisfies AggregateSet);
});
