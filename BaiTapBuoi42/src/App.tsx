import { useState, useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";
import api from "./plugins/axios";
import { CustomerTable, CustomerDialog } from "./components";
import type { Column, Customer } from "./utils";

const columns: Column[] = [
  { value: "id", text: "ID" },
  { value: "name", text: "Name" },
  { value: "email", text: "Email" },
  { value: "phone", text: "Phone" },
  { value: "address", text: "Address" },
  { value: "rank", text: "Rank" },
  { value: "action", text: "" },
];

export default function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectingCustomer, setSelectingCustomer] = useState<
    Customer | undefined
  >(undefined);

  const login = async () => {
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      const { data } = await api.post("/auth/signin", {
        email: import.meta.env.VITE_EMAIL,
        password: import.meta.env.VITE_PASSWORD,
      });
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    } catch (e) {
      console.log("Login failed:", e.response?.data);
    }
  };

  const getCustomers = async () => {
    const { data } = await api.get("/customers");
    setCustomers(data);
  };

  const handleEdit = (id: number) => {
    const customer = customers.find((c) => c.id === id);
    setSelectingCustomer(customer);
    setIsOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    await api.delete(`/customers/${id}`);
    getCustomers();
  };

  useEffect(() => {
    login().then(() => getCustomers());
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Customer Management
      </Typography>
      <CustomerTable
        columns={columns}
        rows={customers}
        onClickEdit={handleEdit}
        onClickDelete={handleDelete}
      />
      <CustomerDialog
        customer={selectingCustomer}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSaved={getCustomers}
      />
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => {
          setSelectingCustomer(undefined);
          setIsOpen(true);
        }}
      >
        Add Customer
      </Button>
    </Container>
  );
}
