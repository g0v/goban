# [零時黑板](http://goban.tw)

## hackfoldr分支版-有脈絡的大量網址分享器

## 動機
太陽花學運用的hackfoldr，能收集和分享系列網址，非常令人驚艷。讓人想擴充它的功能。

## 簡介

零時黑板(Goban)是g0v社群的開源專案之一。[原始碼repo在此](http://www.github.com/g0v/goban/)。

跟Hackfoldr類似，還附有以下功能性：
   
1. 可以用關鍵字搜詢別人創建的黑板。
2. 黑板之間可以設定關聯性，是一個知識庫的概念。
3. 可以珍藏。
4. 可以備份。
5. 每個連結都有獨立的網址。
6. 每個黑板都有獨立的頁籤標題(title)。
7. 和hackfoldr相容

note: 但是還有些hackfoldr的內容沒做，比方說
1. 連結google sheet
2. 精美的視覺設計
3. 無需登入，即可創建

需要這些功能的朋友，請愛用[hackfoldr](https://hackfoldr.org/about)[和hackfoldr 2.0](https://beta.hackfoldr.org/)。
 
# 如何使用

## 搜詢、瀏覽、與評等

1. 先進入[首頁](http://goban.tw)
2. 選擇[搜尋](http://goban.tw/#/list)或點入某個人氣黑板
3. 你可以在左側瀏覽各個超連結
4. 按右上方的右箭頭可以開新分頁，比較好看
5. 右上方還有一個備份按鈕
6. 最重要的是評星等
7. 你打了星號之後，如果你有登入的話，系統會統計星等
8. 較高星等的黑板就會成為人氣黑板
9. 你珍藏的項目會出現在首頁的「快速前往」區，就不必一直重新查尋了

![範列圖1](https://i.imgur.com/96FvvJs.png =600x)

## 分享

1. 每個連結都有一個獨立的網址
2. 從瀏覽器的網址列複製下來，就可以分享給別人了

## 網址範例

### 簡單的棋盤

1. http://goban.tw/#/s/goban_intro/0
2. http://goban.tw/#/s/autoalearn_main/0

### 有等級的棋盤

1. http://goban.tw/#/see/css/0/1
2. http://goban.tw/#/see/vue/0/5


## 創建與編輯

1. 先進入[首頁](http://goban.tw)
2. 選擇[創建](http://goban.tw/#/create)或[搜尋](http://goban.tw/#/list)
3. 輸入id
4. 進入後按左上方的編輯圖示
5. 在B2欄位打上黑板的名字
6. 再往下的每個欄位中，第一欄(A欄)的部分打上「網址」
7. 第二欄(B欄)的部分打上「要顯示的名字」
8. 這樣就創建了一個連結
9. 你可以創建多個連結

![範列圖2](https://i.imgur.com/svOzmET.png =600x)

### 小技巧:
1. 如果A欄留白，它就會成為一個資料夾
2. 如果C欄打上blank，它就會自動開新分頁

## 設定關聯

* 先查詢到一個黑板
* 按齒輪圖樣
* 進入即可設定關聯


# 相關專案(Todo)

1. 行動App(已上架測試中, 有bug待修) [q-goban](https://github.com/bestian/q-goban)
2. 瀏覽器插件(開發中) [ext-goban](https://github.com/bestian/ext-goban)

# 入坑邀約(請留言在此)


* 徵文件寫手(說明文件優化)
* Youtuber(拍簡介短片)
* 前端工程師(功能流暢化、插件開發、App開發)
* 設計師(修改介面、配色等)
* 數位教師(創建資料、[回報錯誤](https://github.com/g0v/goban/issues))
* 一般使用者(創建資料、[回報錯誤](https://github.com/g0v/goban/issues))


# 錯誤回報

1. [請寫進這裡](https://github.com/g0v/goban/issues)
2. [共筆頁在這裡](https://hackmd.io/3pvyN_W9TjSsuBok4w2XYA)

# 寫給開發者

## Build Setup

> [原始碼repo在此](http://www.github.com/g0v/goban/)

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
