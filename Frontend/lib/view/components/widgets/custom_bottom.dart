import 'package:flutter/material.dart';

class CustomBottomWidget extends StatelessWidget {
  final int index;
  final String text;
  final String image;

  final Function()? onTap;
  final int currentIndex;

  const CustomBottomWidget({
    super.key,
    required this.index,
    required this.text,
    this.onTap,
    required this.currentIndex,
    required this.image,
  });
  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.only(
            bottom: 8,
            left: 8,
          ),
          child: Container(
            height: 70,
            decoration: BoxDecoration(
                color:
                    currentIndex == index ? Colors.black : Colors.transparent,
                borderRadius: BorderRadius.circular(10)),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Image.asset(
                  image,
                  color: currentIndex == index ? Colors.white : Colors.black,
                ),
                Text(
                  text,
                  style: TextStyle(
                    fontSize: 14,
                    color: currentIndex == index ? Colors.white : Colors.black,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
