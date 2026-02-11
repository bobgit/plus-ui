export interface ProductCategoryVO {
  /**
   * 分类ID
   */
  categoryId: string | number;

  /**
   * 父分类ID
   */
  parentId: string | number;

  /**
   * 分类名称
   */
  categoryName: string;

  /**
   * 分类编码
   */
  categoryCode: string;

  /**
   * 编码路径
   */
  categoryCodePath: string;

  /**
   * 分类图标
   */
  icon: string;

  /**
   * 业务规则
   */
  ruleTemplate: string;

  /**
   * 规格模板
   */
  specTemplate: string;

  /**
   * 运费模板ID
   */
  deliveryTemplate: string;

  /**
   * 扩展属性
   */
  attributeSchema: string;

  /**
   * 特殊管控规则
   */
  specialControl: string;

  /**
   * 排序权重
   */
  sortOrder: number;

  /**
   * 状态
   */
  status: string;

  /**
   * 备注
   */
  remark: string;

}

export interface ProductCategoryForm extends BaseEntity {
  /**
   * 分类ID
   */
  categoryId?: string | number;

  /**
   * 父分类ID
   */
  parentId?: string | number;

  /**
   * 分类名称
   */
  categoryName?: string;

  /**
   * 分类编码
   */
  categoryCode?: string;

  /**
   * 编码路径
   */
  categoryCodePath?: string;

  /**
   * 分类图标
   */
  icon?: string;

  /**
   * 业务规则
   */
  ruleTemplate?: string;

  /**
   * 规格模板
   */
  specTemplate?: string;

  /**
   * 运费模板ID
   */
  deliveryTemplate?: string;

  /**
   * 扩展属性
   */
  attributeSchema?: string;

  /**
   * 特殊管控规则
   */
  specialControl?: string;

  /**
   * 排序权重
   */
  sortOrder?: number;

  /**
   * 状态
   */
  status?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface ProductCategoryQuery extends PageQuery {

  /**
   * 父分类ID
   */
  parentId?: string | number;

  /**
   * 分类名称
   */
  categoryName?: string;

  /**
   * 分类编码
   */
  categoryCode?: string;

  /**
   * 编码路径
   */
  categoryCodePath?: string;

  /**
   * 分类图标
   */
  icon?: string;

  /**
   * 业务规则
   */
  ruleTemplate?: string;

  /**
   * 规格模板
   */
  specTemplate?: string;

  /**
   * 运费模板ID
   */
  deliveryTemplate?: string;

  /**
   * 扩展属性
   */
  attributeSchema?: string;

  /**
   * 特殊管控规则
   */
  specialControl?: string;

  /**
   * 排序权重
   */
  sortOrder?: number;

  /**
   * 状态
   */
  status?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
