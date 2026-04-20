import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Customer } from "../../utils";
import api from "../../plugins/axios";

interface Props {
  customer: Customer | undefined;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

const emptyCustomer: Customer = {
  id: 0,
  name: "",
  email: "",
  phone: "",
  address: "",
  rank: "GOLD",
};

const CustomerDialog = ({ customer, isOpen, onClose, onSaved }: Props) => {
  const [form, setForm] = useState<Customer>(emptyCustomer);

  useEffect(() => {
    if (!isOpen) return;
    setForm(customer ? { ...customer } : { ...emptyCustomer });
  }, [isOpen, customer]);

  const handleSave = async () => {
    if (customer) {
      await api.put(`/customers/${customer.id}`, form);
    } else {
      await api.post("/customers", form);
    }
    onSaved();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{customer ? "Edit Customer" : "Add Customer"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          variant="standard"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          variant="standard"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone"
          variant="standard"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Address"
          variant="standard"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Rank"
          variant="standard"
          select
          value={form.rank}
          onChange={(e) => setForm({ ...form, rank: e.target.value })}
        >
          <MenuItem value="GOLD">GOLD</MenuItem>
          <MenuItem value="SILVER">SILVER</MenuItem>
          <MenuItem value="BRONZE">BRONZE</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button color="error" variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button color="success" variant="outlined" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerDialog;
