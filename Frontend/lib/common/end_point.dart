class EndPoint {
  static String registeUrl = 'http://192.168.1.56:3000/api/user/register';
  static String otpUrl = 'http://192.168.1.56:3000/api/user/otpVerify';
  static String loginUrl = 'http://192.168.1.56:3000/api/user/';
  static String passowordUrl =
      'http://192.168.1.56:3000/api/user/change-password';
  static String CategorydUrl =
      'http://192.168.1.56:3000/api/categories/listedCategory?page=2&limit=20';
  static String subCategory =
      'http://192.168.1.56:3000/api/categories/category/sub/:id';
  final String product =
      'http://192.168.1.56:3000/api/products/product/listed?page=2&limit=2';
}
