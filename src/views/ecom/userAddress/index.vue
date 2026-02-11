<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="用户地址id" prop="userAddressId">
              <el-input v-model="queryParams.userAddressId" placeholder="请输入用户地址id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="用户id" prop="userId">
              <el-input v-model="queryParams.userId" placeholder="请输入用户id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="地址ID" prop="addressId">
              <el-input v-model="queryParams.addressId" placeholder="请输入地址ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="是否默认" prop="isDefault">
              <el-select v-model="queryParams.isDefault" placeholder="请选择是否默认" clearable >
                <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="标签" prop="tag">
              <el-input v-model="queryParams.tag" placeholder="请输入标签" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:userAddress:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:userAddress:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:userAddress:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:userAddress:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="userAddressList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="用户地址id" align="center" prop="userAddressId" v-if="true" />
        <el-table-column label="用户id" align="center" prop="userId" />
        <el-table-column label="地址ID" align="center" prop="addressId" />
        <el-table-column label="是否默认" align="center" prop="isDefault">
          <template #default="scope">
            <dict-tag :options="sys_normal_disable" :value="scope.row.isDefault"/>
          </template>
        </el-table-column>
        <el-table-column label="标签" align="center" prop="tag" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:userAddress:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:userAddress:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改用户地址关联对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="userAddressFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="地址ID" prop="addressId">
          <el-input v-model="form.addressId" placeholder="请输入地址ID" />
        </el-form-item>
        <el-form-item label="是否默认" prop="isDefault">
          <el-radio-group v-model="form.isDefault">
            <el-radio
              v-for="dict in sys_normal_disable"
              :key="dict.value"
              :value="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签" prop="tag">
          <el-input v-model="form.tag" placeholder="请输入标签" />
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

<script setup name="UserAddress" lang="ts">
import { listUserAddress, getUserAddress, delUserAddress, addUserAddress, updateUserAddress } from '@/api/ecom/userAddress';
import { UserAddressVO, UserAddressQuery, UserAddressForm } from '@/api/ecom/userAddress/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_normal_disable } = toRefs<any>(proxy?.useDict('sys_normal_disable'));

const userAddressList = ref<UserAddressVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const userAddressFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: UserAddressForm = {
  userAddressId: undefined,
  userId: undefined,
  addressId: undefined,
  isDefault: undefined,
  tag: undefined
}
const data = reactive<PageData<UserAddressForm, UserAddressQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    userAddressId: undefined,
    userId: undefined,
    addressId: undefined,
    isDefault: undefined,
    tag: undefined,
    params: {
    }
  },
  rules: {
    userAddressId: [
      { required: true, message: "用户地址id不能为空", trigger: "blur" }
    ],
    userId: [
      { required: true, message: "用户id不能为空", trigger: "blur" }
    ],
    addressId: [
      { required: true, message: "地址ID不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询用户地址关联列表 */
const getList = async () => {
  loading.value = true;
  const res = await listUserAddress(queryParams.value);
  userAddressList.value = res.rows;
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
  userAddressFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: UserAddressVO[]) => {
  ids.value = selection.map(item => item.userAddressId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加用户地址关联";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: UserAddressVO) => {
  reset();
  const _userAddressId = row?.userAddressId || ids.value[0]
  const res = await getUserAddress(_userAddressId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改用户地址关联";
}

/** 提交按钮 */
const submitForm = () => {
  userAddressFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.userAddressId) {
        await updateUserAddress(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addUserAddress(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: UserAddressVO) => {
  const _userAddressIds = row?.userAddressId || ids.value;
  await proxy?.$modal.confirm('是否确认删除用户地址关联编号为"' + _userAddressIds + '"的数据项？').finally(() => loading.value = false);
  await delUserAddress(_userAddressIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/userAddress/export', {
    ...queryParams.value
  }, `userAddress_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
