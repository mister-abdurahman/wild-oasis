import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineBanknotes,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import styled from "styled-components";

const StyledStatsContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  /* display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr; */

  @media only screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 1.4rem;
  }
`;

function Stats({ bookings, confirmedStays, numDays, cabinCount }: any) {
  // Stat 1)
  const numBookings = bookings?.length;

  // Stat 2)
  const sales = bookings?.reduce(
    (acc: any, cur: any) => acc + cur.totalPrice,
    0
  );
  // const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // Stat 3)
  const checkins = confirmedStays?.length;

  // Stat 4)
  // We will use a trick to calculate occupancy rate. It's not 100% accurate, but we want to keep it simple. We know we can have a total of 'numDays * cabinCount' days to occupy, and we also know how many days were actually booked. From this, we can compute the percentage
  const occupation =
    confirmedStays.reduce((acc: any, cur: any) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <StyledStatsContainer>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={numBookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={sales}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        value={checkins}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy rate"
        value={Math.round(occupation * 100) + "%"}
        color="yellow"
      />
    </StyledStatsContainer>
  );
}

export default Stats;
