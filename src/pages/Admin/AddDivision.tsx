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
import { toast } from "sonner";
import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import ConfirmationDialog from "@/components/confirmation-dialog";
import {
  useAddDivisionMutation,
  useGetDivisionsQuery,
  useRemoveDivisionMutation,
} from "@/redux/feature/division/division.api";
import type { CreateDivisionDTO } from "@/types/division.types";
import { divisionSchema } from "@/schemas/division.schemas";
import { Textarea } from "@/components/ui/textarea";
import SingleImageUploader from "@/components/image-uploader";

const AddDivision = () => {
  const [addDivisionOpen, setAddDivisionOpen] = useState<boolean>();
  const [image, setImage] = useState<File | null>(null);

  const { data: divisions, isLoading: divisionsLoading } =
    useGetDivisionsQuery(undefined);
  const [addDivision, { isLoading: addDivisionLoading }] =
    useAddDivisionMutation();
  const [removeDivision, { isLoading: removeDivisionLoading }] =
    useRemoveDivisionMutation();

  const form = useForm<CreateDivisionDTO>({
    resolver: zodResolver(divisionSchema.createDivision),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const onSubmit = async (data: CreateDivisionDTO) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);

    const res = await addDivision(formData).unwrap();
    if (res?.success) {
      toast.success(res.message);
      setAddDivisionOpen(false);
    }
  };

  const removeDivisionHandler = async (id: string) => {
    const res = await removeDivision(id).unwrap();
    if (res?.success) {
      toast.success(res.message);
    }
  };

  const columns: ColumnDef<Partial<CreateDivisionDTO & { _id: string }>>[] = [
    {
      accessorKey: "name",
      header: "Division",
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const division = row.original;
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
              <DropdownMenuLabel>View</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <ConfirmationDialog
                  disabled={removeDivisionLoading}
                  onConfirm={() =>
                    removeDivisionHandler(division._id as string)
                  }
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

  if (divisionsLoading) {
    return <Loader />;
  }
  return (
    <div>
      {/* Add division form and dialog */}
      <div className="flex justify-end mb-4">
        <Dialog
          open={addDivisionOpen}
          onOpenChange={() => setAddDivisionOpen(addDivisionOpen)}
        >
          <DialogTrigger asChild>
            <Button>Add Division</Button>
          </DialogTrigger>
          <DialogContent size="sm">
            <DialogHeader>
              <DialogTitle>Add new division</DialogTitle>
              <DialogDescription>
                Give the valid information for creating the new division.
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
                        <FormLabel>Enter the valid division.</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the division here."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Enter the valid description for the new division.
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Enter the description here."
                            id="message"
                          />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <SingleImageUploader onChange={setImage} />
                  <Button disabled={addDivisionLoading} type="submit">
                    Submit
                  </Button>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {/* Division data table */}
      <DataTable columns={columns} data={divisions} />
    </div>
  );
};

export default AddDivision;
