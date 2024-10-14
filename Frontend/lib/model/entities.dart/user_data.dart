import 'package:hive/hive.dart';

part 'user_data.g.dart';

@HiveType(typeId: 0)
class UserData extends HiveObject {
  @HiveField(0)
  final String name;

  @HiveField(1)
  final String phoneNumber;

  @HiveField(2)
  final String email;

  @HiveField(3)
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
