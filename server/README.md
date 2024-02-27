# DV next-bs5
2024/02/14<br/>
express template

## 安裝的外掛

"cookie-parser": "~1.4.4"<br/>
"cors": "^2.8.5"<br/>
"debug": "~2.6.9"<br/>
"ejs": "~2.6.1"<br/>
"express": "~4.16.1"<br/>
"express-session": "^1.18.0"<br/>
"http-errors": "~1.6.3"<br/>
"jsonwebtoken": "^9.0.2"<br/>
"moment": "^2.30.1"<br/>
"morgan": "~1.9.1"<br/>
"mysql2": "^3.9.1"<br/>

還需要其他程式,可自行安裝<br/>

### DB 資訊

host: '127.0.0.1'<br/>
port: 3306<br/>
user: 'admin'<br/>
password: '12345'<br/>
database: 'diving'<br/>
waitForConnections: true<br/>
connectionLimit: 5<br/>
queueLimit: 0<br/>

##### 注意事項

 1.檔案上傳,必須要更新最新的版本,在做上傳<br/> 2.檔案要上傳,比須告知其他成員,避免版本上會有衝突<br/>3.所有有關server的設定都放在.env檔案內routes檔案內有一個template檔案，是連接database並操作新增、刪除、修改的範例。

