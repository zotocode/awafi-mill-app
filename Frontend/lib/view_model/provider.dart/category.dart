import 'package:flutter/material.dart';
import 'package:frondend/model/entities.dart/category.dart';
import 'package:frondend/view_model/services.dart/category_sercvice.dart';

class CategoryProvider with ChangeNotifier {
  List<categoryModel> _categories = [];
  bool _isLoading = true;
  List<categoryModel> get categories => _categories;
  bool get isLoading => _isLoading;
  Future<void> fetchCategories() async {
    _isLoading = true;
    notifyListeners();
    List<categoryModel> fetchCategories =
        await CategoryServices.getCategories();
    _categories = fetchCategories;
    _isLoading = false;
    notifyListeners();
  }
}
