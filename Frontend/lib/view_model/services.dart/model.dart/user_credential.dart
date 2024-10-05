class UserData {
  final String name;
  final String phoneNumber;
  final String email;
  final String password;

  UserData({
    required this.name,
    required this.phoneNumber,
    required this.email,
    required this.password,
  });

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'phone': phoneNumber,
      'email': email,
      'password': password,
    };
  }
}
