import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../Config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import stateDistrictData from "../../state_district.json"; // Adjust path as per your file location
import { Container, Grid, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import HomeNavbar from "../Components/Home/HomeNavbar";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { AuthContext } from "../Context/AuthContext";

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  middleName: yup.string(),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  dob: yup.date().required('Date of Birth is required'),
  maritalStatus: yup.string().required('Marital Status is required'),
  area: yup.string().required('Area is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  pincode: yup.number().typeError('Pincode must be a number').required('Pincode is required'),
  occupation: yup.string().required('Occupation is required'),
});

const UserDetails = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedState, setSelectedState] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { currentUser } = useContext(AuthContext);

  console.log(currentUser)

  useEffect(() => {
    // Set initial states from JSON data
    setStates(Object.keys(stateDistrictData));
  }, []);

  useEffect(() => {
    if (selectedState) {
      const newDistricts = stateDistrictData[selectedState];
      setDistricts(newDistricts || []);
      setValue("city", ""); // Reset city field when state changes
    }
  }, [selectedState, setValue]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      let uploadedImageUrl = '';
  
      if (image) {
        console.log("Starting image upload:", image.name);
        const storage = getStorage(); // Ensure Firebase Storage is initialized
        const imageRef = ref(storage, `profile_images/${image.name}`);
        
        // Upload the file to Firebase Storage
        try {
          await uploadBytes(imageRef, image);
          console.log("Image uploaded successfully.");
          
          // Get the download URL
          uploadedImageUrl = await getDownloadURL(imageRef);
          console.log("Download URL:", uploadedImageUrl);
        } catch (uploadError) {
          console.error("Upload failed:", uploadError);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Image upload failed.',
          });
          return;
        }
      }
      const user = currentUser;
      const userid = user.uid;
      // Save the user data along with the image URL to Firestore
      const userCollectionRef = collection(db, 'userDetail');
      await setDoc(doc(userCollectionRef , user.uid), { ...data, imageUrl: uploadedImageUrl ,userid});
      console.log("User details saved to Firestore.");
  
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User details saved successfully!',
      }).then(() => {
        // Optionally redirect or reset form here
      });
  
    } catch (error) {
      console.error("Error saving data:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save user details.',
      });
    }
  };
  

  return (
    <div>
      <HomeNavbar />
      <div className="AboutusHeader">User Detail</div>
      <Container className='my-4 User_Details_section'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <div
                  className="profile-pic"
                  style={{ backgroundImage: `url(${imageUrl || 'https://www.w3schools.com/howto/img_avatar.png'})` }}
                >
                  <span className="glyphicon glyphicon-camera"></span>
                  <span>Change Image</span>
                </div>
              </label>
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="middleName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Middle Name"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email ID"
                    fullWidth
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="dob"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Date Of Birth"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.dob}
                    helperText={errors.dob?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="maritalStatus"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Marital Status</InputLabel>
                    <Select
                      {...field}
                      label="Marital Status"
                      error={!!errors.maritalStatus}
                    >
                      <MenuItem value="Single">Single</MenuItem>
                      <MenuItem value="Married">Married</MenuItem>
                    </Select>
                    {errors.maritalStatus && <p style={{ color: 'red' }}>{errors.maritalStatus.message}</p>}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="area"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Area"
                    fullWidth
                    error={!!errors.area}
                    helperText={errors.area?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="state"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>State</InputLabel>
                    <Select
                      {...field}
                      label="State"
                      onChange={(e) => {
                        const selectedState = e.target.value;
                        setSelectedState(selectedState);
                        setValue("state", selectedState);
                      }}
                      error={!!errors.state}
                    >
                      <MenuItem value="">Select State</MenuItem>
                      {states.map((state, index) => (
                        <MenuItem value={state} key={index}>
                          {state}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.state && <p style={{ color: 'red' }}>{errors.state.message}</p>}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>City</InputLabel>
                    <Select
                      {...field}
                      label="City"
                      onChange={(e) => setValue("city", e.target.value)}
                      error={!!errors.city}
                    >
                      <MenuItem value="">Select City</MenuItem>
                      {districts.map((district, index) => (
                        <MenuItem value={district} key={index}>
                          {district}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.city && <p style={{ color: 'red' }}>{errors.city.message}</p>}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="pincode"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Pincode"
                    fullWidth
                    type="number"
                    error={!!errors.pincode}
                    helperText={errors.pincode?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="occupation"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Occupation"
                    fullWidth
                    error={!!errors.occupation}
                    helperText={errors.occupation?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Button variant="contained" color="primary" type="submit">Submit</Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default UserDetails;
