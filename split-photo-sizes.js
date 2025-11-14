const fs = require('fs');
const path = require('path');

console.log('=== 開始 ===');
console.log('現在のディレクトリ:', process.cwd());

// sizes-data-photo.txt を読み込み
const data = fs.readFileSync('sizes-data-photo.txt', 'utf8');
console.log('ファイル読み込み成功:', data.length, '文字');

// " で分割
const sections = data.split('"').filter(s => s.trim().length > 0);
console.log('分割数:', sections.length);

// ファイル名のマッピング
const fileNameMap = {
  '大全紙': 'large-full.md',
  '全紙': 'full-size.md',
  'A3ノビ': 'a3-nobi.md',
  '半切り': 'half-cut.md',
  '大四つ切り': 'large-4-cut.md',
  '四つ切り': '4-cut.md',
  '六つ切りワイド': '6-cut-wide.md',
  '六つ切り': '6-cut.md',
  '八つ切り': '8-cut.md',
  '2L判': '2l-size.md',
  'キャビネ': 'cabinet.md',
  'KG': 'kg-size.md',
  'はがき': 'postcard.md',
  'L判': 'l-size.md'
};

// 絶対パスで作成
const outputDir = path.resolve('content', 'photo-sizes');
console.log('出力先（絶対パス）:', outputDir);

// フォルダを作成
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log('フォルダ作成しました');
} else {
  console.log('フォルダは既に存在します');
}

// 作成前にフォルダ確認
console.log('フォルダの存在確認:', fs.existsSync(outputDir));

// 各セクションをファイルに出力
let count = 0;
sections.forEach(section => {
  const trimmed = section.trim();
  if (!trimmed.startsWith('#')) return;
  
  const firstLine = trimmed.split('\n')[0];
  const sizeName = firstLine.replace('# ', '').trim();
  const fileName = fileNameMap[sizeName];
  
  if (fileName) {
    const filePath = path.join(outputDir, fileName);
    console.log(`書き込み先: ${filePath}`);
    fs.writeFileSync(filePath, trimmed, 'utf8');
    
    // 書き込み直後に存在確認
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${fileName} 作成確認OK`);
      count++;
    } else {
      console.log(`❌ ${fileName} 作成失敗`);
    }
  }
});

console.log(`\n=== 完了: ${count}個作成 ===`);

// 最終確認
console.log('フォルダ内のファイル一覧:');
const files = fs.readdirSync(outputDir);
console.log(files);
console.log('ファイル数:', files.length);