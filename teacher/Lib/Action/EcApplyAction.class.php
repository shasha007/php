<?php

/**
 * Description of EcApplyAction
 *
 * @author zhuhaibing@tiangongwang.com
 */
class EcApplyAction extends BaseAction {

    function _initialize() {
        parent::_initialize();
    }

    public function index() {
        $map['sid'] = $this->sid;
        $list = D('EcType', 'event')->where($map)->select();
        $this->assign('list', $list);
        $this->display();
    }

    public function closeProject() {
        $return = array();
        $id = intval($_POST['id']);
        if (empty($id)) {
            $return['status'] = 0;
            $return['msg'] = '参数非法';
            echo json_encode($return);
            die;
        }
        $map['id'] = $id;
        $map['sid'] = $this->sid;
        $ecTypeInfo = D('EcType', 'event')->where($map)->find();
        if (empty($ecTypeInfo)) {
            $return['status'] = 0;
            $return['msg'] = '没有该项目';
            echo json_encode($return);
            die;
        }
        if ($ecTypeInfo['isDel'] == 1) {
            $status = true;
        } else {
            $data['isDel'] = 1;
            $status = D('EcType', 'event')->where($map)->save($data);
        }
        if ($status === false) {
            $return['status'] = 0;
            $return['msg'] = '关闭项目失败';
            echo json_encode($return);
            die;
        }
        $return['status'] = 1;
        $return['msg'] = '关闭项目成功';
        echo json_encode($return);
        die;
    }

    public function openProject() {
        $return = array();
        $id = intval($_POST['id']);
        if (empty($id)) {
            $return['status'] = 0;
            $return['msg'] = '参数非法';
            echo json_encode($return);
            die;
        }
        $map['id'] = $id;
        $map['sid'] = $this->sid;
        $ecTypeInfo = D('EcType', 'event')->where($map)->find();
        if (empty($ecTypeInfo)) {
            $return['status'] = 0;
            $return['msg'] = '没有该项目';
            echo json_encode($return);
            die;
        }
        if ($ecTypeInfo['isDel'] == 1) {
            $data['isDel'] = 0;
            $status = D('EcType', 'event')->where($map)->save($data);
        } else {
            $status = true;
        }
        if ($status === false) {
            $return['status'] = 0;
            $return['msg'] = '开启项目失败';
            echo json_encode($return);
            die;
        }
        $return['status'] = 1;
        $return['msg'] = '开启项目成功';
        echo json_encode($return);
        die;
    }

}
