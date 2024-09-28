import 'package:flutter/material.dart';
import 'package:frondend/view/screens/onboarding/login.dart';
import 'package:frondend/view/screens/onboarding/splash_screen.dart';
import 'package:frondend/view_model/bottom_bar.dart';
import 'package:get/get.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MultiProvider(
    providers: [
      ChangeNotifierProvider(create: (_) => AnimationProvider()),
      ChangeNotifierProvider(
        create: (_) => BottomNavProvider(),
      )
    ],
    child: AwafiMill(),
  ));
}

class AwafiMill extends StatelessWidget {
  const AwafiMill({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      home: LoginScreen(),
    );
  }
}
