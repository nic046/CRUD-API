import UserCard from "./UserCard";
import "../styles/UserList.css"

export default function UserList({ users, openEdit, deleteUser }) {
  return (
    <div className="cards">
      {users?.map((user) => {
        return <UserCard key={user.id} user={user} openEdit={openEdit} deleteUser = {deleteUser}/>;
      })}
    </div>
  );
}
