import EditContentForm from './EditContentForm';
import ReactDOM from 'react-dom';
import React from 'react';

const EditContentModal: React.FC = () => {
  const modalContent: React.ReactNode = (
    <div style={{display: 'none'}}>
      <div id="edit-content-modal">
        <EditContentForm/>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
};


export default EditContentModal;