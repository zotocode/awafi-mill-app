import 'package:flutter/cupertino.dart';

class ProductQuantity with ChangeNotifier {
  int _quantity = 1;
  int get quantity => _quantity;
  void increment() {
    _quantity++;
    notifyListeners();
  }

  void decrement() {
    _quantity--;
    notifyListeners();
  }
}
