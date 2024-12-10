import express, { Request, Response } from 'express';
import { prisma } from "../lib/client";
import { CreateContractSchema } from '../schemas/schemas';

const router = express.Router();

router.use(express.json());

router.post('/create', async(req : Request,res : Response)=> {
    const body = req.body;
    try{
        const data = CreateContractSchema.parse(body);
        const createdAt = Date.now().toString();
        if(data.dataType === "json"){
            try{
                JSON.parse(data.data);
            }
            catch(e){
                 res.status(400).json({ error: 'Invalid JSON data' });
            }
        }
        const resp = await prisma.contracts.create({
            data: {
                title : data.title,
                clientName : data.clientName,
                createdAt,
                dataType : data.dataType,
                data : data.data,
                status : "Draft"
            }
        });
        res.status(201).json(resp);
    } catch(e){
        res.status(500).json({ error: 'Failed to create contract' });
    }
})

export default router;