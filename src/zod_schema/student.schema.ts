import {z, TypeOf} from 'zod';

export const studentSchema = z.object({
    body: z.object({
        id : z.string({required_error: 'ID is required'}).min(3, 'ID length more than 3'),
        name: z.string({required_error: 'Name is required'}).min(3, 'Name length more than 3'),
        major: z.enum(['IT', 'IS', 'CS', 'SWE'], {required_error: 'Major is required'}),
        level: z.number({required_error: 'Level is required'}).gte(1).lte(8),
        gpa: z.number({required_error: 'GPA is required'}).gte(0).lte(5),
    })
})


export type studentSchemaType = TypeOf <typeof studentSchema> ['body'];