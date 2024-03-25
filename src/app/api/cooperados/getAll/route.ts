import { COMIGO_SERVICES } from "@/constants/comigo-services";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = cookies().get('bearer')?.value;
    const response = await axios.get(
      COMIGO_SERVICES.GET_ALL_COOPERADOS,
      {headers: {Authorization: `Bearer ${token}`}}
    );
    if (response.status === 401) {
      cookies().delete('bearer')
    }
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({error: error.message || 'Get failed'});
  }
}
