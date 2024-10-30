import 'dart:convert';

import 'package:frondend/common/end_point.dart';
import 'package:frondend/model/entities.dart/category.dart';
import 'package:frondend/model/entities.dart/sub_category.dart';
import 'package:http/http.dart' as http;

class CategoryServices {
  static Future<List<categoryModel>> getCategories() async {
    try {
      final response = await http.get(Uri.parse(EndPoint.CategorydUrl));

      if (response.statusCode == 200) {
        final Map<String, dynamic> data = jsonDecode(response.body);

        // Access the categories list under 'data' directly
        if (data['data'] != null && data['data'] is List) {
          final List<dynamic> categoryList = data['data'];
          print('Category items retrieved successfully');
          return categoryList
              .map((category) => categoryModel.fromJson(category))
              .toList();
        } else {
          print('Error: categories key not found or is not a list');
          return [];
        }
      } else {
        print('Failed to retrieve category items');
        return [];
      }
    } catch (e) {
      print('Error fetching categories $e');
      return [];
    }
  }

  static Future<ResponseModel> fetchSubCategories(String mainCategoryId) async {
    final url = Uri.parse('${EndPoint.subCategory}/$mainCategoryId');

    final response = await http.get(url);

    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      return ResponseModel.fromJson(jsonData);
    } else {
      throw Exception('Failed to load subcategories');
    }
  }
}
