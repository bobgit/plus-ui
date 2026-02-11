export interface ProductSkuAttributesVO {
  /**
   * 属性ID (主键)
   */
  skuAttrId: string | number;

  /**
   * 商品sku ID
   */
  skuId: string | number;

  /**
   * 属性键
   */
  attrKey: string;

  /**
   * 属性值
   */
  attrValue: string;

  /**
   * 属性类型:String,int,list
   */
  attrType: string;

}

export interface ProductSkuAttributesForm extends BaseEntity {
  /**
   * 属性ID (主键)
   */
  skuAttrId?: string | number;

  /**
   * 商品sku ID
   */
  skuId?: string | number;

  /**
   * 属性键
   */
  attrKey?: string;

  /**
   * 属性值
   */
  attrValue?: string;

  /**
   * 属性类型:String,int,list
   */
  attrType?: string;

}

export interface ProductSkuAttributesQuery extends PageQuery {

  /**
   * 商品sku ID
   */
  skuId?: string | number;

  /**
   * 属性键
   */
  attrKey?: string;

  /**
   * 属性值
   */
  attrValue?: string;

  /**
   * 属性类型:String,int,list
   */
  attrType?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
