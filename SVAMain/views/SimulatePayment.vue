<template>
  <div class="row justify-content-around">
    <div class="col-md-7">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Simulate Payment</h5>
          <code v-if="responseData">
            {{ responseData }}
          </code>
          <CreateForm
            :fields="fields"
            :initial-values="{}"
            @submit="handleSubmit"
            :processing="processing"
            buttonText="Send Payment"
          >
          </CreateForm>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import CreateForm from "@/components/form/CreateForm.vue";
import * as yup from "yup";
import { Request } from "@/helpers";
import { useAlertStore } from "@/store/alert";

const req = new Request();
const processing = ref(false);
const alertStore = useAlertStore();
const responseData = ref(null);

const fields = computed(() => [
  {
    label: "Amount",
    name: "amount",
    rules: yup
      .number()
      .required("Please enter amount"),
  },
  {
    label: "Virtual Account Number",
    name: "account_number",
    rules: yup
      .string()
      .required("Please enter virtual account number"),
  },
  {
    label: "Transaction Reference",
    name: "transaction_ref"
  }
]);

const handleSubmit = (data, actions) => {
  processing.value = true;
  req
    .post(req.root + "/sqaudva/webhook/simulate-payment", data)
    .then((r) => {
      processing.value = false;
        responseData.value = r.data;
      actions.resetForm();
      alertStore.add("Done");
    })
    .catch((e) => {
      processing.value = false;
      alertStore.add(e.response.data, "danger");
    });
};
</script>

<style lang="scss" scoped></style>
