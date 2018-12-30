export class ProductSeries {
  id?: number;
  name?: string;
  descriptions?: string;
  alias?: string;
}
export class Product {
  id?: number;
  bad?: string;
  createTime?: string;
  brand?: string;
  abbrev: string;
  certificate?: string;
  code?: string;
  color?: string;
  discription?: string;
  good?: string;
  name?: string;
  standard: string;
  state?: string;
  tags?: string;
  tone?: string;
  type?: string;
  DISCRIMINATOR_PRODUCT?: string;
  ranking?: number;
  materials?: string;
  numLayers?: number;
  productSeries?: ProductSeries;
  orgin_price?: string;
  resistance?: string; // 耐磨程度
  tree?: string;
  cashBack?: number;
  discount?: number;
  locked?: boolean;
  yundou?: number;
  isOwned?: boolean;
  designer_comment?: string;
  flooring_surface?: string; // 纹理效果
  productUserSettings?: any;
  template?: any;
  subType?: string;
  fullWall?;
}

export class TreeParams {
  page: number = 1;
  size?: number = 18;
  tags?: string; // 例：stpaul_flooring_all
  tree?: string; // 木种名称
  classType?: string;
  code?;
  isModify?;
}
