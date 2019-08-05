import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom';
import RouterMap  from '../router/routerMap';

import { Menu,Breadcrumb,Dropdown,Icon} from 'antd';
import './Layout.less'
const { SubMenu } = Menu;
const menu = (
    <Menu>
      <Menu.Item>
        <Link to="">更改密码</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/login">退出</Link>
      </Menu.Item>
    </Menu>
  );
class Layout extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            height:'',
            menu : [
                    {"name":"材料管理","key":"1",children:[
                        {"name":"需要我操作","key":"1_1","path":'/main'},
                        {"name":"需要他人操作","key":"1_2","path":'/main/News'}]
                    },
                    {"name":"模板管理","key":"2"},
                    {"name":"企业管理","key":"3"},
                    {"name":"用户管理","key":"4"},
                    {"name":"系统管理","key":"5",children:[
                        {"name":"部门管理","key":"5_1"},
                        {"name":"菜单管理","key":"5_2"},
                        {"name":"日志管理","key":"5_2_1",children:[
                            {"name":"操作日志","key":"5_2_1_1"},
                            {"name":"登录日志","key":"5_2_1_2","path":'/main/News'}]
                        }]
                    }],
            arr:[],
            selectArr:[]
        }
    };
    handleClick = e => {
        this.getObj(e)
    };
    getObj (e){
        let arr=[],index=0;
        e.keyPath.map((obj1)=>{
            this.state.arr.map((obj2)=>{
                if(obj1==obj2.key){
                    arr.push({...obj2,index:index++})
                }
            })
        })
        this.setState({
            selectArr:arr.sort(this.sortby)
        })
    };
     sortby(a,b){
    　　return b.index-a.index;
    };
    renderMenu(data){
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu title={item.name} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item title={item.name} key={item.key}>
                    <Link to={item.path||''}>{item.name}</Link>
                </Menu.Item>
            )
        })
    };
    renderBreadcrumb(data){
        data.map((item)=>{
            if(item.children){
                this.renderBreadcrumb(item.children)
            }
            this.state.arr.push({"name":item.name,"key":item.key,"path":item.path})
        })
    };
    componentDidMount() {
        this.renderBreadcrumb(this.state.menu)
        this.getObj({'keyPath':['1_1','1']})
        this.setState({
            height:document.body.clientHeight-this.refs.top.scrollHeight
        })
    };
    // componentWillUnmount() {
    //     window.addEventListener('resize', ()=>{
    //         this.setState({
    //             height:document.body.clientHeight-document.getElementById('top').scrollHeight
    //         })
    //     })
    // };
    render() {
        const state=this.state;
        return (
            <div className="layout">
                <div className="top" id="top" ref="top">
                    <span className="logo">中智电子签约</span>
                    {
                        <div className="fr">
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link" >
                                    设置<Icon type="down" />
                                </a>
                            </Dropdown>
                        </div>
                    }
                </div>
                <div className="content" style={{height: state.height+'px'}}>
                    <Menu
                        onClick={this.handleClick}
                        style={{ width: 230 }}
                        defaultSelectedKeys={['1_1']}
                        defaultOpenKeys={['1']}
                        mode="inline"
                    >
                        {
                            this.renderMenu(state.menu)
                        }
                    </Menu>
                    <div className="flex1 p20">
                        <Breadcrumb>
                            {
                                state.selectArr.map((e)=>{
                                    if(e.path){
                                        return (
                                            <Breadcrumb.Item key={e.key}><Link to={e.path}>{e.name}</Link></Breadcrumb.Item>
                                        )
                                    }else{
                                       return  <Breadcrumb.Item key={e.key}>{e.name}</Breadcrumb.Item>
                                    }
                                })
                            }
                        </Breadcrumb>
                        <RouterMap></RouterMap>
                    </div>
                </div>
            </div>
        );
    }
}
export default Layout;
