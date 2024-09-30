import 'package:flutter/material.dart';
import 'package:frondend/common/assigns.dart';
import 'package:frondend/common/style.dart';
import 'package:frondend/view/components/widgets/auth_button.dart';
import 'package:frondend/view/components/widgets/drop_down_field.dart';
import 'package:frondend/view/components/widgets/text_field.dart';
import 'package:frondend/view/screens/dashboard/bottom.dart';
import 'package:frondend/view/screens/onboarding/forgot_password.dart';
import 'package:frondend/view/screens/onboarding/sign_up.dart';
import 'package:get/get.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: GestureDetector(
        onTap: () {
          FocusScope.of(context).unfocus();
        },
        child: Scaffold(
          body: Column(
            children: [
              // Logo and app name section
              Container(
                height: 320,
                width: double.infinity,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Image.asset(
                      Assigns.logoImage,
                      height: 100,
                      width: 100,
                    ),
                    SizedBox(height: 20),
                    Image.asset(
                      Assigns.appName,
                    ),
                  ],
                ),
              ),
              // Main body content wrapped inside Expanded
              Expanded(
                child: Container(
                  width: double.infinity,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(20),
                        topRight: Radius.circular(20)),
                    color: Colors.black,
                  ),
                  child: SingleChildScrollView(
                    padding: EdgeInsets.only(left: 22, right: 22, top: 36),
                    child: Column(
                      children: [
                        SizedBox(height: 10),
                        Text(Assigns.login, style: Style.textStyle),
                        SizedBox(height: 30),
                        CountryCodeTextField(labelText: Assigns.numberText),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            Text(
                              Assigns.orSelected,
                              style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 14,
                                  decoration: TextDecoration.underline,
                                  decorationColor: Colors.white60),
                            )
                          ],
                        ),
                        SizedBox(height: 10),
                        CustomizableTextFieldwidget(
                          labelText: Assigns.passwordLabelText,
                        ),
                        SizedBox(height: 20),
                        Row(
                          children: [
                            InkWell(
                              onTap: () {
                                Get.to(() => ForgotPasswordScreen());
                              },
                              child: Text(
                                Assigns.forgotPassowrd,
                                style: TextStyle(
                                  color: Colors.white,
                                  letterSpacing: 1,
                                ),
                              ),
                            ),
                          ],
                        ),
                        SizedBox(height: 20),
                        AuthenticateSaveButton(
                          buttonText: Assigns.buttonLogin,
                          onpressed: () {
                            Get.to(() => BottomScreen());
                          },
                        ),
                        SizedBox(height: 20),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              Assigns.accoutMessage,
                              style: TextStyle(
                                color: Colors.white54,
                                fontWeight: FontWeight.w300,
                                fontSize: 16,
                              ),
                            ),
                            SizedBox(width: 10),
                            InkWell(
                              onTap: () {
                                Get.to(() => SignUpScreen());
                              },
                              child: Text(
                                Assigns.singUp,
                                style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.w500,
                                  fontSize: 16,
                                ),
                              ),
                            ),
                          ],
                        ),
                        SizedBox(height: 20),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              Assigns.loginAsGuest,
                              style: TextStyle(
                                color: Colors.white54,
                                fontWeight: FontWeight.w500,
                                fontSize: 16,
                              ),
                            ),
                            SizedBox(width: 4),
                            InkWell(
                              onTap: () {
                                Get.to(() => BottomScreen());
                              },
                              child: Text(
                                Assigns.guest,
                                style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.w500,
                                  fontSize: 16,
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
            ],
          ),
        ),
      ),
    );
  }
}
