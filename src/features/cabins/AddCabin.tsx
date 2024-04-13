import Button from "../../ui/Button";
import Modal from "../../ui/Modal-v1";
import CreateCabinForm from "./CreateCabinForm";
import CabinTable from "./CabinTable-v1";

// function AddCabin() {
//   return (
//     <Modal>
//       <Modal.Toggle opens='new-cabin'>
//         <Button>Add new cabin</Button>
//       </Modal.Toggle>
//       <Modal.Window name='new-cabin'>
//         <CreateCabinForm />
//       </Modal.Window>
//     </Modal>
//   );
// }

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

        {/* <Modal.Open opens="table">
        <Button>Show Table</Button>
        </Modal.Open>
        <Modal.Window name="table">
        <CabinTable />
      </Modal.Window> */}
      </Modal>
    </div>
  );
}

// const AddCabin = () => {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((prev) => !prev)}>
//         + Add new cabin
//       </Button>

//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// };

export default AddCabin;
