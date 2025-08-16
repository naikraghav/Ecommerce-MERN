import { useEffect, useState } from 'react';
import SummaryApi from '../common/index.jsx';
import { toast } from 'react-toastify';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole.jsx';




const AllUsers = () => {
const [allUsers, setAllUsers] = useState([]);
const [openUpdateRole, setOpenUpdateRole] = useState(false);
const [updateUserDetails, setUpdateUserDetails] = useState({
  name: "",
  email: "",
  role: "",
  _id: ""
});
const fetchAllUsers = async () => {
  const fetchData = await fetch(SummaryApi.allUsers.url, {
    method: SummaryApi.allUsers.method,
    credentials: "include"
  });
  const dataResponse = await fetchData.json();
  if (dataResponse.success) {
    setAllUsers(dataResponse.data);
  }
  if (dataResponse.error) {
    toast.error(dataResponse.message);
  }
};
useEffect(() => {
  fetchAllUsers();
}, []);

  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable'>
        <thead>
          <tr>
            <th>SI</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          {
          allUsers.map((el, index) => (
            <tr  >
              <td>{index + 1}</td>
              <td>{el.name}</td>
              <td>{el.email}</td>
              <td>{el.role}</td>
              <td>{new Date(el.createdAt).toLocaleDateString()}</td>
              <td>
                <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500'onClick={() => {
                  setOpenUpdateRole(true);
                  setUpdateUserDetails(el);
                }}>
                  <MdModeEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openUpdateRole && (
        <ChangeUserRole
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          onClose={() => setOpenUpdateRole(false)}
          callFunc={fetchAllUsers}
        />
      )} 
    </div>
  )
}

export default AllUsers