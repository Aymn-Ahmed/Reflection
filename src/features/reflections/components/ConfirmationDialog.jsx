import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const ConfirmationDialog = ({ open, title, content, onCancel, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title || "تأكيد"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content || "هل أنت متأكد؟"}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit">
          إلغاء
        </Button>
        <Button onClick={onConfirm} color="error">
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
