import 'package:flutter/material.dart';
import 'package:frondend/model/entities.dart/category.dart';
import 'package:frondend/model/entities.dart/sub_category.dart';
import 'package:frondend/view_model/services.dart/category_sercvice.dart';

class CategoryProvider with ChangeNotifier {
  List<categoryModel> _categories = [];
  List<SubCategoryModel> _subCategories = [];
  bool _isSubcategory = true;
  bool _isLoading = true;
  List<SubCategoryModel> get subCategories => _subCategories;
  List<categoryModel> get categories => _categories;
  bool get isubCategory => _isSubcategory;
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
