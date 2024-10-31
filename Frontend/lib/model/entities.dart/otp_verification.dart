class OtpVerification {
  final String email;
  final String otp;

  OtpVerification({required this.email, required this.otp});

  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'otp': otp,
    };
  }
}
