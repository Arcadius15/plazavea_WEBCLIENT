import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
  

const ModalGeneric = ({titulo,lista}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    if (lista.length>0 && lista) {
        let listado = []
        for (let obj in lista) {
            listado.push(...Object.values(lista[obj]))
        }
        return (
                <div>
                    <Button onClick={handleOpen}>Ver</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {titulo}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'span'} variant={'body2'}>
                                <ul>{listado.map((x,y)=>(<li key={y}>{x}</li>))}</ul>
                            </Typography>
                        </Box>
                    </Modal>
                </div>
        )
    }else{
        return(
                <div>
                    <Button onClick={handleOpen} disabled>Ver</Button>
                </div>
        )
    }
    
}

export default ModalGeneric