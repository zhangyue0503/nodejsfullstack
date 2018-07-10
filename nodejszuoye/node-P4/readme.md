# 项目概述

实现对blog表数据增删改查的数据API,通过返回JSON结构的数据.

# 项目说明
为了方便修改,做以下统一:

使用mysql数据库,数据库账号admin,密码为空,端口使用默认的3306,数据库名字为my_db

单个blog对象应至少包含以下字段:
```
id: id
title: 标题
content: 内容
```

通用返回格式为:
```json
{
    "code":0, //返回码,0表示成功,非0表示错误
    "msg":"", //可选,表示错误信息
    "data":"" //返回的数据,可以对象,数组,字符串等结构
}
```


具体接口:

1.根据id查询单个blog对象 

GET /api/blog?id=1 

返回:
```json
{
    "code":0, 
    "data":{
        "id":1,
        "title":"标题",
        "content":"内容",
    } 
}
```
2.查询列表 

GET /api/blog_list?limit=10&offset=0 (limit为此次请求的数量,offset为偏移量)

返回:
```json
{
    "code":0, 
    "data":{
        "hasMore":false,
        "list":[{
            "id":1,
            "title":"标题",
            "content":"内容"
        }]
    } 
}
```

3.创建一条blog数据

POST /api/blog_create

{”title”:”修改的标题”,”content”:”内容”}

返回:
```json
{
    "code":0, 
    "data":{
        "id":2
    } 
}
```

4.删除一条blog数据

POST /api/blog_delete
{“id”:”1”}

返回:
```json
{
    "code":0, 
    "data":{
        "id":2
    } 
}
```

5.更新一条blog数据

POST /api/blog_update
{“id”:”1”,”title”:”修改的标题”,”content”:”内容”}

返回:
```json
{
    "code":0, 
    "data":{
        "id":1
    } 
}
```