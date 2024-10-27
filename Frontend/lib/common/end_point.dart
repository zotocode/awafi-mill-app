class EndPoint {
  static String baseUrl = 'http://192.168.1.56:3000/api';
  static String registeUrl = 'http://192.168.1.56:3000/api/user/register';
  static String otpUrl = 'http://192.168.1.56:3000/api/user/otpVerify';
  static String loginUrl = 'http://192.168.1.56:3000/api/user/';
  static String passowordUrl =
      'http://192.168.1.56:3000/api/user/change-password';

  static String CategorydUrl =
      'http://192.168.1.56:3000/api/categories/listedCategory?page=2&limit=20';
  static String subCategory = 'http://192.168.1.56:3000/api/categories';
  static final String productUrl =
      'http://192.168.1.56:3000/api/products/product/listed?page=1&limit=10';
  static final String welcomeBannerUrl =
      "http://192.168.1.56:3000/api/banner/viewWelcomeBanner";
  static final String offerBannerUrl =
      "http://192.168.1.56:3000/api/banner/viewOfferBanner";
  static final String collectionBannerUrl =
      "http://192.168.1.56:3000/api/banner/viewCollectionBanner";
  static final String addwishList = 'http://192.168.1.56:3000/api/wishlist/add';
}
