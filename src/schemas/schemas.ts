import { z } from "zod";

export const CreateContractSchema = z.object({
    title : z.string(),
    clientName : z.string(),
    dataType : z.enum(['text','json']),
    data : z.string()
})