import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Autocomplete,
} from "@mui/material";
import { api } from "../../utils";
import type { Product, ProductReq, Category } from "../../utils";

interface Props {
  product: Product | undefined;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

const emptyForm: ProductReq = {
  categoryId: 0,
  name: "",
  sku: "",
  price: 0,
  remaining: 0,
};

const ProductDialog = ({ product, isOpen, onClose, onSaved }: Props) => {
  const [form, setForm] = useState<ProductReq>(emptyForm);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  useEffect(() => {
    api.get("/categories").then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    if (product) {
      setForm({
        categoryId: product.category.id,
        name: product.name,
        sku: product.sku,
        price: product.price,
        remaining: product.remaining,
      });
      setSelectedCategory(product.category);
    } else {
      setForm({ ...emptyForm });
      setSelectedCategory(null);
    }
  }, [isOpen]);

  const handleSave = async () => {
    if (product) {
      await api.put(`/products/${product.id}`, form);
    } else {
      await api.post("/products", form);
    }
    onSaved();
    onClose();
  };
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
      <DialogContent>
        <Autocomplete
          options={categories}
          getOptionLabel={(option) => option.name}
          value={selectedCategory}
          onChange={(_, newValue) => {
            setSelectedCategory(newValue);
            setForm({ ...form, categoryId: newValue?.id ?? 0 });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              margin="normal"
              variant="standard"
              fullWidth
            />
          )}
        />
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
          label="SKU"
          variant="standard"
          value={form.sku}
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Price"
          variant="standard"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: +e.target.value })}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Remaining"
          variant="standard"
          type="number"
          value={form.remaining}
          onChange={(e) => setForm({ ...form, remaining: +e.target.value })}
        />
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

export default ProductDialog;
