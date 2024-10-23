import 'package:flutter/material.dart';
import 'package:frondend/common/assigns.dart';
import 'package:frondend/model/repos.dart/loading.dart';
import 'package:frondend/model/repos.dart/otp_verify.dart';
import 'package:frondend/view/components/widgets/auth_button.dart';
import 'package:frondend/view/components/widgets/back_arrow.dart';
import 'package:frondend/view_model/services.dart/user_credential.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:get/get.dart';

class VerificationScreen extends StatelessWidget {
  final String name;
  final String email;
  final String phoneNumber;
  final String password;
  final AuthService authService = AuthService();

  VerificationScreen({
    Key? key,
    required this.name,
    required this.email,
    required this.phoneNumber,
    required this.password,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    TextEditingController otpController = TextEditingController();
    final screenHeight = MediaQuery.of(context).size.height;

    return SafeArea(
      child: Scaffold(
        body: Padding(
          padding: const EdgeInsets.all(12.0),
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
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 30),
                    Text(
                      'Enter the verification code we just sent you on your email id',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: screenHeight * 0.018,
                      ),
                    ),
                    SizedBox(height: 40),
                    TextFormField(
                      controller: otpController,
                      keyboardType: TextInputType.number,
                      style: GoogleFonts.mulish(color: Colors.black),
                      decoration: InputDecoration(
                        labelText: 'Code',
                        border: OutlineInputBorder(
                          borderSide: BorderSide(
                            width: 12,
                            style: BorderStyle.solid,
                          ),
                          borderRadius: BorderRadius.circular(16),
                        ),
                      ),
                    ),
                    SizedBox(height: 20),
                    AuthenticateSaveButton(
                      buttonText: 'VERIFY CODE',
                      onpressed: () {
                        if (otpController.text.isNotEmpty) {
                          verifyOtp(
                              otpController.text, context, authService, email);
                        } else {
                          Get.snackbar(
                            'Error',
                            'Please enter OTP',
                            backgroundColor: Colors.red,
                            colorText: Colors.white,
                          );
                        }
                        handleLoading(context);
                      },
                    ),
                    SizedBox(height: 10),
                    GestureDetector(
                      onTap: () {
                        // Implement resend OTP functionality here
                      },
                      child: Text(
                        'Resend code?',
                        style: TextStyle(
                          decoration: TextDecoration.underline,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
