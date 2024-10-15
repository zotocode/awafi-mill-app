import 'package:flutter/material.dart';
import 'package:frondend/common/assigns.dart';
import 'package:frondend/common/style.dart';
import 'package:frondend/view/components/widgets/auth_button.dart';
import 'package:frondend/view/components/widgets/back_arrow.dart';
import 'package:frondend/view/components/widgets/drop_down_field.dart';
import 'package:frondend/view/components/widgets/text_field.dart';
import 'package:frondend/view/screens/dashboard_pages/bottom.dart';
import 'package:frondend/view/screens/onboarding_pages/forgot_password.dart';
import 'package:frondend/view/screens/onboarding_pages/sign_up.dart';
import 'package:frondend/view_model/provider.dart/field_provider.dart';
import 'package:get/get.dart';
import 'package:provider/provider.dart';

class LoginScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    TextEditingController phoneNubmerController = TextEditingController();
    TextEditingController emailController = TextEditingController();
    TextEditingController passwordController = TextEditingController();
    final loginProvider = Provider.of<FieldProvider>(context);

    return SafeArea(
      child: GestureDetector(
        onTap: () {
          FocusScope.of(context).unfocus();
        },
        child: Scaffold(
          body: Column(
            children: [
              BackArrowButtonWidget(),
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
                    padding: EdgeInsets.only(left: 22, right: 22, top: 14),
                    child: Column(
                      children: [
                        Text(Assigns.login, style: Style.textStyle),
                        SizedBox(height: 30),
                        loginProvider.isField == false
                            ? CustomizableTextFieldwidget(
                                controller: emailController,
                                labelText: Assigns.email,
                              )
                            : CountryCodeTextField(
                                controller: phoneNubmerController,
                                labelText: Assigns.numberText),
                        SizedBox(height: 6),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            GestureDetector(
                              onTap: () => loginProvider.toggleField(),
                              child: Text(
                                loginProvider.isField == true
                                    ? Assigns.number
                                    : Assigns.orEmail,
                                style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 14,
                                    decoration: TextDecoration.underline,
                                    decorationColor: Colors.white60),
                              ),
                            )
                          ],
                        ),
                        SizedBox(height: 10),
                        CustomizableTextFieldwidget(
                          controller: passwordController,
                          labelText: Assigns.passwordLabelText,
                        ),
                        SizedBox(height: 10),
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
                        SizedBox(height: 10),
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
                        SizedBox(height: 10),
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
