import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Packags = () => {

    // Show Packages List
    let [packageList, setpackageList] = useState([]);

    const showPackagelist = async () => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/Meeting/GetAllPackages')
        setpackageList(result.data.data)
    }

    // Save Package Data
    let [packageObj, setPackageObj] = useState({
        "packageId": 0,
        "packageName": "",
        "packageCost": 0,
        "packageDescription": "",
        "psPackageActive": false
    })

    const addPackages = async () => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/CreatePackage', packageObj);
        if (result.data.result) {
            alert('Save Package');
            showPackagelist();
        } else {
            alert(result.data.message);
        }
    }

    const changeFormValue = (event, key) => {
        setPackageObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }

    const changeActiveValue = (event) => {
        setPackageObj(prevObj => ({ ...prevObj, IsPackageActive: event.target.checked }))
    }


    // Edit Packages List
    const editPacakge = async (id) => {
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/Meeting/GetPackgeById?id=' + id)
        if (result.data.result) {
            setPackageObj(result.data.data)
        } else {
            alert(result.data.message)
        }
    }

    // Update Package List
    const updatePackage = async () => {
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/UpdatePackge', packageObj)
        if (result.data.result) {
            alert("Upadte Package")
            showPackagelist()
        } else {
            alert(result.data.message)
        }
    }

    // Delete Package
    const deletePackage = async (id)=>{
        const result = await axios.post('https://onlinetestapi.gerasim.in/api/Meeting/DeletePackgeById?id=' + id)
        if(result.data.result){
            alert('Delete Package')
            showPackagelist();
        }else{
            alert(result.data.message)
        }
    }


    // UseEffect
    useEffect(() => {
        showPackagelist()
    })
    return (
        <div>
            <div className='row m-2 text-start'>
                <div className='col-8'>
                    <div className='card'>
                        <div className='card-header bg-success'>
                            <div className='row'>
                                <div className='col-12 text-white'>
                                    Packages List
                                </div>
                            </div>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-12'>
                                    <table className='table table-bordered text-center'>
                                        <thead>
                                            <tr>
                                                <th>SR. No</th>
                                                <th>Package Name</th>
                                                <th>Package Cost</th>
                                                <th>Package Description</th>
                                                <th>Package Active</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                packageList.map((item, index) => {
                                                    return (<tr>
                                                        <td> {index + 1} </td>
                                                        <td> {item.packageName} </td>
                                                        <td> {item.packageCost} </td>
                                                        <td> {item.packageDescription} </td>
                                                        <td> {item.isPackageActive ? 'Yes' : 'No'} </td>
                                                        <td>
                                                            <button className='btn btn-sm btn-success m-2' onClick={() => { editPacakge(item.packageId) }}>Edit</button>
                                                            <button className='btn btn-sm btn-danger' onClick={() => { deletePackage(item.packageId) }}>Delete</button>
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
                                    Add Packages
                                </div>
                            </div>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Package Name</label>
                                    <input type='text' className='form-control' value={packageObj.packageName} onChange={(event) => { changeFormValue(event, 'packageName') }} />
                                </div>
                                <div className='col-6'>
                                    <label>Package Cost</label>
                                    <input type='text' className='form-control' value={packageObj.packageCost} onChange={(event) => { changeFormValue(event, 'packageCost') }} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Package Description</label>
                                    <input type='text' className='form-control' value={packageObj.packageDescription} onChange={(event) => { changeFormValue(event, 'packageDescription') }} />
                                </div>
                                <div className='col-6 mt-4'>
                                    <label>Package Active</label>
                                    <input type='checkbox' class="form-check-input" value={packageObj.isPackageActive} onChange={(event) => { changeActiveValue(event) }} />
                                </div>
                            </div>



                            <div className='row m-4'>
                                <div className='col-6 text-center'>
                                    {/* <button className='btn btn-sm btn-success' onClick={addPackages}>Save Package</button>
                                    <button className='btn btn-sm btn-warning' onClick={updatePackage}>Update Package</button> */}
                                    {packageObj.packageId == 0 && <button className='btn btn-sm btn-primary' onClick={addPackages}>Save Employee</button>}
                                    {packageObj.packageId !== 0 && <button className='btn btn-sm btn-warning' onClick={updatePackage}>Update Employee</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Packags;