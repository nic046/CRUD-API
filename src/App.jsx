import { useEffect, useState } from "react";
import "./App.css";
import useFetch from "./hooks/useFetch";
import Layout from "./layouts/Layout";
import AddEdit from "./components/AddEdit";
import UserList from "./components/UserList";
import Modal from "./components/Modal";
import Loader from "./components/Loader";
import Confirm from "./components/Confirm";

const baseUrl = "https://users-crud-api-81io.onrender.com/api/v1";

function App() {
  const [users, setUsers, loading] = useFetch();
  const [isOpen, setIsOpen] = useState(false);
  const [currentChild, setCurrentChild] = useState(null);

  useEffect(() => {
    readUsers();
  }, [isOpen]);

  // Create
  const createUser = (dataForm) => {
    setUsers({
      url: `${baseUrl}/users`,
      method: "POST",
      body: dataForm,
    });
    setIsOpen(false);
  };

  // Read
  const readUsers = () => {
    setUsers({ url: `${baseUrl}/users` });
  };

  //Update
  const updateUser = (dataForm, userId) => {
    setUsers({
      url: `${baseUrl}/users/${userId}`,
      method: "PATCH",
      body: dataForm,
    });
    setIsOpen(false);
  };

  //Delete
  const deleteUser = (userId) => {
    setUsers({
      url: `${baseUrl}/users/${userId}`,
      method: "DELETE"
    })
  }

  //handlerOpenModal
  const openAdd = () => {
    setIsOpen(true);
    setCurrentChild(<AddEdit onSave={createUser}/>);
  };

  const openEdit = (user) => {
    setIsOpen(true);
    setCurrentChild(<AddEdit user={user} onSave={updateUser}/>);
  };

  const openDelete = (user) => {
    setIsOpen(true);
    setCurrentChild(<Confirm user ={user} deleteUser={deleteUser} setIsOpen={setIsOpen}/>)
  }

  return (
    <Layout>
      <header className="header">
        <div className="header__container">
          <h1 className="header__title">Usuarios</h1>
          <div>
            <button className="header__button" type="button" onClick={openAdd}>
              Agregar Usuario
            </button>
          </div>
        </div>
      </header>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {currentChild}
      </Modal>

      <main className="container">
        {loading ? (
          <Loader/>
        ) : (
          <UserList users={users} openEdit={openEdit} openDelete={openDelete}/>
        )}
      </main>
    </Layout>
  );
}

export default App;
