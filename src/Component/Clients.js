
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Clients = () => {
    // Show Client
    let [clientData, setClientData] = useState([]);
    
    const showClientData = async () => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/Meeting/GetAllClients')
        setClientData(result.data.data)
    }

    // Add Client list
    let [clientObj, setClientObj] = useState({
        "clientId": 0,
        "clientName": "",
        "companyName": "",
        "address": "",
        "city": "",
        "pinCode": "",
        "state": "",
        "employeeStrength": 0,
        "gstNo": "",
        "contactNo": ""
    })

    const addClientData = async () => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/AddClients', clientObj)
        if (result.data.result) {
            alert('Client Added')
            showClientData()
        } else {
            alert(result.data.message)
        }
    }

    const changeFormValue = (event, key) => {
        setClientObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }

    // Edit Client 
    const editClient = async (id) => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/Meeting/GetClientsById?id=' + id)
        if (result.data.result) {
            setClientObj(result.data.data)
        } else {
            alert(result.data.message)
        }
    }

    // Delete Client
    const deleteClient = async (id)=>{
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/DeleteClients?id=' +id)
        if(result.data.result){
            alert('Delete Client')
            showClientData()
        }else{
            alert(result.data.message)
        }
    }

    // Upadte Client
    const updateClient = async () => {
        debugger
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/UpdateClients', clientObj)
        if (result.data.result) {
            alert('Update Client')
            showClientData()
        } else {
            alert(result.data.message)
        }
    }

    // UseEffect
    useEffect(() => {
        showClientData()
    }, [])


    return (
        <div>
            <div className='row m-2 text-start'>
                <div className='col-8'>
                    <div className='card'>
                        <div className='card-header bg-success text-white'>
                            <div className='row'>
                                Show Client
                            </div>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>SR.No</th>
                                            <th>clientName</th>
                                            <th>companyName</th>
                                            <th>address</th>
                                            <th>employeeStrength</th>
                                            <th>contactNo</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            clientData.map((item, index) => {
                                                return (<tr>
                                                    <td> {index + 1} </td>
                                                    <td> {item.clientName} </td>
                                                    <td> {item.companyName} </td>
                                                    <td> {item.address} </td>
                                                    <td> {item.employeeStrength} </td>
                                                    <td> {item.contactNo} </td>
                                                    <td>
                                                        <button className='btn btn-sm btn-success m-2' onClick={() => { editClient(item.clientId) }}>Edit</button>
                                                        <button className='btn btn-sm btn-danger' onClick={() => { deleteClient(item.clientId) }}>Delete</button>
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

                <div className='col-4'>
                    <div className='card'>
                        <div className='card-header bg-success'>
                            <div className='row'>
                                <div className='col-6 text-white'>
                                    Add Client
                                </div>
                            </div>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>ClientName</label>
                                    <input type='text' className='form-control' value={clientObj.clientName} onChange={(event) => { changeFormValue(event, 'clientName') }} />
                                </div>
                                <div className='col-6'>
                                    <label>CompanyName</label>
                                    <input type='text' className='form-control' value={clientObj.companyName} onChange={(event) => { changeFormValue(event, 'companyName') }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Address</label>
                                    <input type='text' className='form-control' value={clientObj.address} onChange={(event) => { changeFormValue(event, 'address') }} />
                                </div>
                                <div className='col-6'>
                                    <label>City</label>
                                    <input type='text' className='form-control' value={clientObj.city} onChange={(event) => { changeFormValue(event, 'city') }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>PinCode</label>
                                    <input type='text' className='form-control' value={clientObj.pinCode} onChange={(event) => { changeFormValue(event, 'pinCode') }} />
                                </div>
                                <div className='col-6'>
                                    <label>State</label>
                                    <input type='text' className='form-control' value={clientObj.state} onChange={(event) => { changeFormValue(event, 'state') }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>EmployeeStrength</label>
                                    <input type='text' className='form-control' value={clientObj.employeeStrength} onChange={(event) => { changeFormValue(event, 'employeeStrength') }} />
                                </div>
                                <div className='col-6'>
                                    <label>GstNo</label>
                                    <input type='text' className='form-control' value={clientObj.gstNo} onChange={(event) => { changeFormValue(event, 'gstNo') }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>ContactNo</label>
                                    <input type='text' className='form-control' value={clientObj.contactNo} onChange={(event) => { changeFormValue(event, 'contactNo') }} />
                                </div>
                            </div>

                            <div className='row m-3'>
                                <div className='col-6'>
                                    {/* Save Button And Update Button */}


                                    {clientObj.clientId == 0 && <button className='btn btn-sm btn-primary' onClick={addClientData}>Save Client</button>}
                                    {clientObj.clientId !== 0 && <button className='btn btn-sm btn-warning' onClick={updateClient}>Update Client</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clients;