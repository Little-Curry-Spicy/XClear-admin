# Lottie 动画文件

登录页支持两种格式，任选其一放到本目录即可：

- **Lottie JSON**：下载后重命名为 `login.json`（即 `public/lottie/login.json`）
- **dotLottie**：下载后重命名为 `login.lottie` 或 `Login.lottie`（即 `public/lottie/login.lottie`，压缩格式，支持主题与状态机）

步骤：

1. 打开 https://app.lottiefiles.com/share/3101f0a4-1f74-4fba-8b00-33e489cd78f3
2. 点击 **Download**，选择 **Lottie JSON** 或 **dotLottie**
3. 将下载的文件重命名为 `login.json` 或 `login.lottie`（或 `Login.lottie`）并放到本目录

登录页会优先加载 `login.lottie` / `Login.lottie`，若不存在则加载 `login.json`。
