import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { MoreHorizontal, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

interface DataTableAction<TData> {
  onView?: (data: TData) => void;
  onEdit?: (data: TData) => void;
  onDelete?: (data: TData) => void;
}

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  actions?: DataTableAction<TData>;
  emptyMessage?: string; 
  isLoading?: boolean;
  pagination?: {
    pageCount: number;
    pageIndex: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
  };
}

const DataTable = <TData,>({ 
  data, 
  columns, 
  actions, 
  emptyMessage = "No results found.", 
  isLoading,
  pagination
}: DataTableProps<TData>) => {

  // 1. Memoize columns to prevent unnecessary re-renders
  const tableColumns = useMemo(() => {
    if (!actions) return columns;

    const actionCol: ColumnDef<TData> = {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger className="h-8 w-8 p-0 hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50">
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                {actions.onView && (
                  <DropdownMenuItem onClick={() => actions.onView?.(rowData)}>
                    View Details
                  </DropdownMenuItem>
                )}
                {actions.onEdit && (
                  <DropdownMenuItem onClick={() => actions.onEdit?.(rowData)}>
                    Edit Role
                  </DropdownMenuItem>
                )}
                {actions.onDelete && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive" 
                      onClick={() => actions.onDelete?.(rowData)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    };
    return [...columns, actionCol];
  }, [columns, actions]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    pageCount: pagination?.pageCount ?? -1,
    state: {
      pagination: {
        pageIndex: pagination?.pageIndex ?? 0,
        pageSize: pagination?.pageSize ?? 10,
      },
    },
    onPaginationChange: (updater) => {
        if (typeof updater === 'function' && pagination) {
            const nextState = updater({
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize
            });
            pagination?.onPageChange?.(nextState.pageIndex);
        }
    },
    manualPagination: true, 
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // 2. Loading State
            <TableRow>
              <TableCell colSpan={tableColumns.length} className="h-24 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading data...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            // 3. Custom Empty Message
            <TableRow>
              <TableCell colSpan={tableColumns.length} className="h-24 text-center text-muted-foreground">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

          <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
            Total Pages: {pagination?.pageCount}
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <select
              className="h-8 w-[70px] rounded-md border bg-transparent"
              value={pagination?.pageSize}
              onChange={(e) => pagination?.onPageSizeChange(Number(e.target.value))}
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination?.onPageChange?.((pagination?.pageIndex ?? 0) - 1)}
              disabled={pagination?.pageIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page { (pagination?.pageIndex ?? 0) + 1} of {pagination?.pageCount}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination?.onPageChange?.((pagination?.pageIndex ?? 0) + 1)}
              disabled={pagination?.pageIndex === (pagination?.pageCount ?? 0) - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DataTable;