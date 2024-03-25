import { logout } from "@/app/api/auth/logout/route";
import { COMIGO_SERVICES } from "@/constants/comigo-services";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest, 
  { params }: { params: { IdCooperado: string } }
) {
  try {
    const id = params.IdCooperado;
    const token = cookies().get('bearer')?.value;
    const response = await axios.get(
      COMIGO_SERVICES.GET_DETAILED_COOPERADO + `?IdCooperado=${id}`,
      {headers: {Authorization: `Bearer ${token}`}}
    );
    if (response.status === 401) {
      return logout(req.url)
    }
    return NextResponse.json(response.data);
  } catch (error: any) {
    throw new Error(error.message || 'Get failed');
  }
}
