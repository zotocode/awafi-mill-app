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

  @override
  void initState() {
    super.initState();

    // Initialize AnimationController
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 3),
    );

    // Bottom-left popup expanding and covering the full screen
    _popupSizeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
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

    // Listen for animation completion
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
            // Bottom-left white popup expanding from a circle to full screen
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
                      borderRadius: BorderRadius.circular(
                        _popupSizeAnimation.value < 0.5
                            ? size / 2 // Circular shape initially
                            : size / 2, // No border radius when fully expanded
                      ),
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
                      // Determine text color based on popup's expansion
                      double popupThreshold =
                          MediaQuery.of(context).size.height / 2;
                      Color textColor = _popupSizeAnimation.value *
                                  MediaQuery.of(context).size.longestSide >=
                              popupThreshold
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
                              'AWAFI MILL',
                              textStyle: GoogleFonts.sixtyfour(
                                  letterSpacing: 2, fontSize: 24),
                              speed: const Duration(
                                  milliseconds: 200), // Slower typing speed
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
