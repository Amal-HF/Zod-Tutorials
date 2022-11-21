import express from "express";
import validate from "../middlewares/validate";
import { bankSchema, bankSchemaType } from "../zod_schema/bank.schema";

const router = express.Router();
const bank: bankSchemaType[] = [];


router.get('/', (req, res) => {
    return res.status(200).json(bank)
});

router.post('/', validate(bankSchema), (req, res) => {
    const newAccount = req.body as bankSchemaType;
    bank.push(newAccount);
    return res.status(201).json({
        message: 'An account added :)'
    })
})

router.put('/:id', validate(bankSchema), (req, res) => {
    const updatedAccount = req.body as bankSchemaType;
    const {id} = req.params;
    let flag = false;
    for (let i=0; i<bank.length; i++){
        if(bank[i].id === id){
            bank[i] = updatedAccount;
            flag=true;
        }  
    }
    if (flag){
        return res.status(200).json({
            message: 'An account updated :)'
        })
    } else {
        return res.status(404).json({
            message: 'Account not found :)'
        })
    }
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    let flag = false;
    for (let i=0; i<bank.length; i++){
        if(bank[i].id === id){
            bank.splice(i, 1);
            flag = true;
        }  
    }
    if (flag){
        return res.status(200).json({
            message: 'Account deleted :)'
        })
    } else {
        return res.status(404).json({
            message: 'Account not found :)'
        })
    }
})

router.put('/withdraw/:id/:amount', (req, res) => {
    const {id} = req.params;
    const {amount} = req.params;
    const withdrawAmount = parseFloat(amount);
    let msg = "account not found";
    let status = 404;

    for (let i=0; i<bank.length; i++){
        if(bank[i].id === id){
            const crrBalance = bank[i].balance;
            if(crrBalance - withdrawAmount >=0) {
                bank[i].balance = crrBalance-withdrawAmount;
                status = 200;
                msg = "Balance updated :)"
            } else {
                status = 404;
                msg = "Current Balance is less than the withdraw amount :)"
            }
        }
    }
    return res.status(status).json({
        message: msg
    })
})


router.put('/deposit/:id/:amount', (req, res) => {
    const {id} = req.params;
    const {amount} = req.params;
    const depositAmount = parseFloat(amount);
    let msg = "account not found";
    let status = 404;

    for (let i=0; i<bank.length; i++){
        if(bank[i].id === id){
            const crrBalance = bank[i].balance;
            bank[i].balance = crrBalance + depositAmount;
                status = 200;
                msg = "Balance updated :)"
        }
    }
    return res.status(status).json({
        message: msg
    })
})

export default router;
