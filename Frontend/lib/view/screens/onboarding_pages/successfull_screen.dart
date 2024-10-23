import 'package:flutter/material.dart';
import 'package:frondend/common/assigns.dart';
import 'package:frondend/model/repos.dart/loading.dart';
import 'package:frondend/view/components/widgets/auth_button.dart';
import 'package:frondend/view/screens/onboarding_pages/sucess.dart';
import 'package:get/get.dart';

class SuccessfullScreen extends StatelessWidget {
  const SuccessfullScreen({super.key});

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
                    Assigns.successfullMessage,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        fontSize: screenHeight * 0.024,
                        fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 20),
                  Text(
                    'Your password has been successfully changed. You \ncan now continue using the app.',
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
                handleLoading(context);
                Get.to(() => SucessLastScreen());
              },
            ),
          ),
          SizedBox(height: 20),
        ],
      ),
    );
  }
}
