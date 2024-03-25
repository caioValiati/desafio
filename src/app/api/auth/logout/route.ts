import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const logout = async (url: string) => {
  cookies().delete('bearer')
  return NextResponse.redirect(new URL('/auth/login', url))
}

export async function POST(req: NextRequest) {
  cookies().delete('bearer')
  return NextResponse.redirect(new URL('/auth/login', req.url))
}
