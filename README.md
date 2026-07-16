# TypeSkill — 练出来的类型功底

从 0 到精通 TypeScript 类型。190 道题，逐级通关。

🔗 [type-skill.vercel.app](https://type-skill.vercel.app/)

灵感来自 [type-challenges/type-challenges](https://github.com/type-challenges/type-challenges)。

---

## ✨ 功能

- **190 道真实题目** — 全部来自 type-challenges，覆盖 easy 到 extreme 五个难度
- **Monaco Editor** — VS Code 同款编辑器，语法高亮、自动补全
- **服务端类型检查** — TypeScript Compiler API 真实编译验证，不是字符串比对
- **答案 & 讲解** — 55+ 道题附带正确实现和逐行解说
- **私人笔记** — 每道题下方可记录思路和知识点
- **收藏 & 进度** — 收藏重点题，按难度追踪通关进度
- **搜索 & 筛选** — 按标题、标签、难度快速定位
- **深色 / 浅色** — 一键切换主题，偏好持久保存
- **响应式** — 桌面端左右分栏，移动端垂直堆叠

---

## 🚀 本地运行

```bash
pnpm install
pnpm dev
# 打开 http://localhost:3000
```

## 📦 构建

```bash
pnpm build
pnpm start
```

---

## 🛠 技术栈

| 层 | 技术 |
|---|---|
| 框架 | Next.js 16 (App Router) + React 19 |
| 编辑器 | Monaco Editor，自托管（零 CDN 依赖） |
| 样式 | Tailwind CSS 4，Linear 设计风格 |
| 类型检查 | TypeScript Compiler API |
| 题目来源 | type-challenges（190 道） |
| 部署 | Vercel |

---

## 📁 项目结构

```
src/
  app/
    page.tsx                  # Landing 首页
    challenges/page.tsx       # 题库列表
    challenge/[id]/page.tsx   # 答题页
    api/
      check/route.ts          # 类型检查 API
      template/[id]/route.ts  # 模板文件 API
  components/
    header.tsx                # 导航栏
    challenge-card.tsx         # 题目卡片
    code-editor.tsx            # Monaco 封装
    test-results.tsx           # 测试结果
    progress-bar.tsx           # 进度条
  lib/
    challenges.ts             # 题目元数据
    type-checker.ts            # TS Compiler API
    storage.ts                # localStorage
    types.ts                  # 类型定义
data/
  challenges.json             # 题目索引
  questions/                  # 190 道题（模板 + 测试用例）
  test-utils.ts               # 测试工具类型
```

---

## ⚙️ 工作原理

1. 选题 → 进入答题页，编辑器加载模板代码
2. 编写类型实现 → 替换模板中的 `any`
3. 点击「检查答案」→ 服务端将用户代码 + 测试工具 + 测试用例合并编译
4. TypeScript Compiler API 检查类型错误 → 通过所有 `Expect<Equal<...>>` 即通关
5. 通关自动标记完成，支持查看答案和讲解

---

## 📄 License

MIT
