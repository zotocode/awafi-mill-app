import 'package:flutter/material.dart';

import 'package:get/get.dart';

class MenuButtonWidget extends StatelessWidget {
  const MenuButtonWidget({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return PopupMenuButton(
        // color: Colors.white,
        // iconColor: Colors.white,
        onSelected: (value) {
      if (value == 'logout') {
        Get.defaultDialog(
            title: 'Exit? ⚠️',
            middleText: 'Do you want logout?',
            textCancel: 'Cancel',
            textConfirm: 'Log Out',
            middleTextStyle: TextStyle(color: Colors.black),
            onCancel: () {
              Get.back();
            },
            onConfirm: () {});
      } else if (value == 'profile') {
        Get.to(() {});
      } else if (value == 'terms') {}
    }, itemBuilder: (context) {
      return [
        PopupMenuItem(
          child: Text('Terms & Conditions'),
          value: 'terms',
        ),
        PopupMenuItem(
          child: Text('Privacy Policy'),
          value: 'privacy',
        ),
        PopupMenuItem(
          child: Text('Profile'),
          value: 'profile',
        ),
        PopupMenuItem(
          child: Text('Logout'),
          value: 'logout',
        ),
      ];
    });
  }
}
