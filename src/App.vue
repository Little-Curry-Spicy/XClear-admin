<template>
  <v-app>
    <ErrorBoundary>
      <div class="h-full min-h-screen overflow-hidden">
        <RouterView />
      </div>
    </ErrorBoundary>

    <!-- Vuetify 全局 Snackbar 队列（Toast） -->
    <v-snackbar-queue
      :model-value="messages.queue"
      @update:model-value="messages.setQueue"
    />

    <!-- 全局确认对话框 -->
    <v-dialog
      v-model="confirmStore.visible"
      max-width="500"
      persistent
      @keydown.esc="confirmStore.cancel()"
    >
      <v-card>
        <v-card-title v-if="confirmStore.options?.title">
          {{ confirmStore.options.title }}
        </v-card-title>
        <v-card-text>
          {{ confirmStore.options?.message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="confirmStore.cancel()">
            {{ confirmStore.options?.cancelText ?? "取消" }}
          </v-btn>
          <v-btn
            :color="confirmStore.options?.confirmColor ?? 'primary'"
            :loading="confirmStore.loading"
            @click="confirmStore.confirm()"
          >
            {{ confirmStore.options?.confirmText ?? "确定" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { RouterView } from "vue-router";
import { useTheme } from "vuetify";
import { useMessagesStore } from "@/stores/messages";
import { useConfirmStore } from "@/stores/confirm";
import { useThemeStore } from "@/stores/theme";
import ErrorBoundary from "@/components/ErrorBoundary.vue";

const messages = useMessagesStore();
const confirmStore = useConfirmStore();
const themeStore = useThemeStore();
const vuetifyTheme = useTheme();

// 同步现有 theme store 的深色模式到 Vuetify（使用 change 替代已弃用的 global.name）
watch(
  () => themeStore.isDark,
  (isDark) => {
    vuetifyTheme.change(isDark ? "dark" : "light");
  },
  { immediate: true },
);
</script>
<style>
.v-card-title {
  padding: 1rem;
}
</style>
