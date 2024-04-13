import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";

const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  const { mutate: UpdateSetting, isPending: isUpdating } = useMutation({
    mutationFn: (newSetting: any) => updateSettingAPI(newSetting),
    onSuccess: () => {
      toast.success("Settings successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { UpdateSetting, isUpdating };
};

export default useUpdateSettings;
