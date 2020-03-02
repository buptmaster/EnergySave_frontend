import React, { useState, useEffect } from 'react';
import PageHead from '@/components/PageHead';
import ChargeBackTable from './components/ChargeBackTable';
import { Tree, Card, Grid, Button, Dialog } from '@alifd/next'
import IceContainer from '@icedesign/container';
import Axios from 'axios';

export default function ChargeBack() {
  const { Node: TreeNode } = Tree
  const { Row, Col } = Grid

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    Axios.get("/device/category")
      .then(res => {
        setData(res.data.data)
      })
  }


  const loop = (children) => {
    return (
      children.map(item => {
        return (
          <TreeNode
            draggable
            label={
              <b style={item.deviceId ? { color: "green" } : {}}>
                {item.name}
              </b>
            }>
            {item.children && item.children.length ? loop(item.children) : null}
          </TreeNode>
        );
      })
    )

  }

  return (


    <div>
      <PageHead title="设备类别（模式）管理" />
      <IceContainer>
        <Row wrap >
          {data.map((tree, index) => {

            const dfs = (t, oldt, indexArr, callback) => {
              if (indexArr.length != 0) {
                let i = indexArr[0];
                let newArr = indexArr.slice(1)
                return dfs(t[i].children, t, newArr, callback)
              } else {
                return callback(t, oldt)
              }
            }

            const processData = (info) => {
              console.log(info)
              let dropPos = info.dropPosition;
              let dragKeyArr = info.dragNode.props.eventKey.split("-");
              let dropKeyArr = info.node.props.eventKey.split("-");
              let dragData;

              const find = (arr, oldarr) => {
                dragData = oldarr[dragKeyArr[dragKeyArr.length - 1]];
              }

              const del = (arr, oldarr) => {
                oldarr.splice(dragKeyArr[dragKeyArr.length - 1], 1);
              }

              const add = (arr, oldarr) => {

                //判断是否完成拖动条件
                //目标节点为设备，此拖动无效
                if (oldarr[dropKeyArr[dropKeyArr.length - 1]].deviceId) return;

                dfs(data[index].children, data[index], dragKeyArr, del);
                if (dropPos === 0) {
                  arr.push(dragData);
                } else {
                  oldarr.push(dragData)
                }
              }
              dragKeyArr.splice(0, 1);
              dropKeyArr.splice(0, 1);

              dfs(data[index].children, data[index], dragKeyArr, find);
              dfs(data[index].children, data[index], dropKeyArr, add);

              setData([...data])

            }

            const editFinish = (key, label, node) => {
              let editKeyArr = key.split("-");
              editKeyArr.splice(0, 1);
              let editIdx = editKeyArr[editKeyArr.length - 1];
              if (label === '[object Object]') return
              const edit = (arr, oldarr) => {
                console.log(node)
                oldarr[editIdx].name = label;
                setData([...data]);
              }
              dfs(data[index].children, data[index], editKeyArr, edit);

            }

            const onAdd = () => {
              data[index].children.push({
                name: "待修改标题",
                children: []
              })

              setData([...data])
            }

            const onDeleteNode = (info) => {
              let delKeyArr = info.node.props.eventKey.split("-");
              delKeyArr.splice(0, 1);

              const del = (arr, oldarr) => {
                indep = arr;
                oldarr.splice(delKeyArr[delKeyArr.length - 1], 1);
              }

              Dialog.confirm({
                title: "提示",
                content: "确认删除此节点？（其设备变为独立设备）",
                onOk: () => {
                  dfs(data[index].children, data[index], delKeyArr, del)
                }
              })
            }

            const onDeleteMode = () => {
              Dialog.confirm({
                title:"警告",
                content:"确认删除整个模式?",
                onOk: () => {
                  data.splice(index, 1);
                  setData([...data]);
                }
              })
            }

            return (
              <Col l="8">
                <Card
                  extra={
                    <div>
                      <Button
                        style={{marginRight: "4px"}}
                        size="small"
                        type="primary"
                        onClick={onAdd}>
                        添加节点
                      </Button>
                      <Button
                        warning
                        size="small"
                        type="primary"
                        onClick={onDeleteMode}>
                        删除模式
                      </Button>
                    </div>

                  }
                  title={tree.categoryName}
                  subTitle={tree.tag}
                  contentHeight="auto">
                  <Tree
                    editable
                    draggable
                    defaultExpandAll
                    showLine
                    onRightClick={onDeleteNode}
                    onEditFinish={editFinish}
                    onDrop={processData}
                  >
                    {loop(tree.children)}
                  </Tree>
                </Card>

              </Col>
            )
          })}
        </Row>
      </IceContainer>

    </div>
  );
}
