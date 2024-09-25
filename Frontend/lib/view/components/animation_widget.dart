// import 'package:flutter/material.dart';
// import 'package:frondend/view_model/splash_animation.dart';
// import 'package:provider/provider.dart';

// class AnimationWidget extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     final animationProvider = Provider.of<AnimationProvider>(context);

//     return Center(
//       child: Column(
//         mainAxisAlignment: MainAxisAlignment.center,
//         children: [
//           Text(
//             animationProvider.text,
//             style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
//           ),
//           SizedBox(height: 20),
//           AnimatedCrossFade(
//             firstChild: Image.asset(
//               'assets/image1.png', // replace with your image path
//               width: 200,
//               height: 200,
//             ),
//             secondChild: Image.asset(
//               'assets/image2.png', // replace with your image path
//               width: 200,
//               height: 200,
//             ),
//             crossFadeState: animationProvider.currentIndex == 0
//                 ? CrossFadeState.showFirst
//                 : CrossFadeState.showSecond,
//             duration: Duration(milliseconds: 500),
//           ),
//           SizedBox(height: 20),
//           ElevatedButton(
//             onPressed: animationProvider.updateText,
//             child: Text('Next Frame'),
//           ),
//         ],
//       ),
//     );
//   }
// }
