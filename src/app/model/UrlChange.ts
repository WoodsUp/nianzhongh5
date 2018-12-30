export class UrlChange {
  public getHost(): string {
    switch (process.env.NODE_ENV) {
      case 'prod':
      case 'production':
        // return 'http://dashboard.wecareroom.com';
        return 'http://dashboard.forwoodsup.cn';
        // return 'http://192.168.31.158:8080';
        // return 'http://192.168.2.246:8080';
      case 'test':
      case 'testing':
        // return 'http://dashboard.wecareroom.com';
        return 'http://dashboard.forwoodsup.cn';
      // return 'http://192.168.31.158:8080';
      //   return 'http://192.168.2.246:8080/';
      case 'dev':
      case 'development':
      default:
        // return 'http://dashboard.wecareroom.com';
        return 'http://dashboard.forwoodsup.cn';
        // return 'http://192.168.31.158:8080';
    }
  }
}
