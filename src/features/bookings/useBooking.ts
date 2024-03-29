import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

const useBooking = () => {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking = {},
    error,
  } = useQuery<any>({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId ?? "0"),
    retry: false,
  });

  console.log(booking);
  return { isLoading, booking, error };
};

export default useBooking;
