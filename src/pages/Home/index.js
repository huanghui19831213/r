
import React  from 'react';
import { connect } from 'react-redux'
import { Input ,message} from 'antd';

import { setSearchList,delSearchList } from '../../reducers/searchList'

const { Search } = Input;
import './index.less'
import img from '@/static/image/HomepageBg.jpg'

class Homepage extends React.Component {
    initCanvas(){
        let context = document.getElementById("canvas").getContext("2d");
        context.shadowColor = 'rgba(0, 0, 0, 0.2)';
        context.shadowOffsetX = 4;
        context.shadowOffsetY = 2;
        context.font = "32px bold 黑体";
        context.fillStyle = "#154069";
        context.textAlign = "center";
        context.fillText("走进智签宝,智享新生活", 200, 100);
        
        context.fillStyle = "#980909";
        context.fillText("点击进入", 200, 180);
    };
    componentDidMount(){
        this.initCanvas();
    };
    render() {
        const data = this.props;
        return (
          <div className="Home" style={{background: 'url(' +img + ')'}}>
              <div>
                <Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    onSearch={value => this.props.addSearch(value)}
                    />
                    <div>
                        <ul>
                            {
                            data.data.map((e,i)=>{
                                    return (
                                        <li key={i} onClick={()=>this.props.deleteSearch(e)}>{e}<i className="icon iconfont icon-windowsclose" ></i></li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="tcenter"><canvas id="canvas" width="400" height="200"></canvas></div>
          </div>
        );
    }
}
const mapStateToProps = (state) => ({
    data: state.searchList
})
  
const mapDispatchToProps = (dispatch) => ({
    addSearch: (value) => {
        if(!value){
            message.error('请输入信息');
            return false;
        }
        dispatch(setSearchList(value))
    },
    deleteSearch: (value)=>{
        dispatch(delSearchList(value))
    }
})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Homepage)