import { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { MdModeEdit } from "react-icons/md";




const AllUsers = () => {
const [allUsers, setAllUsers] = useState([]);
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
                <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500'>
                  <MdModeEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AllUsers