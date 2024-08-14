import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../Config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import stateDistrictData from "../../state_district.json"; // Adjust path as needed
import { Container, Grid, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import HomeNavbar from "../Components/Home/HomeNavbar";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { AuthContext } from "../Context/AuthContext";

// Validation schema
const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Za-z]+$/, "First Name should contain only alphabets")
    .required('First Name is required'),
  lastName: yup
    .string()
    .matches(/^[A-Za-z]*$/, "Last Name should contain only alphabets") // Allow empty string or alphabets
    .nullable(),
  dob: yup
    .date()
    .required('Date of Birth is required')
    .typeError('Invalid Date of Birth'),
  title: yup.string(),
  email: yup
    .string()
    .email('Invalid email'),
  maritalStatus: yup.string(),
  area: yup.string(),
  state: yup.string(),
  city: yup.string(),
  pincode: yup
  .string()
  .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits")
  .nullable()
  .transform((value, originalValue) => originalValue === "" ? null : value),
occupation: yup.string(),
});

const UserDetails = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Set initial states from JSON data
    setStates(Object.keys(stateDistrictData));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const userDocRef = doc(db, 'userDetail', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          reset({
            ...userData,
            dob: userData.dob ? userData.dob.toDate()
            .toISOString()
            .substr(0, 10) 
            : ''
          });
          setImageUrl(userData.imageUrl || '');
          setSelectedState(userData.state || '');
          setDistricts(stateDistrictData[userData.state] || []);
          setSelectedCity(userData.city || '');
          setValue("city", userData.city || ''); 
        }
      }
    };

    fetchData();
  }, [currentUser, reset, setValue]);

  useEffect(() => {
    if (selectedState) {
      const newDistricts = stateDistrictData[selectedState];
      setDistricts(newDistricts || []);
      setValue("city", selectedCity); // Reset city field when state changes
    }
  }, [selectedState, selectedCity, setValue]);

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
      const userDocRef = doc(db, 'userDetail', user.uid);
      const userDoc = await getDoc(userDocRef);

      // Determine if it's an update or a new document
      const isUpdate = userDoc.exists();
      const createdAt = isUpdate ? userDoc.data().createdAt : Timestamp.now();
      const updatedAt = Timestamp.now(); // Get the current timestamp

      // Save the user data along with the image URL and timestamps to Firestore
      await setDoc(userDocRef, { 
        ...data, 
        // dob: new Date(data.dob),
        dob: new Date(data.dob),
        imageUrl: uploadedImageUrl, 
        userid, 
        createdAt, // Keep the original created timestamp
        updatedAt  // Update the timestamp for each modification
      });
      console.log("User details saved to Firestore.");

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User details saved successfully!',
      })

    } catch (error) {
      console.error("Error saving data:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save user details',
      });
    }
  };
  console.log("onSubmit123",onSubmit)

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
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Controller
                  name="title"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Title</InputLabel>
                      <Select
                        {...field}
                        label="Title"
                        error={!!errors.title}
                        // sx={{width:"60%"}}
                      >
                        <MenuItem value="">Select Title</MenuItem>
                        <MenuItem value="Mr">Mr</MenuItem>
                        <MenuItem value="Mrs">Mrs</MenuItem>
                        <MenuItem value="Ms">Ms</MenuItem>
                      </Select>
                      {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
                    </FormControl>
                  )}
                />
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
                      inputProps={{ pattern: "^[A-Za-z]*$" }} // Allow empty or alphabets only
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
                        <MenuItem value="">Select Status</MenuItem>
                        <MenuItem value="Single">Single</MenuItem>
                        <MenuItem value="Married">Married</MenuItem>
                        <MenuItem value="Widow">Widow</MenuItem>
                        <MenuItem value="Divorced">Divorced</MenuItem>
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
                      inputProps={{ pattern: "^[A-Za-z]+$" }}
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
                        error={!!errors.state}
                        onChange={(e) => {
                          const stateValue = e.target.value;
                          setValue("state", stateValue);
                          setSelectedState(stateValue);
                          setDistricts(stateDistrictData[stateValue] || []);
                          setSelectedCity(""); // Reset selected city when state changes
                          setValue("city", ""); // Reset city value when state changes
                        }}
                      >
                        <MenuItem value="">Select State</MenuItem>
                        {states.map((state, index) => (
                          <MenuItem key={index} value={state}>{state}</MenuItem>
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
                        error={!!errors.city}
                        onChange={(e) => {
                          setValue("city", e.target.value);
                          setSelectedCity(e.target.value);
                        }}
                      >
                        <MenuItem value="">Select City</MenuItem>
                        {districts.map((district, index) => (
                          <MenuItem key={index} value={district}>{district}</MenuItem>
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
                      error={!!errors.pincode}
                      helperText={errors.pincode?.message}
                      inputProps={{ pattern: "^[0-9]{6}$", maxLength: 6 }}
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
                    <FormControl fullWidth>
                      <InputLabel>Occupation</InputLabel>
                      <Select
                        {...field}
                        label="Occupation"
                        error={!!errors.occupation}
                      >
                        <MenuItem value="">Select Occupation</MenuItem>
                        <MenuItem value="Employed">Employed</MenuItem>
                        <MenuItem value="Unemployed">Unemployed</MenuItem>
                        <MenuItem value="Farmer">Farmer</MenuItem>
                        <MenuItem value="Media">Media</MenuItem>
                        <MenuItem value="Business Man">Business Man</MenuItem>
                        <MenuItem value="Sports">Sports</MenuItem>
                        <MenuItem value="Armed forces">Armed forces</MenuItem>
                        <MenuItem value="Government Service">Government Service</MenuItem>
                        <MenuItem value="CA">CA</MenuItem>
                        <MenuItem value="Doctor">Doctor</MenuItem>
                        <MenuItem value="Lawyer">Lawyer</MenuItem>
                        <MenuItem value="House wife">House wife</MenuItem>
                        <MenuItem value="Retired">Retired</MenuItem>
                        <MenuItem value="Student">Student</MenuItem>
                        <MenuItem value="Clerk">Clerk</MenuItem>
                      </Select>
                      {errors.occupation && <p style={{ color: 'red' }}>{errors.occupation.message}</p>}
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default UserDetails;
