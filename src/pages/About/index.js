import React, { PureComponent } from 'react';
import { Table, Input } from 'antd';
import Ajax from '@/util/ajax'
class About extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            dataSource:[],
            columns:[
                {
                  title: '公司名称',
                  dataIndex: 'accountName',
                  key: 'accountName',
                },
                {
                  title: '发送日期',
                  dataIndex: 'sendTime',
                  key: 'sendTime',
                },
                {
                  title: '提交人',
                  dataIndex: 'createBy',
                  key: 'createBy',
                }
              ],
              pageNum:1,
              pageSize:2,
              signStatus:1,
              total:0
        }
    };
    componentDidMount(){
      this.getTableList();
    };
    getTableList(){
      Ajax('/api/boss/contract/list',{methods: 'POST',body:{
        'page':this.state.page,
        'limit':this.state.limit,
        'signStatus':this.state.signStatus,
      }},'formData').then((e)=>{
        this.setState({
          dataSource:e.data,
          total:e.count
        })
      })
    };
    render() {
        const state = this.state;
        let paginationProps={
          pageSize: this.state.pageSize,
          current: this.state.pageNum,
          total: this.state.total,
          onChange: ((i)=>{
            this.setState({
              pageNum:i
            });
            this.getTableList();
          })
        }
        return (
          <div>
            <div className="flex"></div>
            <Table dataSource={state.dataSource} columns={state.columns}  rowKey="id" pagination={ paginationProps }/>
          </div>
        );
    }
}
export default About;
