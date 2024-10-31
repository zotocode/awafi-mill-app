// Get all users from the box...!

import 'package:flutter/material.dart';
import 'package:frondend/model/entities.dart/user_data.dart';
import 'package:hive/hive.dart';

Future<void> getAllUsers(
    TextEditingController nameController,
    TextEditingController emailController,
    TextEditingController phoneNumberController) async {
  var box = Hive.box<UserData>('userBox');
  UserData? user = box.get('userProfile');
  if (user != null) {
    nameController.text = user.name!;
    emailController.text = user.email;
    phoneNumberController.text = user.phoneNumber;
  }
}

// update all users from the box...!

Future<void> updateUserProfile(
    TextEditingController nameController,
    TextEditingController phoneNumberController,
    TextEditingController emailController,
    BuildContext context) async {
  var box = Hive.box<UserData>('userBox');
  UserData updatedUser = UserData(
    name: nameController.text,
    phoneNumber: phoneNumberController.text,
    email: emailController.text,
  );

  await box.put('userProfile', updatedUser); // Update the user data
  ScaffoldMessenger.of(context).showSnackBar(SnackBar(
    content: Text('Profile updated successfully'),
    backgroundColor: Colors.green,
  ));
}

// delete user credential from box...!
Future<void> deleteUser(BuildContext context) async {
  var box = Hive.box<UserData>('userBox');
  box.delete('userProfile');
  ScaffoldMessenger.of(context).showSnackBar(SnackBar(
    content: Text('Account deleted successfully'),
    backgroundColor: Colors.red,
  ));
}
