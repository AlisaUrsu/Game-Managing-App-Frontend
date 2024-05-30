import { Controller, useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from "../network/games_api";
import * as GamesApi from "../network/games_api";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, Alert, styled, IconButton } from '@mui/material';
import { useState } from 'react';
import { ConflictError } from "../errors/http_errors";
import CloseIcon from '@mui/icons-material/Close';
import { CustomButton, CustomButtonCancel, CustomDialog, CustomDialogTitle, CustomFormControlLabel, CustomRadio, CustomTextField } from "./modal.styles";



interface SignUpModalProps {
    onDismiss: () => void,
    onSignUpSuccessful: (user: User) => void,
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
    const [errorText, setErrorText] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors, isSubmitting }, control } = useForm<SignUpCredentials>();

    async function onSubmit(credentials: SignUpCredentials) {
        try {
            const newUser = await GamesApi.signUp(credentials);
            onSignUpSuccessful(newUser);
        } catch (error) {
            if (error instanceof ConflictError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error);
        }
    }

    return (
        <CustomDialog  open onClose={onDismiss}>
            <CustomDialogTitle>
                Sign Up
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
                        label="Username"
                        color="secondary"
                        variant="outlined"
                        margin="normal"
                        {...register("username", { required: "Username is required" })}
                        error={!!errors.username}
                        helperText={errors.username ? errors.username.message : ""}
                    />
                    <CustomTextField
                        fullWidth
                        required
                        label="Email"
                        color="secondary"
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
                        color="secondary"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        {...register("password", { required: "Password is required" })}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ""}
                    />
                    <FormLabel component="legend" style={{ marginTop: '1rem',  color: '#FFFFFF' }}>Role</FormLabel>
                    <Controller
                        name="role"
                        control={control}
                        defaultValue="basic"
                        rules={{ required: "Role is required" }}
                        render={({ field }) => (
                            <RadioGroup {...field} row>
                                <CustomFormControlLabel value="basic" color="secondary" control={<CustomRadio />} label="Basic" />
                                <CustomFormControlLabel value="manager" color="secondary" control={<CustomRadio />} label="Manager" />
                                <CustomFormControlLabel value="admin" color="secondary" control={<CustomRadio />} label="Admin" />
                            </RadioGroup>
                        )}
                    />
                    {errors.role && <span style={{ color: 'red' }}>{errors.role.message}</span>}
                    <DialogActions>
                        <CustomButtonCancel onClick={onDismiss}>
                            Cancel
                        </CustomButtonCancel>
                        <CustomButton type="submit" disabled={isSubmitting} variant="contained">
                            Sign Up
                        </CustomButton>
                    </DialogActions>
                </form>
            </DialogContent>
        </CustomDialog >
    );
}

export default SignUpModal;
