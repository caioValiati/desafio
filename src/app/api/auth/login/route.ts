import { COMIGO_SERVICES } from '@/constants/comigo-services';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json()
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', data.username);
    params.append('password', data.password);
    const token_response = await axios.post(
      COMIGO_SERVICES.GET_USER_TOKEN, params
    );    
    const response = NextResponse.json({ ...token_response.data, userAuthenticated: true })
    response.cookies.set('bearer', token_response.data.access_token)
    
    return response;
  } catch (error: any) {
    throw new Error(error.message || 'Login failed');
  }
}
