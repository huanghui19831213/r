import React, { PureComponent } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import "./index.less"
import Ajax from '@/util/ajax'
class Login extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            username:'admin',
            password:'123456'
        }
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            !err&&Ajax('/api/ajaxLogin',{methods: 'POST',body:values},'formData').then((e)=>{
                this.props.history.push('/main');
            })
           
        });
      };
    handelChange (e,v) {
        this.state[v]=e.target.value
    }
    render() {
        const state =this.state;
        const { getFieldDecorator} = this.props.form;
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
                <div className="footer">V4.0.0 版权所有 © 2014-2019 上海中智 |  技术平台合作伙伴--杭州尚尚签网络科技有限公司</div>
            </div>
        );
    }
}
const LoginForm = Form.create({ name: 'login' })(Login);
export default LoginForm;