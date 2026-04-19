import { useEffect, useState } from "react";
import api from "../plugins/axios";

const CustomerDialog = ({
  isOpen,
  customer,
  onClose,
  onSaved,
}: {
  isOpen: boolean;
  customer: any;
  onClose: () => void;
  onSaved: () => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [rank, setRank] = useState("GOLD");

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setEmail(customer.email);
      setPhone(customer.phone);
      setAddress(customer.address);
      setRank(customer.rank);
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setRank("GOLD");
    }
  }, [customer]);

  const handleSave = async () => {
    if (customer) {
      await api.put(`/customers/${customer.id}`, {
        name,
        email,
        phone,
        address,
        rank,
      });
    } else {
      await api.post("/customers", { name, email, phone, address, rank });
    }
    onSaved();
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          background: "white",
          margin: "100px auto",
          padding: 20,
          width: 400,
        }}
      >
        <h2>{customer ? "Edit Customer" : "Add Customer"}</h2>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <select value={rank} onChange={(e) => setRank(e.target.value)}>
          <option value="GOLD">GOLD</option>
          <option value="SILVER">SILVER</option>
          <option value="BRONZE">BRONZE</option>
        </select>
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default CustomerDialog;
