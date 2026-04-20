import { useState, useEffect } from "react";
import api from "./plugins/axios";
import CustomerDialog from "./components/CustomerDialog";

function App() {
  const [customers, setCustomers] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const getCustomers = async () => {
    const { data } = await api.get("/customers");
    setCustomers(data);
  };

  const login = async () => {
    try {
      const { data } = await api.post("/auth/signin", {
        email: import.meta.env.VITE_EMAIL,
        password: import.meta.env.VITE_PASSWORD,
      });
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    } catch (e: any) {
      console.log("Login failed:", e.response?.data);
    }
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/customers/${id}`);
    getCustomers();
  };

  const handleEdit = (customer: any) => {
    setSelectedCustomer(customer);
    setIsOpen(true);
  };

  useEffect(() => {
    login().then(() => getCustomers());
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          setSelectedCustomer(null);
          setIsOpen(true);
        }}
      >
        Add Customer
      </button>
      <CustomerDialog
        isOpen={isOpen}
        customer={selectedCustomer}
        onClose={() => setIsOpen(false)}
        onSaved={getCustomers}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Rank</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer: any) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
              <td>{customer.rank}</td>
              <td>
                <button onClick={() => handleEdit(customer)}>Edit</button>
                <button onClick={() => handleDelete(customer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
