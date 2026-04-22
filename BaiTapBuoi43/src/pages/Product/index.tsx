import { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router";
import { api } from "../../utils";
import type { Product, Column } from "../../utils";
import { ProductTable, ProductDialog } from "../../components";

const ProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectingProduct, setSelectingProduct] = useState<Product | undefined>(
    undefined,
  );

  const getProducts = async () => {
    const data = await api.get("/products");
    setProducts(data);
  };

  const handleEdit = (id: number) => {
    const product = products.find((p) => p.id === id);
    setSelectingProduct(product);
    setIsOpen(true);
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/products/${id}`);
    getProducts();
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  useEffect(() => {
    getProducts();
  }, []);

  const columns: Column[] = [
    { value: "id", text: "ID" },
    { value: "name", text: "Name" },
    { value: "sku", text: "SKU" },
    { value: "price", text: "Price" },
    { value: "remaining", text: "Remaining" },
    { value: "action", text: "" },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">Product Management</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <ProductTable
        columns={columns}
        rows={products}
        onClickEdit={handleEdit}
        onClickDelete={handleDelete}
      />
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => {
          setSelectingProduct(undefined);
          setIsOpen(true);
        }}
      >
        Add Product
      </Button>
      <ProductDialog
        product={selectingProduct}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSaved={getProducts}
      />
    </Container>
  );
};

export default ProductPage;
