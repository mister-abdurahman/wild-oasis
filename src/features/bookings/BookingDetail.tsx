import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal-v1";
import ConfirmDelete from "../../ui/ConfirmDelete";

// import { useBooking } from "features/bookings/useBooking";
// import { useDeleteBooking } from './useDeleteBooking';
import { useMoveBack } from "../../hooks/useMoveBack";
// import { useCheckout } from "../../features/check-in-out/useCheckout";
import ButtonText from "../../ui/ButtonText";
import Empty from "../../ui/Empty";
import useBooking from "./useBooking";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  // const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking();

  const { deleteBooking, isDeleting } = useDeleteBooking();
  // const moveBack = useMoveBack();
  const moveBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { id: bookingId, status } = booking;

  // We return a fragment so that these elements fit into the page's layout
  return (
    // <div>hello booking detail</div>
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading type="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            Check out
          </Button>
        )}
        <Modal>
          <Modal.Open opens={"delete"}>
            <Button variation="danger">Delete Booking</Button>
          </Modal.Open>

          <Modal.Window name={"delete"}>
            <ConfirmDelete
              resource={"Booking"}
              disabled={isDeleting}
              onConfirm={() =>
                deleteBooking(bookingId, { onSettled: () => navigate(-1) })
              }
            />
          </Modal.Window>
        </Modal>

        {/* <Button
          disabled={isDeleting}
          onClick={() => {
            deleteBooking(bookingId);
            navigate("/bookings");
          }}
        >
          Delete
        </Button> */}

        {/* <Modal>
          <Modal.Toggle opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Toggle>
          <Modal.Window name="delete">
            <ConfirmDelete
              resource="booking"
              // These options will be passed wherever the function gets called, and they determine what happens next
              // onConfirm={(options) => deleteBooking(bookingId, options)}
              // disabled={isDeleting}
            />
          </Modal.Window>
        </Modal> */}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
