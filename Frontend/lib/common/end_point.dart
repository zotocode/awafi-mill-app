class EndPoint {
  static String baseUrl = 'http://192.168.1.56:3000/api';
  static String registeUrl = '${baseUrl}/user/register';
  static String otpUrl = '${baseUrl}/user/otpVerify';
  static String loginUrl = '${baseUrl}/user/';
  static String passowordUrl = '${baseUrl}/user/change-password';

  static String CategorydUrl =
      '${baseUrl}/categories/listedCategory?page=0&limit=0';
  static String subCategory = '${baseUrl}categories/listedCategory/sub/';
  static final String productUrl =
      '${baseUrl}/products/product/listed?page=0&limit=0';
  static final String welcomeBannerUrl = "${baseUrl}/banner/viewWelcomeBanner";
  static final String offerBannerUrl = "${baseUrl}/banner/viewOfferBanner";
  static final String collectionBannerUrl =
      "${baseUrl}/banner/viewCollectionBanner";
  static final String addwishList = '${baseUrl}/wishlist/add';
}
