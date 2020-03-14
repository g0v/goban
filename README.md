# [零時黑板](http://goban.tw)

## hackfoldr改良版-有脈絡的大量網址分享器

## 動機
太陽花學運用的hackfoldr，非常令人驚艷

## 簡介

零時黑板(Goban)是g0v社群的開源專案之一。
跟Hackfoldr類似，還附有以下功能性：
   
1. 可以用關鍵字搜詢別人創建的黑板。
2. 黑板之間可以設定關聯性，是一個知識庫的概念。
3. 可以珍藏到瀏覽器的local storage上。
4. 可以備份資料到自己的電腦上。
5. 每個超連結都有獨立的網址。
6. 用Hackfoldr也可以開啟零時黑板上的資料。
7. 未來可以把Hackfoldr的資料很容易地直接copy過來，兩者有一定的相容性。
 
# 如何使用

## 創建

* 先進入[首頁](http://goban.tw)
* 打上你的黑板的名字，按創建
* 會進入一個試算表的頁面
* 在B2欄位打上黑板的名字
* 再往下的每個欄位中
* A的部分打上網址
* B的部分打上名字
* 這樣就可以創建一個連結

## 設定關聯

* 先查詢到一個黑板
* 按齒輪圖樣
* 進入即可設定關聯

## 設定珍藏

* 先查詢到一個黑板
* 按星號圖示

## 下載備份

* 點入一個黑板
* 按下載

## 網址範例

1. http://goban.tw/#/see/css/0/0
2. http://goban.tw/#/see/%E9%9B%B6%E6%99%82%E5%B0%8F%E5%AD%B8%E6%A0%A1/0/0
3. http://goban.tw/#/see/vue/0/0

# 相關專案

1. 行動App(開發中) [q-goban](https://github.com/bestian/q-goban)
2. 瀏覽器插件(開發中) [ext-goban](https://github.com/bestian/ext-goban)

# 入坑請留言在此

> [name=Bestian Tang 小巴]前端工程師

(徵文件寫手、前端工程師、設計師、數位教師、一般使用者)


# 錯誤回報

1. [請寫進這裡](https://github.com/g0v/goban/issues)
2. [共筆頁](https://hackmd.io/3pvyN_W9TjSsuBok4w2XYA)

# 寫給開發者

## Build Setup

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
