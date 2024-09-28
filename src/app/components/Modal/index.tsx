import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Dialog,
    DialogContent,
} from '@mui/material';
import { RootState } from '../../../store';
import { closeModal } from '../../../store/reducers/modal/modal.slice';

const Modal: React.FC = () => {
    const dispatch = useDispatch();
    const modals = useSelector((state: RootState) => state.modal.modals);

    if (modals.length === 0) return null;

    return (
        <>
            {modals.map((modal) => (
                <Dialog
                    key={modal.id}
                    open={true}
                    onClose={() => dispatch(closeModal(modal.id))}
                    fullWidth
                    maxWidth="xl"
                >
                    <DialogContent onClick={(e) => e.stopPropagation()}>
                        {modal.content}
                    </DialogContent>
                </Dialog>
            ))}
        </>
    );
};

export default Modal;
