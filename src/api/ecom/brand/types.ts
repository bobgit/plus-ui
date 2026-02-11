export interface BrandVO {
  /**
   * 品牌ID
   */
  brandId: string | number;

  /**
   * 品牌编码
   */
  brandCode: string;

  /**
   * 图标
   */
  brandLogo: string;

  /**
   * 官网
   */
  officialSite: string;

  /**
   * 品牌所属国家
   */
  countryCode: string;

  /**
   * 状态
   */
  status: string;

  /**
   * 排序权重
   */
  sortOrder: number;

  /**
   * 备注
   */
  remark: string;

}

export interface BrandForm extends BaseEntity {
  /**
   * 品牌ID
   */
  brandId?: string | number;

  /**
   * 品牌编码
   */
  brandCode?: string;

  /**
   * 图标
   */
  brandLogo?: string;

  /**
   * 官网
   */
  officialSite?: string;

  /**
   * 品牌所属国家
   */
  countryCode?: string;

  /**
   * 状态
   */
  status?: string;

  /**
   * 排序权重
   */
  sortOrder?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface BrandQuery extends PageQuery {

  /**
   * 品牌编码
   */
  brandCode?: string;

  /**
   * 图标
   */
  brandLogo?: string;

  /**
   * 官网
   */
  officialSite?: string;

  /**
   * 品牌所属国家
   */
  countryCode?: string;

  /**
   * 状态
   */
  status?: string;

  /**
   * 排序权重
   */
  sortOrder?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}
