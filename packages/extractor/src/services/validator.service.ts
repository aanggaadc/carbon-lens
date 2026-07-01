import { ProductEPDSchema } from "../schemas/epd.schema";

export function validateExtraction(data: unknown) {

    const result =
        ProductEPDSchema.safeParse(data);

    if (!result.success) {
        console.error(result.error);
        throw result.error;
    }

    return result.data;
}