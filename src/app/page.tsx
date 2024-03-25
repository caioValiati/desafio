'use client'

import { APP_ROUTES } from '@/constants/app-routes';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  redirect(APP_ROUTES.LOGIN)
  return <></>
}
