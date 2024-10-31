import 'package:flutter/material.dart';
import 'package:frondend/view_model/services.dart/wishList.dart';

class WishlistProvider with ChangeNotifier {
  bool isFavorite = false;
  void addToWishlist(String productId) async {
    final response = await WishlistServices.addWishListes(productId);
    print('API Response: $response');
    if (response != null) {
      print('Product added to wishlist successfully!');
      isFavorite = true;
    } else {
      print('Failed to add product to wishlist.');
      isFavorite = false;
    }
    print('isFavorite state: $isFavorite');
    notifyListeners();
  }
}
