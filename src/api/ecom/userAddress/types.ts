export interface UserAddressVO {
  /**
   * 用户地址id
   */
  userAddressId: string | number;

  /**
   * 用户id
   */
  userId: string | number;

  /**
   * 地址ID
   */
  addressId: string | number;

  /**
   * 是否默认
   */
  isDefault: string;

  /**
   * 标签
   */
  tag: string;

}

export interface UserAddressForm extends BaseEntity {
  /**
   * 用户地址id
   */
  userAddressId?: string | number;

  /**
   * 用户id
   */
  userId?: string | number;

  /**
   * 地址ID
   */
  addressId?: string | number;

  /**
   * 是否默认
   */
  isDefault?: string;

  /**
   * 标签
   */
  tag?: string;

}

export interface UserAddressQuery extends PageQuery {

  /**
   * 用户地址id
   */
  userAddressId?: string | number;

  /**
   * 用户id
   */
  userId?: string | number;

  /**
   * 地址ID
   */
  addressId?: string | number;

  /**
   * 是否默认
   */
  isDefault?: string;

  /**
   * 标签
   */
  tag?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
