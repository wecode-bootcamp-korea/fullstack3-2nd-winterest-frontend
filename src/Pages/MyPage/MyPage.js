import { useState } from 'react';
import Modal from '../../Components/Modal/Modal';
import BoardCreateModal from '../../Components/BoardCreateModal/BoardCreateModal';
import BoardModifyModal from '../../Components/BoardModifyModal/BoardModifyModal';

function MyPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [changeForm, setChangeForm] = useState('Modify');
  const openModal = e => {
    if (e.target.name === 'Modify') {
      setChangeForm('Modify');
    } else {
      setChangeForm('Create');
    }
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <button onClick={openModal} name="Modify">
        수정
      </button>
      <button onClick={openModal} name="Create">
        생성
      </button>
      <Modal open={modalOpen} close={closeModal}>
        {changeForm === 'Modify' && <BoardModifyModal />}
        {changeForm === 'Create' && <BoardCreateModal />}
      </Modal>
    </div>
  );
}

export default MyPage;
