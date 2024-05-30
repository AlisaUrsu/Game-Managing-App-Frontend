import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginCredentials } from "../network/games_api";
import * as GamesApi from "../network/games_api";

import TextInputField from "./form/TextInputField";
import { useState } from 'react';
import { UnauthorizedError } from "../errors/http_errors";
import { CustomButton, CustomButtonCancel, CustomDialog, CustomDialogTitle, CustomTextField } from "./modal.styles";
import { DialogActions, DialogContent, IconButton, Alert } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccessful: (user: User) => void,
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {

    const [errorText, setErrorText] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<LoginCredentials>();

    async function onSubmit(credentials: LoginCredentials) {
        try {
            const user = await GamesApi.login(credentials);
            onLoginSuccessful(user);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error);
        }
    }

    return (
        <CustomDialog open onClose={onDismiss}>
            <CustomDialogTitle>
                Log In
                <IconButton
                    aria-label="close"
                    onClick={onDismiss}
                    sx={{
                        position: 'absolute',
            right: 15,
            top: 15,
            color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </CustomDialogTitle>
            <DialogContent>
                {errorText &&
                    <Alert severity="error" style={{ marginBottom: '1rem' }}>
                    {errorText}
                </Alert>
                }
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <CustomTextField
                        fullWidth
                        required
                        label="Email"
                        type="email"
                        variant="outlined"
                        margin="normal"
                        {...register("email", { required: "Email is required" })}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
                    />
                    <CustomTextField
                        fullWidth
                        required
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        {...register("password", { required: "Password is required" })}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ""}
                    />
                    <DialogActions>
                        <CustomButtonCancel onClick={onDismiss}>
                            Cancel
                        </CustomButtonCancel>
                        <CustomButton type="submit" disabled={isSubmitting} variant="contained">
                            Log In
                        </CustomButton>
                    </DialogActions>
                </form>
            </DialogContent>
        </CustomDialog>
    );
}

export default LoginModal;