import 'package:flutter/material.dart';
import 'package:frondend/view/screens/splash_screen.dart';
import 'package:frondend/view_model/splash_animation.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MultiProvider(
    providers: [ChangeNotifierProvider(create: (_) => AnimationProvider())],
    child: AwafiMill(),
  ));
}

class AwafiMill extends StatelessWidget {
  const AwafiMill({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: AnimationTimer(),
    );
  }
}
