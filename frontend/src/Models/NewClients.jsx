import { Box, Typography, Button, Modal, Backdrop, Fade } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const ModalOpen = ({ cardData, openModat, closeModal}) => {
    return (
        <Box>
            <Modal aria-labelledby="transition-modal-title" 
                aria-describedby="transition-modal-description" 
                open={openModat} onClose={closeModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}>
                <Fade in={openModat}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">Text in a modal</Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</Typography>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};