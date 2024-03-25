'use client'
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { setMapCenter, setPosition } from "@/lib/redux/geolocation/geolocationSlice";
import { Cooperado, CooperadoSchema } from "@/schemas/cooperado.schema";
import { CEPMask, CpfCnpjMask, IEMask } from "@/utils/masks";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import GoogleMapComponent, { GOOGLE_API_KEY } from '../../../components/googleMap/googleMap';

type PropsType = {
  cooperado?: Cooperado
}

export default function CooperadosPageComponent(props: PropsType) {
  const { toast } = useToast()
  const firstRendering = useRef(true);
  const dispatch = useDispatch<any>();
  const { position } = useSelector((rootReducer: any) => rootReducer.geolocationReducer);
  const router = useRouter()
  const [isPfPj, setIsPfPj] = useState<'CPF' | 'CNPJ'>('CPF');
  const form = useForm<z.infer<typeof CooperadoSchema>>({
    resolver: zodResolver(CooperadoSchema),
    defaultValues: props.cooperado ? {
      IdCooperado: props.cooperado?.IdCooperado,
      nomeCooperado: props.cooperado?.nomeCooperado ?? '',
      cpfCnpj: CpfCnpjMask(props.cooperado?.cpfCnpj, isPfPj) ?? '',
      fazenda: props.cooperado?.fazenda ?? '',
      cidade: props.cooperado?.cidade ?? '',
      estado: props.cooperado?.estado ?? '',
      inscricaoEstadual: IEMask(props.cooperado?.inscricaoEstadual ?? ''),
      cep: CEPMask(props.cooperado?.cep ?? ''),
      logradouro: props.cooperado?.logradouro ?? '',
      numero: props.cooperado?.numero ?? '',
      bairro: props.cooperado?.bairro ?? '',
      complemento: props.cooperado?.complemento ?? '',
      codIbge: props.cooperado?.codIbge,
      latitude: props.cooperado?.latitude ?? '',
      longitude: props.cooperado?.longitude ?? ''
    } : {
      nomeCooperado: '',
      cpfCnpj: '',
      fazenda: '',
      cidade: '',
      estado: '',
      inscricaoEstadual: '',
      cep: '',
      logradouro: '',
      numero: '',
      bairro: '',
      complemento: '',
      codIbge: 0,
      latitude: '',
      longitude: ''
    }
  })

  const onSubmit = async (data: Cooperado) => {
    if (!props.cooperado) {
      delete data.IdCooperado
    }
    try {
      const res = await axios.post(API_ENDPOINTS.SAVE_COOPERADO, data)
      router.replace('/cooperados')
      toast({
        title: 'Sucesso',
        description: 'Cooperado salvo com sucesso',
        variant: 'default'
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao salvar cooperado: ' + error,
        variant: 'destructive'
      })
    }
  }

  const handleReturn = () => {
    router.replace('/cooperados')
  }

  type AddressData = {
    postal_code: string
    route: string
    political: string
    administrative_area_level_2: string
    administrative_area_level_1: string
    street_number: string
    codIbge: string
    complemento: string
    lat: string
    lng: string
  }

  const updateAddressData = (data: AddressData) => {
    form.reset(
      {
        ...form.getValues(),
        cep: data.postal_code ?? '',
        logradouro: data.route ?? '',
        complemento: data.complemento ?? '',
        bairro: data.political ?? '',
        numero: data.street_number ?? '',
        cidade: data.administrative_area_level_2 ?? '',
        estado: data.administrative_area_level_1 ?? '',
        codIbge: data.codIbge ? parseInt(data.codIbge) : 0,
        latitude: data.lat ?? '',
        longitude: data.lng ?? '',
      }
    )
  }

  const setAddressData = async (props: {
      latitude?: number; 
      longitude?: number, 
      cep?: string
    }
  ) => {
    const response = await axios.get(API_ENDPOINTS.GET_ADDRESS, {
      params: {
        ...props,
        GOOGLE_API_KEY
      }
    })

    if (props.cep) {
      firstRendering.current = true;
      dispatch(setPosition({
        latitude: parseFloat(response.data.lat),
        longitude: parseFloat(response.data.lng),
      }))
      dispatch(setMapCenter({
        lat: parseFloat(response.data.lat),
        lng: parseFloat(response.data.lng),
      }))
    }
    updateAddressData(response.data)
  }

  useEffect(() => {
    if (firstRendering.current) {
      setTimeout(() => {
        firstRendering.current = false
      }, 100)
      return
    }
    setAddressData({
      latitude: position.latitude,
      longitude: position.longitude
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position.latitude, position.longitude])

  useEffect(() => {
    const setPositionAndMapCenter = (latitude: number, longitude: number) => {
      dispatch(setPosition({ latitude, longitude }));
      dispatch(setMapCenter({ lat: latitude, lng: longitude }));
    };
  
    if (props.cooperado) {
      const { latitude, longitude } = props.cooperado;
      setPositionAndMapCenter(parseFloat(latitude), parseFloat(longitude));
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setPositionAndMapCenter(latitude, longitude);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCepSearch = (cep: string) => {
    setAddressData({
      cep: cep
    })
  }

  return (
    <div className="flex">
      <div className="w-1/3 overflow-y-scroll" style={{ height: '100vh' }}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center border-2 border-slate-200 p-6 rounded-md space-y-6">
            <div className="flex items-center gap-2">
              <div onClick={handleReturn} className="hover:bg-slate-200 p-2 rounded cursor-pointer">
                <ArrowLeftIcon className="text-2xl" />
              </div>
              <h1 className="text-cente font-bold text-2xl text-slate-600">Cooperado</h1>
            </div>
            <div className="flex items-center gap-2">
              <div style={{ height: '1px'}} className="w-1/12 bg-slate-500"></div>
              <h2 className="text-nowrap">Informações Pessoais</h2>
              <div style={{ height: '1px'}} className="w-full bg-slate-500"></div>
            </div>
            <FormField
              control={form.control}
              name="nomeCooperado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Cooperado</FormLabel>
                  <FormControl className="h-20">
                    <Input className="h-10" placeholder="Nome do Cooperado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <p className="font-medium">Tipo de pessoa</p>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    checked={isPfPj === 'CPF'} 
                    onClick={() => {
                      setIsPfPj('CPF')
                      form.setValue('cpfCnpj', '')
                    }} />
                  <p>Pessoa física</p>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    checked={isPfPj === 'CNPJ'} 
                    onClick={() => {
                      setIsPfPj('CNPJ')
                      form.setValue('cpfCnpj', '')
                    }} />
                  <p>Pessoa jurídica</p>
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="cpfCnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isPfPj}</FormLabel>
                  <FormControl className="h-20">
                    <Input 
                      className="h-10" 
                      maxLength={isPfPj === 'CPF' ? 14 : 18}
                      value={field.value}
                      onChange={(e: any) => {
                        field.onChange(CpfCnpjMask(e.target.value, isPfPj))
                      }} 
                      placeholder={`Insira o seu ${isPfPj}`} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fazenda"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fazenda</FormLabel>
                  <FormControl className="h-20">
                    <Input className="h-10" placeholder={`Insira o nome da fazenda do cooperado`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inscricaoEstadual"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={isPfPj === 'CPF' ? "text-slate-400" : ""}>Inscrição Estadual</FormLabel>
                  <FormControl className="h-20">
                    <Input 
                      disabled={isPfPj === 'CPF'} 
                      className="h-10" 
                      maxLength={15}
                      placeholder={`Insira a inscrição estadual`} 
                      value={field.value}
                      onChange={(e: any) => {
                        // validateIE(e.target.value)
                        field.onChange(IEMask(e.target.value))
                      }} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <div style={{ height: '1px'}} className="w-1/12 bg-slate-500"></div>
              <h2 className="text-nowrap">Endereço</h2>
              <div style={{ height: '1px'}} className="w-full bg-slate-500"></div>
            </div>
            <div className="flex">
              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl className="h-20">
                      <div className="flex items-center">
                        <Input 
                          className="h-10 rounded-e-none"
                          maxLength={9} 
                          placeholder={`Insira o CEP`} 
                          value={field.value}
                          onChange={(e: any) => field.onChange(CEPMask(e.target.value))} 
                        />
                        <Button 
                          type="button"
                          className="h-10 rounded-s-none" 
                          onClick={() => handleCepSearch(form.getValues('cep').replace('-', ''))}
                        >
                          <MagnifyingGlassIcon />
                        </Button>
                      </ div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="logradouro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logradouro</FormLabel>
                  <FormControl className="h-20">
                    <Input className="h-10" placeholder={`Insira o logradouro`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl className="h-20">
                    <Input className="h-10" placeholder={`Insira o número`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bairro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl className="h-20">
                    <Input className="h-10" placeholder={`Insira o bairro`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="complemento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento</FormLabel>
                  <FormControl className="h-20">
                    <Input className="h-10" placeholder={`Insira o complemento`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="cidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl className="h-20">
                      <Input className="h-10" placeholder={`Insira a cidade`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="estado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl className="h-20">
                      <Input className="h-10" placeholder={`Insira o estado`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
              <FormField
                control={form.control}
                name="codIbge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código IBGE</FormLabel>
                    <FormControl className="h-20">
                    <Input 
                      className="h-10" 
                      placeholder={`Insira o código do IBGE`} 
                      value={field.value}
                      onChange={(e) => {
                        console.log(e.target.value)
                        const inputValue = e.target.value;
                        const numericValue = inputValue.replace(/\D/g, '');
                        const parsedValue = numericValue === '' ? '' : parseInt(numericValue);
                        field.onChange(parsedValue); 
                      }} 
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Concluir</Button>
            </form>
        </Form>
      </div>
      <GoogleMapComponent />
    </div>
  );
}