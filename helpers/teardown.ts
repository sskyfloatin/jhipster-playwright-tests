import { APIRequestContext } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export async function deleteEntity(request: APIRequestContext, type: 'user' | 'category' | 'product', id: string | number) {
  const baseUrl = process.env.BASE_URL || 'http://localhost:8080';
  const authFile = JSON.parse(fs.readFileSync(path.join(process.cwd(), '.auth/admin.json'), 'utf-8'));
  const token = authFile.origins[0].localStorage[0].value;

  let endpoint = '';
  switch (type) {
    case 'user': endpoint = `${baseUrl}/api/admin/users/${String(id).toLowerCase()}`; break;
    case 'category': endpoint = `${baseUrl}/api/categories/${id}`; break;
    case 'product': endpoint = `${baseUrl}/api/products/${id}`; break;
  }
  
  await request.delete(endpoint, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
}

export class TeardownManager {
  private entities: { type: 'user' | 'category' | 'product', id: string | number }[] = [];
  
  track(type: 'user' | 'category' | 'product', id: string | number) { 
    this.entities.push({ type, id }); 
  }
  
  async cleanup(request: APIRequestContext) {
    for (const entity of this.entities) {
      await deleteEntity(request, entity.type, entity.id);
    }
    this.entities = [];
  }
}
