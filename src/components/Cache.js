import { makeVar, InMemoryCache } from "@apollo/client";

export const tasksVar = makeVar([])

export const customInmemoryCahche = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                tasksData: {
                    read() {
                        return tasksVar()
                    }
                }
            }
        }
    }
})