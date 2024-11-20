import UserCard from "./UserCard";
import "../styles/UserList.css"

export default function UserList({ users, openEdit, openDelete }) {
  return (
    <div className="cards">
      {users?.map((user) => {
        return <UserCard key={user.id} user={user} openEdit={openEdit} openDelete = {openDelete}/>;
      })}
    </div>
  );
}
