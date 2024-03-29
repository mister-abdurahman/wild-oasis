import styled from "styled-components";

import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
// import TodayActivity from './check-in-out/TodayActivity';
// import { useRecentBookings } from './useRecentBookings';
import Spinner from "../../ui/Spinner";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import useCabins from "../cabins/useCabins";
import TodayActivity from "../check-in-out/TodayActivity";
// import { useRecentStays } from './useRecentStays';
// import { useCabins } from './cabins/useCabins';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

/*
1) BOOKINGS: the actual sales. For example, in the last 30 days, the hotel might have sold 10 bookings online, but these guests might only arrive and check in in the far future (or not, as booking also happen on-site)
2) STAYS: the actual check-in of guests arriving for their bookings. We can identify stays by their startDate, together with a status of either 'checked-in' (for current stays) or 'checked-out' (for past stays)
*/

function DashboardLayout() {
  const { isLoading, bookings } = useRecentBookings();
  const { isLoadingStays, confirmedStays, numDays } = useRecentStays();
  const { isLoading: isLoadingCabins, cabin } = useCabins();

  if (isLoading || isLoadingStays || isLoadingCabins) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabin?.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
      {/* <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} /> */}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
