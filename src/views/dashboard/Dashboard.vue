<template>
  <div class="space-y-6">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <v-card v-for="stat in stats" :key="stat.title">
        <v-card-text>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium">{{ stat.title }}</span>
            <i
              :class="['mdi', stat.icon, 'text-muted-foreground', 'text-lg']"
            />
          </div>
          <div class="text-2xl font-bold mt-2">{{ stat.value }}</div>
          <p class="text-xs text-muted-foreground mt-1">{{ stat.change }}</p>
        </v-card-text>
      </v-card>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <v-card class="col-span-4">
          <v-card-title>收入概览</v-card-title>
        <v-card-text>
          <div class="h-[300px] w-full">
            <v-chart
              class="h-full w-full"
              :option="revenueChartOption"
              autoresize
            />
          </div>
        </v-card-text>
      </v-card>
      <v-card class="lg:col-span-3 md:col-span-4 col-span-4">
        <v-card-title>最近活动</v-card-title>
        <v-card-text>
          <div class="space-y-4">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="flex items-center gap-4"
            >
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full"
                :class="activity.bgColor"
              >
                <i
                  :class="['mdi', activity.icon, activity.iconColor]"
                  class="text-lg"
                />
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium">{{ activity.title }}</p>
                <p class="text-xs text-muted-foreground">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>

    <v-card>
      <v-card-title>分类销售统计</v-card-title>
      <v-card-text>
        <div class="h-[280px] w-full">
          <v-chart
            class="h-full w-full"
            :option="categoryChartOption"
            autoresize
          />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart, BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import { useThemeStore } from "@/stores/theme";

// 按需注册 ECharts 组件，减小打包体积
use([
  CanvasRenderer,
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

/** 从 CSS 变量读取当前主题色，使图表与系统（shadcn 风格）一致 */
function getChartTheme() {
  const el = document.documentElement;
  const style = getComputedStyle(el);
  const getVar = (name: string) => style.getPropertyValue(name).trim();
  const primary = `hsl(${getVar("--primary")})`;
  const foreground = `hsl(${getVar("--foreground")})`;
  const mutedForeground = `hsl(${getVar("--muted-foreground")})`;
  const background = `hsl(${getVar("--background")})`;
  const border = "hsl(220 13% 91%)"; // zinc-200 浅色；深色下用 muted
  const borderDark = "hsl(215 20% 65%)";
  const isDark = el.classList.contains("dark");
  return {
    primary,
    foreground,
    mutedForeground,
    background,
    border: isDark ? borderDark : border,
    // 第二条线/柱用稍浅的主色或灰色
    secondary: isDark ? "hsl(215 20% 55%)" : "hsl(220 9% 46%)",
  };
}

const themeStore = useThemeStore();
const stats = [
  {
    title: "总营收",
    value: "¥45,231",
    change: "+20.1% 较上月",
    icon: "mdi-currency-usd",
  },
  {
    title: "订阅用户",
    value: "+2,350",
    change: "+180.1% 较上月",
    icon: "mdi-account-group",
  },
  {
    title: "销售额",
    value: "+12,234",
    change: "+19% 较上月",
    icon: "mdi-cart",
  },
  {
    title: "活跃用户",
    value: "+573",
    change: "+201 较上月",
    icon: "mdi-chart-line",
  },
];

const recentActivities = [
  {
    id: 1,
    title: "新订单 #1234",
    time: "2 分钟前",
    icon: "mdi-cart",
    bgColor: "bg-muted",
    iconColor: "text-muted-foreground",
  },
  {
    id: 2,
    title: "新用户注册",
    time: "5 分钟前",
    icon: "mdi-account-group",
    bgColor: "bg-muted",
    iconColor: "text-muted-foreground",
  },
  {
    id: 3,
    title: "系统更新",
    time: "10 分钟前",
    icon: "mdi-chart-line",
    bgColor: "bg-muted",
    iconColor: "text-muted-foreground",
  },
];

// 收入趋势折线图：使用系统主题色，随浅色/深色/主题色切换
const revenueChartOption = computed(() => {
  void themeStore.themeMode;
  void themeStore.themeColor;
  const t = getChartTheme();
  return {
    tooltip: {
      trigger: "axis",
      backgroundColor: t.background,
      borderColor: t.border,
      textStyle: { color: t.foreground },
    },
    legend: {
      data: ["收入", "支出"],
      bottom: 0,
      textStyle: { color: t.mutedForeground },
      lineStyle: { width: 10 },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "15%",
      top: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["1月", "2月", "3月", "4月", "5月", "6月"],
      axisLine: { lineStyle: { color: t.border } },
      axisLabel: { color: t.mutedForeground },
      splitLine: { show: false },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: t.mutedForeground, formatter: "¥{value}" },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: t.border, type: "dashed" } },
    },
    series: [
      {
        name: "收入",
        type: "line",
        smooth: true,
        data: [12000, 13200, 10100, 13400, 18900, 23000],
        lineStyle: { color: t.primary },
        itemStyle: { color: t.primary },
        areaStyle: { color: t.primary, opacity: 0.15 },
      },
      {
        name: "支出",
        type: "line",
        smooth: true,
        data: [8200, 9320, 7010, 9340, 12900, 13200],
        lineStyle: { color: t.secondary },
        itemStyle: { color: t.secondary },
        areaStyle: { color: t.secondary, opacity: 0.12 },
      },
    ],
  };
});

// 分类销售柱状图：主色 + 中性灰
const categoryChartOption = computed(() => {
  void themeStore.themeMode;
  void themeStore.themeColor;
  const t = getChartTheme();
  return {
    tooltip: {
      trigger: "axis",
      backgroundColor: t.background,
      borderColor: t.border,
      textStyle: { color: t.foreground },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["电子产品", "服装", "家居", "食品", "其他"],
      axisLine: { lineStyle: { color: t.border } },
      axisLabel: { color: t.mutedForeground },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: t.mutedForeground, formatter: "¥{value}" },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: t.border, type: "dashed" } },
    },
    series: [
      {
        name: "销售额",
        type: "bar",
        data: [32000, 28000, 26000, 18000, 12000],
        itemStyle: {
          color: t.primary,
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };
});
</script>
