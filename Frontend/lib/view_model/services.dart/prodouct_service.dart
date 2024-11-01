import 'dart:convert';
import 'package:frondend/common/end_point.dart';
import 'package:frondend/model/entities.dart/prodouct.dart';
import 'package:http/http.dart' as http;

class ProductService {
  Future<ProductResponse> fetchProducts() async {
    try {
      final response = await http.get(
        Uri.parse(EndPoint.productUrl),
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> jsonData = json.decode(response.body);
        print('products list retrieved successfully!');
        return ProductResponse.fromJson(jsonData);
      } else {
        throw Exception('Failed to load products');
      }
    } catch (e) {
      throw Exception('Error fetching products: $e');
    }
  }
}
