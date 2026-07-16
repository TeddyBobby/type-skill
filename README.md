# ⛩️ TypeDojo — TypeScript 类型道场

一个交互式 TypeScript 类型体操练习平台，在浏览器中通过做题来精进你的 TS 类型系统功力。

灵感来自 [type-challenges/type-challenges](https://github.com/type-challenges/type-challenges)。

---

## ✨ 功能特性

- **📝 10 道经典类型挑战** — 从热身到中等难度，覆盖 Pick、Exclude、Awaited、Deep Readonly 等核心类型
- **⌨️ Monaco 编辑器** — VS Code 同款代码编辑器，TypeScript 语法高亮和智能提示
- **🔍 真实类型检查** — 服务端 TypeScript Compiler API 编译验证，不是简单的字符串比对
- **📊 进度追踪** — localStorage 持久化，刷新不丢失
- **🌗 暗色主题** — 护眼的深色界面
- **📱 响应式布局** — 桌面端左右分栏，移动端上下堆叠
- **🇨🇳 全中文界面** — 题目描述、UI 标签均为中文

---

## 🚀 本地运行

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 浏览器打开
open http://localhost:3000
```

> 注意：如果在 3000 端口有其他服务，可以用 `PORT=3002 pnpm dev` 指定端口。

## 📦 构建部署

```bash
pnpm build
pnpm start
```

支持一键部署到 Vercel。

---

## 🧩 题目列表

| # | 题目 | 难度 | 标签 |
|---|------|------|------|
| 01 | 你好，类型世界 | 热身 | basic |
| 02 | 实现 Pick | 简单 | union, built-in |
| 03 | 实现 Readonly | 简单 | built-in, readonly |
| 04 | 元组转对象 | 简单 | tuple |
| 05 | 实现 Exclude | 简单 | union, built-in |
| 06 | Awaited | 简单 | promise, built-in |
| 07 | 获取函数返回类型 | 中等 | infer, built-in |
| 08 | 实现 Omit | 中等 | union, built-in |
| 09 | 深层只读 | 中等 | readonly, recursive |
| 10 | 元组转联合类型 | 中等 | tuple, union |

---

## 🛠 技术栈

- **框架**: Next.js 16 (App Router) + React 19
- **编辑器**: Monaco Editor (`@monaco-editor/react`)
- **样式**: Tailwind CSS 4
- **类型检查**: TypeScript Compiler API
- **语言**: TypeScript (strict mode)
- **包管理**: pnpm

---

## 📁 项目结构

```
src/
  app/
    layout.tsx              # 根布局
    page.tsx                # 首页（题目列表）
    globals.css             # 全局样式（暗色主题）
    challenge/[id]/
      page.tsx              # 单题答题页
    api/
      check/route.ts        # 类型检查 API
      template/[id]/route.ts # 模板文件 API
  components/
    header.tsx              # 顶部导航
    challenge-card.tsx       # 题目卡片
    code-editor.tsx          # Monaco 编辑器封装
    test-results.tsx         # 测试结果展示
    progress-bar.tsx         # 进度条
  lib/
    challenges.ts           # 题目元数据
    type-checker.ts          # TS Compiler API 封装
    storage.ts              # localStorage 工具
    types.ts                # 类型定义
  data/challenges/
    01~10/                  # 10 道题目
      info.json             # 题目元数据
      template.ts           # 代码模板
      test-cases.ts          # 测试用例
```

---

## ⚙️ 工作原理

1. 用户修改模板中的类型实现（如把 `type HelloWorld = any` 改为 `type HelloWorld = string`）
2. 点击「检查答案」
3. 服务端将 **用户代码** + **测试工具类型** + **测试用例** 合并为一个文件
4. 使用 TypeScript Compiler API 真实编译
5. 如果通过所有 `Expect<Equal<...>>` 断言且没有类型错误 → 答案正确
6. 结果返回前端展示，正确则自动标记完成

---

## 📄 License

MIT
