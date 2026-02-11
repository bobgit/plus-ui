export interface ProductSkuVO {
  /**
   * SKU ID
   */
  skuId: string | number;

  /**
   * SPU ID
   */
  spuId: string | number;

  /**
   * SKU名称
   */
  skuName: string;

  /**
   * 规格JSON
   */
  skuSpec: string;

  /**
   * 成本价格
   */
  costPrice: number;

  /**
   * 市场价
   */
  marketPrice: number;

  /**
   * 销售价
   */
  price: number;

  /**
   * 库存策略类型
   */
  stockPolicyType: string;

  /**
   * 单品销量
   */
  stockQuantity: number;

  /**
   * 已售数量
   */
  soldQuantity: number;

  /**
   * 重量
   */
  weight: number;

  /**
   * 长
   */
  length: number;

  /**
   * 宽
   */
  width: string | number;

  /**
   * 高
   */
  height: number;

  /**
   * 二维码
   */
  barCode: string;

  /**
   * 编码
   */
  skuCode: string;

  /**
   * 状态
   */
  status: string;

  /**
   * 备注
   */
  remark: string;

}

export interface ProductSkuForm extends BaseEntity {
  /**
   * SKU ID
   */
  skuId?: string | number;

  /**
   * SPU ID
   */
  spuId?: string | number;

  /**
   * SKU名称
   */
  skuName?: string;

  /**
   * 规格JSON
   */
  skuSpec?: string;

  /**
   * 成本价格
   */
  costPrice?: number;

  /**
   * 市场价
   */
  marketPrice?: number;

  /**
   * 销售价
   */
  price?: number;

  /**
   * 库存策略类型
   */
  stockPolicyType?: string;

  /**
   * 单品销量
   */
  stockQuantity?: number;

  /**
   * 已售数量
   */
  soldQuantity?: number;

  /**
   * 重量
   */
  weight?: number;

  /**
   * 长
   */
  length?: number;

  /**
   * 宽
   */
  width?: string | number;

  /**
   * 高
   */
  height?: number;

  /**
   * 二维码
   */
  barCode?: string;

  /**
   * 编码
   */
  skuCode?: string;

  /**
   * 状态
   */
  status?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface ProductSkuQuery extends PageQuery {

  /**
   * SPU ID
   */
  spuId?: string | number;

  /**
   * SKU名称
   */
  skuName?: string;

  /**
   * 规格JSON
   */
  skuSpec?: string;

  /**
   * 成本价格
   */
  costPrice?: number;

  /**
   * 市场价
   */
  marketPrice?: number;

  /**
   * 销售价
   */
  price?: number;

  /**
   * 库存策略类型
   */
  stockPolicyType?: string;

  /**
   * 单品销量
   */
  stockQuantity?: number;

  /**
   * 已售数量
   */
  soldQuantity?: number;

  /**
   * 重量
   */
  weight?: number;

  /**
   * 长
   */
  length?: number;

  /**
   * 宽
   */
  width?: string | number;

  /**
   * 高
   */
  height?: number;

  /**
   * 二维码
   */
  barCode?: string;

  /**
   * 编码
   */
  skuCode?: string;

  /**
   * 状态
   */
  status?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
