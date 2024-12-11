import express, { Request, Response } from 'express';
import { prisma } from "../lib/client";
import { CreateContractSchema, UpdateContractSchema } from '../schemas/schemas';

const router = express.Router();

router.use(express.json());

router.get('/get', async (req: Request, res: Response) => {
    const { search, status, page } = req.query;
    const pageSize = 5;
    let currentPage = Number(page) || 1;
    const filters: any = {};
    if (search) {
        filters.OR = [
            { title: { contains: search as string, mode: 'insensitive' } },
            { clientName: { contains: search as string, mode: 'insensitive' } },
            { id: { contains: search as string, mode: 'insensitive' } }
        ];
    }
    if (status && (status === 'Draft' || status === 'Finalized')) {
        filters.status = status;
    }
    try {
        const totalContracts = await prisma.contracts.count({ where: filters });
        const totalPages = Math.ceil(totalContracts / pageSize);
        if (currentPage > totalPages) {
            currentPage = 1;
        }
        const contracts = await prisma.contracts.findMany({
            where: filters,
            skip: (currentPage - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: 'desc' }
        });

        res.status(200).json({
            contracts,
            currentPage,
            totalPages
        });
    } catch (e) {
        console.log("Error",e)
        res.status(500).json({ error: 'Failed to fetch contracts' });
    }
});


router.post('/create', async(req : Request,res : Response)=> {
    const body = req.body;
    try{
        const data = CreateContractSchema.parse(body);
        if(data.clientName === "" || data.title === ""){
            res.status(400).json({ error: 'Cannot have empty fields' });
        }
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
        res.status(400).json({ error: 'Failed to create contract' });
    }
})

router.put('/update/:id', async(req : Request,res : Response)=> {
    const body = req.body;
    const id = req.params.id;
    try{
        const data = UpdateContractSchema.parse(body);
        if(data.clientName === "" || data.title === ""){
            res.status(400).json({ error: 'Cannot have empty fields' });
        }
        if(data.dataType === "json"){
            try{
                JSON.parse(data.data);
            }
            catch(e){
                 res.status(400).json({ error: 'Invalid JSON data' });
            }
        }
        const resp = await prisma.contracts.update({
            where : {
                id
            },
            data: {
                title : data.title,
                clientName : data.clientName,
                dataType : data.dataType,
                data : data.data,
                status : data.status
            }
        });
        res.status(201).json(resp);
    } catch(e){
        res.status(400).json({ error: 'Failed to create contract' });
    }
})

router.delete('/delete/:id', async(req : Request,res : Response)=> {
    try{
        const id = req.params.id;
        const resp = await prisma.contracts.delete({
            where : {
                id
            }
        });
        res.status(201).json(resp);
    } catch(e){
        res.status(400).json({ error: 'Failed to create contract' });
    }
})


export default router;