import { defineConfig } from "orval";

export default defineConfig({
    backend: {
        input: {
            target: './backend/openapi.yaml'
        },
        output: {
            target: './src/generated/backend/api.ts',
            client: 'react-query',
            schemas: './src/generated/backend/model',
            mode: 'tags-split',
            clean: true,
            prettier: true,
            override: {
                mutator: {
                    path: './src/mutator/custom-instance.ts',
                    name: 'customInstance'
                }
            }
        }
    }
})