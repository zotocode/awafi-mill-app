class ProductResponse {
  final List<Product> products;
  final int totalPages;

  ProductResponse({required this.products, required this.totalPages});

  factory ProductResponse.fromJson(Map<String, dynamic> json) {
    var productList = json['products'] as List;
    List<Product> products =
        productList.map((i) => Product.fromJson(i)).toList();

    return ProductResponse(
      products: products,
      totalPages: json['totalPages'],
    );
  }
}

class Product {
  final String id;
  final String name;
  final List<Description> descriptions;
  final Category category; // Added Category field
  final String subCategory;
  final List<String> images;
  final List<Variant> variants;
  final bool isListed;

  Product({
    required this.id,
    required this.name,
    required this.descriptions,
    required this.category,
    required this.subCategory,
    required this.images,
    required this.variants,
    required this.isListed,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    var descriptionsList = json['descriptions'] as List;
    List<Description> descriptions =
        descriptionsList.map((i) => Description.fromJson(i)).toList();

    var variantsList = json['variants'] as List;
    List<Variant> variants =
        variantsList.map((i) => Variant.fromJson(i)).toList();

    return Product(
      id: json['_id'] ?? '',
      name: json['name'] ?? '',
      descriptions: descriptions,
      category: Category.fromJson(json['category']), // Parse category
      subCategory: json['subCategory'] ?? '',
      images: List<String>.from(json['images'] ?? []),
      variants: variants,
      isListed: json['isListed'] ?? false,
    );
  }
}

class Category {
  final String id;
  final String name;
  final String description;
  final String photo;
  final bool isListed;
  final bool isDeleted;

  Category({
    required this.id,
    required this.name,
    required this.description,
    required this.photo,
    required this.isListed,
    required this.isDeleted,
  });

  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(
      id: json['_id'] ?? '',
      name: json['name'] ?? '',
      description: json['description'] ?? '',
      photo: json['photo'] ?? '',
      isListed: json['isListed'] ?? false,
      isDeleted: json['isDeleted'] ?? false,
    );
  }
}

class Description {
  final String header;
  final String content;

  Description({
    required this.header,
    required this.content,
  });

  factory Description.fromJson(Map<String, dynamic> json) {
    return Description(
      header: json['header'] ?? '',
      content: json['content'] ?? '',
    );
  }
}

class Variant {
  final String weight;
  final int inPrice;
  final int outPrice;
  final int stockQuantity;

  Variant({
    required this.weight,
    required this.inPrice,
    required this.outPrice,
    required this.stockQuantity,
  });

  factory Variant.fromJson(Map<String, dynamic> json) {
    return Variant(
      weight: json['weight'] ?? '',
      inPrice: json['inPrice'] ?? 0,
      outPrice: json['outPrice'] ?? 0,
      stockQuantity: json['stockQuantity'] ?? 0,
    );
  }
}
