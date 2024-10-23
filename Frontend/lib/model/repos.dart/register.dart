import 'package:flutter/material.dart';
import 'package:frondend/model/entities.dart/user_data.dart';
import 'package:frondend/view/screens/onboarding_pages/verification_screen.dart';
import 'package:frondend/view_model/services.dart/user_credential.dart';
import 'package:get/get.dart';
import 'package:hive/hive.dart';

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
// check user already present...!
  var box = Hive.box<UserData>('userBox');
  UserData? existingUser = box.get(user.name);
  if (existingUser != null) {
    Get.snackbar('Error', 'User already exists with this name',
        backgroundColor: Colors.red);
    return;
  }

  final success = await authService.registerUser(user);
  if (success) {
    // store user data in Hive..!

    box.put('userProfile', user);
    print(box);
    Get.snackbar('Success', 'Credential added successfully',
        backgroundColor: Colors.blue);
    Get.to(() => VerificationScreen(
        name: nameController.text,
        email: emailController.text,
        phoneNumber: phoneNumberController.text,
        password: passwordController.text));
  } else {
    Get.snackbar('Error', 'User Crdential not added!',
        backgroundColor: Colors.red);
  }
}
