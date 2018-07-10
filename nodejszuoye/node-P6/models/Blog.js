const BlogModel = require('./BlogModel');
/**
 * ORM对象实体类
 */
class Blog  {
    
    // 构造器，构成sequelize实体对象
    constructor() {
        this.db = BlogModel.getBlogModel();
    }
    // 添加
    async create(data) {
        try {
            const result = await this.db.create(data);
            if (result.id) {
                return {
                    id: result.id
                };
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    //修改
    async update(data) {
        try {
            const result = await this.db.update({
                title: data.title,
                content: data.content
            }, {
                where: {
                    id: data.id
                }
            });
            if (result) {
                return {
                    id: data.id
                };
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
        
    }
    // 获取详情
    async getInfo(id) {
        const result = await this.db.findById(id);
        if (result) {
            return {
                id: result.id,
                title: result.title,
                content: result.content
            }
        } else {
            return null;
        }
    }
    // 获取列表
    async getList(limit, offset) {
        const result = await this.db.findAndCountAll({
            limit: limit,
            offset: offset
        });
        if (result && result.rows && result.rows.length > 0) {
            const list = [];
            result.rows.forEach(item => {
                list.push({
                    id: item.id,
                    title: item.title,
                    content: item.content
                });
            });
            return list;
        } else {
            return null;
        }
    }
    // 删除
    async destory(id) {
        try {
            const result = await this.db.destroy({
                where: {
                    id: id
                }
            });
            if (result) {
                return {
                    id: id
                };
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
        
    }
};
module.exports = Blog;