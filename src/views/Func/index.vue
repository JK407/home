<template>
  <div :class="store.mobileFuncState ? 'function mobile' : 'function'">
    <div class="time-card cards" @click.stop>
      <div class="time">
        <div class="date">
          <span>{{ currentTime.year }}&nbsp;年&nbsp;</span>
          <span>{{ currentTime.month }}&nbsp;月&nbsp;</span>
          <span>{{ currentTime.day }}&nbsp;日&nbsp;</span>
          <span class="sm-hidden">{{ currentTime.weekday }}</span>
        </div>
        <div class="text">
          <span>{{ currentTime.hour }}:{{ currentTime.minute }}:{{ currentTime.second }}</span>
        </div>
      </div>
      <div class="hitokoto" @click="refreshHitokoto">
        <Transition name="el-fade-in-linear" mode="out-in">
          <div :key="hitokotoData.text" class="content">
            <div class="quote-line">
              <span class="quote-icon">“</span>
              <span class="quote-text">{{ hitokotoData.text }}</span>
              <span class="quote-icon">”</span>
            </div>
            <div class="from">-「&nbsp;{{ hitokotoData.from }}&nbsp;」</div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentTime } from "@/utils/getTime";
import { getHitokoto } from "@/api";
import { mainStore } from "@/store";

const store = mainStore();

// 时间
const currentTime = ref({});
const timeInterval = ref(null);
const updateTimeData = () => {
  currentTime.value = getCurrentTime();
};

// 一言
const hitokotoData = reactive({
  text: "这里应该显示一句话",
  from: "毂梁蔚竹",
});
const hitokotoInterval = ref(null);
const fetchHitokoto = async () => {
  try {
    const result = await getHitokoto();
    hitokotoData.text = result.hitokoto;
    hitokotoData.from = result.from;
  } catch (error) {
    ElMessage({ message: "一言获取失败" });
  }
};
const refreshHitokoto = () => {
  fetchHitokoto();
};

onMounted(() => {
  updateTimeData();
  fetchHitokoto();
  timeInterval.value = setInterval(updateTimeData, 1000);
  hitokotoInterval.value = setInterval(fetchHitokoto, 60000);
});

onBeforeUnmount(() => {
  clearInterval(timeInterval.value);
  clearInterval(hitokotoInterval.value);
});
</script>

<style lang="scss" scoped>
.function {
  position: fixed;
  top: 11vh;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1200px;
  padding: 0 1.5rem;
  z-index: 3;
  display: flex;
  justify-content: center;
  pointer-events: none;
  @media (max-width: 910px) {
    top: 8vh;
    padding: 0 1rem;
  }
  .time-card {
    pointer-events: auto;
    width: 100%;
    max-width: 820px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 0 12px 10px;
    border-radius: 0;
    background: transparent !important;
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    transform: none !important;
    transition: none !important;
    &:hover,
    &:active {
      transform: none !important;
      box-shadow: none !important;
      backdrop-filter: none !important;
    }
  }
  .time {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    text-align: center;
    .date,
    .text {
      background-image: linear-gradient(120deg, #ff5f6d, #ffc371, #47cf73, #30cfd0, #5d54a4, #e64a19, #ff5f6d);
      background-size: 300% 300%;
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
      animation: rainbow 8s linear infinite;
      text-shadow: 0 0 14px rgba(255, 255, 255, 0.35);
    }
    .date {
      font-family: "Pacifico-Regular";
      font-size: 1.25rem;
      letter-spacing: 1.5px;
      white-space: nowrap;
      font-weight: 700;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.45), 0 0 22px rgba(255, 153, 255, 0.35);
    }
    .text {
      font-size: 3.6rem;
      letter-spacing: 4px;
      font-family: "UnidreamLED";
      text-shadow: 0 0 12px rgba(255, 255, 255, 0.5), 0 0 26px rgba(64, 255, 210, 0.35);
    }
  }
    .hitokoto {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      margin-top: 8px;
      color: #efefef;
      cursor: pointer;

    .content {
      width: 100%;
      max-width: 760px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
      text-align: center;
    }
    .quote-line {
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .quote-text,
    .from,
    .quote-icon {
      font-family: "Pacifico-Regular";
      background-image: linear-gradient(120deg, #ff5f6d, #ffc371, #47cf73, #30cfd0, #5d54a4, #e64a19, #ff5f6d);
      background-size: 300% 300%;
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
      animation: rainbow 9s linear infinite;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.32), 0 0 22px rgba(255, 153, 255, 0.25);
    }
    .quote-text {
      font-size: 1.28rem;
      line-height: 1.7;
      letter-spacing: 0.45px;
    }
    .quote-icon {
      filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4));
      color: transparent;
      -webkit-text-fill-color: transparent;
    }
    .from {
      font-size: 1.05rem;
      align-self: center;
      opacity: 0.92;
    }
  }
  @media (max-width: 768px) {
    .time-card {
      padding: 12px 14px 16px;
      gap: 14px;
    }
    .time .text {
      font-size: 2.6rem;
      letter-spacing: 3px;
    }
    .hitokoto .quote {
      font-size: 1.08rem;
      line-height: 1.6;
    }
    .hitokoto .from {
      font-size: 0.95rem;
    }
  }
}

@keyframes rainbow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
