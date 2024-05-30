import { useState } from "react";
import { Game } from "../../models/game";
import { Controller, useForm } from "react-hook-form";
import { GameListInput } from "../../network/games_api";
import { Button, Modal, Form, FormLabel } from "react-bootstrap";
import TextInputField from "../form/TextInputField";
import { CustomButton, CustomButtonCancel, CustomDialog, CustomDialogTitle, CustomSelect, CustomTextField } from "../modal.styles";
import { DialogActions, DialogContent, DialogContentText, IconButton, MenuItem, Rating, Slider } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
//import "./AddGameToListModal.styles.css";

interface UpdateGameFromListModalProps {
    game: Game;
    onCancel: () => void;
    onUpdateGame: (status: string, review?: string, rating?: number) => void;
}

const UpdateGameFromListModal = ({ game, onCancel, onUpdateGame }: UpdateGameFromListModalProps) => {
    const {control, register, handleSubmit, formState: { errors, isSubmitting } } = useForm<GameListInput>();
    const [rating, setRating] = useState<number | undefined>(5);
    const onSubmit = (data: GameListInput) => {
        onUpdateGame(data.status, data.review, rating);
    };

    const ratingChanged = (event: Event,  newValue: number | number[]) => {
        setRating(newValue as number);
    };

    return (
        <CustomDialog open onClose={onCancel}>
            <CustomDialogTitle>
                Edit game
                <IconButton
                    aria-label="close"
                    onClick={onCancel}
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContentText>
                        <div style={{ color: '#FFFFFF', fontSize: '1.2rem', marginBottom: '1rem' }}>Game Title: {game.title}</div>
                        <div>
                            <FormLabel style={{ color: '#FFFFFF' }}>Status</FormLabel>
                            <CustomSelect
                                {...register("status", { required: "Status is required" })}
                                className={`form-control ${errors.status ? "is-invalid" : ""}`}
                                defaultValue="Playing"
                                sx={{
                                    color: '#FFFFFF',
                                    '& .MuiSelect-select': {
                                        paddingTop: '10px',
                                        paddingBottom: '10px',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#FFFFFF',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#6f36df',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#6f36df',
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="Playing">Playing</MenuItem>
                                <MenuItem value="Played">Played</MenuItem>
                                <MenuItem value="On hold">On Hold</MenuItem>
                                <MenuItem value="Dropped">Dropped</MenuItem>
                                <MenuItem value="Plan to play">Plan to Play</MenuItem>
                            </CustomSelect>
                            {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
                        </div>
                        <div>
                            <CustomTextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Review"
                                type="text"
                                placeholder="Review"
                                {...register("review")}
                                error={!!errors.review}
                                helperText={errors.review ? errors.review.message : ""}
                            />
                        </div>
                        <div style={{ marginTop: '1rem', color: '#FFFFFF' }}>
                            <FormLabel component="legend" sx={{color:'#FFFFFF'}}>Rating</FormLabel>
                            
                            <Slider
                                        {...register("rating")}
                                        onChange={ratingChanged}
                                        valueLabelDisplay="auto"
                                        shiftStep={3}
                                        step={1}
                                        marks
                                        value={rating}
                                        min={1}
                                        max={10}
                                        sx={{
                                            color: '#6f36df', // Custom color
                                            '& .MuiSlider-rail': {
                                                backgroundColor: '#6f36df', // Custom color for the rail
                                            },
                                            '& .MuiSlider-thumb': {
                                                '&:hover, &.Mui-focusVisible': {
                                                    boxShadow: '0px 0px 0px 8px rgba(111, 54, 223, 0.16)', // Custom hover/focus shadow
                                                },
                                                backgroundColor: '#fff', // Custom color for the thumb
                                                border: '2px solid #6f36df', // Custom border color
                                            },
                                            '& .MuiSlider-track': {
                                                backgroundColor: '#6f36df', // Custom color for the track
                                            },
                                        }}
                                        
                                    />
                            
                        </div>
                    </DialogContentText>
                    <DialogActions>
                        <CustomButtonCancel onClick={onCancel}>
                            Cancel
                        </CustomButtonCancel>
                        <CustomButton type="submit" disabled={isSubmitting} variant="contained">
                            Edit Game
                        </CustomButton>
                    </DialogActions>
                </form>
            </DialogContent>
        </CustomDialog>
    );
};

export default UpdateGameFromListModal;
