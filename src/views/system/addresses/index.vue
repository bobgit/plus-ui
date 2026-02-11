<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="国家代码" prop="countryCode">
              <el-select v-model="queryParams.countryCode" placeholder="请选择国家代码" clearable >
                <el-option v-for="dict in sys_ios_country" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="都道府县" prop="administrativeArea">
              <el-input v-model="queryParams.administrativeArea" placeholder="请输入都道府县" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="城市" prop="locality">
              <el-input v-model="queryParams.locality" placeholder="请输入城市" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="市/区/郡" prop="dependentLocality">
              <el-input v-model="queryParams.dependentLocality" placeholder="请输入市/区/郡" clearable @keyup.enter="handleQuery" />
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
            <el-form-item label="坐标系统类型" prop="coordSystem">
              <el-input v-model="queryParams.coordSystem" placeholder="请输入坐标系统类型" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="精度" prop="accuracyMeters">
              <el-input v-model="queryParams.accuracyMeters" placeholder="请输入精度" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['system:addresses:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['system:addresses:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['system:addresses:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['system:addresses:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="addressesList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="地址ID" align="center" prop="addressId" v-if="true" />
        <el-table-column label="国家代码" align="center" prop="countryCode">
          <template #default="scope">
            <dict-tag :options="sys_ios_country" :value="scope.row.countryCode"/>
          </template>
        </el-table-column>
        <el-table-column label="都道府县" align="center" prop="administrativeArea" />
        <el-table-column label="城市" align="center" prop="locality" />
        <el-table-column label="市/区/郡" align="center" prop="dependentLocality" />
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
        <el-table-column label="坐标系统类型" align="center" prop="coordSystem" />
        <el-table-column label="精度" align="center" prop="accuracyMeters" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:addresses:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:addresses:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改国际地址对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="addressesFormRef" :model="form" :rules="rules" label-width="80px">
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
        <el-form-item label="城市" prop="locality">
          <el-input v-model="form.locality" placeholder="请输入城市" />
        </el-form-item>
        <el-form-item label="市/区/郡" prop="dependentLocality">
          <el-input v-model="form.dependentLocality" placeholder="请输入市/区/郡" />
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
        <el-form-item label="坐标系统类型" prop="coordSystem">
          <el-input v-model="form.coordSystem" placeholder="请输入坐标系统类型" />
        </el-form-item>
        <el-form-item label="精度" prop="accuracyMeters">
          <el-input v-model="form.accuracyMeters" placeholder="请输入精度" />
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

<script setup name="Addresses" lang="ts">
import { listAddresses, getAddresses, delAddresses, addAddresses, updateAddresses } from '@/api/system/addresses';
import { AddressesVO, AddressesQuery, AddressesForm } from '@/api/system/addresses/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_ios_country } = toRefs<any>(proxy?.useDict('sys_ios_country'));

const addressesList = ref<AddressesVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const addressesFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: AddressesForm = {
  addressId: undefined,
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
  coordSystem: undefined,
  accuracyMeters: undefined,
  remark: undefined
}
const data = reactive<PageData<AddressesForm, AddressesQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
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
    coordSystem: undefined,
    accuracyMeters: undefined,
    params: {
    }
  },
  rules: {
    addressId: [
      { required: true, message: "地址ID不能为空", trigger: "blur" }
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

/** 查询国际地址列表 */
const getList = async () => {
  loading.value = true;
  const res = await listAddresses(queryParams.value);
  addressesList.value = res.rows;
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
  addressesFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: AddressesVO[]) => {
  ids.value = selection.map(item => item.addressId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加国际地址";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: AddressesVO) => {
  reset();
  const _addressId = row?.addressId || ids.value[0]
  const res = await getAddresses(_addressId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改国际地址";
}

/** 提交按钮 */
const submitForm = () => {
  addressesFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.addressId) {
        await updateAddresses(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addAddresses(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: AddressesVO) => {
  const _addressIds = row?.addressId || ids.value;
  await proxy?.$modal.confirm('是否确认删除国际地址编号为"' + _addressIds + '"的数据项？').finally(() => loading.value = false);
  await delAddresses(_addressIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('system/addresses/export', {
    ...queryParams.value
  }, `addresses_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
