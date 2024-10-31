import 'package:flutter/material.dart';
import 'package:frondend/view_model/services.dart/user_credential.dart';
import 'package:get/get.dart';

void onSubmitPasswordChange(
  TextEditingController currentPassowordController,
  TextEditingController newPasswordController,
) async {
  AuthService authService = AuthService();
  String currentPassword = currentPassowordController.text;
  String newPassword = newPasswordController.text;
  bool success = await authService.changePassword(currentPassword, newPassword);
  if (success) {
    Get.snackbar('Success', 'Passoword Change Successfully!',
        backgroundColor: Colors.green);
  } else {
    Get.snackbar('Error', 'Failed to change password. Try again.',
        backgroundColor: Colors.red);
  }
}
