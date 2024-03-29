import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useTodayActivity() {
  const { isLoading: isLoadingTodayActivity, data: todayActivity } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { isLoadingTodayActivity, todayActivity };
}

export default useTodayActivity;
