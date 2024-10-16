import 'package:flutter/material.dart';
import 'dart:math'; // For rotation
import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:frondend/common/assigns.dart';
import 'package:frondend/common/style.dart';
import 'package:frondend/view/screens/dashboard_pages/bottom.dart';
import 'package:google_fonts/google_fonts.dart'; // Typing animation

class AnimationExample extends StatefulWidget {
  @override
  _AnimationExampleState createState() => _AnimationExampleState();
}

class _AnimationExampleState extends State<AnimationExample>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  // Animations
  late Animation<double> _popupSizeAnimation;
  late Animation<double> _imageScaleAnimation;
  late Animation<double> _imageRotationAnimation;
  late Animation<BorderRadius?> _borderRadiusAnimation;

  @override
  void initState() {
    super.initState();

    // Initialize AnimationController
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    );

    // Bottom-left popup expanding and covering the full screen
    _popupSizeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeIn),
    );

    // Border radius animation (from rounded to rectangle)
    _borderRadiusAnimation = BorderRadiusTween(
      begin: BorderRadius.circular(70.0), // Circular start
      end: BorderRadius.circular(0.0), // Fully rectangular when expanded
    ).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeIn),
    );

    // Image scaling and rotating
    _imageScaleAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
    _imageRotationAnimation = Tween<double>(begin: 0.0, end: 2 * pi).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );

    // Start the animation
    _controller.forward();

    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        Future.delayed(Duration(milliseconds: 600), () {
          Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (context) => BottomScreen()),
          );
        });
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: Style.themeColor,
        body: Stack(
          children: [
            // Bottom-left white popup expanding from a circle to full screen with smooth transition
            AnimatedBuilder(
              animation: _popupSizeAnimation,
              builder: (context, child) {
                double size = MediaQuery.of(context).size.longestSide *
                    _popupSizeAnimation.value;

                return Positioned(
                  bottom: 0,
                  left: 0,
                  child: Container(
                    width: size, // Animating the width
                    height: size, // Animating the height
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: _borderRadiusAnimation
                          .value, // Animating border radius
                    ),
                  ),
                );
              },
            ),

            // Center image and text
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Center image expanding and rotating
                  AnimatedBuilder(
                    animation: _controller,
                    builder: (context, child) {
                      return Transform.scale(
                        scale: _imageScaleAnimation.value,
                        child: Transform.rotate(
                          angle: _imageRotationAnimation.value,
                          child: Image.asset(
                            Assigns.logoImage,
                            width: 140,
                            height: 140,
                          ),
                        ),
                      );
                    },
                  ),

                  // SizedBox for spacing between image and text
                  SizedBox(height: 20),

                  // Center text with typing animation and dynamic color
                  AnimatedBuilder(
                    animation: _popupSizeAnimation,
                    builder: (context, child) {
                      // Adjust color change more smoothly based on the animation's value
                      Color textColor = (_popupSizeAnimation.value > 0.5)
                          ? Colors.black
                          : Colors.white;

                      return DefaultTextStyle(
                        style: TextStyle(
                          fontSize: 24.0,
                          fontWeight: FontWeight.bold,
                          color: textColor,
                        ),
                        child: AnimatedTextKit(
                          animatedTexts: [
                            TypewriterAnimatedText(
                              'AWAFI MILLL',
                              textStyle: GoogleFonts.sixtyfour(
                                  letterSpacing: 1, fontSize: 24),
                              speed: const Duration(
                                  milliseconds: 300), // Slower typing speed
                            ),
                          ],
                          isRepeatingAnimation: false,
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
