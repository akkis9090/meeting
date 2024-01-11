import axios from 'axios';
import React, { useEffect, useState } from 'react';

const User = () => {
    // Show User Data
    let [userData, setUserData] = useState([]);

    const showUserData = async () => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/Meeting/GetAllusers');
        setUserData(result.data.data)
    }

    // ADD User Obj

    let [userObj, setUserObj] = useState({
        "userId": 0,
        "clientId": 0,
        "userName": "",
        "userPassword": "",
        "createdDate": new Date(),
        "lastUpdated": new Date(),
        "isActive": false,
        "role": ""
    })

    const saveUserObj = async () => {
        debugger
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/AddUsers', userObj)
        if (result.data.result) {
            alert('Save User')
            showUserData()
        } else {
            alert(result.data.message)
        }
    }

    const changeFormValue = (event, key) => {
        setUserObj(precObj => ({ ...precObj, [key]: event.target.value }))
    }

    const changeActiveValue = (event, key) => {
        setUserObj(precObj => ({ ...precObj, IsActive: event.target.checked }))
    }

    // Get Client ID
    let [clientID1, setClientID] = useState([]);
    const getClientID = async () => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/Meeting/GetAllClients')
        setClientID(result.data.data)
    }

    // Edit User Data
    const editUserData = async (id) => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/Meeting/GetUsersById?id=' + id)
        if (result.data.result) {
            setUserObj(result.data.data)
        } else {
            alert(result.data.message)
        }
    }

    // Update User Data
    const updateUserData = async () => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/UpdateUser', userObj);
        if (result.data.result) {
            alert('Update User')
            showUserData()
        } else {
            alert(result.data.message)
        }
    }

    // Delete User Data
    const deleteUserData = async (id) => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/DeleteUsersById?id=' + id);
        if (result.data.result) {
            alert('Delete User Data')
            showUserData()
        } else {
            alert(result.data.message)
        }
    }



    // UseEffect
    useEffect(() => {
        showUserData()
        getClientID()
    }, [])
    return (
        <div>
            <div className='row m-2'>
                <div className='col-8'>
                    <div className='card'>
                        <div className='card-header bg-success'>
                            <div className='row'>
                                <div className='col-12 text-white'>
                                    User List
                                </div>
                            </div>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-12'>
                                    <table className='table table-bordered'>
                                        <thead>
                                            <tr>
                                                <th>SR. No</th>
                                                <th>userName</th>
                                                <th>userPassword</th>
                                                <th>isActive</th>
                                                <th>clientName</th>
                                                <th>role</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                userData.map((item, index) => {
                                                    return (<tr>
                                                        <td> {index + 1} </td>
                                                        <td> {item.userName} </td>
                                                        <td> {item.userPassword} </td>
                                                        <td> {item.isActive ? 'Yes' : 'No'} </td>
                                                        <td> {item.clientName} </td>
                                                        <td> {item.role} </td>
                                                        <td>
                                                            <button className='btn btn-sm btn-success m-2' onClick={() => { editUserData(item.userId) }}>Edit</button>
                                                            <button className='btn btn-sm btn-danger' onClick={() => { deleteUserData(item.userId) }}>Delete</button>
                                                        </td>
                                                    </tr>)
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-4'>
                    <div className='card'>
                        <div className='card-header bg-success'>
                            <div className='row'>
                                <div className='col-12 text-white'>
                                    Add User
                                </div>
                            </div>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>ClientId</label>
                                    <select className='form-select' value={userObj.clientId} onChange={(event) => { changeFormValue(event, 'clientId') }}>
                                        <option>Select Client Id</option>
                                        {
                                            clientID1.map((item) => {
                                                return (<option value={item.clientId}> {item.clientName} </option>)
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-6'>
                                    <label>UserName</label>
                                    <input type='text' className='form-control' value={userObj.userName} onChange={(event) => { changeFormValue(event, 'userName') }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>UserPassword</label>
                                    <input type='text' className='form-control' value={userObj.userPassword} onChange={(event) => { changeFormValue(event, 'userPassword') }} />
                                </div>
                                <div className='col-6'>
                                    <label>CreatedDate</label>
                                    <input type='date' className='form-control' value={userObj.createdDate} onChange={(event) => { changeFormValue(event, 'createdDate') }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>LastUpdated</label>
                                    <input type='date' className='form-control' value={userObj.lastUpdated} onChange={(event) => { changeFormValue(event, 'lastUpdated') }} />
                                </div>
                                <div className='col-6 mt-3'>
                                    <label>IsActive:</label>
                                    <input type='checkbox' className='form-check-input' value={userObj.isActive} onChange={(event) => { changeActiveValue(event) }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Role</label>
                                    <input type='text' className='form-control' value={userObj.role} onChange={(event) => { changeFormValue(event, 'role') }} />
                                </div>
                            </div>

                            <div className='row m-3'>
                                <div className='col-6'>

                                    {userObj.userId == 0 && <button className='btn btn-sm btn-success' onClick={saveUserObj}>Save User</button>}
                                    {userObj.userId !== 0 && <button className='btn btn-sm btn-warning' onClick={updateUserData}>Update User</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;