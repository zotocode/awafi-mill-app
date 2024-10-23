import 'dart:convert';

import 'package:frondend/common/end_point.dart';
import 'package:frondend/model/entities.dart/category.dart';
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
}
