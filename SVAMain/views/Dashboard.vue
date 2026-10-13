<template>
  <div class="container py-4" style="max-width: 860px">
    <div class="text-center mb-4">
      <img :src="squad_logo" alt="Squad logo" class="mb-3" style="width: 140px; height: auto" />
      <h1 class="h3">Squad virtual accounts: setup guide</h1>
      <p class="text-muted mb-0">
        Parents pay fees by bank transfer into a one-time account Squad issues for each payment.
        eEdu credits the fee automatically when Squad confirms the transfer.
      </p>
    </div>

    <div class="card mb-3">
      <div class="card-body">
        <h2 class="h5"><span class="badge bg-primary me-2">1</span>Get your Squad keys</h2>
        <p class="mb-2">
          Sign in to your <a href="https://squadco.com" target="_blank" rel="noopener">Squad</a> merchant dashboard
          and copy the public and secret keys from its API settings.
        </p>
        <ul class="small mb-0">
          <li>Sandbox keys start with <code>sandbox_</code>. Use them to test; no real money moves.</li>
          <li>
            Dynamic virtual accounts are only enabled for businesses Squad has profiled. For live use, Squad requires
            your KYC to be a GTBank account linked to your BVN. Contact Squad if account creation fails.
          </li>
        </ul>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-body">
        <h2 class="h5"><span class="badge bg-primary me-2">2</span>Turn it on for a school</h2>
        <p class="mb-2">
          In eEdu, open <a :href="links.options">Fees → Options</a> and switch on
          <strong>Activate virtual account</strong>. Pick <strong>Squad</strong> under <strong>Virtual account provider</strong>,
          enter the Squad keys in the form and save, then click <strong>Use Squad</strong> if the school was on another
          provider. Also pick the journal that receives virtual account payments.
        </p>
        <p class="small text-muted mb-0">
          A school that leaves the keys empty uses the platform's Squad account, and its pool is shared with other such schools.
        </p>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-body">
        <h2 class="h5"><span class="badge bg-primary me-2">3</span>Set the webhook URL</h2>
        <p class="mb-2">
          In the Squad dashboard, set this as the webhook URL. It handles successful, expired and mismatched payments.
        </p>
        <div class="input-group mb-2">
          <input class="form-control font-monospace" :value="webhooks.main" readonly aria-label="Webhook URL" />
          <button class="btn btn-outline-secondary" type="button" @click="copy(webhooks.main)">
            <i class="fas fa-copy"></i> Copy
          </button>
        </div>
        <details class="small">
          <summary>Older per-event URLs (still supported)</summary>
          <div v-for="(url, name) in webhooks.legacy" :key="name" class="input-group input-group-sm mt-2">
            <span class="input-group-text">{{ name }}</span>
            <input class="form-control font-monospace" :value="url" readonly :aria-label="`${name} webhook URL`" />
            <button class="btn btn-outline-secondary" type="button" @click="copy(url)">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </details>
        <p class="small text-muted mt-2 mb-0">
          eEdu checks Squad's signature on every webhook using the school's secret key, and rejects unsigned or
          tampered requests. See Squad's
          <a href="https://docs.squadco.com/Virtual-accounts/dynamic-virtual-account-v2" target="_blank" rel="noopener">webhook documentation</a>.
        </p>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-body">
        <h2 class="h5"><span class="badge bg-primary me-2">4</span>Fill the account pool</h2>
        <p class="mb-2">
          Squad hands out accounts from a pool you create in advance. Each one returns to the pool after it's paid
          or expires, so you need enough for the payers who pay at the same time, not one per student.
        </p>
        <a :href="links.pool" class="btn btn-primary btn-sm">Open account pool</a>
        <p class="small text-muted mt-2 mb-0">
          If the pool runs out, payers are told to try again in a few minutes and the pool page shows a warning.
        </p>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-body">
        <h2 class="h5"><span class="badge bg-primary me-2">5</span>Test with sandbox keys</h2>
        <ol class="small mb-2">
          <li>Open a student's fee and choose to pay by bank transfer to get an account number.</li>
          <li>Use <strong>Simulate payment</strong> below with that account number and the amount in naira.</li>
          <li>The fee should show as paid within a few seconds, once the webhook arrives.</li>
        </ol>
        <router-link class="btn btn-outline-primary btn-sm me-2" :to="{ name: 'SimulatePayment' }">Simulate payment</router-link>
        <router-link class="btn btn-outline-primary btn-sm" :to="{ name: 'QueryTransaction' }">Query a transaction</router-link>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h2 class="h5"><span class="badge bg-primary me-2">6</span>Go live</h2>
        <ul class="small mb-0">
          <li>Replace the sandbox keys with live keys in Fees → Options. Live and sandbox pools are separate, so fill the live pool.</li>
          <li>Set the same webhook URL in the live Squad dashboard.</li>
          <li><strong>Charge on parents</strong> in Fees → Options adds Squad's fee to the amount the payer transfers.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import squad_logo from "@module/sqaudVA/assets/squad_logo.svg";
import { clickToCopyText } from "@/helpers";
import { useAlertStore } from "@/store/alert";

const alertStore = useAlertStore();
const origin = window.location.origin;

const links = {
  options: `${origin}/eedu/admin/#/fees/options`,
  pool: `${origin}/eedu/admin/#/fees/create-virtual-accounts`,
};

const webhooks = {
  main: `${origin}/api/eedu/virtual-accounts/webhook/squad`,
  legacy: {
    success: `${origin}/sqaudva/webhook/success`,
    expired: `${origin}/sqaudva/webhook/expired`,
    mismatch: `${origin}/sqaudva/webhook/mismatch`,
  },
};

const copy = (url) => {
  clickToCopyText(url).then(() => alertStore.add("Webhook URL copied."));
};
</script>

<style lang="scss" scoped></style>
