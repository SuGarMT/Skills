#!/bin/bash
set -e

# PPT 部署脚本 — 放在 PPT 文件夹内，手动执行
# 用法: bash deploy.sh <路径名称>
# 示例: bash deploy.sh fb-ads-tutorial

REMOTE_USER="root"
REMOTE_HOST="inuo"
BASE_REMOTE_PATH="/data/Files/jima-ppt"
BASE_URL="https://ppt.inuo.cc"

FOLDER_NAME="$1"

if [ -z "$FOLDER_NAME" ]; then
    echo "📂 远程已有项目:"
    ssh "$REMOTE_USER@$REMOTE_HOST" "ls -1 $BASE_REMOTE_PATH 2>/dev/null" | while read -r d; do
        echo "   sh deploy.sh $d"
    done
    echo ""
    echo "🔗 访问链接:"
    ssh "$REMOTE_USER@$REMOTE_HOST" "find $BASE_REMOTE_PATH -name '*.html' -type f 2>/dev/null | sort" | while read -r f; do
        REL="${f#$BASE_REMOTE_PATH/}"
        echo "   $BASE_URL/$REL"
    done
    exit 0
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REMOTE_DIR="$BASE_REMOTE_PATH/$FOLDER_NAME"

echo "📦 部署 PPT 到远程服务器..."
echo "   本地目录: $SCRIPT_DIR"
echo "   远程路径: $REMOTE_DIR"

# 创建远程目录
ssh "$REMOTE_USER@$REMOTE_HOST" "mkdir -p $REMOTE_DIR"

# 清空远程目录
ssh "$REMOTE_USER@$REMOTE_HOST" "find $REMOTE_DIR -mindepth 1 -delete 2>/dev/null; true"

# 上传当前目录所有 HTML 文件
for f in "$SCRIPT_DIR"/*.html; do
    [ -f "$f" ] || continue
    scp "$f" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/"
done

echo ""
echo "✅ 发布成功!"
echo ""
echo "🔗 访问地址:"
for f in "$SCRIPT_DIR"/*.html; do
    [ -f "$f" ] || continue
    echo "   $BASE_URL/$FOLDER_NAME/$(basename "$f")"
done
