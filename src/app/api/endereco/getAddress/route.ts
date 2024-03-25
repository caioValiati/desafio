import { ADDRESS_APIS } from "@/constants/address-apis";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const getAddressData = (components: { types: string[]; long_name: string }[]) => {
  return components.reduce((acc: Record<string, any>, { types, long_name }) => {
    acc[types[0]] = long_name;
    return acc;
  }, {});
};

export async function GET(
  req: NextRequest, 
) {
  try {
    const lat = req.nextUrl.searchParams.get('latitude');
    const long = req.nextUrl.searchParams.get('longitude');
    let cep = req.nextUrl.searchParams.get('cep');
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

    const endpoint = cep ? `address=${cep}` : `latlng=${lat},${long}`;
    const url = `${ADDRESS_APIS.GEOCODE}${endpoint}&key=${GOOGLE_API_KEY}`;
    
    const { data: { results: [address] } } = await axios.get(url);
    let address_data = getAddressData(address?.address_components || []);

    cep = address_data.postal_code
    const response_viacep = await axios.get(`${ADDRESS_APIS.VIACEP}${cep}/json`);
    address_data = {
      ...address_data,
      codIbge: response_viacep.data.ibge,
      complemento: response_viacep.data.complemento,
      lat: lat ?? address.geometry.location.lat,
      lng: long ?? address.geometry.location.lng
    }
    return NextResponse.json(address_data);
  } catch (error: any) {
    return NextResponse.json({error: error.message || 'Get failed'});
  }
}
