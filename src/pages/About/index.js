import React, { PureComponent } from 'react';
import { Table} from 'antd';

class About extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            dataSource:[
                {
                  key: '1',
                  name: '胡彦斌',
                  age: 32,
                  address: '西湖区湖底公园1号',
                },
                {
                  key: '2',
                  name: '胡彦祖',
                  age: 42,
                  address: '西湖区湖底公园1号',
                },
              ],
            columns:[
                {
                  title: '姓名',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: '年龄',
                  dataIndex: 'age',
                  key: 'age',
                },
                {
                  title: '住址',
                  dataIndex: 'address',
                  key: 'address',
                },
              ]
        }
    };
    render() {
        const state = this.state;
        return (
            <Table dataSource={state.dataSource} columns={state.columns} />
        );
    }
}
export default About;
