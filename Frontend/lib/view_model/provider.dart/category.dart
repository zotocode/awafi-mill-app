import 'package:flutter/material.dart';
import 'package:frondend/model/entities.dart/category.dart';
import 'package:frondend/model/entities.dart/sub_category.dart';
import 'package:frondend/view_model/services.dart/category_sercvice.dart';

class CategoryProvider with ChangeNotifier {
  List<categoryModel> _categories = [];
  List<SubCategoryModel> _subCategories = [];
  bool _isSubcategoryLoading = false;
  bool _isLoading = true;

  List<SubCategoryModel> get subCategories => _subCategories;
  List<categoryModel> get categories => _categories;
  bool get isSubcategoryLoading => _isSubcategoryLoading;
  bool get isLoading => _isLoading;

  // Fetch Categories
  Future<void> fetchCategories() async {
    _isLoading = true;
    notifyListeners();

    try {
      _categories = await CategoryServices.getCategories();
    } catch (e) {
      print("Error fetching categories: $e");
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  // Fetch SubCategories by Main Category ID
  Future<void> fetchSubCategories(String mainCategoryId) async {
    _isSubcategoryLoading = true;
    notifyListeners();

    try {
      final response =
          await CategoryServices.fetchSubCategories(mainCategoryId);
      _subCategories =
          response.data; // Map directly to the list of SubCategoryModel
    } catch (e) {
      print("Error fetching subcategories: $e");
    } finally {
      _isSubcategoryLoading = false;
      notifyListeners();
    }
  }
}
