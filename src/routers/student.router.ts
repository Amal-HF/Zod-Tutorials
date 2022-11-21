import express from "express";
import validate from "../middlewares/validate";
import { studentSchema, studentSchemaType } from "../zod_schema/student.schema";

const router = express.Router();
const students: studentSchemaType[] = [];


router.get('/', (req, res) => {
    return res.status(200).json(students)
});

router.post('/', validate(studentSchema), (req, res) => {
    const newStudent = req.body as studentSchemaType;
    students.push(newStudent);
    return res.status(201).json({
        message: 'Student added :)'
    })
})

router.put('/:id', validate(studentSchema), (req, res) => {
    const updatedStudent = req.body as studentSchemaType;
    const {id} = req.params;
    let flag = false;
    for (let i=0; i<students.length; i++){
        if(students[i].id === id){
            students[i] = updatedStudent;
            flag=true;
        }  
    }
    if (flag){
        return res.status(200).json({
            message: 'Student updated :)'
        })
    } else {
        return res.status(404).json({
            message: 'Student not found :)'
        })
    }
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    let flag = false;
    for (let i=0; i<students.length; i++){
        if(students[i].id === id){
            students.splice(i, 1);
            flag = true;
        }  
    }
    if (flag){
        return res.status(200).json({
            message: 'Stusent deleted :)'
        })
    } else {
        return res.status(404).json({
            message: 'Student not found :)'
        })
    }
})

router.get('/major/:major', (req, res) => {
    const {major} = req.params;
    const stuMajor = major.toLowerCase();
    const searchArr = students.filter((item)=>{
        return item.major.toLowerCase().includes(stuMajor)
    })
    if(searchArr.length === 0){
        return res.status(404).json({
            message: 'There are no matching results'
        });
    } else {
        return res.status(200).json(searchArr);
    }
})


router.get('/level/:id', (req, res) => {
    const {id} = req.params;
    let flag = false;
    for (let i=0; i<students.length; i++){
        if (students[i].id === id && students[i].level < 8){
            let nextLevel = students[i].level +1;
            students[i].level = nextLevel;
            flag = true;
        }
    }
    if(!flag){
        return res.status(404).json({
            message: 'No student found'
        });
    } else {
        return res.status(200).json({
            message: 'Student moved to the next level'
        });
    }
})

export default router;
