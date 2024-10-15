import 'package:flutter/material.dart';
import 'package:frondend/view/screens/internal_pages/edit_profile.dart';
import 'package:frondend/view/screens/internal_pages/update_address.dart';
import 'package:get/get.dart';

class Assigns {
  static String logoImage = 'assets/images/logo.png';
  static String appName = 'assets/images/app_name.png';
  static String login = 'Log In';
  static String buttonLogin = 'LOG IN';
  static String passwordLabelText = 'Password';
  static String numberText = '7686437372';
  static String orEmail = 'or Use Email';
  static String forgotPassowrd = 'Forgot Pasword ?';
  static String accoutMessage = 'Don\'t having an account?';
  static String singUp = 'Sign UP';
  static String loginAsGuest = 'Login as';
  static String guest = 'Guest';
  static String name = 'Name';
  static String email = 'Email';
  static String signUp = 'SIGN UP';
  static String number = 'or Use Number';
  static String alreadyHave = 'Already have and account?';
  static String termsMessage = 'By continuing, you agree to Perfect match’s';
  static String verification = 'Verification';
  static String checkImage = 'assets/images/Frame.png';
  static String successfullMessage = 'Password Successfully Changed!';
  static String appNameSmall = 'assets/images/app_name_small.png';
  static List<Map<String, dynamic>> categories = [
    {
      'image': 'assets/images/incese.png',
      'text': 'INCENSE',
    },
    {
      'image': 'assets/images/herbs.png',
      'text': 'HERBS',
    },
    {
      'image': 'assets/images/rareherbs.png',
      'text': 'RARE HERBS',
    },
    {
      'image': 'assets/images/spaces.png',
      'text': 'SPICES',
    },
    {
      'image': 'assets/images/set.png',
      'text': 'POTPURI SET',
    },
    {
      'image': 'assets/images/oil.png',
      'text': 'FRAGRANCE & ESSENTIAL OIL',
    }
  ];
  static List<Map<String, dynamic>> collections = [
    {
      'image': 'assets/images/resin.png',
      'text': 'Resin Collections',
    },
    {
      'image': 'assets/images/dried_fruit.png',
      'text': 'Dried Fruit Collections',
    },
    {
      'image': 'assets/images/dried_leaf.png',
      'text': 'Dried leaf Collections',
    },
    {
      'image': 'assets/images/essential_oil.png',
      'text': 'Essential Oil Collections',
    }
  ];
  static List<Map<String, dynamic>> settings = [
    {
      'text': 'Edit Profile',
      'icon': Icons.person,
      'onTap': () {
        Get.to(() => EditProfileScreen());
      }
    },
    {
      'text': 'Address',
      'icon': Icons.location_on,
      'onTap': () {
        Get.to(() => UpdateAddressScreen());
      }
    },
    {
      'text': 'Purchase History',
      'icon': Icons.history,
      'onTap': () {
        Get.to(() => EditProfileScreen());
      }
    },
    {
      'text': 'Frequently Asked Questions',
      'icon': Icons.help,
      'onTap': () {
        Get.to(() => EditProfileScreen());
      }
    },
    {
      'text': 'Help and Support',
      'icon': Icons.support_agent,
      'onTap': () {
        Get.to(() => EditProfileScreen());
      }
    },
  ];
  static String accountHeadLine = 'Hey! Awafi-Mill';
  static String wishlist = 'Wishlist';
  static String logout = 'Logout';
  static String editProfile = 'Edit Profile';
  static String personImage = 'assets/images/person_image.jpeg';
  static String newAddress = 'New Address';
  static String notification = 'Notifications';
}
