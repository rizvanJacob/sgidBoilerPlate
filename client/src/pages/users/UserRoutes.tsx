import { Route, Routes } from "react-router-dom";
import UsersIndex from "./index/UsersIndex";
import EditUserForm from "./edit/EditUserForm";

export default function UserRoutes() {
  return (
    <Routes>
      am I here?
      <Route path="/" element={<UsersIndex />} />
      <Route path="/:id/edit" element={<EditUserForm />} />
    </Routes>
  );
}
