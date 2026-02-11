export interface I18nVO {
  /**
   * 通用国际化ID
   */
  i18nId: string | number;

  /**
   * 业务表类型
   */
  bizType: string;

  /**
   * 业务id
   */
  bizId: string | number;

  /**
   * 语言类型
   */
  lang: string;

  /**
   * 字段
   */
  field: string;

  /**
   * 翻译内容
   */
  content: string;

  /**
   * 备注
   */
  remark: string;

}

export interface I18nForm extends BaseEntity {
  /**
   * 通用国际化ID
   */
  i18nId?: string | number;

  /**
   * 业务表类型
   */
  bizType?: string;

  /**
   * 业务id
   */
  bizId?: string | number;

  /**
   * 语言类型
   */
  lang?: string;

  /**
   * 字段
   */
  field?: string;

  /**
   * 翻译内容
   */
  content?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface I18nQuery extends PageQuery {

  /**
   * 业务表类型
   */
  bizType?: string;

  /**
   * 业务id
   */
  bizId?: string | number;

  /**
   * 语言类型
   */
  lang?: string;

  /**
   * 字段
   */
  field?: string;

  /**
   * 翻译内容
   */
  content?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
