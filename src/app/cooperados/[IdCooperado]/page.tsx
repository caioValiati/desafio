'use client'
import { getDetailedCooperado } from "@/lib/redux/cooperados/cooperadosSlice";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CooperadosPageComponent from "./cooperado";

type PropsType = {
  params: {
    IdCooperado: string
  }
}

export default function Page(props: PropsType) {
  const IdCooperado = props.params.IdCooperado;
  const dispatch = useDispatch<any>();
  const { cooperados, loading } = useSelector((rootReducer: any) => rootReducer.cooperadosReducer);
  const isEdit = IdCooperado === '0'

  useEffect(() => {
    if (isEdit) {
      return
    }
    dispatch(getDetailedCooperado(IdCooperado));
  }, [dispatch, IdCooperado, isEdit]);

  return (
    <div>
      {
        loading ? 
          <div className="animate-spin"><ReloadIcon /></div> 
        : 
          <CooperadosPageComponent cooperado={isEdit ? null : cooperados} />
      }
    </div>
  );
}

