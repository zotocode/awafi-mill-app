import 'dart:async';

import 'package:flutter/material.dart';
import 'package:frondend/view_model/splash_animation.dart';

import 'package:provider/provider.dart';
import 'package:flutter/material.dart';

class AnimationProvider with ChangeNotifier {
  String _text = 'Awafi Mill';
  int _currentIndex = 0;
  List<String> _frames = [
    '',
    '',
    'frame 3',
    'frame 4',
    'frame 5',
  ];
  String _image = 'assets/images/logo.png';

  String get text => _text;
  String get image => _image;
  int get currentIndex => _currentIndex; // Add this line

  void updateText() {
    _currentIndex = (_currentIndex + 1) % _frames.length;
    _text = _frames[_currentIndex];
    if (_currentIndex == 0) {
      _image = 'assets/images/logo.png';
    } else if (_currentIndex == 1) {
      _image = 'assets/images/logo.png';
    } else if (_currentIndex == 2) {
      _image = 'assets/images/logo.png';
    } else if (_currentIndex == 3) {
      _image = 'assets/images/logo.png';
    } else if (_currentIndex == 4) {
      _image = 'assets/images/logo.png';
    }
    notifyListeners();
  }
}

class AnimationWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final animationProvider = Provider.of<AnimationProvider>(context);

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            animationProvider.text,
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 20),
          AnimatedCrossFade(
            firstChild: Image.asset(
              animationProvider.image,
              width: 200,
              height: 200,
            ),
            secondChild: Image.asset(
              animationProvider.image,
              width: 50,
              height: 50,
            ),
            crossFadeState: animationProvider.currentIndex == 0
                ? CrossFadeState.showFirst
                : CrossFadeState.showSecond,
            duration: Duration(milliseconds: 1000),
          ),
          SizedBox(height: 20),
          // ElevatedButton(
          //   onPressed: animationProvider.updateText,
          //   child: Text('Next Frame'),
          // ),
        ],
      ),
    );
  }
}

class AnimationTimer extends StatefulWidget {
  @override
  _AnimationTimerState createState() => _AnimationTimerState();
}

class _AnimationTimerState extends State<AnimationTimer> {
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _timer = Timer.periodic(Duration(seconds: 3), (timer) {
      Provider.of<AnimationProvider>(context, listen: false).updateText();
    });
  }

  @override
  void dispose() {
    _timer!.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimationWidget();
  }
}
