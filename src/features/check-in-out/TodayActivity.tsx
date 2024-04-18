import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import useTodayActivity from "./useTodayActivities";
import Spinner from "../../ui/Spinner";
import TodayItem from "../dashboard/TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;

  @media only screen and (max-width: 1024px) {
    width: 100%;
    padding: 1.6rem 1.8rem;
  }
  @media only screen and (max-width: 500px) {
    grid-column: 1 / 2;
  }
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { isLoadingTodayActivity, todayActivity } = useTodayActivity();
  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {isLoadingTodayActivity ? (
        <Spinner />
      ) : todayActivity && todayActivity?.length > 0 ? (
        <TodayList>
          {todayActivity.map((activity) => (
            <TodayItem stay={activity} key={activity.id} />
          ))}
        </TodayList>
      ) : (
        <NoActivity>No Activities Yet.!</NoActivity>
      )}
    </StyledToday>
  );
}

export default TodayActivity;
