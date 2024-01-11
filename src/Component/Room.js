import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Room = () => {
    // Show Room Data
    let [roomData, setRoomData] = useState([]);

    const showRoomData = async () => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/Meeting/GetAllRooms');
        setRoomData(result.data.data)
    }

    // Add Room Data
    let [roomObj, setRoomObj] = useState({
        "roomId": 0,
        "roomName": "",
        "roomLocation": "",
        "roomSeatingCapacity": 0,
        "isRoomActive": false,
        "clientId": 0,
        "createdDate": new Date(),
        "lastUpdatetd": new Date()
    })

    const saveRoomObj = async () => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/CreateRoom', roomObj)
        if (result.data.result) {
            alert('Save Room Data')
            showRoomData()
        } else {
            alert(result.data.message)
        }
    }

    const changeFormValue = (event, key) => {
        setRoomObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }

    const changeRoomActive = (event, key) => {
        setRoomObj(prevObj => ({ ...prevObj, IsRoomActive: event.target.checked }))
    }


    // Get Client ID
    let [getClientId, setGetClientID] = useState([]);

    const showClientID = async () => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/Meeting/GetAllClients');
        setGetClientID(result.data.data)
    }


    // Edit Room Data
    const editRoomData = async (id) => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/Meeting/GetRoomById?id=' + id)
        if (result.data.result) {
            setRoomObj(result.data.data)
        } else {
            alert(result.data.message)
        }
    }

    // Update Room Data
    const updateRoomData = async () => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/UpdateRoom', roomObj);
        if (result.data.result) {
            alert('Update Room')
            showRoomData()
        } else {
            alert(result.data.message)
        }
    }

    // Delete Room Data
    const deleteRoomData = async (id) => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/DeleteRoomById?id=' + id);
        if (result.data.result) {
            alert('Delete Room ');
            showRoomData()
        } else {
            alert(result.data.message)
        }
    }


    useEffect(() => {
        showRoomData()
        showClientID()
    }, [])
    return (
        <div>
            <div className='row text-start m-2'>
                <div className='col-8'>
                    <div className='card'>
                        <div className='card-header bg-success'>
                            <div className='row'>
                                <div className='col-12 text-white'>
                                    Room List
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
                                                <th>roomName</th>
                                                <th>roomLocation</th>
                                                <th>roomSeatingCapacity</th>
                                                <th>isRoomActive</th>
                                                <th>clientName</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                roomData.map((item, index) => {
                                                    return (<tr>
                                                        <td> {index + 1} </td>
                                                        <td> {item.roomName} </td>
                                                        <td> {item.roomLocation} </td>
                                                        <td> {item.roomSeatingCapacity} </td>
                                                        <td> {item.isRoomActive ? 'Yes' : 'No'} </td>
                                                        <td> {item.clientName} </td>
                                                        <td>
                                                            <button className='btn btn-sm btn-success m-2' onClick={() => { editRoomData(item.roomId) }}>Edit</button>
                                                            <button className='btn btn-sm btn-danger' onClick={() => { deleteRoomData(item.roomId) }}>Delete</button>
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
                                    Add Room
                                </div>
                            </div>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>RoomName</label>
                                    <input type='text' className='form-control' value={roomObj.roomName} onChange={(event) => { changeFormValue(event, 'roomName') }} />
                                </div>
                                <div className='col-6'>
                                    <label>RoomLocation</label>
                                    <input type='text' className='form-control' value={roomObj.roomLocation} onChange={(event) => { changeFormValue(event, 'roomLocation') }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>RoomSeatingCapacity</label>
                                    <input type='text' className='form-control' value={roomObj.roomSeatingCapacity} onChange={(event) => { changeFormValue(event, 'roomSeatingCapacity') }} />
                                </div>
                                <div className='col-6 mt-3'>
                                    <label>IsRoomActive</label>
                                    <input type='checkbox' className='form-check-input' value={roomObj.isRoomActive} onChange={(event) => { changeRoomActive(event) }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>ClientId</label>
                                    <select className='form-select' value={roomObj.clientId} onChange={(event) => { changeFormValue(event, 'clientId') }}>
                                        <option>Select Client Id</option>
                                        {
                                            getClientId.map((item) => {
                                                return (<option value={item.clientId}> {item.clientName} </option>)
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-6'>
                                    <label>CreatedDate</label>
                                    <input type='date' className='form-control' value={roomObj.createdDate} onChange={(event) => { changeFormValue(event, 'createdDate') }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>LastUpdatetd</label>
                                    <input type='date' className='form-control' value={roomObj.lastUpdatetd} onChange={(event) => { changeFormValue(event, 'lastUpdatetd') }} />
                                </div>
                            </div>
                            <div className='row m-3'>
                                <div className='col-6'>
                                    {roomObj.roomId == 0 && <button className='btn btn-sm btn-success' onClick={saveRoomObj}>Save Room</button>}
                                    {roomObj.roomId !== 0 && <button className='btn btn-sm btn-warning' onClick={updateRoomData}>Update Room</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Room;