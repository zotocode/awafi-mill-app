class ProductResponse {
  final List<Product> products;

  ProductResponse({required this.products});

  factory ProductResponse.fromJson(Map<String, dynamic> json) {
    return ProductResponse(
      products: (json['products'] as List)
          .map((product) => Product.fromJson(product))
          .toList(),
    );
  }
}

class Product {
  final int id;
  final String name;
  final List<String> images;
  final List<Variant> variants;
  final Category category;

  Product({
    required this.id,
    required this.name,
    required this.images,
    required this.variants,
    required this.category,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'] ?? 0, // Provide default value 0 if `id` is null
      name: json['name'] ?? '',
      images: List<String>.from(json['images'] ?? []),
      variants: (json['variants'] as List?)
              ?.map((variant) => Variant.fromJson(variant))
              .toList() ??
          [],
      category: Category.fromJson(json['category'] ?? {}),
    );
  }
}

class Variant {
  final int inPrice;
  final int outPrice;

  Variant({
    required this.inPrice,
    required this.outPrice,
  });

  factory Variant.fromJson(Map<String, dynamic> json) {
    return Variant(
      inPrice: json['inPrice'] ?? 0, // Handle null for `inPrice`
      outPrice: json['outPrice'] ?? 0, // Handle null for `outPrice`
    );
  }
}

class Category {
  final String name;

  Category({required this.name});

  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(
      name: json['name'] ?? '',
    );
  }
}
