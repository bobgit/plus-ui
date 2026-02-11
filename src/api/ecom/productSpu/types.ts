export interface ProductSpuVO {
  /**
   * SPU ID
   */
  spuId: string | number;

  /**
   * 分类ID
   */
  categoryId: string | number;

  /**
   * 品牌ID
   */
  brandId: string | number;

  /**
   * 所属类型
   */
  ownerType: string;

  /**
   * 所属ID
   */
  ownerId: string | number;

  /**
   * 产品业务类型
   */
  productType: string;

  /**
   * SPU名称
   */
  spuName: string;

  /**
   * SPU描述
   */
  spuDesc: string;

  /**
   * 商品打包信息
   */
  packingList: string;

  /**
   * 售后服务
   */
  afterService: string;

  /**
   * 规格说明
   */
  genericSpec: string;

  /**
   * SPU图片JSON
   */
  spuImages: string;

  /**
   * 最低价格
   */
  minPrice: number;

  /**
   * 最高价格
   */
  maxPrice: number;

  /**
   * 总销量
   */
  totalSales: number;

  /**
   * 总库存
   */
  totalStock: number;

  /**
   * 状态
   */
  status: string;

  /**
   * 审核状态
   */
  auditStatus: string;

  /**
   * 备注
   */
  remark: string;

}

export interface ProductSpuForm extends BaseEntity {
  /**
   * SPU ID
   */
  spuId?: string | number;

  /**
   * 分类ID
   */
  categoryId?: string | number;

  /**
   * 品牌ID
   */
  brandId?: string | number;

  /**
   * 所属类型
   */
  ownerType?: string;

  /**
   * 所属ID
   */
  ownerId?: string | number;

  /**
   * 产品业务类型
   */
  productType?: string;

  /**
   * SPU名称
   */
  spuName?: string;

  /**
   * SPU描述
   */
  spuDesc?: string;

  /**
   * 商品打包信息
   */
  packingList?: string;

  /**
   * 售后服务
   */
  afterService?: string;

  /**
   * 规格说明
   */
  genericSpec?: string;

  /**
   * SPU图片JSON
   */
  spuImages?: string;

  /**
   * 最低价格
   */
  minPrice?: number;

  /**
   * 最高价格
   */
  maxPrice?: number;

  /**
   * 总销量
   */
  totalSales?: number;

  /**
   * 总库存
   */
  totalStock?: number;

  /**
   * 状态
   */
  status?: string;

  /**
   * 审核状态
   */
  auditStatus?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface ProductSpuQuery extends PageQuery {

  /**
   * 分类ID
   */
  categoryId?: string | number;

  /**
   * 品牌ID
   */
  brandId?: string | number;

  /**
   * 所属类型
   */
  ownerType?: string;

  /**
   * 所属ID
   */
  ownerId?: string | number;

  /**
   * 产品业务类型
   */
  productType?: string;

  /**
   * SPU名称
   */
  spuName?: string;

  /**
   * SPU描述
   */
  spuDesc?: string;

  /**
   * 商品打包信息
   */
  packingList?: string;

  /**
   * 售后服务
   */
  afterService?: string;

  /**
   * 规格说明
   */
  genericSpec?: string;

  /**
   * SPU图片JSON
   */
  spuImages?: string;

  /**
   * 最低价格
   */
  minPrice?: number;

  /**
   * 最高价格
   */
  maxPrice?: number;

  /**
   * 总销量
   */
  totalSales?: number;

  /**
   * 总库存
   */
  totalStock?: number;

  /**
   * 状态
   */
  status?: string;

  /**
   * 审核状态
   */
  auditStatus?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
