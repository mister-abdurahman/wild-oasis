import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IFormData } from "./CreateCabinForm";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: CreateCabin, isPending: isCreating } = useMutation({
    mutationFn: ({ newCabin, id }: any) => createEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { CreateCabin, isCreating };
};

export default useCreateCabin;
