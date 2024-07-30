import React from 'react'
import HomeNavbar from "../Components/Home/HomeNavbar";
import { Grid, Container } from "@mui/material";
import Typography from "@mui/material/Typography";

import Profile_img from "../Assests/team-1.jpg";

const UserDetails = () => {
    return (
        <div>
            <HomeNavbar />
            <div className="AboutusHeader">User Detail</div>
            <div className='container my-4 User_Details_section'>
                <form >
                    <div className='row'>

                        <div className='mb-4'>
                            <label for="fileToUpload">
                                <div class="profile-pic" style={{ backgroundImage: `url(Profile_img)` }}>
                                    <span class="glyphicon glyphicon-camera"></span>
                                    <span>Change Image</span>
                                </div>
                            </label>
                            <input type="File" name="fileToUpload" id="fileToUpload" />
                        </div>




                        <div className='col-xl-4 col-lg-4 col-md-6 col-12 mb-3'>
                            <div class="form-group">
                                <label for="exampleInputEmail1">First Name</label>
                                <div class="input-group d-flex" >
                                    <select class="form-select w-25 rounded" style={{ maxWidth: "25%" }}>
                                        <option selected>Ms</option>
                                        <option value="1">Mrs</option>
                                    </select>
                                    <div class="input-group-append w-75">
                                        <input type="text" class="form-control " placeholder="Enter First Name" />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='col-xl-4 col-lg-4 col-md-6 col-12 mb-3'>
                            <div class="form-group">
                                <label >Middle Name</label>
                                <input type="text" class="form-control " placeholder="Enter Middle Name" />
                            </div>
                        </div>
                        <div className='col-xl-4 col-lg-4 col-md-6 col-12 mb-3'>
                            <div class="form-group">
                                <label >Last Name</label>
                                <input type="text" class="form-control " placeholder="Enter Last Name" />
                            </div>
                        </div>

                        <div className='col-xl-4 col-lg-4 col-md-6 col-12 mb-3'>
                            <div class="form-group">
                                <label >Email ID</label>
                                <input type="email" class="form-control " placeholder="Enter Email Id" />
                            </div>
                        </div>

                        <div className='col-xl-4 col-lg-4 col-md-6 col-12 mb-3'>
                            <div class="form-group">
                                <label >Date Of Birth</label>
                                <input type="date" class="form-control " placeholder="Enter Date Of Birth" />
                            </div>
                        </div>
                        <div className='col-xl-4 col-lg-4 col-md-6 col-12 mb-3'>
                            <div class="form-group">
                                <label >Marital Status</label>
                                <select class="form-select ">
                                    <option selected>Single</option>
                                    <option value="1">Married</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-xl-4 col-lg-4 col-md-6 col-12 mb-3'>
                            <div class="form-group">
                                <label >Area</label>
                                <input type="text" class="form-control " placeholder="Enter Area" />
                            </div>
                        </div>
                        <div className='col-xl-4 col-lg-4 col-md-6 col-12 mb-3'>
                            <div class="form-group">
                                <label >State</label>
                                <select class="form-select ">
                                    <option selected>Select State</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-xl-4 col-lg-4 col-md-6 col-12 mb-3'>
                            <div class="form-group">
                                <label >City</label>
                                <input type="text" class="form-control " placeholder="Enter City" />
                            </div>
                        </div>
                        <div className='col-xl-4 col-lg-4 col-md-6 col-12 mb-3'>
                            <div class="form-group">
                                <label >Pincode</label>
                                <input type="Number" class="form-control " placeholder="Enter Pincode" />
                            </div>
                        </div>
                        <div className='col-xl-4 col-lg-4 col-md-6 col-12 mb-3'>
                            <div class="form-group">
                                <label >Occupation</label>
                                <select class="form-select ">
                                    <option selected>Employed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button className='btn btn_save_hp mt-4'>Save</button>
                </form>
            </div>
        </div>
    )
}

export default UserDetails
