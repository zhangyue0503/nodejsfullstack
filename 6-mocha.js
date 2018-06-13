var tools = require('./tools');
var assert = require('assert');

describe('验证tools模块',() =>{
    describe('验证add方法',function(){
        it('参数可以是数字类型',function(){
            assert.equal(2,tools.add(1,1));
        })

        it('参数可以是字符串类型',function(){
            assert.equal(2,tools.add('1','1'));
        })
    });
});