<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="订单唯一号" prop="orderSn">
              <el-input v-model="queryParams.orderSn" placeholder="请输入订单唯一号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="买家用户id" prop="buyerUserId">
              <el-input v-model="queryParams.buyerUserId" placeholder="请输入买家用户id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="参团记录ID" prop="recordId">
              <el-input v-model="queryParams.recordId" placeholder="请输入参团记录ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="父订单ID" prop="parentOrderId">
              <el-input v-model="queryParams.parentOrderId" placeholder="请输入父订单ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="公司ID" prop="orgId">
              <el-input v-model="queryParams.orgId" placeholder="请输入公司ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="团长ID" prop="leaderId">
              <el-input v-model="queryParams.leaderId" placeholder="请输入团长ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="卖家ID" prop="sellerUserId">
              <el-input v-model="queryParams.sellerUserId" placeholder="请输入卖家ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="产品业务类型" prop="productType">
              <el-select v-model="queryParams.productType" placeholder="请选择产品业务类型" clearable >
                <el-option v-for="dict in product_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="活动Id" prop="activityId">
              <el-input v-model="queryParams.activityId" placeholder="请输入活动Id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="活动产品Id" prop="activityProductId">
              <el-input v-model="queryParams.activityProductId" placeholder="请输入活动产品Id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="经营归属类型" prop="ownerType">
              <el-select v-model="queryParams.ownerType" placeholder="请选择经营归属类型" clearable >
                <el-option v-for="dict in owner_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="经营归属ID" prop="ownerId">
              <el-input v-model="queryParams.ownerId" placeholder="请输入经营归属ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="履约执行类型" prop="fulfillmentType">
              <el-select v-model="queryParams.fulfillmentType" placeholder="请选择履约执行类型" clearable >
                <el-option v-for="dict in fulfillment_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="履约执行ID" prop="fulfillmentId">
              <el-input v-model="queryParams.fulfillmentId" placeholder="请输入履约执行ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="责任主体类型" prop="responsibleType">
              <el-select v-model="queryParams.responsibleType" placeholder="请选择责任主体类型" clearable >
                <el-option v-for="dict in responsible_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="责任主体ID" prop="responsibleId">
              <el-input v-model="queryParams.responsibleId" placeholder="请输入责任主体ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="货币地区" prop="currency">
              <el-select v-model="queryParams.currency" placeholder="请选择货币地区" clearable >
                <el-option v-for="dict in sys_ios_country" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="货币位置" prop="locale">
              <el-input v-model="queryParams.locale" placeholder="请输入货币位置" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="订单状态" prop="orderStatus">
              <el-select v-model="queryParams.orderStatus" placeholder="请选择订单状态" clearable >
                <el-option v-for="dict in order_status" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="支付状态" prop="payStatus">
              <el-select v-model="queryParams.payStatus" placeholder="请选择支付状态" clearable >
                <el-option v-for="dict in pay_status" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="支付金额" prop="payAmount">
              <el-input v-model="queryParams.payAmount" placeholder="请输入支付金额" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="支付时间" prop="payTime">
              <el-date-picker clearable
                v-model="queryParams.payTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择支付时间"
              />
            </el-form-item>
            <el-form-item label="支付方式" prop="payWay">
              <el-input v-model="queryParams.payWay" placeholder="请输入支付方式" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="买家留言" prop="buyerMessage">
              <el-input v-model="queryParams.buyerMessage" placeholder="请输入买家留言" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="自动确认天数" prop="autoConfirmDays">
              <el-input v-model="queryParams.autoConfirmDays" placeholder="请输入自动确认天数" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="确认收货时间" prop="confirmTime">
              <el-date-picker clearable
                v-model="queryParams.confirmTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择确认收货时间"
              />
            </el-form-item>
            <el-form-item label="国家代码" prop="countryCode">
              <el-select v-model="queryParams.countryCode" placeholder="请选择国家代码" clearable >
                <el-option v-for="dict in sys_ios_country" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="都道府县" prop="administrativeArea">
              <el-input v-model="queryParams.administrativeArea" placeholder="请输入都道府县" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="一级行政区" prop="locality">
              <el-input v-model="queryParams.locality" placeholder="请输入一级行政区" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="二级行政区" prop="dependentLocality">
              <el-input v-model="queryParams.dependentLocality" placeholder="请输入二级行政区" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="街道" prop="streetDetail">
              <el-input v-model="queryParams.streetDetail" placeholder="请输入街道" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="邮编" prop="postalCode">
              <el-input v-model="queryParams.postalCode" placeholder="请输入邮编" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="地址名" prop="addressesName">
              <el-input v-model="queryParams.addressesName" placeholder="请输入地址名" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="queryParams.phone" placeholder="请输入电话" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="其他附加信息" prop="other">
              <el-input v-model="queryParams.other" placeholder="请输入其他附加信息" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="格式化地址" prop="formattedAddress">
              <el-input v-model="queryParams.formattedAddress" placeholder="请输入格式化地址" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="语言类型" prop="lang">
              <el-select v-model="queryParams.lang" placeholder="请选择语言类型" clearable >
                <el-option v-for="dict in sys_ios_country" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="纬度" prop="latitude">
              <el-input v-model="queryParams.latitude" placeholder="请输入纬度" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="经度" prop="longitude">
              <el-input v-model="queryParams.longitude" placeholder="请输入经度" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="退款状态" prop="refundStatus">
              <el-select v-model="queryParams.refundStatus" placeholder="请选择退款状态" clearable >
                <el-option v-for="dict in refund_status" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="退款金额" prop="refundAmount">
              <el-input v-model="queryParams.refundAmount" placeholder="请输入退款金额" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="订单来源" prop="source">
              <el-input v-model="queryParams.source" placeholder="请输入订单来源" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:order:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:order:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:order:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:order:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="orderList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="订单ID" align="center" prop="orderId" v-if="true" />
        <el-table-column label="订单唯一号" align="center" prop="orderSn" />
        <el-table-column label="买家用户id" align="center" prop="buyerUserId" />
        <el-table-column label="参团记录ID" align="center" prop="recordId" />
        <el-table-column label="父订单ID" align="center" prop="parentOrderId" />
        <el-table-column label="公司ID" align="center" prop="orgId" />
        <el-table-column label="团长ID" align="center" prop="leaderId" />
        <el-table-column label="卖家ID" align="center" prop="sellerUserId" />
        <el-table-column label="产品业务类型" align="center" prop="productType">
          <template #default="scope">
            <dict-tag :options="product_type" :value="scope.row.productType"/>
          </template>
        </el-table-column>
        <el-table-column label="扩展" align="center" prop="extendJson" />
        <el-table-column label="活动Id" align="center" prop="activityId" />
        <el-table-column label="活动产品Id" align="center" prop="activityProductId" />
        <el-table-column label="经营归属类型" align="center" prop="ownerType">
          <template #default="scope">
            <dict-tag :options="owner_type" :value="scope.row.ownerType"/>
          </template>
        </el-table-column>
        <el-table-column label="经营归属ID" align="center" prop="ownerId" />
        <el-table-column label="履约执行类型" align="center" prop="fulfillmentType">
          <template #default="scope">
            <dict-tag :options="fulfillment_type" :value="scope.row.fulfillmentType"/>
          </template>
        </el-table-column>
        <el-table-column label="履约执行ID" align="center" prop="fulfillmentId" />
        <el-table-column label="责任主体类型" align="center" prop="responsibleType">
          <template #default="scope">
            <dict-tag :options="responsible_type" :value="scope.row.responsibleType"/>
          </template>
        </el-table-column>
        <el-table-column label="责任主体ID" align="center" prop="responsibleId" />
        <el-table-column label="货币地区" align="center" prop="currency">
          <template #default="scope">
            <dict-tag :options="sys_ios_country" :value="scope.row.currency"/>
          </template>
        </el-table-column>
        <el-table-column label="货币位置" align="center" prop="locale" />
        <el-table-column label="订单状态" align="center" prop="orderStatus">
          <template #default="scope">
            <dict-tag :options="order_status" :value="scope.row.orderStatus"/>
          </template>
        </el-table-column>
        <el-table-column label="支付状态" align="center" prop="payStatus">
          <template #default="scope">
            <dict-tag :options="pay_status" :value="scope.row.payStatus"/>
          </template>
        </el-table-column>
        <el-table-column label="支付金额" align="center" prop="payAmount" />
        <el-table-column label="支付时间" align="center" prop="payTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.payTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付方式" align="center" prop="payWay" />
        <el-table-column label="买家留言" align="center" prop="buyerMessage" />
        <el-table-column label="自动确认天数" align="center" prop="autoConfirmDays" />
        <el-table-column label="确认收货时间" align="center" prop="confirmTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.confirmTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="国家代码" align="center" prop="countryCode">
          <template #default="scope">
            <dict-tag :options="sys_ios_country" :value="scope.row.countryCode"/>
          </template>
        </el-table-column>
        <el-table-column label="都道府县" align="center" prop="administrativeArea" />
        <el-table-column label="一级行政区" align="center" prop="locality" />
        <el-table-column label="二级行政区" align="center" prop="dependentLocality" />
        <el-table-column label="街道" align="center" prop="streetDetail" />
        <el-table-column label="邮编" align="center" prop="postalCode" />
        <el-table-column label="地址名" align="center" prop="addressesName" />
        <el-table-column label="电话" align="center" prop="phone" />
        <el-table-column label="其他附加信息" align="center" prop="other" />
        <el-table-column label="格式化地址" align="center" prop="formattedAddress" />
        <el-table-column label="语言类型" align="center" prop="lang">
          <template #default="scope">
            <dict-tag :options="sys_ios_country" :value="scope.row.lang"/>
          </template>
        </el-table-column>
        <el-table-column label="纬度" align="center" prop="latitude" />
        <el-table-column label="经度" align="center" prop="longitude" />
        <el-table-column label="退款状态" align="center" prop="refundStatus">
          <template #default="scope">
            <dict-tag :options="refund_status" :value="scope.row.refundStatus"/>
          </template>
        </el-table-column>
        <el-table-column label="退款金额" align="center" prop="refundAmount" />
        <el-table-column label="订单来源" align="center" prop="source" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:order:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:order:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改订单对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="orderFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单唯一号" prop="orderSn">
          <el-input v-model="form.orderSn" placeholder="请输入订单唯一号" />
        </el-form-item>
        <el-form-item label="买家用户id" prop="buyerUserId">
          <el-input v-model="form.buyerUserId" placeholder="请输入买家用户id" />
        </el-form-item>
        <el-form-item label="参团记录ID" prop="recordId">
          <el-input v-model="form.recordId" placeholder="请输入参团记录ID" />
        </el-form-item>
        <el-form-item label="父订单ID" prop="parentOrderId">
          <el-input v-model="form.parentOrderId" placeholder="请输入父订单ID" />
        </el-form-item>
        <el-form-item label="公司ID" prop="orgId">
          <el-input v-model="form.orgId" placeholder="请输入公司ID" />
        </el-form-item>
        <el-form-item label="团长ID" prop="leaderId">
          <el-input v-model="form.leaderId" placeholder="请输入团长ID" />
        </el-form-item>
        <el-form-item label="卖家ID" prop="sellerUserId">
          <el-input v-model="form.sellerUserId" placeholder="请输入卖家ID" />
        </el-form-item>
        <el-form-item label="产品业务类型" prop="productType">
          <el-select v-model="form.productType" placeholder="请选择产品业务类型">
            <el-option
                v-for="dict in product_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="扩展">
          <editor v-model="form.extendJson" :min-height="192"/>
        </el-form-item>
        <el-form-item label="活动Id" prop="activityId">
          <el-input v-model="form.activityId" placeholder="请输入活动Id" />
        </el-form-item>
        <el-form-item label="活动产品Id" prop="activityProductId">
          <el-input v-model="form.activityProductId" placeholder="请输入活动产品Id" />
        </el-form-item>
        <el-form-item label="经营归属类型" prop="ownerType">
          <el-select v-model="form.ownerType" placeholder="请选择经营归属类型">
            <el-option
                v-for="dict in owner_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="经营归属ID" prop="ownerId">
          <el-input v-model="form.ownerId" placeholder="请输入经营归属ID" />
        </el-form-item>
        <el-form-item label="履约执行类型" prop="fulfillmentType">
          <el-select v-model="form.fulfillmentType" placeholder="请选择履约执行类型">
            <el-option
                v-for="dict in fulfillment_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="履约执行ID" prop="fulfillmentId">
          <el-input v-model="form.fulfillmentId" placeholder="请输入履约执行ID" />
        </el-form-item>
        <el-form-item label="责任主体类型" prop="responsibleType">
          <el-select v-model="form.responsibleType" placeholder="请选择责任主体类型">
            <el-option
                v-for="dict in responsible_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="责任主体ID" prop="responsibleId">
          <el-input v-model="form.responsibleId" placeholder="请输入责任主体ID" />
        </el-form-item>
        <el-form-item label="货币地区" prop="currency">
          <el-select v-model="form.currency" placeholder="请选择货币地区">
            <el-option
                v-for="dict in sys_ios_country"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="货币位置" prop="locale">
          <el-input v-model="form.locale" placeholder="请输入货币位置" />
        </el-form-item>
        <el-form-item label="订单状态" prop="orderStatus">
          <el-select v-model="form.orderStatus" placeholder="请选择订单状态">
            <el-option
                v-for="dict in order_status"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付状态" prop="payStatus">
          <el-select v-model="form.payStatus" placeholder="请选择支付状态">
            <el-option
                v-for="dict in pay_status"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付金额" prop="payAmount">
          <el-input v-model="form.payAmount" placeholder="请输入支付金额" />
        </el-form-item>
        <el-form-item label="支付时间" prop="payTime">
          <el-date-picker clearable
            v-model="form.payTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择支付时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="支付方式" prop="payWay">
          <el-input v-model="form.payWay" placeholder="请输入支付方式" />
        </el-form-item>
        <el-form-item label="买家留言" prop="buyerMessage">
          <el-input v-model="form.buyerMessage" placeholder="请输入买家留言" />
        </el-form-item>
        <el-form-item label="自动确认天数" prop="autoConfirmDays">
          <el-input v-model="form.autoConfirmDays" placeholder="请输入自动确认天数" />
        </el-form-item>
        <el-form-item label="确认收货时间" prop="confirmTime">
          <el-date-picker clearable
            v-model="form.confirmTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择确认收货时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="国家代码" prop="countryCode">
          <el-select v-model="form.countryCode" placeholder="请选择国家代码">
            <el-option
                v-for="dict in sys_ios_country"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="都道府县" prop="administrativeArea">
          <el-input v-model="form.administrativeArea" placeholder="请输入都道府县" />
        </el-form-item>
        <el-form-item label="一级行政区" prop="locality">
          <el-input v-model="form.locality" placeholder="请输入一级行政区" />
        </el-form-item>
        <el-form-item label="二级行政区" prop="dependentLocality">
          <el-input v-model="form.dependentLocality" placeholder="请输入二级行政区" />
        </el-form-item>
        <el-form-item label="街道" prop="streetDetail">
          <el-input v-model="form.streetDetail" placeholder="请输入街道" />
        </el-form-item>
        <el-form-item label="邮编" prop="postalCode">
          <el-input v-model="form.postalCode" placeholder="请输入邮编" />
        </el-form-item>
        <el-form-item label="地址名" prop="addressesName">
          <el-input v-model="form.addressesName" placeholder="请输入地址名" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="其他附加信息" prop="other">
          <el-input v-model="form.other" placeholder="请输入其他附加信息" />
        </el-form-item>
        <el-form-item label="格式化地址" prop="formattedAddress">
          <el-input v-model="form.formattedAddress" placeholder="请输入格式化地址" />
        </el-form-item>
        <el-form-item label="语言类型" prop="lang">
          <el-select v-model="form.lang" placeholder="请选择语言类型">
            <el-option
                v-for="dict in sys_ios_country"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="form.latitude" placeholder="请输入纬度" />
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="form.longitude" placeholder="请输入经度" />
        </el-form-item>
        <el-form-item label="退款状态" prop="refundStatus">
          <el-select v-model="form.refundStatus" placeholder="请选择退款状态">
            <el-option
                v-for="dict in refund_status"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退款金额" prop="refundAmount">
          <el-input v-model="form.refundAmount" placeholder="请输入退款金额" />
        </el-form-item>
        <el-form-item label="订单来源" prop="source">
          <el-input v-model="form.source" placeholder="请输入订单来源" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Order" lang="ts">
import { listOrder, getOrder, delOrder, addOrder, updateOrder } from '@/api/ecom/order';
import { OrderVO, OrderQuery, OrderForm } from '@/api/ecom/order/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { refund_status, product_type, pay_status, owner_type, order_status, sys_ios_country, fulfillment_type, responsible_type } = toRefs<any>(proxy?.useDict('refund_status', 'product_type', 'pay_status', 'owner_type', 'order_status', 'sys_ios_country', 'fulfillment_type', 'responsible_type'));

const orderList = ref<OrderVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const orderFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: OrderForm = {
  orderId: undefined,
  orderSn: undefined,
  buyerUserId: undefined,
  recordId: undefined,
  parentOrderId: undefined,
  orgId: undefined,
  leaderId: undefined,
  sellerUserId: undefined,
  productType: undefined,
  extendJson: undefined,
  activityId: undefined,
  activityProductId: undefined,
  ownerType: undefined,
  ownerId: undefined,
  fulfillmentType: undefined,
  fulfillmentId: undefined,
  responsibleType: undefined,
  responsibleId: undefined,
  currency: undefined,
  locale: undefined,
  orderStatus: undefined,
  payStatus: undefined,
  payAmount: undefined,
  payTime: undefined,
  payWay: undefined,
  buyerMessage: undefined,
  autoConfirmDays: undefined,
  confirmTime: undefined,
  countryCode: undefined,
  administrativeArea: undefined,
  locality: undefined,
  dependentLocality: undefined,
  streetDetail: undefined,
  postalCode: undefined,
  addressesName: undefined,
  phone: undefined,
  other: undefined,
  formattedAddress: undefined,
  lang: undefined,
  latitude: undefined,
  longitude: undefined,
  refundStatus: undefined,
  refundAmount: undefined,
  source: undefined,
  remark: undefined
}
const data = reactive<PageData<OrderForm, OrderQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    orderSn: undefined,
    buyerUserId: undefined,
    recordId: undefined,
    parentOrderId: undefined,
    orgId: undefined,
    leaderId: undefined,
    sellerUserId: undefined,
    productType: undefined,
    extendJson: undefined,
    activityId: undefined,
    activityProductId: undefined,
    ownerType: undefined,
    ownerId: undefined,
    fulfillmentType: undefined,
    fulfillmentId: undefined,
    responsibleType: undefined,
    responsibleId: undefined,
    currency: undefined,
    locale: undefined,
    orderStatus: undefined,
    payStatus: undefined,
    payAmount: undefined,
    payTime: undefined,
    payWay: undefined,
    buyerMessage: undefined,
    autoConfirmDays: undefined,
    confirmTime: undefined,
    countryCode: undefined,
    administrativeArea: undefined,
    locality: undefined,
    dependentLocality: undefined,
    streetDetail: undefined,
    postalCode: undefined,
    addressesName: undefined,
    phone: undefined,
    other: undefined,
    formattedAddress: undefined,
    lang: undefined,
    latitude: undefined,
    longitude: undefined,
    refundStatus: undefined,
    refundAmount: undefined,
    source: undefined,
    params: {
    }
  },
  rules: {
    orderId: [
      { required: true, message: "订单ID不能为空", trigger: "blur" }
    ],
    orderSn: [
      { required: true, message: "订单唯一号不能为空", trigger: "blur" }
    ],
    buyerUserId: [
      { required: true, message: "买家用户id不能为空", trigger: "blur" }
    ],
    activityId: [
      { required: true, message: "活动Id不能为空", trigger: "blur" }
    ],
    activityProductId: [
      { required: true, message: "活动产品Id不能为空", trigger: "blur" }
    ],
    countryCode: [
      { required: true, message: "国家代码不能为空", trigger: "change" }
    ],
    addressesName: [
      { required: true, message: "地址名不能为空", trigger: "blur" }
    ],
    phone: [
      { required: true, message: "电话不能为空", trigger: "blur" }
    ],
    other: [
      { required: true, message: "其他附加信息不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询订单列表 */
const getList = async () => {
  loading.value = true;
  const res = await listOrder(queryParams.value);
  orderList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = {...initFormData};
  orderFormRef.value?.resetFields();
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 多选框选中数据 */
const handleSelectionChange = (selection: OrderVO[]) => {
  ids.value = selection.map(item => item.orderId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加订单";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: OrderVO) => {
  reset();
  const _orderId = row?.orderId || ids.value[0]
  const res = await getOrder(_orderId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改订单";
}

/** 提交按钮 */
const submitForm = () => {
  orderFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.orderId) {
        await updateOrder(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addOrder(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: OrderVO) => {
  const _orderIds = row?.orderId || ids.value;
  await proxy?.$modal.confirm('是否确认删除订单编号为"' + _orderIds + '"的数据项？').finally(() => loading.value = false);
  await delOrder(_orderIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/order/export', {
    ...queryParams.value
  }, `order_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
