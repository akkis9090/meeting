import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Booking = () => {
    // Show Booking List
    let [bookingList, setBookingList] = useState([]);

    const showBookingList = async () => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/Meeting/GetAllBookings')
        setBookingList(result.data.data)
    }

    // Save Booking List
    let [bookingObj, setBookingObj] = useState({
        "bookingId": 0,
        "roomId": 0,
        "userId": 0,
        "bookingDate": new Date(),
        "fromTime": 0,
        "toTime": 0,
        "createdDate": new Date(),
        "lastUpdated": new Date()
    })

    const saveBooking = async () => {

        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/CreateBooking', bookingObj)
        if (result.data.result) {
            alert('Save Booking')
            showBookingList()
        } else {
            alert(result.data.message)
        }
    }

    const changeFormValue = (event, key) => {
        setBookingObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }
    // Get Client And Room ID
    let [userIDList, setUserIdList] = useState([]);
    let [roomIDList, setRoomIdList] = useState([]);

    const getUserId = async () => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/Meeting/GetAllusers');
        setUserIdList(result.data.data)
    }

    const getRoomId = async () => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/Meeting/GetAllRooms');
        setRoomIdList(result.data.data)
    }


    // Edit Booking List
    
    const editBookingList = async (id)=>{
        debugger
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/Meeting/GetAllBookingsByUserId?userId='+ id)
        if(result.data.result){
            setBookingObj(result.data.data[0])
        }else{
            alert(result.data.message)
        }
        
    }

    // Delete Booking List
    const deleteBookingList = async (id) =>{
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/DeleteBookingById?id=' +id)
        if(result.data.result){
            alert(result.data.message)
            showBookingList()
        }else{
            alert(result.data.message)
        }
    }

    // Update Booking List
    const updateBooking = async () => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/UpdateBooking', bookingObj)
        if (result.data.result) {
            alert('Employee Update Successfully...')
            showBookingList()
        } else {
            alert(result.data.message)
        }
    }

    // Use Effect
    useEffect(() => {
        showBookingList()
        getRoomId()
        getUserId()
    }, [])



    return (
        <div>
            <div className='row m-2'>
                <div className='col-8'>
                    <div className='card'>
                        <div className='card-header bg-success'>
                            <div className='row'>
                                <div className='col-12 text-white'>
                                    Booking List
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
                                                {/* <th>Client Name</th> */}
                                                <th>Room Name</th>
                                                <th>User Name</th>
                                                <th>Booking Date</th>
                                                <th>From Time</th>
                                                <th>To Time</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                bookingList.map((item, index) => {
                                                    return (<tr>
                                                        <td> {index + 1} </td>
                                                        {/* <td> {item.clientName} </td> */}
                                                        <td> {item.roomName} </td>
                                                        <td> {item.userName} </td>
                                                        <td> {item.bookingDate} </td>
                                                        <td> {item.fromTime} </td>
                                                        <td> {item.toTime} </td>
                                                        <td>
                                                            <button className='btn btn-sm btn-success m-2' onClick={()=>{editBookingList(item.userId)}}>Edit</button>
                                                            <button className='btn btn-sm btn-danger' onClick={()=>{deleteBookingList(item.bookingId)}}>Delete</button>
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
                                    Add Booking
                                </div>
                            </div>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>RoomId</label>
                                    <select className='form-select' value={bookingObj.roomId} onChange={(event) => { changeFormValue(event, 'roomId') }}>
                                        <option>Select Room ID</option>
                                        {
                                            roomIDList.map((item) => {
                                                return (<option value={item.roomId}> {item.roomName} </option>)
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-6'>
                                    <label>User Id</label>
                                    <select className='form-select' value={bookingObj.userId} onChange={(event) => { changeFormValue(event, 'userId') }}>
                                        <option>Select User ID</option>
                                        {
                                            userIDList.map((item) => {
                                                return (<option value={item.userId}> {item.userName} </option>)
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Booking Date</label>
                                    <input type='date' className='form-control' value={bookingObj.bookingDate} onChange={(event) => { changeFormValue(event, 'bookingDate') }} />
                                </div>
                                <div className='col-6'>
                                    <label>Created Date</label>
                                    <input type='date' className='form-control' value={bookingObj.createdDate} onChange={(event) => { changeFormValue(event, 'createdDate') }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>To Time</label>
                                    <input type='text' className='form-control' value={bookingObj.toTime} onChange={(event) => { changeFormValue(event, 'toTime') }} />
                                </div>
                                <div className='col-6'>
                                    <label>From Time</label>
                                    <input type='text' className='form-control' value={bookingObj.fromTime} onChange={(event) => { changeFormValue(event, 'fromTime') }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Last Updated</label>
                                    <input type='time' className='form-control' value={bookingObj.lastUpdated} onChange={(event) => { changeFormValue(event, 'lastUpdated') }} />
                                </div>

                            </div>

                            <div className='row m-3'>
                                <div className='col-6 '>
                                    {/* <button className='btn btn-sm btn-success' onClick={saveBooking}>Save Booking</button>
                                    <button className='btn btn-sm btn-warning' onClick={updateBooking}>Update Booking</button> */}

                                    {bookingObj.bookingId == 0 && <button className='btn btn-sm btn-primary' onClick={saveBooking}>Save Booking</button>}
                                    {bookingObj.bookingId !== 0 && <button className='btn btn-sm btn-warning' onClick={updateBooking}>Update Booking</button>}
                               
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;