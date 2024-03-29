import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { RES_PER_PAGE } from "../../utils/constants";

const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const sortValue = searchParams.get("sortBy") || "startDate-desc";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { label: "status", value: filterValue };
  const [field, direction] = sortValue.split("-");
  const sortBy = { field, direction };
  // { label: "totalPrice", value: 3000, method: "gte" };

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery<any>({
    queryKey: ["bookings", filter, sortBy, currentPage],
    queryFn: () => getAllBookings({ filter, sortBy, currentPage }),
  });

  // PRE-FETCHING:
  const pageCount = Math.ceil(count / RES_PER_PAGE);

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage - 1],
      queryFn: () =>
        getAllBookings({ filter, sortBy, currentPage: currentPage - 1 }),
    });
  }
  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage + 1],
      queryFn: () =>
        getAllBookings({ filter, sortBy, currentPage: currentPage + 1 }),
    });
  }

  return { isLoading, bookings, error, count };
};

export default useBookings;
