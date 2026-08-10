import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { SyntheticEvent } from "react";

interface Props {
    open: boolean;
    onClose: (event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void;
    msg: string;
}

const AppSnackBar = ({ open, onClose, msg }: Props) => {
    return (
        <Snackbar
            open={open}
            onClose={onClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            autoHideDuration={6000}
        >
            <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
                {msg}
            </Alert>
        </Snackbar>
    );
};

export default AppSnackBar;
