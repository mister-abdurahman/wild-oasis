import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface MutateType {
  bookingId: string;
  breakfast?: any;
}

const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }: MutateType) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking ID #${data.id} successfully checked in`);
      // queryClient.invalidateQueries({ active: true });
      queryClient.invalidateQueries();
      navigate("/");
    },
    onError: () => toast.error("An error occured while checking in"),
  });

  return { isCheckingIn, checkin };
};

export default useCheckin;
