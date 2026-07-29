/**
 * 主题切换圆形扩散动画（View Transitions API）。
 * 从点击坐标向外扩展 clip-path，不支持时直接执行回调。
 *
 * @param event - 鼠标/指针事件，用于取扩散中心；无坐标时从视口中心扩散
 * @param update - 实际切换主题的同步回调
 */
export async function withThemeCircleTransition(
  event: MouseEvent | PointerEvent | undefined,
  update: () => void,
): Promise<void> {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => {
      ready: Promise<void>
    }
  }

  if (reduced || typeof document === 'undefined' || !doc.startViewTransition) {
    update()
    return
  }

  const x = event?.clientX ?? window.innerWidth / 2
  const y = event?.clientY ?? window.innerHeight / 2
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )

  const transition = doc.startViewTransition(() => {
    update()
  })

  try {
    await transition.ready
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 480,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  } catch {
    // 过渡被打断或浏览器不支持伪元素动画时忽略
  }
}
