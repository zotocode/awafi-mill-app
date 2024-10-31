import 'package:flutter/material.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:frondend/model/entities.dart/user_data.dart';
import 'package:frondend/view/screens/onboarding_pages/splash_screen.dart';
import 'package:frondend/view_model/provider.dart/bottom_bar.dart';
import 'package:frondend/view_model/provider.dart/category.dart';
import 'package:frondend/view_model/provider.dart/field_provider.dart';
import 'package:frondend/view_model/provider.dart/loading.dart';
import 'package:frondend/view_model/provider.dart/prodouct_provider.dart';
import 'package:frondend/view_model/provider.dart/quantity.dart';
import 'package:frondend/view_model/provider.dart/wishlist_provider.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:provider/provider.dart';

void main() async {
  WidgetsBinding widgetsBinding = WidgetsFlutterBinding.ensureInitialized();
  FlutterNativeSplash.preserve(widgetsBinding: widgetsBinding);

  // Your initialization code here
  // await Future.delayed(Duration(seconds: 2)); // Optional: artificial delay

  FlutterNativeSplash.remove();
  await Hive.initFlutter();
  Hive.registerAdapter(UserDataAdapter());
  await Hive.openBox<UserData>('userBox');

  runApp(MultiProvider(
    providers: [
      ChangeNotifierProvider(create: (_) => BottomNavProvider()),
      ChangeNotifierProvider(create: (_) => FieldProvider()),
      ChangeNotifierProvider(create: (_) => ProductQuantity()),
      ChangeNotifierProvider(create: (_) => LoadingProvider()),
      ChangeNotifierProvider(create: (_) => CategoryProvider()),
      ChangeNotifierProvider(create: (_) => ProductProvider()),
      ChangeNotifierProvider(create: (_) => WishlistProvider()),
    ],
    child: AwafiMill(),
  ));
}

class AwafiMill extends StatelessWidget {
  const AwafiMill({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      theme: ThemeData(
          textTheme: TextTheme(
        bodyLarge: GoogleFonts.mulish(),
        bodySmall: GoogleFonts.mulish(),
        bodyMedium: GoogleFonts.mulish(),
      )),
      debugShowCheckedModeBanner: false,
      home: AnimationExample(),
    );
  }
}
