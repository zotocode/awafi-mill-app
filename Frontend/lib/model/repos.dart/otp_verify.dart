import 'package:flutter/material.dart';
import 'package:frondend/view/screens/onboarding_pages/successfull_screen.dart';
import 'package:frondend/view_model/services.dart/user_credential.dart';
import 'package:get/get.dart';

Future<void> verifyOtp(String otp, BuildContext context,
    AuthService authService, String email) async {
  try {
    final bool isVerified = await authService.verifyOtp(
      email: email,
      otp: otp,
    );

    if (isVerified) {
      Get.snackbar(
        'Success',
        'OTP verified successfully',
        backgroundColor: Colors.green,
        colorText: Colors.white,
      );
      Get.to(() => SuccessfullScreen());
    } else {
      Get.snackbar(
        'Error',
        'Invalid OTP. Please try again.',
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
    }
  } catch (e) {
    Get.snackbar(
      'Error',
      'Something went wrong. Please try again.',
      backgroundColor: Colors.red,
      colorText: Colors.white,
    );
  }
}
