export class PanoScene {
  id?: number;
  // 场景风格
  tone?: string;
  // 区域
  position?: string;
  // 场景名
  name?: string;
  // 场景介绍
  description?: string;
  // 标签
  tags?: string;
  // 热度
  ranking?: number;
  // 场景旋转角度
  sceneRotation?: number;
  // 类型
  type?: string;
  // 大小
  size?: string;
  // 面积
  area?: string;
  // 形状
  shape?: string;
  // YUNDOU
  yundou?: string;
  // 位置列表 【x,y,z;x2,y2,z2】
  positionVec?: string;
  createTime?: string;
  editTime?: string;
  standard?: string;
  locked?: boolean;
  sceneWalls?;
}
