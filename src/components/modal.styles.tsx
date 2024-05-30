
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, Alert, styled, IconButton, Select } from '@mui/material';





// Custom styles for the Dialog
export const CustomDialog = styled(Dialog)(({ theme }) => ({
    '.MuiDialog-paper': {
        padding: theme.spacing(3.5),
        backgroundColor: '#16121F',
    },
}));

// Custom styles for the DialogTitle
export const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
    fontSize: '1.75rem',
    color: '#FFFFFF',
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        color: '#FFFFFF',
        fontSize: '1rem', // Change the font size here
    },
    '& label': {
        color: '#FFFFFF',
        fontSize: '1rem', // Change the font size here
    },
    '& label.Mui-focused': {
        color: '#6f36df',
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
}));

// Custom styles for the FormLabel and FormControlLabel
export const CustomFormLabel = styled(FormLabel)(({ theme }) => ({
    color: '#FFFFFF',
}));

export const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    '& .MuiTypography-root': {
        color: '#FFFFFF',
    },
}));

// Custom styles for the Radio
export const CustomRadio = styled(Radio)(({ theme }) => ({
    color: '#FFFFFF',
    '&.Mui-checked': {
        color: '#6f36df',
    },
}));

export const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#6f36df',
    color: '#FFFFFF',
    '&:hover': {
        backgroundColor: '#5a2db8',
    },
}));

export const CustomButtonCancel = styled(Button)(({ theme }) => ({
    backgroundColor: '#16121F',
    color: '#FFFFFF',
}));

export const CustomSelect = styled(Select)(({ theme }) => ({
    '& .MuiInputBase-root': {
        color: '#FFFFFF',
        fontSize: '1rem',
    },
    '& .MuiSelect-select.MuiSelect-select': {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
    },
}));