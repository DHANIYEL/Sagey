import { setVerified } from "@/redux/reducers/userSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isVerified = useSelector((state) => state.user.isVerified); // Get verification status from Redux

  
  useEffect(() => {

    // If user is already verified, redirect them to the /register page or home page
    if (isVerified) {
      navigate("/register"); // You can change this to "/" or wherever you want
      return; // Ensure we don't proceed further
    }

    window.otpless = (otplessUser) => {
      console.log(otplessUser);
      if (otplessUser && otplessUser.status === "SUCCESS") {
        dispatch(setVerified()); // Set user as verified
        const identityValue = otplessUser.identities[0]?.identityValue;
        console.log(identityValue);
      }
    };
  }, [dispatch, navigate, isVerified]); // Re-run when isVerified changes


  return (
    <div className="my-40">
      <div id="otpless-login-page"></div>
    </div>
  );
};

export default SignUp;
