import 'dart:convert';

import 'package:frondend/common/end_point.dart';
import 'package:frondend/model/entities.dart/category.dart';
import 'package:frondend/model/entities.dart/sub_category.dart';
import 'package:http/http.dart' as http;

class CategoryServices {
  static Future<List<categoryModel>> getCategories() async {
    try {
      final response = await http.get(
        Uri.parse(EndPoint.CategorydUrl),
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        print('category Items retrieved successfully');
        return data.map((value) => categoryModel.fromJson(value)).toList();
      } else {
        print('Failed to retrieve category items');
        return [];
      }
    } catch (e) {
      print('Error fetching categories $e');
      return [];
    }
  }

  static Future<ResponseModel> fetchSubCategories(String mainCategoryId,
      {int page = 1, int limit = 4}) async {
    final url = Uri.parse(
        '${EndPoint.subCategory}/listedCategory/sub/$mainCategoryId?page=$page&limit=$limit');

    final response = await http.get(url);

    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      return ResponseModel.fromJson(jsonData);
    } else {
      throw Exception('Failed to load data');
    }
  }
}
