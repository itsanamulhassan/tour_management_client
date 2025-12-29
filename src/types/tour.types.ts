import type { tourTypeSchemas } from "@/schemas/tour.schemas";
import z from "zod";

export type CreateTourTypeDTO = z.infer<typeof tourTypeSchemas.createTourType>;
export type UpdateTourTypeDTO = z.infer<typeof tourTypeSchemas.updateTourType>;
