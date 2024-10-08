import 'package:flutter/material.dart';
import 'package:frondend/model/entities.dart/user_credential.dart';
import 'package:frondend/view/screens/onboarding_pages/verification_screen.dart';
import 'package:frondend/view_model/services.dart/user_credential.dart';
import 'package:get/get.dart';

Future<void> registerUser(
  AuthService authService,
  TextEditingController nameController,
  TextEditingController phoneNumberController,
  TextEditingController emailController,
  TextEditingController passwordController,
) async {
  UserData user = UserData(
    name: nameController.text,
    phoneNumber: phoneNumberController.text,
    email: emailController.text,
    password: passwordController.text,
  );

  final success = await authService.registerUser(user);
  if (success) {
    Get.snackbar('Success', 'Credential added successfully',
        backgroundColor: Colors.blue);
    Get.to(() => VerificationScreen(
        name: nameController.text,
        email: emailController.text,
        phoneNumber: phoneNumberController.text,
        password: passwordController.text));
  } else {
    Get.snackbar('Error', 'Failed to register user. Please try again.',
        backgroundColor: Colors.red);
  }
}
