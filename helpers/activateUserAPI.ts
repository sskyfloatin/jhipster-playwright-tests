import {APIRequestContext} from '@playwright/test';


export async function activateUserAPI(request: APIRequestContext, randomFullName: string) {

    const authResponse = await request.post('http://localhost:8080/api/authenticate', {
      data: { username: 'admin', password: 'admin', rememberMe: true }
    });
    const { id_token } = await authResponse.json();

    const userResponse = await request.get(`http://localhost:8080/api/admin/users/${randomFullName.toLocaleLowerCase()}`, {
      headers: { Authorization: `Bearer ${id_token}` }
    });

    const userDate = await userResponse.json();

    const updateResponse = await request.put('/api/admin/users', {
      headers: { Authorization: `Bearer ${id_token}` },
      data: {
        id: userDate.id,
        login: randomFullName,
        activated: true,
        authorities: ['ROLE_USER'],
      },
    });
    return updateResponse;
  };