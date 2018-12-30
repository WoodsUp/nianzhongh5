import { Product } from './Product';
import { PanoScene } from './PanoScene';

export interface VRUserData {
  startTime: number;  // 最早时间
  endTime: number;  // 最晚时间
  collectionCount: number;  // 收藏数
  shareCount: number;  // 分享数
  product: any;  // 点击量最多的产品
  productCount: number;  // 点击量最多的产品的点击量
  scene: any;  // 点击量最多的场景
  sceneCount: number;  // 点击量最多的场景的点击量
}
