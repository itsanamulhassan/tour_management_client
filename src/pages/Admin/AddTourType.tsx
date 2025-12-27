import { DataTable } from "@/components/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetToursQuery } from "@/redux/feature/authentication/tour/tourApi";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Edit</DropdownMenuLabel>
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button className="w-full" variant="destructive">
                Delete
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
const AddTourType = (props: Props) => {
  const { data: tours, isLoading: toursLoading } = useGetToursQuery(undefined);
  console.log(tours);
  return (
    <div>
      <DataTable
        columns={columns}
        data={[
          {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
          },
          // ...
        ]}
      />
    </div>
  );
};

export default AddTourType;
