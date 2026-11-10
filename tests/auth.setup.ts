import {test as setup} from '@playwright/test';
import fs from 'fs'

const authFile = '.auth/user.json'

setup('authentication', async({request}) => {

    const response = await request.post('http://localhost:8080/api/authenticate', {
        data: {
          "username": "admin",
          "password": "admin",
          "rememberMe": false
      }
      })
      const responseBody = await response.json()
      const token = responseBody.id_token

    const storageState = {
        cookies: [],
        origins: [
            {
                origin: 'http://localhost:8080',
                localStorage: [
                    {
                        name: 'jhi-authenticationToken',
                        value: `${token}`,
                    }
                ],
                sessionStorage: [ {
                    name: 'jhi-authenticationToken',
                    value: `${token}`,
                }]
            }
        ]
    }
    fs.writeFileSync(authFile, JSON.stringify(storageState, null, 2));
})
