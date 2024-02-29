import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IFormData } from "./CreateCabinForm";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: EditCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }: { newCabin: IFormData; id: number }) =>
      createEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin successfully Edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { EditCabin, isEditing };
};

export default useEditCabin;
