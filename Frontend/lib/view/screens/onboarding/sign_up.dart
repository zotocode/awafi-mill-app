import 'package:flutter/material.dart';
import 'package:frondend/common/assigns.dart';
import 'package:frondend/common/style.dart';
import 'package:frondend/view/components/widgets/auth_button.dart';
import 'package:frondend/view/components/widgets/back_arrow.dart';
import 'package:frondend/view/components/widgets/text_field.dart';
import 'package:frondend/view/screens/onboarding/verification_screen.dart';
import 'package:get/get.dart';

class SignUpScreen extends StatelessWidget {
  const SignUpScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: GestureDetector(
        onTap: () {
          FocusScope.of(context).unfocus();
        },
        child: Scaffold(
          body: Container(
            child: Column(
              children: [
                Expanded(
                  flex: 1,
                  child: Container(
                    width: double.infinity,
                    height: double.infinity,
                    child: Column(
                      children: [
                        BackArrowButtonWidget(),
                        Expanded(
                          child: Column(
                            children: [
                              Flexible(
                                child: Image.asset(
                                  Assigns.logoImage,
                                  height: 100,
                                  width: 100,
                                ),
                              ),
                              SizedBox(height: 20),
                              Flexible(
                                child: Image.asset(
                                  Assigns.appName,
                                ),
                              ),
                              SizedBox(height: 6),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Expanded(
                  flex: 2,
                  child: Container(
                    width: double.infinity,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(20),
                        topRight: Radius.circular(20),
                      ),
                      color: Colors.black,
                    ),
                    child: SingleChildScrollView(
                      child: Padding(
                        padding: EdgeInsets.only(left: 22, right: 22, top: 36),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              'Sign Up',
                              style: Style.textStyle,
                            ),
                            SizedBox(height: 20),
                            CustomizableTextFieldwidget(
                              labelText: Assigns.name,
                            ),
                            SizedBox(height: 16),
                            CustomizableTextFieldwidget(
                              labelText: Assigns.numberText,
                            ),
                            SizedBox(height: 16),
                            CustomizableTextFieldwidget(
                              labelText: Assigns.email,
                            ),
                            SizedBox(height: 16),
                            CustomizableTextFieldwidget(
                              labelText: Assigns.passwordLabelText,
                            ),
                            SizedBox(height: 20),
                            AuthenticateSaveButton(
                              buttonText: Assigns.signUp,
                              onpressed: () {
                                Get.to(() => VerificationScreen());
                              },
                            ),
                            SizedBox(height: 10),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  Assigns.alreadyHave,
                                  style: TextStyle(
                                    color: Colors.white,
                                  ),
                                ),
                                TextButton(
                                  onPressed: () {
                                    Get.back();
                                  },
                                  child: Text(
                                    Assigns.login,
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            SizedBox(height: 10),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Flexible(
                                  child: RichText(
                                    textAlign: TextAlign.center,
                                    text: TextSpan(
                                      children: [
                                        TextSpan(
                                          text: Assigns.termsMessage,
                                          style: TextStyle(
                                            color: Colors.white70,
                                          ),
                                        ),
                                        TextSpan(
                                          text: 'Terms of Service, ',
                                          style: TextStyle(
                                            color: Colors.white,
                                            fontWeight: FontWeight.bold,
                                            decoration:
                                                TextDecoration.underline,
                                          ),
                                        ),
                                        TextSpan(
                                          text: 'Privacy Policy',
                                          style: TextStyle(
                                            color: Colors.white,
                                            fontWeight: FontWeight.bold,
                                            decoration:
                                                TextDecoration.underline,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
