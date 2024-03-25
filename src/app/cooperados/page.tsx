"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table"
import * as React from "react"

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

import { getCooperados } from "@/lib/redux/cooperados/cooperadosSlice"
import { DownloadIcon, PlusIcon, ReloadIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { Cooperado } from "../../schemas/cooperado.schema"

const columns: ColumnDef<Cooperado>[] = [
  {
    accessorKey: "nomeCooperado",
    header: "Cooperado",
  },
  {
    accessorKey: "fazenda",
    header: "Fazenda",
  },
  {
    accessorKey: "cidade",
    header: "Cidade",
  },
  {
    accessorKey: "estado",
    header: "Estado",
  },
];

export default function CooperadosPage() {
  const router = useRouter();
  const dispatch = useDispatch<any>()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const {cooperados, loading}: {cooperados: Cooperado[], loading: boolean} = useSelector((rootReducer: any) => rootReducer.cooperadosReducer)

  const handleRowSelection = (id: string) => {
    router.push(`/cooperados/${id}`)
  }

  React.useEffect(() => {
    dispatch(getCooperados())
  }, [dispatch])

  const table = useReactTable({
    data: cooperados,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <>
    {!loading ? (<div className="w-full px-24">
      <div className="flex justify-between py-4">
        <div className="flex gap-2">
          <Button 
            className="flex gap-2" 
            variant="default"
            onClick={() => handleRowSelection('0')}
          >
            Adicionar cooperado
            <PlusIcon/>
          </Button>
          <Button className="flex gap-2" variant="outline">
            Exportar dados
            <DownloadIcon/>
          </Button>
        </div>
        <Input
          placeholder="Filtrar cooperados"
          value={(table.getColumn("nomeCooperado")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nomeCooperado")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  onClick={() => handleRowSelection(String(row.original.IdCooperado))}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex gap-2 items-center">
          <div className="border-2 p-2 border-slate-100 rounded-sm">
            {table.getPaginationRowModel().rows.length} / página
          </div>
          Resultados por página
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>)
    :
      <div className="flex w-full h-screen items-center justify-center">
        <ReloadIcon className="w-12 h-12 animate-spin" />
      </div>
    }
    </>
  )
}
