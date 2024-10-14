import 'package:flutter/material.dart';
import 'package:frondend/common/assigns.dart';
import 'package:frondend/view/components/widgets/auth_button.dart';
import 'package:frondend/view/screens/dashboard_pages/bottom.dart';
import 'package:get/get.dart';

class SucessLastScreen extends StatelessWidget {
  const SucessLastScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    return Scaffold(
      body: Column(
        children: [
          Expanded(
            child: Padding(
              padding: EdgeInsets.all(14),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Image.asset(Assigns.checkImage),
                  SizedBox(height: 30),
                  Text(
                    'Successful!',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        fontSize: screenHeight * 0.028,
                        fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 20),
                  Text(
                    'Thank you for registering with our app.\nYou cna now begin using it. ',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        fontSize: screenHeight * 0.016,
                        fontWeight: FontWeight.w400),
                  ),
                ],
              ),
            ),
          ),
          Padding(
            padding: EdgeInsets.only(bottom: 40, left: 30, right: 30),
            child: AuthenticateSaveButton(
              buttonText: 'START SHOPPING',
              onpressed: () {
                Get.to(() => BottomScreen());
              },
            ),
          ),
          SizedBox(height: 20),
        ],
      ),
    );
  }
}
