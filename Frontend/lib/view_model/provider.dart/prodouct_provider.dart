import 'package:flutter/material.dart';
import 'package:frondend/model/entities.dart/prodouct.dart';
import 'package:frondend/view_model/services.dart/prodouct_service.dart';

class ProductProvider with ChangeNotifier {
  List<Product> _products = [];
  bool _isLoading = false;

  List<Product> get products => _products;
  bool get isLoading => _isLoading;

  final ProductService _productService = ProductService();

  Future<void> fetchProducts() async {
    if (_isLoading) return;

    _isLoading = true;
    notifyListeners();

    try {
      final productResponse = await _productService.fetchProducts();
      _products = productResponse.products; // Load all products at once
    } catch (e) {
      print('Error: $e');
    }

    _isLoading = false;
    notifyListeners();
  }

  void reset() {
    _products = [];
    fetchProducts();
  }
}
