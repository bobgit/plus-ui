<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="机构组织公司编码" prop="orgCode">
              <el-input v-model="queryParams.orgCode" placeholder="请输入机构组织公司编码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="机构组织公司完整编码" prop="orgFullCode">
              <el-input v-model="queryParams.orgFullCode" placeholder="请输入机构组织公司完整编码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="机构组织公司名称" prop="orgName">
              <el-input v-model="queryParams.orgName" placeholder="请输入机构组织公司名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="机构组织公司类型" prop="orgType">
              <el-select v-model="queryParams.orgType" placeholder="请选择机构组织公司类型" clearable >
                <el-option v-for="dict in sys_org_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="负责人" prop="principal">
              <el-input v-model="queryParams.principal" placeholder="请输入负责人" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="queryParams.phone" placeholder="请输入联系电话" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="queryParams.email" placeholder="请输入邮箱" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="LOGO" prop="logo">
              <el-input v-model="queryParams.logo" placeholder="请输入LOGO" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="简介" prop="description">
              <el-input v-model="queryParams.description" placeholder="请输入简介" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="营业时间" prop="businessHours">
              <el-input v-model="queryParams.businessHours" placeholder="请输入营业时间" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="配送范围" prop="deliveryRadius">
              <el-input v-model="queryParams.deliveryRadius" placeholder="请输入配送范围" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="主体状态" prop="orgStatus">
              <el-select v-model="queryParams.orgStatus" placeholder="请选择主体状态" clearable >
                <el-option v-for="dict in sys_org_status" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="父级机构" prop="parentId">
              <el-input v-model="queryParams.parentId" placeholder="请输入父级机构" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="管理员用户ID" prop="userId">
              <el-input v-model="queryParams.userId" placeholder="请输入管理员用户ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="管理员用户名" prop="username">
              <el-input v-model="queryParams.username" placeholder="请输入管理员用户名" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="格式化地址" prop="formattedAddress">
              <el-input v-model="queryParams.formattedAddress" placeholder="请输入格式化地址" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="纬度" prop="latitude">
              <el-input v-model="queryParams.latitude" placeholder="请输入纬度" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="经度" prop="longitude">
              <el-input v-model="queryParams.longitude" placeholder="请输入经度" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="国际化地址" prop="addressId">
              <el-input v-model="queryParams.addressId" placeholder="请输入国际化地址" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="营业状态" prop="operationStatus">
              <el-select v-model="queryParams.operationStatus" placeholder="请选择营业状态" clearable >
                <el-option v-for="dict in org_operation_status" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['system:org:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['system:org:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['system:org:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['system:org:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="orgList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="机构组织公司ID" align="center" prop="orgId" v-if="true" />
        <el-table-column label="机构组织公司编码" align="center" prop="orgCode" />
        <el-table-column label="机构组织公司完整编码" align="center" prop="orgFullCode" />
        <el-table-column label="机构组织公司名称" align="center" prop="orgName" />
        <el-table-column label="机构组织公司类型" align="center" prop="orgType">
          <template #default="scope">
            <dict-tag :options="sys_org_type" :value="scope.row.orgType"/>
          </template>
        </el-table-column>
        <el-table-column label="业务类型" align="center" prop="capabilityType">
          <template #default="scope">
            <dict-tag :options="sys_capability_type" :value="scope.row.capabilityType ? scope.row.capabilityType.split(',') : []"/>
          </template>
        </el-table-column>
        <el-table-column label="负责人" align="center" prop="principal" />
        <el-table-column label="联系电话" align="center" prop="phone" />
        <el-table-column label="邮箱" align="center" prop="email" />
        <el-table-column label="LOGO" align="center" prop="logo" />
        <el-table-column label="简介" align="center" prop="description" />
        <el-table-column label="营业时间" align="center" prop="businessHours" />
        <el-table-column label="配送范围" align="center" prop="deliveryRadius" />
        <el-table-column label="主体状态" align="center" prop="orgStatus">
          <template #default="scope">
            <dict-tag :options="sys_org_status" :value="scope.row.orgStatus"/>
          </template>
        </el-table-column>
        <el-table-column label="父级机构" align="center" prop="parentId" />
        <el-table-column label="管理员用户ID" align="center" prop="userId" />
        <el-table-column label="管理员用户名" align="center" prop="username" />
        <el-table-column label="格式化地址" align="center" prop="formattedAddress" />
        <el-table-column label="纬度" align="center" prop="latitude" />
        <el-table-column label="经度" align="center" prop="longitude" />
        <el-table-column label="国际化地址" align="center" prop="addressId" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="营业状态" align="center" prop="operationStatus">
          <template #default="scope">
            <dict-tag :options="org_operation_status" :value="scope.row.operationStatus"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:org:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:org:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改机构组织公司对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="orgFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="机构组织公司编码" prop="orgCode">
          <el-input v-model="form.orgCode" placeholder="请输入机构组织公司编码" />
        </el-form-item>
        <el-form-item label="机构组织公司完整编码" prop="orgFullCode">
          <el-input v-model="form.orgFullCode" placeholder="请输入机构组织公司完整编码" />
        </el-form-item>
        <el-form-item label="机构组织公司名称" prop="orgName">
          <el-input v-model="form.orgName" placeholder="请输入机构组织公司名称" />
        </el-form-item>
        <el-form-item label="机构组织公司类型" prop="orgType">
          <el-select v-model="form.orgType" placeholder="请选择机构组织公司类型">
            <el-option
                v-for="dict in sys_org_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务类型" prop="capabilityType">
          <el-checkbox-group v-model="form.capabilityType">
            <el-checkbox
                v-for="dict in sys_capability_type"
                :key="dict.value"
                :label="dict.value">
                {{dict.label}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="负责人" prop="principal">
          <el-input v-model="form.principal" placeholder="请输入负责人" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="LOGO" prop="logo">
          <el-input v-model="form.logo" placeholder="请输入LOGO" />
        </el-form-item>
        <el-form-item label="简介" prop="description">
          <el-input v-model="form.description" placeholder="请输入简介" />
        </el-form-item>
        <el-form-item label="营业时间" prop="businessHours">
          <el-input v-model="form.businessHours" placeholder="请输入营业时间" />
        </el-form-item>
        <el-form-item label="配送范围" prop="deliveryRadius">
          <el-input v-model="form.deliveryRadius" placeholder="请输入配送范围" />
        </el-form-item>
        <el-form-item label="主体状态" prop="orgStatus">
          <el-select v-model="form.orgStatus" placeholder="请选择主体状态">
            <el-option
                v-for="dict in sys_org_status"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父级机构" prop="parentId">
          <el-input v-model="form.parentId" placeholder="请输入父级机构" />
        </el-form-item>
        <el-form-item label="管理员用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入管理员用户ID" />
        </el-form-item>
        <el-form-item label="管理员用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入管理员用户名" />
        </el-form-item>
        <el-form-item label="格式化地址" prop="formattedAddress">
          <el-input v-model="form.formattedAddress" placeholder="请输入格式化地址" />
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="form.latitude" placeholder="请输入纬度" />
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="form.longitude" placeholder="请输入经度" />
        </el-form-item>
        <el-form-item label="国际化地址" prop="addressId">
          <el-input v-model="form.addressId" placeholder="请输入国际化地址" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="营业状态" prop="operationStatus">
          <el-select v-model="form.operationStatus" placeholder="请选择营业状态">
            <el-option
                v-for="dict in org_operation_status"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
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

<script setup name="Org" lang="ts">
import { listOrg, getOrg, delOrg, addOrg, updateOrg } from '@/api/system/org';
import { OrgVO, OrgQuery, OrgForm } from '@/api/system/org/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { org_operation_status, sys_org_status, sys_org_type, sys_capability_type } = toRefs<any>(proxy?.useDict('org_operation_status', 'sys_org_status', 'sys_org_type', 'sys_capability_type'));

const orgList = ref<OrgVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const orgFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: OrgForm = {
  orgId: undefined,
  orgCode: undefined,
  orgFullCode: undefined,
  orgName: undefined,
  orgType: undefined,
  capabilityType: [],
  principal: undefined,
  phone: undefined,
  email: undefined,
  logo: undefined,
  description: undefined,
  businessHours: undefined,
  deliveryRadius: undefined,
  orgStatus: undefined,
  parentId: undefined,
  userId: undefined,
  username: undefined,
  formattedAddress: undefined,
  latitude: undefined,
  longitude: undefined,
  addressId: undefined,
  remark: undefined,
  operationStatus: undefined
}
const data = reactive<PageData<OrgForm, OrgQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    orgCode: undefined,
    orgFullCode: undefined,
    orgName: undefined,
    orgType: undefined,
    capabilityType: undefined,
    principal: undefined,
    phone: undefined,
    email: undefined,
    logo: undefined,
    description: undefined,
    businessHours: undefined,
    deliveryRadius: undefined,
    orgStatus: undefined,
    parentId: undefined,
    userId: undefined,
    username: undefined,
    formattedAddress: undefined,
    latitude: undefined,
    longitude: undefined,
    addressId: undefined,
    operationStatus: undefined,
    params: {
    }
  },
  rules: {
    orgId: [
      { required: true, message: "机构组织公司ID不能为空", trigger: "blur" }
    ],
    orgName: [
      { required: true, message: "机构组织公司名称不能为空", trigger: "blur" }
    ],
    orgType: [
      { required: true, message: "机构组织公司类型不能为空", trigger: "change" }
    ],
    capabilityType: [
      { required: true, message: "业务类型不能为空", trigger: "blur" }
    ],
    principal: [
      { required: true, message: "负责人不能为空", trigger: "blur" }
    ],
    phone: [
      { required: true, message: "联系电话不能为空", trigger: "blur" }
    ],
    parentId: [
      { required: true, message: "父级机构不能为空", trigger: "blur" }
    ],
    userId: [
      { required: true, message: "管理员用户ID不能为空", trigger: "blur" }
    ],
    username: [
      { required: true, message: "管理员用户名不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询机构组织公司列表 */
const getList = async () => {
  loading.value = true;
  const res = await listOrg(queryParams.value);
  orgList.value = res.rows;
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
  orgFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: OrgVO[]) => {
  ids.value = selection.map(item => item.orgId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加机构组织公司";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: OrgVO) => {
  reset();
  const _orgId = row?.orgId || ids.value[0]
  const res = await getOrg(_orgId);
  Object.assign(form.value, res.data);
  form.value.capabilityType = form.value.capabilityType.split(",");
  dialog.visible = true;
  dialog.title = "修改机构组织公司";
}

/** 提交按钮 */
const submitForm = () => {
  orgFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
        form.value.capabilityType = form.value.capabilityType.join(",");
      if (form.value.orgId) {
        await updateOrg(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addOrg(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: OrgVO) => {
  const _orgIds = row?.orgId || ids.value;
  await proxy?.$modal.confirm('是否确认删除机构组织公司编号为"' + _orgIds + '"的数据项？').finally(() => loading.value = false);
  await delOrg(_orgIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('system/org/export', {
    ...queryParams.value
  }, `org_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
