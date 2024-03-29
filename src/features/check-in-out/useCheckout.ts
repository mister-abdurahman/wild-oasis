import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

const useCheckout = () => {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId: string) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking ID #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("An error occured while checking in"),
  });

  return { isCheckingOut, checkout };
};

export default useCheckout;
