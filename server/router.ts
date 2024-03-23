import trpc, { initTRPC } from '@trpc/server'
import {z} from 'zod'
import {v4 as uuid} from 'uuid'

import  { type Todo, todoService } from './service'

export const t = initTRPC.create()

export const appRouter = t.router({
    getTodoList: t.procedure.query((opts) => {
        return todoService.getAll()
    }),
    addTodo: t.procedure
    .input(
        z.object({
            text: z.string(),
        })
    )
    // define the return type of the mutation
    .mutation(async ({input}) => {
        const id = uuid()
        return await todoService.addTodo(id, input.text)
    }),
})

export type AppRouter = typeof appRouter
