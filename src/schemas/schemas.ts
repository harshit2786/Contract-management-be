import { z } from "zod";

export const CreateContractSchema = z.object({
    title : z.string(),
    clientName : z.string(),
    dataType : z.enum(['text','json']),
    data : z.string()
})

export const UpdateContractSchema = z.object({
    status : z.enum(['Draft','Finalized']),
    title : z.string(),
    clientName : z.string(),
    dataType : z.enum(['text','json']),
    data : z.string()
})
