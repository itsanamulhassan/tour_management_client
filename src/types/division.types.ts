import type { divisionSchema } from "@/schemas/division.schemas";
import z from "zod";
export type CreateDivisionDTO = z.infer<typeof divisionSchema.createDivision>;
export type UpdateDivisionDTO = z.infer<typeof divisionSchema.updateDivision>;
