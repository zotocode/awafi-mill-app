import 'package:flutter/material.dart';
import 'package:frondend/common/assigns.dart';
import 'package:frondend/common/style.dart';
import 'package:frondend/model/repos.dart/loading.dart';
import 'package:frondend/model/repos.dart/register.dart';
import 'package:frondend/view/components/widgets/auth_button.dart';
import 'package:frondend/view/components/widgets/back_arrow.dart';
import 'package:frondend/view/components/widgets/drop_down_field.dart';
import 'package:frondend/view/components/widgets/text_field.dart';
import 'package:frondend/view_model/provider.dart/loading.dart';
import 'package:frondend/view_model/services.dart/user_credential.dart';
import 'package:get/get.dart';
import 'package:provider/provider.dart';

class SignUpScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final loadingProvider = Provider.of<LoadingProvider>(context);

    final TextEditingController nameController = TextEditingController();
    final TextEditingController phoneNumberController = TextEditingController();
    final TextEditingController emailController = TextEditingController();
    final TextEditingController passwordController = TextEditingController();
    final AuthService authService = AuthService();

    return SafeArea(
      child: Scaffold(
        resizeToAvoidBottomInset: false,
        body: LayoutBuilder(
          builder: (context, constraints) {
            return Container(
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
                          padding:
                              EdgeInsets.only(left: 22, right: 22, top: 36),
                          child: Padding(
                            padding: EdgeInsets.only(
                                bottom:
                                    MediaQuery.of(context).viewInsets.bottom),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  'Sign Up',
                                  style: Style.textStyle,
                                ),
                                SizedBox(height: 20),
                                CustomizableTextFieldwidget(
                                  onValidate: (value) {
                                    if (value == null || value.isEmpty) {
                                      return 'Name is required';
                                    }
                                    return null;
                                  },
                                  controller: nameController,
                                  labelText: Assigns.name,
                                ),
                                SizedBox(height: 16),
                                CountryCodeTextField(
                                    controller: phoneNumberController,
                                    labelText: Assigns.numberText),
                                CustomizableTextFieldwidget(
                                  onValidate: (value) {
                                    if (!value.contains('@gmail.com') ||
                                        value.isEmpty) {
                                      return 'Invalid Email';
                                    }
                                    return null;
                                  },
                                  keyboardType: TextInputType.emailAddress,
                                  controller: emailController,
                                  labelText: Assigns.email,
                                ),
                                SizedBox(height: 16),
                                CustomizableTextFieldwidget(
                                  onValidate: (value) {
                                    if (value.split('').length < 8 ||
                                        value.isEmpty) {
                                      return 'Password should be more than 8 charectors.';
                                    }
                                    return null;
                                  },
                                  controller: passwordController,
                                  labelText: Assigns.passwordLabelText,
                                ),
                                SizedBox(height: 20),
                                AuthenticateSaveButton(
                                  isLoading: loadingProvider.isLoading,
                                  buttonText: Assigns.signUp,
                                  onpressed: () {
                                    handleLoading(context);

                                    registerUser(
                                        authService,
                                        nameController,
                                        phoneNumberController,
                                        emailController,
                                        passwordController);
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
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
