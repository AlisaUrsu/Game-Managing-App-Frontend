import "./DeleteGameModal.styles.css";

interface DeleteModalProps {
    onCancelButton: () => void;
    onDeleteButton: () => void;
}
const DeleteGameModal = ({onCancelButton, onDeleteButton}: DeleteModalProps) => {
    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <i className="far fa-trash-alt"></i>
                    <div className="modal-title">Confirm Delete</div>
                    <div className="modal-body">Are you sure you want to delete this item?</div>
                    <div className="modal-buttons">
                        <button className="modal-button modal-button-cancel" onClick={onCancelButton}>Cancel</button>
                        <button className="modal-button modal-button-delete" onClick={onDeleteButton}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteGameModal;