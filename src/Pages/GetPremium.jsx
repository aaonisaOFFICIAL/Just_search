import React, { useContext, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import HomeNavbar from "../Components/Home/HomeNavbar";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { collection, addDoc, Timestamp, getDocs, query, where } from "firebase/firestore";
import { db } from "../Config";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import QrCode from "../../src/Assests/QrCodeScannerIcon.jpeg";

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
  .matches(/^[A-Za-z]*$/, "Last Name should contain only alphabets") // Allow empty string or alphabets
  .nullable(),
  fatherName: Yup.string()
  .matches(/^[A-Za-z]*$/, "Last Name should contain only alphabets") // Allow empty string or alphabets
    .nullable(),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date().required("Date of Birth is required"),
  emailid: Yup.string().email("Invalid email").required("Email ID is required"),
  digitalUpiTransactionID: Yup.string()
    .matches(/^\d{12}$/, "Must be a 12-digit number")
    .nullable(),
  contactNumber: Yup.string().matches(/^\d+$/, "Must be a number"),
});

function GetPremium() {
  const { currentUser } = useContext(AuthContext);
  const { uid } = currentUser;
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const checkUserRecord = async () => {
      try {
        const q = query(collection(db, "userPremium"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userRecord = querySnapshot.docs[0].data();
          const oneYearAgo = new Date();
          oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
          if (userRecord.created_at.toDate() > oneYearAgo) {
            setIsFormDisabled(true);
          }
        }
      } catch (error) {
        console.error("Error checking user record: ", error);
      }
    };

    checkUserRecord();
  }, [uid]);

  const onSubmit = async (data) => {
    const dataWithTimestamp = {
      ...data,
      uid: currentUser.uid,
      created_at: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "userPremium"), dataWithTimestamp);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Data saved!',
      });
      reset({
        fullName: "",
        fatherName: "",
        gender: "Male",
        contactNumber: "",
        qualification: "",
        dob: "",
        emailid: "",
        address: "",
        referCode: "",
        digitalUpiTransactionID: "",
      });
      setIsFormDisabled(true); // Lock the form after successful submission
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <HomeNavbar />
      <div className="AboutusHeader">Get Premium</div>
      <div className="container my-4 User_Details_section">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
              <div className="form-group">
                <label>Paid User</label>
                <Controller
                  name="fullName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                      placeholder="Enter Full Name"
                      {...field}
                      disabled={isFormDisabled}
                    />
                  )}
                />
                {errors.fullName && <div className="invalid-feedback">{errors.fullName.message}</div>}
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
              <div className="form-group">
                <label>Father’s Name</label>
                <Controller
                  name="fatherName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      className={`form-control ${errors.fatherName ? "is-invalid" : ""}`}
                      placeholder="Enter Father’s Name"
                      {...field}
                      disabled={isFormDisabled}
                    />
                  )}
                />
                {errors.fatherName && <div className="invalid-feedback">{errors.fatherName.message}</div>}
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
              <div className="form-group">
                <label>Gender</label>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue="Male"
                  render={({ field }) => (
                    <select
                      className={`form-control ${errors.gender ? "is-invalid" : ""}`}
                      {...field}
                      disabled={isFormDisabled}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  )}
                />
                {errors.gender && <div className="invalid-feedback">{errors.gender.message}</div>}
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
              <div className="form-group">
                <label>Qualification</label>
                <Controller
                  name="qualification"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      className={`form-control ${errors.qualification ? "is-invalid" : ""}`}
                      placeholder="Enter Qualification"
                      {...field}
                      disabled={isFormDisabled}
                    />
                  )}
                />
                {errors.qualification && <div className="invalid-feedback">{errors.qualification.message}</div>}
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
              <div className="form-group">
                <label>Date Of Birth</label>
                <Controller
                  name="dob"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="date"
                      className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                      {...field}
                      disabled={isFormDisabled}
                    />
                  )}
                />
                {errors.dob && <div className="invalid-feedback">{errors.dob.message}</div>}
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
              <div className="form-group">
                <label>E-mail ID</label>
                <Controller
                  name="emailid"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="email"
                      className={`form-control ${errors.emailid ? "is-invalid" : ""}`}
                      placeholder="Enter E-mail ID"
                      {...field}
                      disabled={isFormDisabled}
                    />
                  )}
                />
                {errors.emailid && <div className="invalid-feedback">{errors.emailid.message}</div>}
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
              <div className="form-group">
                <label>Address</label>
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      className={`form-control ${errors.address ? "is-invalid" : ""}`}
                      placeholder="Enter Address"
                      {...field}
                      disabled={isFormDisabled}
                    />
                  )}
                />
                {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
              <div className="form-group">
                <label>Refer Code</label>
                <Controller
                  name="referCode"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      className={`form-control ${errors.referCode ? "is-invalid" : ""}`}
                      placeholder="Enter Refer Code"
                      {...field}
                      disabled={isFormDisabled}
                    />
                  )}
                />
                {errors.referCode && <div className="invalid-feedback">{errors.referCode.message}</div>}
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
              <label>Scanner</label>
              <div className="input-group mb-3">
                <Controller
                  name="scanner"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Scanner"
                      {...field}
                      disabled={isFormDisabled}
                    />
                  )}
                />
                <span
                  className="input-group-text"
                  id="basic-addon2" style={{cursor:"pointer"}}
                  data-bs-toggle="modal"
                  data-bs-target="#QrCodeScannerIcon"
                >
                  <QrCodeScannerIcon />
                </span>
              </div>
              {/* QrCodeScannerIcon */}
              <div
                className="modal fade"
                id="QrCodeScannerIcon"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Scanner</h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body p-0">
                      <img src={QrCode} alt="QrCode" className="img-fluid" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-3">
              <div className="form-group">
                <label>Digit UPI Transaction ID</label>
                <Controller
                  name="digitalUpiTransactionID"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      className={`form-control ${errors.digitalUpiTransactionID ? "is-invalid" : ""}`}
                      placeholder="Enter 12 Digit UPI Transaction ID"
                      {...field}
                      disabled={isFormDisabled}
                    />
                  )}
                />
                {errors.digitalUpiTransactionID && <div className="invalid-feedback">{errors.digitalUpiTransactionID.message}</div>}
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
              <div className="form-check align-items-center">
                <input
                  style={{ height: "30px" }}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                  disabled={isFormDisabled}
                />
                <label className="form-check-label ms-2">
                  I have re-checked all the Details and agree to the
                  <a href=""> Terms & Conditions.</a>
                </label>
              </div>
            </div>
          </div>
          <button className="btn btn_save_hp mt-4" type="submit" disabled={isFormDisabled}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default GetPremium;
