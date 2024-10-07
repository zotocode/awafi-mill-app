import 'package:flutter/material.dart';
import 'package:frondend/common/assigns.dart';
import 'package:frondend/view/components/widgets/auth_button.dart';
import 'package:frondend/view/components/widgets/back_arrow.dart';
import 'package:frondend/view/screens/onboarding_pages/successfull_screen.dart';
import 'package:get/get.dart';

class VerificationScreen extends StatelessWidget {
  const VerificationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    return SafeArea(
      child: GestureDetector(
        onTap: () {
          FocusScope.of(context).unfocus();
        },
        child: Scaffold(
          body: Padding(
            padding: const EdgeInsets.all(12.0),
            child: Container(
              child: Column(
                children: [
                  BackArrowButtonWidget(),
                  SizedBox(height: 20),
                  Padding(
                    padding: EdgeInsets.all(16.0),
                    child: Column(
                      children: [
                        Text(
                          Assigns.verification,
                          style: TextStyle(
                              fontSize: screenHeight * 0.028,
                              fontWeight: FontWeight.bold),
                        ),
                        SizedBox(height: 30),
                        Text(
                          'Enter the verification code wejust sent you on your email id',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: screenHeight * 0.018,
                          ),
                        ),
                        SizedBox(height: 40),
                        TextFormField(
                          decoration: InputDecoration(
                            labelText: 'code',
                            border: OutlineInputBorder(
                              borderSide: BorderSide(
                                  width: 12, style: BorderStyle.solid),
                              borderRadius: BorderRadius.circular(16),
                            ),
                          ),
                        ),
                        SizedBox(height: 20),
                        AuthenticateSaveButton(
                            buttonText: 'VERIFY CODE',
                            onpressed: () {
                              Get.to(() => SuccessfullScreen());
                            }),
                        SizedBox(height: 10),
                        Text(
                          'Resend code?',
                          style:
                              TextStyle(decoration: TextDecoration.underline),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
