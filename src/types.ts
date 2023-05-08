import { z } from "zod";

export const dataPointSchema = z.object({
  id: z.string(),
  type: z.string(),
  value: z.number(),
});
export type DataPoint = z.infer<typeof dataPointSchema>;

export const dataPointsSchema = z.array(dataPointSchema);
export type DataPoints = z.infer<typeof dataPointsSchema>;

export const aggregateSetSchema = z.object({
  id: z.string(),
  title: z.string(),
  dataPoints: dataPointsSchema,
});
export type AggregateSet = z.infer<typeof aggregateSetSchema>;
