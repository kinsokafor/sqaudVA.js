<template>
  <div>
    <div class="card">
      <div class="card-body text-center">
        <img
          :src="squad_logo"
          alt="Sqaud Logo"
          class="mb-3 mt-5"
          style="width: 150px; height: auto"
        />
        <h3 class="display-5">
          Welcome to Sqaud Virtual Account Module Dashboard
        </h3>
        <p class="lead mb-4">
          Use the buttons below to navigate to different functionalities.
        </p>
        <hr />
        <p>To access the Simulate Payment feature, click the button below:</p>
        <router-link
          class="btn btn-primary btn-lg mb-3"
          :to="{ name: 'SimulatePayment' }"
          >Simulate Payment</router-link
        >
        <hr />
        <p>To access the Query Transaction feature, click the button below:</p>
        <router-link
          class="btn btn-primary btn-lg mb-3"
          :to="{ name: 'QueryTransaction' }"
          >Query Transaction</router-link
        >
        <hr />
        <h3 class="">Webhooks</h3>
        <p>
          To set up webhooks for receiving real-time payment notifications,
          please refer to the documentation provided by Sqaud.
          <a
            href="https://docs.squadco.com/Virtual-accounts/dynamic-virtual-account-v2/#webhooks"
            target="_blank"
            >Learn more</a
          >
        </p>
        <p>
            <span class="badge bg-success text-white">success</span>&nbsp;
            <code class="ms-2" id="success">https://your-domain.com/sqaudva/webhook/success</code>&nbsp;
            <span class="fa-solid fa-copy bi bi-copy" style="cursor: pointer;" @click.prevent="copyWebhookUrl('success')"></span>
        </p>
        <p>
            <span class="badge bg-danger text-white">expired</span>&nbsp;
            <code class="ms-2" id="expired">https://your-domain.com/sqaudva/webhook/expired</code>&nbsp;
            <span class="fa-solid fa-copy bi bi-copy" style="cursor: pointer;" @click.prevent="copyWebhookUrl('expired')"></span>
        </p>
        <p>
            <span class="badge bg-warning text-dark">mismatch</span>&nbsp;
            <code class="ms-2" id="mismatch">https://your-domain.com/sqaudva/webhook/mismatch</code>&nbsp;
            <span class="fa-solid fa-copy bi bi-copy" style="cursor: pointer;" @click.prevent="copyWebhookUrl('mismatch')"></span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import squad_logo from "@module/sqaudVA/assets/squad_logo.svg";
import { clickToCopyText } from "@/helpers";
import { useAlertStore } from "@/store/alert";

const alertStore = useAlertStore();

const copyWebhookUrl = (url) => {
  clickToCopyText(url).then(() => {
    alertStore.add("Webhook URL copied to clipboard!");
  });
};
</script>
<style lang="scss" scoped></style>
