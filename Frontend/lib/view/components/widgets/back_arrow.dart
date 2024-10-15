import 'package:flutter/material.dart';
import 'package:get/get.dart';

class BackArrowButtonWidget extends StatelessWidget {
  const BackArrowButtonWidget({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(12.0),
      child: Row(
        children: [
          GestureDetector(
            onTap: () {
              Get.back();
            },
            child: Container(
              height: 46,
              width: 46,
              decoration: BoxDecoration(
                  color: Colors.black, borderRadius: BorderRadius.circular(12)),
              child: Center(
                  child: Icon(
                Icons.arrow_back,
                color: Colors.white,
              )),
            ),
          ),
        ],
      ),
    );
  }
}
