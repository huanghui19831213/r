import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import "./index.less"
import Ajax from '@/util/ajax'
import { setMenuList } from '../../reducers/menuList'
const menu = [
    {"name":"材料管理","key":"1","icon":"icon iconfont icon-qinzi",children:[
        {"name":"需要我操作","key":"1_1","path":'/main',"component":"About"},
        {"name":"需要他人操作","key":"1_2","path":'/main/News',"component":"News"}]
    },
    {"name":"模板管理","icon":"icon iconfont icon-qinzi","key":"2","path":'/Home'},
    {"name":"企业管理","icon":"icon iconfont icon-qinzi","key":"3","path":'/main1'},
    {"name":"用户管理","icon":"icon iconfont icon-qinzi","key":"4","path":'/main2'},
    {"name":"系统管理","icon":"icon iconfont icon-qinzi","key":"5",children:[
        {"name":"部门管理","key":"5_1","path":'/main3'},
        {"name":"菜单管理","key":"5_2","path":'/main4'},
        {"name":"日志管理","icon":"icon iconfont icon-qinzi","key":"5_2_1",children:[
            {"name":"操作日志","key":"5_2_1_1","path":'/main5'},
            {"name":"登录日志","key":"5_2_1_2","path":'/main/News6'}]
        }]
    }]
class Login extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            username:'admin',
            password:'123456',
            year:new Date().getFullYear()
        }
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            !err&&Ajax('/api/ajaxLogin',{methods: 'POST',body:values},'formData').then((e)=>{
                if(e.code==0){
                    this.props.setMenu(menu)
                    this.props.data&&this.props.history.push('/main');
                }
            })
           
        });
      };
    handelChange (e,v) {
        this.state[v]=e.target.value
    }
    render() {
        const { getFieldDecorator} = this.props.form;
        const state = this.state
        return (
            <div className="Login">
                <img src={require('@/static/image/login_bg.jpg')}/>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h6>用户登录</h6>
                    <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input onChange={($e)=>this.handelChange($e,'username')} 
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username" 
                        />
                    )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input onChange={($e)=>this.handelChange($e,'password')} 
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            />
                        )}
                    </Form.Item>
                    
                    <Form.Item>
                        {getFieldDecorator('rememberMe', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住我</Checkbox>
                        )}
                    </Form.Item>
                    
                    <Button type="primary" htmlType="submit" className="login-form-button" size="large">登录</Button>
                </Form>
                <div className="footer">V4.0.0 版权所有 © 2014-{state.year} 上海中智 |  技术平台合作伙伴--杭州尚尚签网络科技有限公司</div>
            </div>
        );
    }
}
const LoginForm = Form.create({ name: 'login' })(Login);

const mapStateToProps = (state) => ({
    data: state.menuList
})
  
const mapDispatchToProps = (dispatch) => ({
    setMenu: (value) => {
        dispatch(setMenuList(value))
    }
})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm)