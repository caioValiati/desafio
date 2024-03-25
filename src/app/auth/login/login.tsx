"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { APP_ROUTES } from "@/constants/app-routes"
import { userLogin } from "@/lib/redux/auth/authSlice"
import { LoginSchema } from "@/schemas/login.schema"
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch<any>()
  const { loading, error } = useSelector((rootReducer: any) => rootReducer.userReducer)
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    await dispatch(userLogin(data))
    router.replace(APP_ROUTES.HOME)
  }

  return (
    <Form {...form}>
      <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center border-2 border-slate-200 p-4 rounded-md space-y-6">
        <h1 className="text-center">Login</h1>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome de usuário</FormLabel>
              <FormControl className="h-20">
                <Input className="h-10" placeholder="Usuário" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Insira a senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {
          error && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>
                Usuário ou senha incorretos.
              </AlertDescription>
            </Alert>
          )
        }
        {
          loading ? (
            <Button disabled>
              <ReloadIcon className="w-6 h-6 animate-spin" />
            </Button>
          ) : (
            <Button type="submit">Enviar</Button>
          )
        }
      </form>
    </Form>
  )
}
