import { test as setup } from '@playwright/test';
import fs from 'fs';

const authFile = (userRole: string) => `.auth/${userRole}.json`;

setup('authentication', async ({ request }, testInfo) => {
    
    const role = testInfo.project.name.replace('setup-', '') || 'admin';

    
    const credentials = {
        admin: { username: 'admin', password: 'admin' },
        user: { username: 'user', password: 'user' }, 
    };

    const response = await request.post('http://localhost:8080/api/authenticate', {
        data: {
            username: credentials[role].username,
            password: credentials[role].password,
            rememberMe: false,
        },
    });

    const responseBody = await response.json();
    const token = responseBody.id_token;

    const storageState = {
        cookies: [],
        origins: [
            {
                origin: 'http://localhost:8080',
                localStorage: [
                    {
                        name: 'jhi-authenticationToken',
                        value: `${token}`,
                    },
                ],
                sessionStorage: [
                    {
                        name: 'jhi-authenticationToken',
                        value: `${token}`,
                    },
                ],
            },
        ],
    };

    fs.writeFileSync(authFile(role), JSON.stringify(storageState, null, 2));
});