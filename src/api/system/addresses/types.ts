export interface AddressesVO {
  /**
   * 地址ID
   */
  addressId: string | number;

  /**
   * 国家代码
   */
  countryCode: string;

  /**
   * 都道府县
   */
  administrativeArea: string;

  /**
   * 城市
   */
  locality: string;

  /**
   * 市/区/郡
   */
  dependentLocality: string;

  /**
   * 街道
   */
  streetDetail: string;

  /**
   * 邮编
   */
  postalCode: string;

  /**
   * 地址名
   */
  addressesName: string;

  /**
   * 电话
   */
  phone: string;

  /**
   * 其他附加信息
   */
  other: string;

  /**
   * 格式化地址
   */
  formattedAddress: string;

  /**
   * 语言类型
   */
  lang: string;

  /**
   * 纬度
   */
  latitude: number;

  /**
   * 经度
   */
  longitude: number;

  /**
   * 坐标系统类型
   */
  coordSystem: string;

  /**
   * 精度
   */
  accuracyMeters: number;

  /**
   * 备注
   */
  remark: string;

}

export interface AddressesForm extends BaseEntity {
  /**
   * 地址ID
   */
  addressId?: string | number;

  /**
   * 国家代码
   */
  countryCode?: string;

  /**
   * 都道府县
   */
  administrativeArea?: string;

  /**
   * 城市
   */
  locality?: string;

  /**
   * 市/区/郡
   */
  dependentLocality?: string;

  /**
   * 街道
   */
  streetDetail?: string;

  /**
   * 邮编
   */
  postalCode?: string;

  /**
   * 地址名
   */
  addressesName?: string;

  /**
   * 电话
   */
  phone?: string;

  /**
   * 其他附加信息
   */
  other?: string;

  /**
   * 格式化地址
   */
  formattedAddress?: string;

  /**
   * 语言类型
   */
  lang?: string;

  /**
   * 纬度
   */
  latitude?: number;

  /**
   * 经度
   */
  longitude?: number;

  /**
   * 坐标系统类型
   */
  coordSystem?: string;

  /**
   * 精度
   */
  accuracyMeters?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface AddressesQuery extends PageQuery {

  /**
   * 国家代码
   */
  countryCode?: string;

  /**
   * 都道府县
   */
  administrativeArea?: string;

  /**
   * 城市
   */
  locality?: string;

  /**
   * 市/区/郡
   */
  dependentLocality?: string;

  /**
   * 街道
   */
  streetDetail?: string;

  /**
   * 邮编
   */
  postalCode?: string;

  /**
   * 地址名
   */
  addressesName?: string;

  /**
   * 电话
   */
  phone?: string;

  /**
   * 其他附加信息
   */
  other?: string;

  /**
   * 格式化地址
   */
  formattedAddress?: string;

  /**
   * 语言类型
   */
  lang?: string;

  /**
   * 纬度
   */
  latitude?: number;

  /**
   * 经度
   */
  longitude?: number;

  /**
   * 坐标系统类型
   */
  coordSystem?: string;

  /**
   * 精度
   */
  accuracyMeters?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}
