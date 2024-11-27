const fs = require("fs");
const path = require("path");

const postsDir = "./source/_posts"; // Hexo 文章目录

fs.readdir(postsDir, (err, files) => {
  if (err) {
    console.error("读取目录失败：", err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(postsDir, file);

    if (path.extname(file) === ".md") {
      const content = fs.readFileSync(filePath, "utf8");

      if (!content.startsWith("---")) {
        // 获取文件创建时间
        const stats = fs.statSync(filePath);
        const creationDate = stats.birthtime.toISOString();

        const frontMatter = `---
title: ${path.basename(file, ".md")}
date: ${creationDate}
tags: []
categories: []
---
`;
        // 写入更新后的文件内容
        fs.writeFileSync(filePath, frontMatter + content);
        console.log(`已添加 Front Matter: ${file}`);
      }
    }
  });
});