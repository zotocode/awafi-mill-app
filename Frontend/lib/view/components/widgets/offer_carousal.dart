import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:frondend/common/style.dart';

class OfferCarousalWidget extends StatefulWidget {
  final double height;
  final String image;

  const OfferCarousalWidget(
      {super.key, required this.height, required this.image});

  @override
  State<OfferCarousalWidget> createState() => _OfferCarousalWidgetState();
}

class _OfferCarousalWidgetState extends State<OfferCarousalWidget> {
  int currentIndex = 0;
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 240,
      child: Column(
        children: [
          CarouselSlider.builder(
            itemCount: 20,
            itemBuilder: (context, index, realIndex) {
              return Card(
                elevation: 0,
                child: Container(
                  width: double.infinity,
                  height: widget.height,
                  decoration: BoxDecoration(
                    color: Style.themeColor,
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: Style.themeColor),
                    image: DecorationImage(
                      image: AssetImage(widget.image),
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              );
            },
            options: CarouselOptions(autoPlay: true,
              aspectRatio: 16 / 9,
              onPageChanged: (index, reason) {
                setState(() {
                  currentIndex = index;
                });
              },
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(
              6,
              (index) => Container(
                height: 8,
                width: 8,
                margin: EdgeInsets.symmetric(vertical: 8, horizontal: 4),
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: currentIndex % 6 == index
                      ? (Theme.of(context).brightness == Brightness.dark
                          ? Colors.white
                          : Colors.black)
                      : (Theme.of(context).brightness == Brightness.dark
                          ? Colors.white.withOpacity(0.4)
                          : Colors.black.withOpacity(0.4)),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
