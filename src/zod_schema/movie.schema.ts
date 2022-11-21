import {z, TypeOf} from 'zod';

export const movieSchema = z.object({
    body: z.object({
        id : z.string({required_error: 'ID is required'}).min(3, 'ID length more than 3'),
        name: z.string({required_error: 'Name is required'}).min(3, 'Name length more than 3'),
        genre: z.enum(['Drama', 'Action', 'Comedy'], {required_error: 'Genre is required'}),
        rating: z.number({required_error: 'Rating is required'}).gte(1).lte(5),
        duration: z.number({required_error: 'Duration is required'}).gte(60)
    })
})


export type movieSchemaType = TypeOf <typeof movieSchema> ['body'];