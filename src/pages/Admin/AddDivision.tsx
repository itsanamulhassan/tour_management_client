import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader, MoreHorizontal } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { tourTypeSchemas } from "@/schemas/tour.schemas";
import type { CreateTourTypeDTO } from "@/types/tour.types";
import { DataTable } from "@/components/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useAddTourTypeMutation,
  useGetTourTypesQuery,
  useRemoveTourTypeMutation,
} from "@/redux/feature/tour/tour.type.api";
import { toast } from "sonner";
import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import ConfirmationDialog from "@/components/confirmation-dialog";

const AddDivision = () => {
  const [addTourTypeOpen, setTourTypeOpen] = useState<boolean>();

  const { data: tourTypes, isLoading: tourTypesLoading } =
    useGetTourTypesQuery(undefined);
  const [addTourType, { isLoading: addTourTypeLoading }] =
    useAddTourTypeMutation();
  const [removeTourType, { isLoading: removeTourTypeLoading }] =
    useRemoveTourTypeMutation();

  const form = useForm<CreateTourTypeDTO>({
    resolver: zodResolver(tourTypeSchemas.createTourType),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (values: CreateTourTypeDTO) => {
    const res = await addTourType(values).unwrap();
    if (res?.success) {
      toast.success(res.message);
      setTourTypeOpen(false);
    }
  };

  const removeTourTypeHandler = async (id: string) => {
    const res = await removeTourType(id).unwrap();
    if (res?.success) {
      toast.success(res.message);
    }
  };

  const columns: ColumnDef<Partial<CreateTourTypeDTO & { _id: string }>>[] = [
    {
      accessorKey: "name",
      header: "Type Name",
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const type = row.original;
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
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <ConfirmationDialog
                  disabled={removeTourTypeLoading}
                  onConfirm={() => removeTourTypeHandler(type._id as string)}
                >
                  <Button size="sm" className="w-full" variant="destructive">
                    Delete
                  </Button>
                </ConfirmationDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (tourTypesLoading) {
    return <Loader />;
  }
  return (
    <div>
      {/* Add tour types form and dialog */}
      <div className="flex justify-end mb-4">
        <Dialog
          open={addTourTypeOpen}
          onOpenChange={() => setTourTypeOpen(addTourTypeOpen)}
        >
          <DialogTrigger asChild>
            <Button>Add Division</Button>
          </DialogTrigger>
          <DialogContent size="sm">
            <DialogHeader>
              <DialogTitle>Add new tour type</DialogTitle>
              <DialogDescription>
                Give the valid information for creating the new tour type.
              </DialogDescription>
            </DialogHeader>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter the valid tour type.</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter the tour type" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button disabled={addTourTypeLoading} type="submit">
                    Submit
                  </Button>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {/* Tour type data table */}
      <DataTable columns={columns} data={tourTypes} />
    </div>
  );
};

export default AddDivision;
