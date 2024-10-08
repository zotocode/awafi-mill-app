// import 'package:flutter/material.dart';
// import 'package:frondend/model/entities.dart/otp_verification.dart';
// import 'package:frondend/model/entities.dart/user_credential.dart';
// import 'package:frondend/view/screens/onboarding_pages/successfull_screen.dart';
// import 'package:frondend/view_model/services.dart/user_credential.dart';
// import 'package:get/get.dart';

// void otpVerify(
//   String name,
//   String phoneNumber,
//   String email,
//   String password,
//   String otpCode,
// ) async {
//   AuthService authService = AuthService();
//   UserData userData = UserData(
//       name: name, phoneNumber: phoneNumber, email: email, password: password);

//   // Register the user
//   bool isRegistered = await authService.registerUser(userData);

//   if (isRegistered) {
//     // Log the OTP sent from the server
//     final String sentOtp = extractOtpFromResponse();

//     // Log OTP value for debugging
//     print('Verifying OTP: $otpCode');
//     print('Sent OTP: $sentOtp');

//     // Verify the OTP
//     OtpVerification otpVerification =
//         OtpVerification(email: email, otp: otpCode);

//     bool isOtpVerified = await authService.verifyOtp(otpVerification);
//     if (isOtpVerified && otpCode == sentOtp) {
//       print('OTP Verified Successfully');
//       Get.snackbar('Success', 'OTP Verified Successfully',
//           backgroundColor: Colors.blue);
//       Get.to(() => SuccessfullScreen());
//     } else {
//       print('OTP Verification Failed');
//       Get.snackbar('Failed', 'OTP Verification Failed',
//           backgroundColor: Colors.red);
//     }
//   } else {
//     print('Registration Failed');
//     Get.snackbar('Failed', 'Registration Failed', backgroundColor: Colors.red);
//   }
// }
