# Dianwei Chen — Personal Website

Personal academic website, based on [UMD CEE profile](https://sites.google.com/umd.edu/dwchen98/home).  
Static HTML/CSS, ready to host on **GitHub Pages**.

## 本地预览

用浏览器直接打开 `index.html`，或用本地服务器：

```bash
# 若已安装 Python 3
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 部署到 GitHub Pages

1. **在 GitHub 上建新仓库**  
   例如：`dianweichen.github.io`（用你的用户名则站点为 `https://dianweichen.github.io`）  
   或任意仓库名，则站点为 `https://用户名.github.io/仓库名`。

2. **把本目录推送到该仓库**

   ```bash
   cd personal-website
   git init
   git add .
   git commit -m "Initial commit: personal website"
   git branch -M main
   git remote add origin https://github.com/你的用户名/仓库名.git
   git push -u origin main
   ```

3. **在 GitHub 开启 Pages**  
   - 打开仓库 → **Settings** → **Pages**  
   - **Source** 选 **Deploy from a branch**  
   - **Branch** 选 `main`，文件夹选 **/ (root)**  
   - 保存后等 1–2 分钟，访问  
     - `https://用户名.github.io`（仓库名为 `用户名.github.io` 时）  
     - 或 `https://用户名.github.io/仓库名`

## 自定义

- **头像/首图**：把照片放到 `assets/hero.jpg`，页面顶部会显示（支持 JPG/PNG）。
- **内容**：直接改 `index.html` 里的文字。
- **样式**：在 `styles.css` 里改颜色、字体等（如 UMD 红色已在 `--color-accent`）。

## 文件结构

```
personal-website/
├── index.html      # 主页面
├── styles.css      # 样式
├── README.md       # 说明（本文件）
└── assets/         # 图片等资源（可放 hero.jpg）
```
