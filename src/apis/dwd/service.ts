import createClient from "openapi-fetch";
import { paths } from "./dwd-api";
import { DataPoint, dataPointSchema } from "../../types";
import { format } from "date-fns";

const { GET } = createClient<paths>({
  baseUrl: "https://dwd.api.proxy.bund.dev/v30",
});

export async function getWeeklyForcastDataPoints(stationId: string) {
  const { data, error } = await GET("/stationOverviewExtended", {
    params: {
      query: {
        stationIds: [stationId],
      },
    },
  });

  if (error) {
    throw error;
  }
  const stationData = data[stationId];

  if (!stationData || !stationData.days) {
    throw new Error(`Station ${stationId} not found`);
  }

  return stationData.days
    .slice(0, 7)
    .map((day) => {
      if (!day || !day.dayDate || !day.temperatureMax || !day.temperatureMin) {
        return null;
      }

      const temperature = (day.temperatureMax + day.temperatureMin) / 2;
      const temperatureC = temperature / 10;

      const dataPoint: DataPoint = {
        id: day.dayDate,
        type: format(new Date(day.dayDate), "EEEE"),
        value: temperatureC,
      };

      return dataPointSchema.parse(dataPoint);
    })
    .filter(Boolean);
}
