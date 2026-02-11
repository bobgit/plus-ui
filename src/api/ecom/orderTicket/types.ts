export interface OrderTicketVO {
  /**
   * 门票或服务Id
   */
  ticketId: string | number;

  /**
   * 订单ID
   */
  orderId: string | number;

  /**
   * 门票券码
   */
  codeNo: string;

  /**
   * 二维码二进制
   */
  qrCode: string;

  /**
   * 验证开始时间
   */
  validStart: string | number;

  /**
   * 验证结束时间
   */
  validEnd: string | number;

  /**
   * 状态
   */
  verifyStatus: string;

  /**
   * 备注
   */
  remark: string;

}

export interface OrderTicketForm extends BaseEntity {
  /**
   * 门票或服务Id
   */
  ticketId?: string | number;

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 门票券码
   */
  codeNo?: string;

  /**
   * 二维码二进制
   */
  qrCode?: string;

  /**
   * 验证开始时间
   */
  validStart?: string | number;

  /**
   * 验证结束时间
   */
  validEnd?: string | number;

  /**
   * 状态
   */
  verifyStatus?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface OrderTicketQuery extends PageQuery {

  /**
   * 订单ID
   */
  orderId?: string | number;

  /**
   * 门票券码
   */
  codeNo?: string;

  /**
   * 二维码二进制
   */
  qrCode?: string;

  /**
   * 验证开始时间
   */
  validStart?: string | number;

  /**
   * 验证结束时间
   */
  validEnd?: string | number;

  /**
   * 状态
   */
  verifyStatus?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
